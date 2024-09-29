import React from 'react';
import TxStatusModalBasic, { ModalContentProps } from './TxStatusModalBasic';
import AddTokenToWallet from '../connectKit/AddTokenToWallet';
import { TransactionReceipt } from 'viem';

interface TxStatusModalWithTokenIdProps extends ModalContentProps {
    isSuccess: boolean;
    receipt: TransactionReceipt | undefined;
    tokenId: string | undefined;
}

const TxStatusModalWithTokenId: React.FC<TxStatusModalWithTokenIdProps> = ({
    isSuccess,
    receipt,
    tokenId,
    ...props
}) => {
    const network = process.env.REACT_APP_ENV;
    const etherscanBaseUrl =
        network === 'mainnet'
            ? 'https://etherscan.io'
            : network === 'sepolia'
              ? `https://sepolia.etherscan.io`
              : `https://sepolia.etherscan.io`;
    return (
        <TxStatusModalBasic {...props}>
            {isSuccess && receipt && tokenId ? (
                <div className="mt">
                    <p> Success! </p>
                    <p>
                        {' '}
                        <b>Token ID:</b> {tokenId}{' '}
                    </p>
                    <a href={`${etherscanBaseUrl}/tx/${receipt.transactionHash}`} target="_blank">
                        View transaction on <b>Etherscan</b>
                    </a>
                    <AddTokenToWallet tokenIdValue={tokenId} />
                </div>
            ) : null}
        </TxStatusModalBasic>
    );
};

export default TxStatusModalWithTokenId;
