import { useReadContract } from 'wagmi';
import { namesRegistryConfig } from './contracts';
import { AbiParametersToPrimitiveTypes, ExtractAbiFunction } from 'abitype';

type fnArgs = AbiParametersToPrimitiveTypes<
    ExtractAbiFunction<typeof namesRegistryConfig.abi, 'isCommunityVerified'>['inputs'],
    'inputs'
>;

// Adjusting the type to accept an array of fnArgs
export function mMembersCount(inputs: fnArgs[]) {
    const results = inputs.map((input) => {
        const { data, refetch, isError, isLoading } = useReadContract({
            ...namesRegistryConfig,
            functionName: 'getCommunityMembershipsCount',
            args: [...input],
            // watch: true, // Uncomment if you need to watch for changes
        });

        return { data, refetch, isError, isLoading };
    });

    // Return the array of results
    return results;
}
