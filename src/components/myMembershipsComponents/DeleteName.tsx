import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { NamesRegistryWriteHook } from '../wagmiHooks/NamesRegistryWriteHook';
import { useNavigate } from 'react-router-dom';
import TxStatusModalReceipt from '../txStatusModalComponents/TxStatusModalReceipt';

interface DeleteNameProps {
    nameAtCommunity: string;
}

const DeleteName: React.FC<DeleteNameProps> = ({ nameAtCommunity }) => {
    const [name, community] = nameAtCommunity.split('@');
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [errorCount, setErrorCount] = useState<number>(0);
    const navigate = useNavigate();

    const {
        write: writeDelete,
        receipt: receiptDelete,
        isPending: isPendingDelete,
        isSuccess: isSuccessDelete,
        isWriteError: isWriteErrorDelete,
        writeError: writeErrorDelete,
        isLoading: isLoadingDelete,
        isTxError: isTxErrorDelete,
        txError: txErrorDelete,
        txRefetch: txRefetchDelete,
    } = NamesRegistryWriteHook({
        functionName: 'deleteName',
        functionArgs: [name, community],
        txValue: BigInt('0'),
    });

    const handleDeleteClick = () => {
        writeDelete?.(); // Trigger the contract write operation
        setDeleteClicked(true);
        setShowModalDelete(true);
    };

    useEffect(() => {
        if (isTxErrorDelete && errorCount <= 5) {
            console.log('error #', { errorCount });
            const timer = setTimeout(() => {
                txRefetchDelete();
                setErrorCount(errorCount + 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
        if (isPendingDelete || isSuccessDelete) {
            setErrorCount(0);
        }
    }, [isTxErrorDelete, isPendingDelete, isSuccessDelete]);

    // Function to close the modal
    const closeModalDelete = () => {
        setShowModalDelete(false);
        setDeleteClicked(false);
        navigate('/');
    };

    return (
        <div>
            <Button id="noscale" variant="danger" type="button" onClick={handleDeleteClick}>
                Delete
            </Button>

            {deleteClicked && (
                <TxStatusModalReceipt
                    show={showModalDelete}
                    onClose={closeModalDelete}
                    isPending={isPendingDelete}
                    isTxError={isTxErrorDelete}
                    errorCount={errorCount}
                    txError={txErrorDelete ? txErrorDelete : undefined}
                    isWriteError={isWriteErrorDelete}
                    writeError={writeErrorDelete ? writeErrorDelete : undefined}
                    isLoading={isLoadingDelete}
                    isSuccess={isSuccessDelete}
                    receipt={receiptDelete ? receiptDelete : undefined}
                />
            )}
        </div>
    );
};

export default DeleteName;
