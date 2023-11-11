import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { NamesRegistryWriteHook } from '../wagmiHooks/NamesRegistryWriteHook';
import { useNavigate } from 'react-router-dom';

interface DeleteNameProps {
  nameAtCommunity: string;
}

const DeleteName: React.FC<DeleteNameProps> = ({nameAtCommunity}) => {

  const [name,community] = nameAtCommunity.split('@');
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
  } = NamesRegistryWriteHook({functionName:'deleteName',functionArgs:[name,community],txValue:BigInt("0")});


  const handleDeleteClick =  () => {
        writeDelete?.(); // Trigger the contract write operation
        setDeleteClicked(true);
        setShowModalDelete(true);
  };

  useEffect(() => {
    if (isTxErrorDelete && errorCount<=5) {
      const timer = setTimeout(() => {
        txRefetchDelete();
        setErrorCount(errorCount+1);
      }, 5000);
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
    <Button id="noscale"
      variant="danger"
      type="button"
      onClick={handleDeleteClick}
    >
      Delete
    </Button>

      {deleteClicked && (
        <>
      <div className="modal-overlay">
        <Modal show={showModalDelete} animation={false}>
          <Modal.Header closeButton onClick={closeModalDelete}>
            <Modal.Title>Transaction Status</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {isPendingDelete ? (
              <>
                <p>Waiting for transaction confirmation. Pending...</p>
                <Spinner animation="border" variant="secondary" />
              </>
            ) : isTxErrorDelete && errorCount<=5 ? (
                  <>
                  <p>RPC Node connection is unstable. Attempt to connect {errorCount} Please wait...</p>
                  <Spinner animation="border" variant="secondary" />
                  </>
                ) : errorCount==6 ? (
              <p><b>Error:</b> {txErrorDelete && 'details' in txErrorDelete && typeof txErrorDelete.details === 'string' ? txErrorDelete.details : 'An error occurred.'}</p>
            ) : isWriteErrorDelete ? (
              <p><b>Error:</b> {writeErrorDelete && 'details' in writeErrorDelete && typeof writeErrorDelete.details === 'string' ? writeErrorDelete.details : 'An error occurred.'}</p>
            ):
              isSuccessDelete && receiptDelete ? (
                <div className="mt">
                  <p>Success!</p>
                  <a href={`https://sepolia.etherscan.io/tx/${receiptDelete.transactionHash}`} target="_blank">View transaction on <b>Etherscan</b></a>
                </div>
              ) : (
                <Spinner animation="border" variant="secondary" />
              )
            }
          </Modal.Body>
        </Modal>
      </div>
      </>
    )}

    </div>
  );
}

export default DeleteName;
