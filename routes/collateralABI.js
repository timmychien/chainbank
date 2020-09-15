var collateralABI=[
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_signature",
				"type": "bytes"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			},
			{
				"name": "_fee",
				"type": "uint256"
			},
			{
				"name": "_nonce",
				"type": "uint256"
			}
		],
		"name": "transferPreSigned",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "hash",
				"type": "bytes32"
			},
			{
				"name": "sig",
				"type": "bytes"
			}
		],
		"name": "recover",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "collateral_info_length",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "strategy_id",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getNonce",
		"outputs": [
			{
				"name": "nonce",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "credits",
		"outputs": [
			{
				"name": "collateral_creditID",
				"type": "bytes32"
			},
			{
				"name": "collateralHolder",
				"type": "address"
			},
			{
				"name": "isdefault",
				"type": "bool"
			},
			{
				"name": "creditAmount",
				"type": "uint256"
			},
			{
				"name": "ownId",
				"type": "uint256"
			},
			{
				"name": "marketvalue",
				"type": "uint256"
			},
			{
				"name": "payrate",
				"type": "uint8"
			},
			{
				"name": "isCAM",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "collateralHolder",
				"type": "address"
			},
			{
				"name": "collateral_creditID",
				"type": "bytes32"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "pay_credit",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_signature",
				"type": "bytes"
			},
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			},
			{
				"name": "_fee",
				"type": "uint256"
			},
			{
				"name": "_nonce",
				"type": "uint256"
			}
		],
		"name": "approvePreSigned",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			},
			{
				"name": "collateral_creditID",
				"type": "bytes32"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "unlockCredit",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseApproval",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "collateral_info",
		"outputs": [
			{
				"name": "collateral_creditID",
				"type": "bytes32"
			},
			{
				"name": "collateralHolder",
				"type": "address"
			},
			{
				"name": "isdefault",
				"type": "bool"
			},
			{
				"name": "creditAmount",
				"type": "uint256"
			},
			{
				"name": "ownId",
				"type": "uint256"
			},
			{
				"name": "marketvalue",
				"type": "uint256"
			},
			{
				"name": "payrate",
				"type": "uint8"
			},
			{
				"name": "isCAM",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "Initial_Supply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_signature",
				"type": "bytes"
			},
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_subtractedValue",
				"type": "uint256"
			},
			{
				"name": "_fee",
				"type": "uint256"
			},
			{
				"name": "_nonce",
				"type": "uint256"
			}
		],
		"name": "decreaseApprovalPreSigned",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "collateral_creditID",
				"type": "bytes32"
			},
			{
				"name": "collateralHolder",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn_collateral_credit",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "length",
				"type": "uint256"
			}
		],
		"name": "get_credit_amount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "collateralHolder",
				"type": "address"
			},
			{
				"name": "Default",
				"type": "bool"
			},
			{
				"name": "ownId",
				"type": "uint256"
			},
			{
				"name": "rate",
				"type": "uint8"
			},
			{
				"name": "CAM",
				"type": "bool"
			},
			{
				"name": "marketvalue",
				"type": "uint256"
			},
			{
				"name": "rand",
				"type": "string"
			}
		],
		"name": "mint_collateral_credit",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"components": [
					{
						"name": "collateral_creditID",
						"type": "bytes32"
					},
					{
						"name": "collateralHolder",
						"type": "address"
					},
					{
						"name": "isdefault",
						"type": "bool"
					},
					{
						"name": "creditAmount",
						"type": "uint256"
					},
					{
						"name": "ownId",
						"type": "uint256"
					},
					{
						"name": "marketvalue",
						"type": "uint256"
					},
					{
						"name": "payrate",
						"type": "uint8"
					},
					{
						"name": "isCAM",
						"type": "bool"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_signature",
				"type": "bytes"
			},
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_addedValue",
				"type": "uint256"
			},
			{
				"name": "_fee",
				"type": "uint256"
			},
			{
				"name": "_nonce",
				"type": "uint256"
			}
		],
		"name": "increaseApprovalPreSigned",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "length",
				"type": "uint256"
			}
		],
		"name": "get_collateral_credit_id",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "get_collateral_info",
		"outputs": [
			{
				"components": [
					{
						"name": "collateral_creditID",
						"type": "bytes32"
					},
					{
						"name": "collateralHolder",
						"type": "address"
					},
					{
						"name": "isdefault",
						"type": "bool"
					},
					{
						"name": "creditAmount",
						"type": "uint256"
					},
					{
						"name": "ownId",
						"type": "uint256"
					},
					{
						"name": "marketvalue",
						"type": "uint256"
					},
					{
						"name": "payrate",
						"type": "uint8"
					},
					{
						"name": "isCAM",
						"type": "bool"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_all_collateral_info",
		"outputs": [
			{
				"components": [
					{
						"name": "collateral_creditID",
						"type": "bytes32"
					},
					{
						"name": "collateralHolder",
						"type": "address"
					},
					{
						"name": "isdefault",
						"type": "bool"
					},
					{
						"name": "creditAmount",
						"type": "uint256"
					},
					{
						"name": "ownId",
						"type": "uint256"
					},
					{
						"name": "marketvalue",
						"type": "uint256"
					},
					{
						"name": "payrate",
						"type": "uint8"
					},
					{
						"name": "isCAM",
						"type": "bool"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseApproval",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "collateralHolder",
				"type": "address"
			},
			{
				"name": "collateral_creditID",
				"type": "bytes32"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "return_credit",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_token",
				"type": "address"
			},
			{
				"name": "_functionSig",
				"type": "bytes4"
			},
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			},
			{
				"name": "_fee",
				"type": "uint256"
			},
			{
				"name": "_nonce",
				"type": "uint256"
			}
		],
		"name": "recoverPreSignedHash",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "get_collateral_credit_amount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Swap",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "borrower",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "creditAmount",
				"type": "uint256"
			}
		],
		"name": "locked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "collateral_creditID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "collateralHolder",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "BurnCollateralCredit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "collateral_creditID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "collateralHolder",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "Default",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "ownId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "marketvalue",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "rate",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "CAM",
				"type": "bool"
			}
		],
		"name": "Show_record",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TransferPreSigned_Transfer_Fee",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "delegate",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "fee",
				"type": "uint256"
			}
		],
		"name": "TransferPreSigned",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "delegate",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "fee",
				"type": "uint256"
			}
		],
		"name": "ApprovalPreSigned",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "existingOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwner",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	}
]
module.exports.collateralABI = collateralABI;
