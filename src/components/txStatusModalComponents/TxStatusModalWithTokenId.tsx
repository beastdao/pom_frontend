import React from 'react';
import TxStatusModalBasic,{ModalContentProps} from './TxStatusModalBasic';
import AddTokenToWallet from '../connectKit/AddTokenToWallet';
import {TransactionReceipt} from 'viem';


interface TxStatusModalWithTokenProps extends ModalContentProps {
  isSuccess: boolean;
  receipt: TransactionReceipt | undefined;
  tokenId: string | undefined ;
}

const TxStatusModalWithTokenId: React.FC<TxStatusModalWithTokenProps> = ({
  isSuccess,
  receipt,
  tokenId,
  ...props
}) => {
  return (
    <TxStatusModalBasic {...props}>
      {isSuccess && receipt && tokenId ? (
        <div className="mt">
            <p> Success! </p>
            <p> <b>Token ID:</b> {tokenId} </p>
            <a href={`https://sepolia.etherscan.io/tx/${receipt.transactionHash}`} target="_blank">View transaction on <b>Etherscan</b></a>
            <AddTokenToWallet tokenIdValue = {tokenId} />
        </div>
      ) : null}
    </TxStatusModalBasic>
  );
}

export default TxStatusModalWithTokenId;
