import { namesRegistryConfig } from './contracts';
import {
    AbiParametersToPrimitiveTypes,
    ExtractAbiFunction,
    ExtractAbiFunctionNames,
} from 'abitype';
import { useEstimateGas } from 'wagmi';
import { encodeFunctionData } from 'viem';

type fnArgs = AbiParametersToPrimitiveTypes<
    ExtractAbiFunction<typeof namesRegistryConfig.abi, 'registerName'>['inputs'],
    'inputs'
>;
type fnNames = ExtractAbiFunctionNames<typeof namesRegistryConfig.abi, 'nonpayable'>;

export function useEstimateGasFnCall(fnName: fnNames, inputs: fnArgs) {
    const registerNameData = encodeFunctionData({
        abi: namesRegistryConfig.abi,
        functionName: fnName,
        args: inputs,
    });

    // Estimate the gas usage for the transaction
    const { data: gasEstimate } = useEstimateGas({
        to: namesRegistryConfig.address,
        data: registerNameData,
    });
    return gasEstimate;
}
