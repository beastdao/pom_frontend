import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NamesRegistryReadHook } from '../wagmiHooks/NamesRegistryReadHook';
import { NamesRegistryWriteHook } from '../wagmiHooks/NamesRegistryWriteHook';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { useAccount } from 'wagmi';
import TxStatusModalReceipt from '../txStatusModalComponents/TxStatusModalReceipt';
import { ConnectButton } from '../connectKit/ConnectButton';
import { useEstimateGasFnCall } from '../wagmiHooks/estimateGasFnCall';
import { fetchGasPrice, GasData } from '../utils/fetchGasPrice';

const NULLADDR = '0x0000000000000000000000000000000000000000';

// Function to check community validity
function checkCommunity(textData: string) {
    let feedback;
    let validity;
    let buttonStatus;
    if (textData === NULLADDR) {
        feedback = 'Community is Available';
        validity = 'isValid';
        buttonStatus = '';
    } else {
        feedback = 'Community is already Registered!';
        validity = 'isInvalid';
        buttonStatus = 'disabled';
    }
    return [feedback, validity, buttonStatus];
}

function CommunityRegister({ searchValue }: { searchValue: string }) {
    const navigate = useNavigate();
    const [feedBackText, setFeedBackText] = useState<string>('');
    const [inputValidity, setInputValidity] = useState<string | null>(null);
    const [buttonStatus, setButtonStatus] = useState<string>('disabled');
    const [isChecked, setIsChecked] = useState(false);
    const [adminAddress, setAdminAddress] = useState<`0x${string}`>(NULLADDR);
    const [showModal, setShowModal] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false); // New state variable
    const [errorCount, setErrorCount] = useState<number>(0);
    const { address } = useAccount();
    const [estimateGasUSD, setEstimateGasUSD] = useState<GasData | undefined>(undefined);
    const [gasFetchStatus, setGasFetchStatus] = useState<string>('loading...');

    const {
        data: dataCommunityRegister,
        refetch: refetchCommunityRegister,
        isLoading: isLoadingCommunityRegister,
        //isError: isErrorCommunityRegister,  // probably use in a future
    } = NamesRegistryReadHook({
        functionName: 'getCommunityAdmin',
        functionArgs: [searchValue],
    });

    const gasEstimate = useEstimateGasFnCall(
        'registerCommunity',
        [
            searchValue,
            '0x187e3bf7a18cf0dBce3E0B6D2CCc00CE444F61A7', //just to simulate function
        ],
        address
    );

    const {
        write,
        receipt,
        isPending,
        isSuccess,
        isWriteError,
        isTxError,
        txError,
        writeError,
        isLoading,
        txRefetch,
    } = NamesRegistryWriteHook({
        functionName: 'registerCommunity',
        functionArgs: [searchValue, adminAddress],
        txValue: BigInt('0'),
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetchCommunityRegister();
        }, 10000); // 10000 milliseconds = 10 seconds

        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };
    }, []); // Empty dependency array to run the effect once on component mount

    useEffect(() => {
        if (dataCommunityRegister !== undefined) {
            const [status, validity] = checkCommunity(dataCommunityRegister.toString());
            setFeedBackText(status);
            setInputValidity(validity);
        }
    }, [dataCommunityRegister]);

    useEffect(() => {
        if (
            feedBackText === 'Community is Available' &&
            isAddressValid() &&
            isCheckboxValid() &&
            !isLoadingCommunityRegister &&
            address !== undefined
        ) {
            setButtonStatus('');
        } else {
            setButtonStatus('disabled');
        }
    }, [feedBackText, adminAddress, isChecked, address]);

    const MAX_RETRIES = 5;
    const RETRY_DELAY = 2000;

    useEffect(() => {
        const fetchGasPriceData = async (retryCount = 0) => {
            if (gasEstimate !== undefined) {
                const result = await fetchGasPrice(gasEstimate.toString());

                if (result.success) {
                    setEstimateGasUSD(result.data);
                } else {
                    if (retryCount < MAX_RETRIES) {
                        console.log(
                            `Attempt ${retryCount + 1} failed. Retrying in ${RETRY_DELAY / 1000} seconds...`
                        );
                        setTimeout(() => fetchGasPriceData(retryCount + 1), RETRY_DELAY);
                    } else {
                        setGasFetchStatus('failed to fetch network fees');
                        console.error('Max retries reached. Could not fetch gas estimate.');
                    }
                }
            }
        };

        fetchGasPriceData();
    }, [gasEstimate]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    const handleAdminAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value.trim();
        if (/^0x[a-fA-F0-9]{40}$/.test(val)) {
            setAdminAddress(val as `0x${string}`);
        }
    };

    const isAddressValid = () => {
        return (
            adminAddress.trim() !== '' &&
            adminAddress.trim() !== NULLADDR &&
            adminAddress.trim().length === 42
        );
    };

    const isCheckboxValid = () => {
        return isChecked;
    };

    // Function to handle the "Register" button click
    const handleRegisterClick = () => {
        if (isAddressValid() && isCheckboxValid()) {
            write?.(); // Trigger the contract write operation
            setIsButtonClicked(true);
            setShowModal(true);
        }
    };

    useEffect(() => {
        if (isTxError && errorCount <= 5) {
            const timer = setTimeout(() => {
                txRefetch();
                setErrorCount(errorCount + 1);
            }, 5000);
            return () => clearTimeout(timer);
        }
        if (isPending || isSuccess) {
            setErrorCount(0);
        }
    }, [isTxError, isPending, isSuccess]);

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
        setIsButtonClicked(false);
        navigate('/');
    };

    const tos_url = 'https://drive.google.com/file/d/1nQ0Zrc218dltS4_VLLozjO6Scq_EofOB/view';
    function handleConnectClick(event: React.MouseEvent) {
        event.preventDefault();
    }
    return (
        <div className="hcc2">
            <Form>
                <Form.Group className="mb-3" controlId="formCommunityName">
                    <Form.Label>Community Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={searchValue}
                        disabled
                        isInvalid={inputValidity === 'isInvalid'}
                        isValid={inputValidity === 'isValid'}
                    />
                    <Form.Control.Feedback type="invalid">{feedBackText}</Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">{feedBackText}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAdminAddress">
                    <Form.Label>Community Admin Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Ethereum Address"
                        isInvalid={!isAddressValid()}
                        onChange={handleAdminAddressChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Not a valid Ethereum address!
                    </Form.Control.Feedback>
                </Form.Group>
                <>
                    {['light'].map((variant) => (
                        <Alert key={variant} variant={variant}>
                            <div>
                                <p>
                                    Memberships issuance is <b>FREE</b> for everyone <b>forever</b>!
                                </p>
                                <p>
                                    <b>⛽️ Gas:</b>{' '}
                                    {estimateGasUSD
                                        ? `${estimateGasUSD.max_fee_per_gas.toFixed(2)} Gwei`
                                        : gasFetchStatus}
                                </p>
                                <p>
                                    <b>Est. network fee:</b>{' '}
                                    {estimateGasUSD ? (
                                        <>
                                            min ${estimateGasUSD.min.toFixed(2)} max $
                                            {estimateGasUSD.max.toFixed(2)}
                                        </>
                                    ) : (
                                        gasFetchStatus
                                    )}
                                </p>
                                <p>
                                    Membership Cards have initial color scheme designed by{' '}
                                    <a
                                        href={`https://beastdao.org`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        BEAST
                                    </a>
                                    .
                                </p>
                                <p>
                                    Cards could be customized with your color scheme on{' '}
                                    <a href={`/MyCommunities`}>MY COMMUNITIES</a>
                                </p>
                            </div>
                        </Alert>
                    ))}
                </>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label={
                            <span>
                                I accept the <a href={tos_url}>Terms and Conditions</a>
                            </span>
                        }
                        isInvalid={!isCheckboxValid()}
                        onChange={handleCheckboxChange}
                    />
                </Form.Group>
                {address ? (
                    <Button
                        variant="dark"
                        type="button"
                        disabled={buttonStatus === 'disabled'}
                        onClick={handleRegisterClick} // Call the function when the "Register" button is clicked
                    >
                        Register
                    </Button>
                ) : (
                    <button
                        type="button"
                        onClick={handleConnectClick}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                        }}
                    >
                        <ConnectButton />
                    </button>
                )}
                {isButtonClicked && (
                    <TxStatusModalReceipt
                        show={showModal}
                        onClose={closeModal}
                        isPending={isPending}
                        isTxError={isTxError}
                        errorCount={errorCount}
                        txError={txError ? txError : undefined}
                        isWriteError={isWriteError}
                        writeError={writeError ? writeError : undefined}
                        isLoading={isLoading}
                        isSuccess={isSuccess}
                        receipt={receipt ? receipt : undefined}
                    />
                )}
            </Form>
        </div>
    );
}

export default CommunityRegister;
