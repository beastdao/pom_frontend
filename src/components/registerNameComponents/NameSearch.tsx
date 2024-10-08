import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { NamesRegistryReadHook } from '../wagmiHooks/NamesRegistryReadHook';
import { Community, FetchRecentCommunities } from '../apiBackendComponents/FetchRecentCommunities';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import Toast from 'react-bootstrap/Toast';
import useInputValidation from '../utils/inputValidationHook';

function NameSearch() {
    const [nameValue, setNameValue] = useState<string>('');
    const [communityValue, setCommunityValue] = useState<string>('');
    const [buttonStatus, setButtonStatus] = useState<string>('disabled');
    const [recentCommunities, setRecentCommunities] = useState<Community[] | null>(null); //rewrite type
    const [alreadyHasName, setAlreadyHasName] = useState<boolean>(false);
    const navigate = useNavigate();
    const { address } = useAccount();

    const {
        data: dataCommunity,
        refetch: refetchCommunity,
        isError: isErrorCommunity,
        isLoading: isLoadingCommunity,
    } = NamesRegistryReadHook({
        functionName: 'getCommunityAdmin',
        functionArgs: [communityValue],
    });

    const {
        data: dataName,
        refetch: refetchName,
        isError: isErrorName,
        isLoading: isLoadingName,
    } = NamesRegistryReadHook({
        functionName: 'availableName',
        functionArgs: [nameValue, communityValue],
    });

    const {
        data: dataNameInCommunityByAddress,
        /* probably use in a future
        Unused properties for now:
        isError: isErrorNameInCommunityByAddress,
        isLoading: isLoadingNameInCommunityByAddress,
        */
    } = NamesRegistryReadHook(
        address
            ? {
                  functionName: 'getNameInCommunityByAddress',
                  functionArgs: [address, communityValue],
              }
            : {
                  functionName: 'getNameInCommunityByAddress',
                  functionArgs: undefined,
              }
    );
    useEffect(() => {
        if (dataNameInCommunityByAddress !== undefined && address !== undefined) {
            if (dataNameInCommunityByAddress.toString() === '0') {
                setAlreadyHasName(false);
            } else {
                setAlreadyHasName(true);
            }
        }
    }, [dataNameInCommunityByAddress, address]);

    useEffect(() => {
        async function fetchData() {
            const data = await FetchRecentCommunities();
            setRecentCommunities(data);
        }
        fetchData();
    }, []);

    const {
        feedbackText: communityFeedbackText,
        validity: communityValidity,
        shouldEnableButton: shouldEnableButtonCommunity,
    } = useInputValidation(communityValue, 'community', 3, 10, isLoadingCommunity, dataCommunity);

    const {
        feedbackText: nameFeedbackText,
        validity: nameValidity,
        shouldEnableButton: shouldEnableButtonName,
    } = useInputValidation(
        nameValue,
        'name',
        3,
        15,
        isLoadingName,
        dataName,
        alreadyHasName,
        communityValidity
    );

    useEffect(() => {
        const shouldEnableButton =
            shouldEnableButtonCommunity &&
            shouldEnableButtonName &&
            !isLoadingCommunity &&
            !isLoadingName;

        setButtonStatus(shouldEnableButton ? 'enabled' : 'disabled');
    }, [shouldEnableButtonCommunity, shouldEnableButtonName, isLoadingCommunity, isLoadingName]);

    const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputNameValue = event.target.value;
        setNameValue(inputNameValue.toLowerCase());
    };

    const handleCommunityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputCommunityValue = event.target.value;
        setCommunityValue(inputCommunityValue.toLowerCase());
    };

    const handleButtonClick = () => {
        const nameAtCommunity = nameValue + '@' + communityValue;
        navigate(`/RegisterNameFinal/${nameAtCommunity}`);
    };

    const handleCommunitySelect = (selectedCommunity: string) => {
        setCommunityValue(selectedCommunity.toLowerCase());
    };

    useEffect(() => {
        let intervalId: Timer | undefined;

        if (isErrorCommunity || isErrorName) {
            console.log('refetching');
            intervalId = setInterval(() => {
                refetchCommunity();
                refetchName();
            }, 1000);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isErrorCommunity, refetchCommunity, isErrorName, refetchName]);

    return (
        <>
            <div className="hcc1">
                <div className="hcc1-if">
                    <InputGroup className="mb-3" size="lg">
                        <Form.Control
                            className="rounded"
                            type="text"
                            id="inputName"
                            aria-describedby="NameHelpBlock"
                            placeholder="YOUR NAME"
                            value={nameValue}
                            onChange={handleNameInputChange}
                            isInvalid={nameValidity === 'isInvalid'}
                            isValid={nameValidity === 'isValid'}
                        />
                        <Form.Control.Feedback type="invalid">
                            {nameFeedbackText}
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="valid">
                            {nameFeedbackText}
                        </Form.Control.Feedback>
                    </InputGroup>
                </div>

                <div className="hcc1-if">
                    <InputGroup className="mb-3" size="lg">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            className="rounded"
                            type="text"
                            placeholder="COMMUNITY"
                            aria-label="Community search"
                            aria-describedby="basic-addon2"
                            value={communityValue}
                            onChange={handleCommunityInputChange}
                            isInvalid={communityValidity === 'isInvalid'}
                            isValid={communityValidity === 'isValid'}
                        />
                        <Form.Control.Feedback type="invalid">
                            {communityFeedbackText}
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="valid">
                            {communityFeedbackText}
                        </Form.Control.Feedback>
                    </InputGroup>
                </div>
            </div>

            <div className="hcc2">
                <div className="hc-loading">
                    {isLoadingCommunity || isLoadingName || isErrorCommunity || isErrorName ? (
                        <Spinner animation="border" variant="secondary" />
                    ) : null}
                </div>
                <Form.Text id="TextForm" className="text-center">
                    Type your chosen name and a community name. Name: 3-15, Community: 3-10
                    characters.
                </Form.Text>
                <Button
                    variant="dark"
                    onClick={handleButtonClick}
                    disabled={buttonStatus === 'disabled'}
                >
                    PROCEED
                </Button>

                <div className="hcc2t">
                    <Toast bg="light">
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto"> GET A FREE ETH NAME NOW! </strong>
                        </Toast.Header>
                        <Toast.Body>
                            Your 100% free, human-readable name on Ethereum like{' '}
                            <strong> alice@eth</strong>{' '}
                        </Toast.Body>
                    </Toast>
                </div>
            </div>

            <div className="rcbt">
                <div className="rcbt-c1">
                    <p>{recentCommunities ? 'Most recent communities:' : ''}</p>
                </div>
                <div className="rcbt-c2">
                    {recentCommunities &&
                        recentCommunities.map((community, index) => (
                            <Button
                                variant="outline-dark"
                                key={index}
                                onClick={() => handleCommunitySelect(community.toString())}
                            >
                                @{community.toString()}
                            </Button>
                        ))}
                </div>
            </div>
        </>
    );
}

export default NameSearch;
