import { keccak256, ethers } from 'ethers';

export const calculateTokenId = (
    nameValue: string | undefined,
    communityValue: string | undefined
): string | undefined => {
    if (nameValue && communityValue) {
        const buffer = Buffer.from(nameValue + communityValue, 'utf8');
        const hashValue = keccak256(new Uint8Array(buffer));
        const tokenId_ = ethers.getBigInt(hashValue).toString();
        return tokenId_;
    } else {
        return undefined;
    }
};
