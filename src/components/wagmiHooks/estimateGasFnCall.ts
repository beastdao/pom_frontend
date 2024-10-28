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

export function useEstimateGasFnCall(fnName: fnNames, inputs: fnArgs, account?: `0x${string}`) {
    const account_to_use: `0x${string}` = account
        ? account
        : '0xF322bce760aDf38a64953447c8bf401bFDa84a05'; // random empty address if user not connected wallet
    const registerNameData = encodeFunctionData({
        abi: namesRegistryConfig.abi,
        functionName: fnName,
        args: inputs,
    });

    // Estimate the gas usage for the transaction
    const { data: gasEstimate } = useEstimateGas({
        account: account_to_use,
        to: namesRegistryConfig.address,
        data: registerNameData,
    });
    return gasEstimate;
}
