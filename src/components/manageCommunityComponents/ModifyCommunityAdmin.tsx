import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NamesRegistryWriteHook } from '../wagmiHooks/NamesRegistryWriteHook';
import { useNavigate } from 'react-router-dom';
import TxStatusModalBasic from '../txStatusModalComponents/TxStatusModalBasic';


const NULLADDR = "0x0000000000000000000000000000000000000000";


function ModifyCommunityAdmin({ searchValue, currentAdminAddress, buttonsStatus}:{searchValue:string,currentAdminAddress:string|undefined,buttonsStatus:string}) {
  const [newAdminAddress, setNewAdminAddress] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [errorCount, setErrorCount] = useState<number>(0);
  const navigate = useNavigate();

  const {
    write: writeModifyAdmin,
    receipt: receiptModifyAdmin,
    isPending: isPendingModifyAdmin,
    isSuccess: isSuccessModifyAdmin,
    isWriteError: isWriteErrorModifyAdmin,
    isTxError: isTxErrorModifyAdmin,
    writeError: writeErrorModifyAdmin,
    txError: txErrorModifyAdmin,
    isLoading: isLoadingModifyAdmin,
    txRefetch: txRefetchModifyAdmin,
  } = NamesRegistryWriteHook({functionName:'modifyCommunityAdmin',functionArgs:[searchValue, newAdminAddress],txValue:BigInt("0")});

  //refetching
    useEffect(() => {
      if (isTxErrorModifyAdmin && errorCount<=5) {
        const timer = setTimeout(() => {
          txRefetchModifyAdmin();
          setErrorCount(errorCount+1);
        }, 2000);
        return () => clearTimeout(timer);
      }
      if (isPendingModifyAdmin || isSuccessModifyAdmin) {
        setErrorCount(0);
      }
    }, [isTxErrorModifyAdmin, isPendingModifyAdmin, isSuccessModifyAdmin]);

  const handleAdminAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAdminAddress(event.target.value);
  };

  const isAddressValid = () => {
    return (newAdminAddress.trim() !== '' && newAdminAddress.trim() !== NULLADDR && newAdminAddress.trim()!==currentAdminAddress &&newAdminAddress.trim().length === 42);
  };

  const buttonStatus = () => {
    if(isAddressValid() && buttonsStatus === 'enabled'){
      return 'enabled';
    }else{
      return 'disabled';
    }
  }

  const handleModifyAdminClick =  () => {
    if (isAddressValid()) {
      writeModifyAdmin?.();
      setIsButtonClicked(true);
      setShowModal(true);
    }
  };


  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setIsButtonClicked(false);
    navigate('');
  };


  return (
    <div className="cmcce2">
      <Form.Group className="mb-3 fw" controlId="formAdminAddress">
        <Form.Label>Community Admin Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Ethereum Address"
          isInvalid={!isAddressValid()}
          onChange={handleAdminAddressChange}
        />
        <Form.Control.Feedback type="invalid">
          Not a valid Ethereum address or same as current admin address!
        </Form.Control.Feedback>
      </Form.Group>
      <Button id="noscale"
        variant="warning"
        type="button"
        disabled={buttonStatus() === 'disabled'}
        onClick={handleModifyAdminClick}
      >
        Modify Admin
      </Button>

      {isButtonClicked && (

        <TxStatusModalBasic
        show = {showModal}
        onClose ={closeModal}
        isPending = {isPendingModifyAdmin}
        isTxError = {isTxErrorModifyAdmin}
        errorCount = {errorCount}
        txError= {txErrorModifyAdmin ? txErrorModifyAdmin : undefined}
        isWriteError ={isWriteErrorModifyAdmin}
        writeError = {writeErrorModifyAdmin ? writeErrorModifyAdmin : undefined}
        isSuccess = {isSuccessModifyAdmin}
        receipt = {receiptModifyAdmin ? receiptModifyAdmin : undefined}
        />

    )}
    </div>
  );
}

export default ModifyCommunityAdmin;
