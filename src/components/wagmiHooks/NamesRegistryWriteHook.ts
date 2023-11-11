import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { namesRegistryConfig } from './contracts';

interface NamesRegistryWriteHookInterface {
  functionName: string,
  functionArgs: string[],
  txValue: bigint,
}

export function NamesRegistryWriteHook(fn: NamesRegistryWriteHookInterface) {
  const { write, data, error: writeError, isLoading, isError: isWriteError } = useContractWrite({
    ...namesRegistryConfig,
    address: '0x6Dd57e9899784571065867dCe8eC2d7454b650c4',
    functionName: fn.functionName,
    args: fn.functionArgs,
    value: fn.txValue,
  });

  const { data: receipt, isLoading: isPending, isSuccess, isError: isTxError, error: txError, refetch: txRefetch } = useWaitForTransaction({
    confirmations: 1,
    hash: data?.hash,
  });

  return {
    write,
    receipt,
    isPending,
    isSuccess,
    isWriteError,
    isTxError,
    txError,
    writeError,
    isLoading,
    txRefetch,
  };
}
