// not used since there is simplier option to get tokenid


import { useState } from 'react';
import { namesRegistryConfig } from './contracts';
import { useContractEvent } from 'wagmi';

export function WatchNameRegisterEvent(txHash: string | undefined) {
  const [log, setLog] = useState<string | null>(null);

  useContractEvent({
    ...namesRegistryConfig,
    address: '0xe4599af01a9079392900A688E85F0d5E406B3106',
    eventName: 'nameRegistred',
    listener: (logs) => {
      if ((logs as any).transactionHash === txHash) {
        setLog((logs[0] as any).args._tokenId.toString());

      }
    }
  },
  );
  return {
    log,
  };
}
