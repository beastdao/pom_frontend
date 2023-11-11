import { keccak256 } from 'viem';
import {ethers} from 'ethers';

export const calculateTokenId = (nameValue:string|undefined,  communityValue:string|undefined) :string | undefined=> {
if(nameValue && communityValue){
  const buffer = Buffer.from(nameValue + communityValue, 'utf8');
  const hashValue = keccak256(buffer);
  const tokenId_ = ethers.getBigInt(hashValue).toString();
  return tokenId_;
}else{
  return undefined;
}
};
