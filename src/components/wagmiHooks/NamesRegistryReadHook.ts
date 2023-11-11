import { useContractRead } from 'wagmi';
import { namesRegistryConfig } from './contracts';


interface NamesRegistryReadHookInterface {
  functionName: string,
  functionArgs: string[],
}


export function NamesRegistryReadHook(fn:NamesRegistryReadHookInterface) {
  const {data,refetch, isError, isLoading} = useContractRead({
    ...namesRegistryConfig,
    address: '0x6Dd57e9899784571065867dCe8eC2d7454b650c4',
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
