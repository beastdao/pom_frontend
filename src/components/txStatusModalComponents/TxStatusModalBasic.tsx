import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import {TransactionReceipt} from 'viem';

//modified useWaitForTransaction return https://wagmi.sh/react/hooks/useWaitForTransaction

interface ModalContentProps {
  show: boolean;
  onClose: () => void;
  isPending: boolean;
  isTxError: boolean;
  errorCount: number;
  txError: Error | undefined;
  isWriteError: boolean;
  writeError: Error | undefined;
  isSuccess: boolean;
  receipt: TransactionReceipt | undefined;
}

const TxStatusModalBasic: React.FC<ModalContentProps> = ({
  show,
  onClose,
  isPending,
  isTxError,
  errorCount,
  txError,
  isWriteError,
  writeError,
  isSuccess,
  receipt,
}) => {
  return(
  <div className="modal-overlay">
        <Modal show={show} animation={false}>
          <Modal.Header closeButton onClick={onClose}>
            <Modal.Title>Transaction Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isPending ? (
              <>
                <p>Waiting for transaction confirmation. Pending...</p>
                <Spinner animation="border" variant="secondary" />
              </>
            ) : isTxError && errorCount<=5 ? (
                  <>
                  <p>RPC Node connection is unstable. Attempt to connect {errorCount} Please wait...</p>
                  <Spinner animation="border" variant="secondary" />
                  </>
                ) : errorCount==6 ? (
              <p><b>Error:</b> {txError && 'details' in txError && typeof txError.details === 'string' ? txError.details : 'An error occurred.'}</p>
            ) : isWriteError ? (
              <p><b>Error:</b> {writeError && 'details' in writeError && typeof writeError.details === 'string' ? writeError.details : 'An error occurred.'}</p>
            ):
              isSuccess && receipt ? (
                <div className="mt">
                  <p>Success!</p>
                  <a href={`https://sepolia.etherscan.io/tx/${receipt.transactionHash}`} target="_blank">View transaction on <b>Etherscan</b></a>
                </div>
              ) : (
                <Spinner animation="border" variant="secondary" />
              )
            }
          </Modal.Body>
        </Modal>
      </div>
)
    }


export default TxStatusModalBasic;
