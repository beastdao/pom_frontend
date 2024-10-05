import { useReadContract } from 'wagmi';
import { storageConfig } from './contracts';
import {
    AbiParametersToPrimitiveTypes,
    ExtractAbiFunction,
    ExtractAbiFunctionNames,
} from 'abitype';

type fnNames = ExtractAbiFunctionNames<typeof storageConfig.abi, 'view' | 'pure'>;
type fnReturns = AbiParametersToPrimitiveTypes<
    ExtractAbiFunction<typeof storageConfig.abi, fnNames>['outputs'],
    'outputs'
>['0'];

export function useGetMembershipData(tokenId: bigint) {
    const { data, refetch, isError, isLoading } = useReadContract({
        ...storageConfig,
        functionName: 'getMembershipData',
        args: [tokenId],
        // watch: true,
    });

    const membershipData: fnReturns | null = data ?? null;

    return {
        membershipData,
        refetch,
        isError,
        isLoading,
    };
}
