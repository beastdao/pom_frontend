import { useContractRead } from 'wagmi';
import { pomTokenConfig } from './contracts';
import { keccak256 } from 'viem';
import { ethers } from 'ethers';


export function GetTokenJsonData(nameAtCommunity: string) {
  let [nameValue, communityValue] = nameAtCommunity.split("@");
  const buffer = Buffer.from(nameValue + communityValue, 'utf8');
  const hashValue = keccak256(buffer);
  const tokenId_ = ethers.getBigInt(hashValue).toString();


  const { data, refetch, isError, isLoading, error } = useContractRead({
    ...pomTokenConfig,
    address: '0xF318d982B8E55F9fa238b1392e0B8Ec3197D7080',
    functionName: 'tokenURI',
    args: [tokenId_],
    //watch: true,
  });

  return {
    data,
    refetch,
    isError,
    isLoading,
    error,
  };
}
