import { useContractRead } from 'wagmi';
import { namesRegistryConfig } from './contracts';


interface NamesRegistryReadHookInterface {
  functionName: string,
  functionArgs: string[],
}

export function NamesRegistryReadHook(fn: NamesRegistryReadHookInterface) {
  const { data, refetch, isError, isLoading } = useContractRead({
    ...namesRegistryConfig,
    functionName: fn.functionName,
    args: fn.functionArgs,
    //watch: true,
  });

  return {
    data,
    refetch,
    isError,
    isLoading,
  };
}
