import React from 'react';
import TxStatusModalBasic, { ModalContentProps } from './TxStatusModalBasic';
import { TransactionReceipt } from 'viem';

interface TxStatusModalReceiptProps extends ModalContentProps {
    isSuccess: boolean;
    receipt: TransactionReceipt | undefined;
}

const TxStatusModalReceipt: React.FC<TxStatusModalReceiptProps> = ({
    isSuccess,
    receipt,
    ...props
}) => {
    const network = import.meta.env.VITE_APP_ENV;
    const etherscanBaseUrl =
        network === 'mainnet'
            ? 'https://etherscan.io'
            : network === 'sepolia'
              ? `https://sepolia.etherscan.io`
              : `https://sepolia.etherscan.io`;
    return (
        <TxStatusModalBasic {...props}>
            {isSuccess && receipt ? (
                <div className="mt">
                    <p>Success!</p>
                    <a
                        href={`${etherscanBaseUrl}/tx/${receipt.transactionHash}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        View transaction on <b>Etherscan</b>
                    </a>
                </div>
            ) : null}
        </TxStatusModalBasic>
    );
};

export default TxStatusModalReceipt;
