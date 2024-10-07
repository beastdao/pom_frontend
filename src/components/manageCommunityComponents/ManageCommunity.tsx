import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { NamesRegistryReadHook } from '../wagmiHooks/NamesRegistryReadHook';
import ModifyCommunityAdmin from './ModifyCommunityAdmin';
import SuspendUnsuspendCommunity from './SuspendUnsuspendCommunity';
import ModifyColorScheme from './ModifyColorScheme';
import { useAccount } from 'wagmi';
import Alert from 'react-bootstrap/Alert';

function checkCommunityAdmin(
    textData: string,
    comparisonString: string | undefined
): [string, string, string] {
    let feedback;
    let validity;
    let buttonsStatus;
    if (comparisonString === undefined) {
        feedback = 'Connect Wallet!';
        validity = 'isInvalid';
        buttonsStatus = 'disabled';
    } else if (textData === comparisonString) {
        feedback = 'You are admin';
        validity = 'isValid';
        buttonsStatus = 'enabled';
    } else {
        feedback = 'You are not admin';
        validity = 'isInvalid';
        buttonsStatus = 'disabled';
    }
    return [feedback, validity, buttonsStatus];
}

function ManageCommunity({ searchValue }: { searchValue: string }) {
    const [buttonsStatus, setButtonsStatus] = useState('disabled');
    const [feedBackText, setFeedBackText] = useState('');
    const [inputValidity, setInputValidity] = useState<string | null>(null);
    const [membershipsCount, setMembershipsCount] = useState('...');
    const [isSuspendedByAdmin, setIsSuspendedByAdmin] = useState<string>('...');
    const [isCommunityVerified, setIsCommunityVerified] = useState('...');
    const { address } = useAccount();

    const {
        data: dataCommunitySearch,
        /* probably use in a future
          Unused properties for now:
          refetch: refetchCommunitySearch,
          isError: isErrorCommunitySearch,
          isLoading: isLoadingCommunitySearch,
         */
    } = NamesRegistryReadHook({
        functionName: 'getCommunityAdmin',
        functionArgs: [searchValue],
    });

    const {
        data: dataMembershipsCount,
        refetch: refetchMembershipsCount,
        isError: isErrorMembershipsCount,
        isLoading: isLoadingMembershipsCount,
    } = NamesRegistryReadHook({
        functionName: 'getCommunityMembershipsCount',
        functionArgs: [searchValue],
    });

    const {
        data: dataIsSuspendedByAdmin,
        refetch: refetchIsSuspendedByAdmin,
        isError: isErrorIsSuspendedByAdmin,
        isLoading: isLoadingIsSuspendedByAdmin,
    } = NamesRegistryReadHook({
        functionName: 'isSuspendedByAdmin',
        functionArgs: [searchValue],
    });

    const {
        data: dataIsCommunityVerified,
        refetch: refetchIsCommunityVerified,
        isError: isErrorIsCommunityVerified,
        isLoading: isLoadingIsCommunityVerified,
    } = NamesRegistryReadHook({
        functionName: 'isCommunityVerified',
        functionArgs: [searchValue],
    });

    useEffect(() => {
        if (
            dataMembershipsCount !== undefined &&
            dataMembershipsCount.toString() !== membershipsCount
        ) {
            setMembershipsCount(dataMembershipsCount.toString());
        } else if (isErrorMembershipsCount) {
            refetchMembershipsCount();
        }
    }, [dataMembershipsCount, isErrorMembershipsCount, membershipsCount]);

    useEffect(() => {
        if (
            dataIsSuspendedByAdmin !== undefined &&
            dataIsSuspendedByAdmin.toString() !== isSuspendedByAdmin.toString()
        ) {
            setIsSuspendedByAdmin(dataIsSuspendedByAdmin.toString());
        } else if (isErrorIsSuspendedByAdmin) {
            refetchIsSuspendedByAdmin();
        }
    }, [dataIsSuspendedByAdmin, isErrorIsSuspendedByAdmin]);

    useEffect(() => {
        if (
            dataIsCommunityVerified !== undefined &&
            dataIsCommunityVerified.toString() !== isCommunityVerified
        ) {
            setIsCommunityVerified(dataIsCommunityVerified.toString());
        } else if (isErrorIsCommunityVerified) {
            refetchIsCommunityVerified();
        }
    }, [dataIsCommunityVerified, isErrorIsCommunityVerified]);

    useEffect(() => {
        if (dataCommunitySearch !== undefined) {
            const [status, validity, buttonsStatus] = checkCommunityAdmin(
                dataCommunitySearch?.toString(),
                address?.toString()
            );
            setFeedBackText(status);
            setInputValidity(validity);
            setButtonsStatus(buttonsStatus);
        }
    }, [dataCommunitySearch, address]);

    return (
        <div className="cmcc2">
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
                <>
                    {['light'].map((variant) => (
                        <Alert key={variant} variant={variant}>
                            <div>
                                <p>
                                    {' '}
                                    Membership cards issued:{' '}
                                    <b>
                                        {' '}
                                        {isLoadingMembershipsCount || isErrorMembershipsCount
                                            ? 'loading...'
                                            : membershipsCount}
                                    </b>{' '}
                                </p>
                                <p>
                                    {' '}
                                    Is community suspended by Admin:{' '}
                                    <b>
                                        {isLoadingIsSuspendedByAdmin || isErrorIsSuspendedByAdmin
                                            ? 'loading...'
                                            : isSuspendedByAdmin}
                                    </b>{' '}
                                </p>
                                <p>
                                    {' '}
                                    Is community verified:{' '}
                                    <b>
                                        {isLoadingIsCommunityVerified || isErrorIsCommunityVerified
                                            ? 'loading...'
                                            : isCommunityVerified}
                                    </b>{' '}
                                </p>
                            </div>
                        </Alert>
                    ))}
                </>
                <ModifyCommunityAdmin
                    currentAdminAddress={dataCommunitySearch?.toString()}
                    buttonsStatus={buttonsStatus}
                    searchValue={searchValue}
                />
                <SuspendUnsuspendCommunity
                    searchValue={searchValue}
                    buttonsStatus={buttonsStatus}
                    isSuspendedByAdmin={isSuspendedByAdmin}
                />
                <ModifyColorScheme searchValue={searchValue} buttonsStatus={buttonsStatus} />
            </Form>
        </div>
    );
}

export default ManageCommunity;
