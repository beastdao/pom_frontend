import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { NamesRegistryWriteHook } from '../wagmiHooks/NamesRegistryWriteHook';
import { useNavigate } from 'react-router-dom';
import TxStatusModalBasic from '../txStatusModalComponents/TxStatusModalBasic';

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

        <TxStatusModalBasic
        show = {showModalSuspend}
        onClose ={closeModalSuspend}
        isPending = {isPendingSuspendCommunity}
        isTxError = {isTxErrorSuspendCommunity}
        errorCount = {errorCount}
        txError= {txErrorSuspendCommunity ? txErrorSuspendCommunity : undefined}
        isWriteError ={isWriteErrorSuspendCommunity}
        writeError = {writeErrorSuspendCommunity ? writeErrorSuspendCommunity : undefined}
        isSuccess = {isSuccessSuspendCommunity}
        receipt = {receiptSuspendCommunity ? receiptSuspendCommunity : undefined}
        />

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

      <TxStatusModalBasic
      show = {showModalUnSuspend}
      onClose ={closeModalUnSuspend}
      isPending = {isPendingUnSuspendCommunity}
      isTxError = {isTxErrorUnSuspendCommunity}
      errorCount = {errorCount}
      txError= {txErrorUnSuspendCommunity ? txErrorUnSuspendCommunity : undefined}
      isWriteError ={isWriteErrorUnSuspendCommunity}
      writeError = {writeErrorUnSuspendCommunity ? writeErrorUnSuspendCommunity : undefined}
      isSuccess = {isSuccessUnSuspendCommunity}
      receipt = {receiptUnSuspendCommunity ? receiptUnSuspendCommunity : undefined}
      />

  )}
    </div>
  );
}

export default SuspendUnsuspendCommunity;
