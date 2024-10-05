import { useReadContract } from 'wagmi';
import { namesRegistryConfig } from './contracts';
import {
    AbiParametersToPrimitiveTypes,
    ExtractAbiFunction,
    ExtractAbiFunctionNames,
} from 'abitype';

type fnNames = ExtractAbiFunctionNames<typeof namesRegistryConfig.abi, 'view' | 'pure'>;

type fnReturnsMap = {
    [I in fnNames]: AbiParametersToPrimitiveTypes<
        ExtractAbiFunction<typeof namesRegistryConfig.abi, I>['outputs'],
        'outputs'
    >;
};

type fnArgsMap = {
    [K in fnNames]: AbiParametersToPrimitiveTypes<
        ExtractAbiFunction<typeof namesRegistryConfig.abi, K>['inputs'],
        'inputs'
    >;
};

type NamesRegistryReadHookInterface<T extends keyof fnArgsMap> = {
    functionName: T;
    functionArgs: fnArgsMap[T] | undefined;
};

export function NamesRegistryReadHook<T extends keyof fnArgsMap>(
    fn: NamesRegistryReadHookInterface<T>
) {
    const { data, refetch, isError, isLoading } = useReadContract({
        ...namesRegistryConfig,
        functionName: fn.functionName as fnNames,
        args: fn.functionArgs,
        //watch: true,
    });
    return {
        data: data as fnReturnsMap[T]['0'] | undefined,
        refetch,
        isError,
        isLoading,
    };
}
