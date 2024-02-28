import { useContractRead } from 'wagmi';
import { namesRegistryConfig } from './contracts';


interface NamesRegistryReadHookInterface {
  functionName: string,
  functionArgs: string[],
}


export function NamesRegistryReadHook(fn: NamesRegistryReadHookInterface) {
  const { data, refetch, isError, isLoading } = useContractRead({
    ...namesRegistryConfig,
    address: '0xe4599af01a9079392900A688E85F0d5E406B3106',
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
