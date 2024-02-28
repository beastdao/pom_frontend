
export const namesRegistryConfig: {
  address: string;
  abi: Array<any>;
} = {
  address: '0xe4599af01a9079392900A688E85F0d5E406B3106',
  abi: [
    {
      "inputs": [
        {
          "internalType": "contract ICardIndex",
          "name": "_cardIndex",
          "type": "address"
        },
        {
          "internalType": "contract IPomToken",
          "name": "_pomToken",
          "type": "address"
        },
        {
          "internalType": "contract ISVGStorage",
          "name": "_svgStorage",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "community_",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "expirationTimestamp_",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "verificationFeePaid_",
          "type": "uint256"
        }
      ],
      "name": "VerificationRequestAccepted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "community_",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "verificationFeeWOProcessingReturned_",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "communityAdmin_",
          "type": "address"
        }
      ],
      "name": "VerificationRequestRejected",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint8",
          "name": "currentCount",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "communityBytes",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "VerificationRequestSubmitted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "_community",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "community_admin",
          "type": "address"
        }
      ],
      "name": "communityRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_community",
          "type": "string"
        }
      ],
      "name": "nameDeleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_community",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "registrant",
          "type": "address"
        }
      ],
      "name": "nameRegistred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "cardIndex",
      "outputs": [
        {
          "internalType": "contract ICardIndex",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "pendingRequestCount",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "pomToken",
      "outputs": [
        {
          "internalType": "contract IPomToken",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "svgStorage",
      "outputs": [
        {
          "internalType": "contract ISVGStorage",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "treasury",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_treasury",
          "type": "address"
        }
      ],
      "name": "setNewTreasury",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "getCommunityAdmin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "community_admin_",
          "type": "address"
        }
      ],
      "name": "registerCommunity",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "newCommunity_admin_",
          "type": "address"
        }
      ],
      "name": "modifyCommunityAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "getNameInCommunityByAddress",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "lowerCaseName_",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "lowerCaseCommunity_",
          "type": "string"
        }
      ],
      "name": "availableName",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name_",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "registerName",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name_",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "deleteName",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        }
      ],
      "name": "resolveAddressByTokenId",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "getCommunityMembershipsCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community",
          "type": "string"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "stBKG",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stTextBox",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stWitchFrameBKG",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stWitchSLT",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stWitchFace",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stCardTitle",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stTextCLR",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stDrop1",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stDrop2",
              "type": "string"
            }
          ],
          "internalType": "struct ISVGStorage.ColorScheme",
          "name": "colorScheme",
          "type": "tuple"
        }
      ],
      "name": "modifyColorSchemeForCommunity",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community",
          "type": "string"
        }
      ],
      "name": "getCommunityColorScheme",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "stBKG",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stTextBox",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stWitchFrameBKG",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stWitchSLT",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stWitchFace",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stCardTitle",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stTextCLR",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stDrop1",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stDrop2",
              "type": "string"
            }
          ],
          "internalType": "struct ISVGStorage.ColorScheme",
          "name": "colorScheme",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "isCommunityRequestPending",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "getVerificationExpiration",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "isCommunityVerified",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "submitVerificationRequest",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "acceptVerificationRequest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "rejectVerificationRequest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pauseAllAsOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpauseAllAsOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "isSuspendedByAdmin",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "isSuspendedByOwner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "suspendCommunityByOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "unSuspendCommunityByOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "suspendCommunityByAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "community_",
          "type": "string"
        }
      ],
      "name": "unSuspendCommunityByAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}

export const svgRendererConfig = {
  address: '0x21DA9d030582A8a59143A9568c24C1c8a7ef6c57',
  abi: [
    {
      "inputs": [
        {
          "internalType": "contract ICardIndex",
          "name": "_cardIndex",
          "type": "address"
        },
        {
          "internalType": "contract ISVGStorage",
          "name": "_svgStorage",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "cardIndex",
      "outputs": [
        {
          "internalType": "contract ICardIndex",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "svgStorage",
      "outputs": [
        {
          "internalType": "contract ISVGStorage",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        }
      ],
      "name": "getJson",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "nameAtCommunity",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "memberSince",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "role",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "community",
          "type": "string"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "stBKG",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stTextBox",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stWitchFrameBKG",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stWitchSLT",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stWitchFace",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stCardTitle",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stTextCLR",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stDrop1",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "stDrop2",
              "type": "string"
            }
          ],
          "internalType": "struct ISVGStorage.ColorScheme",
          "name": "colorScheme",
          "type": "tuple"
        }
      ],
      "name": "RenderSVGDummy",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        }
      ],
      "name": "RenderSVGProofByTokenId",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]
}
export const pomTokenConfig = {
  address: '0xF318d982B8E55F9fa238b1392e0B8Ec3197D7080',
  abi: [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]
}
