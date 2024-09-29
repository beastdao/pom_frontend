// not used since there is simplier option to get tokenid

import { useState } from 'react';
import { namesRegistryConfig } from './contracts';
import { useWatchContractEvent } from 'wagmi';

export function WatchNameRegisterEvent(txHash: string | undefined) {
    const [log, setLog] = useState<string | null>(null);

    useWatchContractEvent({
        ...namesRegistryConfig,
        eventName: 'nameRegistred',
        onLogs: (logs) => {
            if ((logs as any).transactionHash === txHash) {
                setLog((logs[0] as any).args._tokenId.toString());
            }
        },
    });
    return {
        log,
    };
}
