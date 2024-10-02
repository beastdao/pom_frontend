import { currentContractAddresses } from './contractsAddresses';
import { namesRegistryAbi, svgRendererAbi, pomAbi, cardIndexAbi } from './abis';

export const namesRegistryConfig: {
    address: `0x${string}`;
    abi: Array<any>;
} = {
    address: currentContractAddresses.namesRegistry,
    abi: namesRegistryAbi,
};

export const svgRendererConfig: {
    address: `0x${string}`;
    abi: typeof svgRendererAbi;
} = {
    address: currentContractAddresses.svgRenderer,
    abi: svgRendererAbi,
};

export const pomTokenConfig: {
    address: `0x${string}`;
    abi: typeof pomAbi;
} = {
    address: currentContractAddresses.pomToken,
    abi: pomAbi,
};

export const storageConfig: {
    address: `0x${string}`;
    abi: typeof cardIndexAbi;
} = {
    address: currentContractAddresses.storage,
    abi: cardIndexAbi,
};
