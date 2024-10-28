import axios from 'axios';

export type GasData = {
    max_fee_per_gas: number;
    min: number;
    max: number;
};
export type FetchGasPriceResult = {
    success: boolean;
    data?: GasData;
    error?: string;
};

export const fetchGasPrice = async (gasEstimates: string): Promise<FetchGasPriceResult> => {
    if (import.meta.env.VITE_APP_ENV === 'mainnet') {
        try {
            const url = `${import.meta.env.VITE_APP_BACKEND_URL}/estnetworkfeeusd?gas_limit=${gasEstimates}`;
            const response = await axios.get<FetchGasPriceResult>(url);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch gas price', error);
            return { success: false, error: 'Failed to fetch gas price.' }; //error status
        }
    } else {
        const sepolia_values: GasData = { max_fee_per_gas: 0, min: 0, max: 0 };
        return { success: true, data: sepolia_values, error: undefined };
    }
};
