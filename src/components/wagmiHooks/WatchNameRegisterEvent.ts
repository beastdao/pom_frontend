// not used since there is simplier option to get tokenid


import { useState } from 'react';
import { namesRegistryConfig } from './contracts';
import { useContractEvent } from 'wagmi';

export function WatchNameRegisterEvent(txHash: string | undefined) {
  const [log, setLog] = useState<string | null>(null);

  useContractEvent({
    ...namesRegistryConfig,
    address: '0xF357fEb9B33Dc568aDc9d5382Ba69FD198832079',
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
