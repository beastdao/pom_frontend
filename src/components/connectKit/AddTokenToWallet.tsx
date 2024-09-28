import React, { useState, useEffect, useCallback } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { currentContractAddresses } from '../wagmiHooks/contractsAddresses';

declare global {
  interface Window { ethereum?: any; }
}


const AddTokenToWallet = ({ tokenIdValue }: { tokenIdValue: string }) => {
  const handleAddToken = useCallback(async () => {
    window.ethereum = window.ethereum || {};

    const result = await window.ethereum?.request({
      method: "wallet_watchAsset",
      params: {
        type: 'ERC721',
        options: {
          address: currentContractAddresses.pomToken,
          tokenId: tokenIdValue,
        }
      }
    });
  }, [tokenIdValue]);

  return (
    <div className="mtb">
      <button className="btn btn-light" onClick={handleAddToken}>+ Add Token</button>
    </div>
  );
};

export default AddTokenToWallet;
