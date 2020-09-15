var express = require('express');
var router = express.Router();
var Web3 = require('web3');
const testnet = 'https://ropsten.infura.io/v3/efa2b4c315d74fb08f446ec04e6cf951';
const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
var contractAddress = '0x43b2decb990ae1c7fbde8015d713b86c8fd962de';
var contractABI =[
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "records",
      "outputs": [
        {
          "name": "contract_num",
          "type": "bytes32"
        },
        {
          "name": "periods",
          "type": "uint256"
        },
        {
          "name": "principal",
          "type": "uint256"
        },
        {
          "name": "interest",
          "type": "uint256"
        },
        {
          "name": "require_amount",
          "type": "uint256"
        },
        {
          "name": "paydate",
          "type": "uint256"
        },
        {
          "name": "real_paydate",
          "type": "uint256"
        },
        {
          "name": "repay_amount",
          "type": "uint256"
        },
        {
          "name": "penalty",
          "type": "uint256"
        },
        {
          "name": "unrepaid",
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
      "name": "repay_info",
      "outputs": [
        {
          "name": "contract_num",
          "type": "bytes32"
        },
        {
          "name": "periods",
          "type": "uint256"
        },
        {
          "name": "principal",
          "type": "uint256"
        },
        {
          "name": "interest",
          "type": "uint256"
        },
        {
          "name": "require_amount",
          "type": "uint256"
        },
        {
          "name": "paydate",
          "type": "uint256"
        },
        {
          "name": "real_paydate",
          "type": "uint256"
        },
        {
          "name": "repay_amount",
          "type": "uint256"
        },
        {
          "name": "penalty",
          "type": "uint256"
        },
        {
          "name": "unrepaid",
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
      "name": "investor",
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
          "name": "_from",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "repay",
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
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        },
        {
          "name": "creditID",
          "type": "bytes32"
        }
      ],
      "name": "returncertificate",
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
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "make_invest_requirement",
      "outputs": [
        {
          "name": "amount_",
          "type": "bytes32"
        },
        {
          "name": "investmentID",
          "type": "bytes32"
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
          "name": "contract_num",
          "type": "bytes32"
        }
      ],
      "name": "get_repay_info",
      "outputs": [
        {
          "components": [
            {
              "name": "contract_num",
              "type": "bytes32"
            },
            {
              "name": "periods",
              "type": "uint256"
            },
            {
              "name": "principal",
              "type": "uint256"
            },
            {
              "name": "interest",
              "type": "uint256"
            },
            {
              "name": "require_amount",
              "type": "uint256"
            },
            {
              "name": "paydate",
              "type": "uint256"
            },
            {
              "name": "real_paydate",
              "type": "uint256"
            },
            {
              "name": "repay_amount",
              "type": "uint256"
            },
            {
              "name": "penalty",
              "type": "uint256"
            },
            {
              "name": "unrepaid",
              "type": "uint256"
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
      "constant": false,
      "inputs": [
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "depositprincipleandinterest",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "invest_info",
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

var contract = web3.eth.contract(contractABI).at(contractAddress);


router.get('/', function(req, res, next) {
    var pool = req.connection;
    pool.getConnection(function (err, connection) {
      connection.query('SELECT * FROM repay_0002', function (err, rows) {
        if(err){
          res.render('error', {
            message: err.message,
            error: err
        });
        console.log(err);
        } 
        if(rows.length==0){
        console.log("no data!!!")
        }
        else {
        var data=rows;
        res.render('repay_record/repay_0002', {
            user: req.session.user_id,
            data:data,
        });
    }
})
connection.release();
})  


});
module.exports = router;
