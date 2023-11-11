import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { NamesRegistryWriteHook } from '../wagmiHooks/NamesRegistryWriteHook';
import { useNavigate } from 'react-router-dom';

function SuspendUnsuspendCommunity({ searchValue, buttonsStatus, isSuspendedByAdmin}:{searchValue:string, buttonsStatus:string, isSuspendedByAdmin:string}) {

  const [showModalSuspend, setShowModalSuspend] = useState(false);
  const [isSuspendButtonClicked, setIsSuspendButtonClicked] = useState(false);
  const [showModalUnSuspend, setShowModalUnSuspend] = useState(false);
  const [isUnSuspendButtonClicked, setIsUnSuspendButtonClicked] = useState(false);
  const [errorCount, setErrorCount] = useState<number>(0);
  const navigate = useNavigate();


  const {
    write: writeSuspendCommunity,
    receipt: receiptSuspendCommunity,
    isPending: isPendingSuspendCommunity,
    isSuccess: isSuccessSuspendCommunity,
    isWriteError: isWriteErrorSuspendCommunity,
    isTxError: isTxErrorSuspendCommunity,
    writeError: writeErrorSuspendCommunity,
    txError: txErrorSuspendCommunity,
    isLoading: isLoadingSuspendCommunity,
    txRefetch: txRefetchSuspendCommunity,
  } = NamesRegistryWriteHook({functionName:'suspendCommunityByAdmin',functionArgs:[searchValue],txValue:BigInt("0")});


  const {
    write: writeUnSuspendCommunity,
    receipt: receiptUnSuspendCommunity,
    isPending: isPendingUnSuspendCommunity,
    isSuccess: isSuccessUnSuspendCommunity,
    isWriteError: isWriteErrorUnSuspendCommunity,
    isTxError: isTxErrorUnSuspendCommunity,
    writeError: writeErrorUnSuspendCommunity,
    txError: txErrorUnSuspendCommunity,
    isLoading: isLoadingUnSuspendCommunity,
    txRefetch: txRefetchUnSuspendCommunity,
  } = NamesRegistryWriteHook({functionName:'unSuspendCommunityByAdmin',functionArgs:[searchValue],txValue:BigInt("0")});


  //refetching suspend
    useEffect(() => {
      if (isTxErrorSuspendCommunity && errorCount<=5) {
        const timer = setTimeout(() => {
          txRefetchSuspendCommunity();
          setErrorCount(errorCount+1);
        }, 2000);
        return () => clearTimeout(timer);
      }
      if (isPendingSuspendCommunity || isSuccessSuspendCommunity) {
        setErrorCount(0);
      }
    }, [isTxErrorSuspendCommunity, isPendingSuspendCommunity, isSuccessSuspendCommunity]);

    //refetching unSuspend
      useEffect(() => {
        if (isTxErrorUnSuspendCommunity && errorCount<=5) {
          const timer = setTimeout(() => {
            txRefetchUnSuspendCommunity();
            setErrorCount(errorCount+1);
          }, 2000);
          return () => clearTimeout(timer);
        }
        if (isPendingUnSuspendCommunity || isSuccessUnSuspendCommunity) {
          setErrorCount(0);
        }
      }, [isTxErrorUnSuspendCommunity, isPendingUnSuspendCommunity, isSuccessUnSuspendCommunity]);





  const buttonStatusSuspend = () => {
    if( buttonsStatus === 'enabled' && isSuspendedByAdmin==="false") {
      return 'enabled';
    }else{
      return 'disabled';
    }
  }

  const buttonStatusUnSuspend = () => {
    if( buttonsStatus === 'enabled' && isSuspendedByAdmin==="true"){
      return 'enabled';
    }else{
      return 'disabled';
    }
  }


  const handleSuspendCommunityClick =  () => {
        writeSuspendCommunity?.(); // Trigger the contract write operation
        setIsSuspendButtonClicked(true);
        setShowModalSuspend(true);
  };


  const handleUnSuspendCommunityClick =  () => {
        writeUnSuspendCommunity?.(); // Trigger the contract write operation
        setIsUnSuspendButtonClicked(true);
        setShowModalUnSuspend(true);
  };




  // Function to close the modal
  const closeModalSuspend = () => {
    setShowModalSuspend(false);
    setIsSuspendButtonClicked(false);
    navigate('');
  };



  // Function to close the modal
  const closeModalUnSuspend = () => {
    setShowModalUnSuspend(false);
    setIsUnSuspendButtonClicked(false);
    navigate('');
  };

  return (
    <div className="cmcce3">
    <Button id="noscale"
      variant="danger"
      type="button"
      disabled={buttonStatusSuspend() === 'disabled'}
      onClick={handleSuspendCommunityClick}
    >
      Suspend Community as Admin
    </Button>

      {isSuspendButtonClicked && (
        <>
      <div className="modal-overlay">
        <Modal show={showModalSuspend} animation={false}>
          <Modal.Header closeButton onClick={closeModalSuspend}>
            <Modal.Title>Transaction Status</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          {isPendingSuspendCommunity ? (
            <>
              <p>Waiting for transaction confirmation. Pending...</p>
              <Spinner animation="border" variant="secondary" />
            </>
          ) : isTxErrorSuspendCommunity && errorCount<=5 ? (
                <>
                <p>RPC Node connection is unstable. Attempt to connect {errorCount} Please wait...</p>
                <Spinner animation="border" variant="secondary" />
                </>
              ) : errorCount==6 ? (
            <p><b>Error:</b> {txErrorSuspendCommunity && 'details' in txErrorSuspendCommunity && typeof txErrorSuspendCommunity.details === 'string' ? txErrorSuspendCommunity.details : 'An error occurred.'}</p>
          ) : isWriteErrorSuspendCommunity ? (
            <p><b>Error:</b> {writeErrorSuspendCommunity && 'details' in writeErrorSuspendCommunity && typeof writeErrorSuspendCommunity.details === 'string' ? writeErrorSuspendCommunity.details : 'An error occurred.'}</p>
          ): isSuccessSuspendCommunity && receiptSuspendCommunity ? (
            <div className="mt">
              <p> Success! </p>
              <a href={`https://sepolia.etherscan.io/tx/${receiptSuspendCommunity.transactionHash}`} target="_blank">View transaction on <b>Etherscan</b></a>
            </div>
          ) : (
            <Spinner animation="border" variant="secondary" />
          )}
          </Modal.Body>
        </Modal>
      </div>
      </>
    )}
    <Button id="noscale"
      variant="danger"
      type="button"
      disabled={buttonStatusUnSuspend() === 'disabled'}
      onClick={handleUnSuspendCommunityClick}
    >
      Unsuspend Community as Admin
    </Button>

    {isUnSuspendButtonClicked && (
      <>
    <div className="modal-overlay">
      <Modal show={showModalUnSuspend} animation={false}>
        <Modal.Header closeButton onClick={closeModalUnSuspend}>
          <Modal.Title>Transaction Status</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        {isPendingUnSuspendCommunity ? (
          <>
            <p>Waiting for transaction confirmation. Pending...</p>
            <Spinner animation="border" variant="secondary" />
          </>
        ) : isTxErrorUnSuspendCommunity && errorCount<=5 ? (
              <>
              <p>RPC Node connection is unstable. Attempt to connect {errorCount} Please wait...</p>
              <Spinner animation="border" variant="secondary" />
              </>
            ) : errorCount==6 ? (
          <p><b>Error:</b> {txErrorUnSuspendCommunity && 'details' in txErrorUnSuspendCommunity && typeof txErrorUnSuspendCommunity.details === 'string' ? txErrorUnSuspendCommunity.details : 'An error occurred.'}</p>
        ) : isWriteErrorUnSuspendCommunity ? (
          <p><b>Error:</b> {writeErrorUnSuspendCommunity && 'details' in writeErrorUnSuspendCommunity && typeof writeErrorUnSuspendCommunity.details === 'string' ? writeErrorUnSuspendCommunity.details : 'An error occurred.'}</p>
        ): isSuccessUnSuspendCommunity && receiptUnSuspendCommunity ? (
          <div className="mt">
            <p> Success! </p>
            <a href={`https://sepolia.etherscan.io/tx/${receiptUnSuspendCommunity.transactionHash}`} target="_blank">View transaction on <b>Etherscan</b></a>
          </div>
        ) : (
          <Spinner animation="border" variant="secondary" />
        )}
        </Modal.Body>
      </Modal>
    </div>
    </>
  )}
    </div>
  );
}

export default SuspendUnsuspendCommunity;
