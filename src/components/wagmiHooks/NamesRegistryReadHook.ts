import { useContractRead } from 'wagmi';
import { namesRegistryConfig } from './contracts';


interface NamesRegistryReadHookInterface {
  functionName: string,
  functionArgs: string[],
}


export function NamesRegistryReadHook(fn: NamesRegistryReadHookInterface) {
  const { data, refetch, isError, isLoading } = useContractRead({
    ...namesRegistryConfig,
    address: '0xF357fEb9B33Dc568aDc9d5382Ba69FD198832079',
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
