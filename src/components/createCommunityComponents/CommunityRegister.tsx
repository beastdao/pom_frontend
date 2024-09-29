import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NamesRegistryReadHook } from '../wagmiHooks/NamesRegistryReadHook';
import { NamesRegistryWriteHook } from '../wagmiHooks/NamesRegistryWriteHook';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { useAccount } from 'wagmi';
import TxStatusModalReceipt from '../txStatusModalComponents/TxStatusModalReceipt';

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
    const [adminAddress, setAdminAddress] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false); // New state variable
    const [errorCount, setErrorCount] = useState<number>(0);
    const { address } = useAccount();

    const {
        data: dataCommunityRegister,
        refetch: refetchCommunityRegister,
        isError: isErrorCommunityRegister,
        isLoading: isLoadingCommunityRegister,
    } = NamesRegistryReadHook({ functionName: 'getCommunityAdmin', functionArgs: [searchValue] });

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
            let [status, validity] = checkCommunity(dataCommunityRegister.toString());
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

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    const handleAdminAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdminAddress(event.target.value);
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
                                    Membership Cards have initial color scheme designed by{' '}
                                    <a href={`https://beastdao.org`} target="_blank">
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

                <Button
                    variant="dark"
                    type="button"
                    disabled={buttonStatus === 'disabled'}
                    onClick={handleRegisterClick} // Call the function when the "Register" button is clicked
                >
                    Register
                </Button>

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
