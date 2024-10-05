import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { namesRegistryConfig } from './contracts';
import {
    AbiParametersToPrimitiveTypes,
    ExtractAbiFunction,
    ExtractAbiFunctionNames,
} from 'abitype';

type fnNames = ExtractAbiFunctionNames<typeof namesRegistryConfig.abi, 'nonpayable'>;

type fnArgsMap = {
    [K in fnNames]: AbiParametersToPrimitiveTypes<
        ExtractAbiFunction<typeof namesRegistryConfig.abi, K>['inputs'],
        'inputs'
    >;
};
type NamesRegistryWriteHookInterface<T extends keyof fnArgsMap> = {
    functionName: T;
    functionArgs: fnArgsMap[T] | undefined;
    txValue: bigint;
};

export function NamesRegistryWriteHook<T extends keyof fnArgsMap>(
    fn: NamesRegistryWriteHookInterface<T>
) {
    const {
        writeContract,
        data,
        error: writeError,
        isPending,
        isError: isWriteError,
    } = useWriteContract();
    const write = () =>
        writeContract({
            ...namesRegistryConfig,
            functionName: fn.functionName as fnNames,
            args: Object(fn.functionArgs),
            value: fn.txValue,
        });

    const {
        data: receipt,
        isLoading,
        isSuccess,
        isError: isTxError,
        error: txError,
        refetch: txRefetch,
    } = useWaitForTransactionReceipt({
        confirmations: 1,
        hash: data,
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
