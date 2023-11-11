// not used since there is simplier option to get tokenid


import { useState } from 'react';
import { namesRegistryConfig } from './contracts';
import { useContractEvent } from 'wagmi';

export function WatchNameRegisterEvent(txHash:string|undefined) {
  const [log, setLog] = useState<string|null>(null);

  useContractEvent({
    ...namesRegistryConfig,
    address: '0x6Dd57e9899784571065867dCe8eC2d7454b650c4',
    eventName: 'nameRegistred',
    listener: (logs) => {
      if((logs as any).transactionHash === txHash){
        setLog((logs[0] as any) .args._tokenId.toString());

    }}
  },
);
  return {
    log,
  };
}
