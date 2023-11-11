import { useContractRead } from 'wagmi';
import { svgRendererConfig } from './contracts';

export function RenderSVG(nameAtCommunity:string,memberSince:string,role:string) {
  const baseUrl = "https://bafkreic6mbntsmvejijwl2egn3zuo35ej7ydwjupba57w6qukl4qmgam24.ipfs.nftstorage.link/";
  const {data,refetch, isError, isLoading} = useContractRead({
    ...svgRendererConfig,
    address: "0xAad7Ab8B0F9E06Bb62A0D25e792E6B58614FF709",
    functionName: 'RenderSVGDummy',
    args: [nameAtCommunity,memberSince,role,baseUrl],
    //watch: true,
  });


  return {
    data,
    refetch,
    isError,
    isLoading,
  };
}
