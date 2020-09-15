var matching2ABI =[
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "repay_info_array",
		"outputs": [
			{
				"name": "requirementID",
				"type": "bytes32"
			},
			{
				"name": "repayment",
				"type": "uint256"
			},
			{
				"name": "start_time",
				"type": "uint256"
			},
			{
				"name": "rate_times",
				"type": "uint8"
			},
			{
				"name": "deadline",
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
				"name": "requirementID",
				"type": "bytes32"
			}
		],
		"name": "repay_confirm",
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
				"name": "investor",
				"type": "address"
			},
			{
				"name": "borrower",
				"type": "address"
			},
			{
				"name": "requirementID",
				"type": "bytes32"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "matched_timestamp",
				"type": "uint256"
			}
		],
		"name": "match_success",
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
		"name": "required",
		"outputs": [
			{
				"name": "requirementID",
				"type": "bytes32"
			},
			{
				"name": "borrower",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "isMatched",
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
				"name": "requirementID",
				"type": "bytes32"
			}
		],
		"name": "get_info_of_matched",
		"outputs": [
			{
				"components": [
					{
						"name": "requirementID",
						"type": "bytes32"
					},
					{
						"name": "amount",
						"type": "uint256"
					},
					{
						"name": "borrower",
						"type": "address"
					},
					{
						"name": "investor",
						"type": "address"
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
		"name": "get_all_matched",
		"outputs": [
			{
				"components": [
					{
						"name": "requirementID",
						"type": "bytes32"
					},
					{
						"name": "amount",
						"type": "uint256"
					},
					{
						"name": "borrower",
						"type": "address"
					},
					{
						"name": "investor",
						"type": "address"
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
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "match_info",
		"outputs": [
			{
				"name": "requirementID",
				"type": "bytes32"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "borrower",
				"type": "address"
			},
			{
				"name": "investor",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_required_info",
		"outputs": [
			{
				"components": [
					{
						"name": "requirementID",
						"type": "bytes32"
					},
					{
						"name": "borrower",
						"type": "address"
					},
					{
						"name": "amount",
						"type": "uint256"
					},
					{
						"name": "isMatched",
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
		"constant": true,
		"inputs": [],
		"name": "requirement_length",
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
		"name": "repayment",
		"outputs": [
			{
				"name": "requirementID",
				"type": "bytes32"
			},
			{
				"name": "repayment",
				"type": "uint256"
			},
			{
				"name": "start_time",
				"type": "uint256"
			},
			{
				"name": "rate_times",
				"type": "uint8"
			},
			{
				"name": "deadline",
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
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "repay_byratetime_info",
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
				"name": "len",
				"type": "uint256"
			}
		],
		"name": "get_requirement_id",
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
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "r_info",
		"outputs": [
			{
				"name": "requirementID",
				"type": "bytes32"
			},
			{
				"name": "borrower",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "isMatched",
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
				"name": "borrower",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "requirementID",
				"type": "bytes32"
			},
			{
				"name": "nowtimestamp",
				"type": "uint256"
			}
		],
		"name": "repay_byratetime",
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
		"constant": true,
		"inputs": [
			{
				"name": "requirementID",
				"type": "bytes32"
			}
		],
		"name": "get_match_status",
		"outputs": [
			{
				"name": "",
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
				"name": "borrower",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "creditID",
				"type": "bytes32"
			},
			{
				"name": "randbytes",
				"type": "bytes8"
			},
			{
				"name": "rate_times",
				"type": "uint8"
			}
		],
		"name": "make_funding_requirement",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
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
				"name": "requirementID",
				"type": "bytes32"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "paytimestamp",
				"type": "uint256"
			},
			{
				"name": "rate_time",
				"type": "uint256"
			}
		],
		"name": "repay_by_time",
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
		"name": "matched",
		"outputs": [
			{
				"name": "requirementID",
				"type": "bytes32"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "borrower",
				"type": "address"
			},
			{
				"name": "investor",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
				"indexed": true,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "Depositprincipleandinterest",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "Depositmakeup",
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
	}
]

module.exports.matching2ABI = matching2ABI;