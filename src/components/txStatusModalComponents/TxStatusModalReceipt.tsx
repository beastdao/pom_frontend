import React from 'react';
import TxStatusModalBasic,{ModalContentProps} from './TxStatusModalBasic';
import {TransactionReceipt} from 'viem';


interface TxStatusModalReceiptProps extends ModalContentProps {
  isSuccess: boolean;
  receipt: TransactionReceipt | undefined;
}

const TxStatusModalReceipt: React.FC<TxStatusModalReceiptProps> = ({
  isSuccess,
  receipt,
  ...props
}) => {
  return (
    <TxStatusModalBasic {...props}>
      {isSuccess && receipt ? (
        <div className="mt">
          <p>Success!</p>
          <a href={`https://sepolia.etherscan.io/tx/${receipt.transactionHash}`} target="_blank">View transaction on <b>Etherscan</b></a>
        </div>
      ) : null}
    </TxStatusModalBasic>
  );
}

export default TxStatusModalReceipt;
