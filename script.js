// import MetaMaskOnboarding from '/node_modules/@metamask/onboarding'
//1. connect metamask to site, get user's address
var account = null;
var contract = null;
const ABI = [
{
"inputs": [],
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": true,
    "internalType": "address",
    "name": "owner",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "approved",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
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
    "internalType": "address",
    "name": "owner",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "operator",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "bool",
    "name": "approved",
    "type": "bool"
  }
],
"name": "ApprovalForAll",
"type": "event"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "approve",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
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
"name": "renounceOwnership",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "to",
    "type": "address"
  }
],
"name": "safeMint",
"outputs": [],
"stateMutability": "payable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "safeTransferFrom",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "internalType": "bytes",
    "name": "_data",
    "type": "bytes"
  }
],
"name": "safeTransferFrom",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "operator",
    "type": "address"
  },
  {
    "internalType": "bool",
    "name": "approved",
    "type": "bool"
  }
],
"name": "setApprovalForAll",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": true,
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "Transfer",
"type": "event"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "transferFrom",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
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
"name": "withdraw",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "owner",
    "type": "address"
  }
],
"name": "balanceOf",
"outputs": [
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "getApproved",
"outputs": [
  {
    "internalType": "address",
    "name": "",
    "type": "address"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "owner",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "operator",
    "type": "address"
  }
],
"name": "isApprovedForAll",
"outputs": [
  {
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "MAX_SUPPLY",
"outputs": [
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "mintRate",
"outputs": [
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "name",
"outputs": [
  {
    "internalType": "string",
    "name": "",
    "type": "string"
  }
],
"stateMutability": "view",
"type": "function"
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
"type": "function"
},
{
"inputs": [
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "ownerOf",
"outputs": [
  {
    "internalType": "address",
    "name": "",
    "type": "address"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "bytes4",
    "name": "interfaceId",
    "type": "bytes4"
  }
],
"name": "supportsInterface",
"outputs": [
  {
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "symbol",
"outputs": [
  {
    "internalType": "string",
    "name": "",
    "type": "string"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "uint256",
    "name": "index",
    "type": "uint256"
  }
],
"name": "tokenByIndex",
"outputs": [
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "owner",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "index",
    "type": "uint256"
  }
],
"name": "tokenOfOwnerByIndex",
"outputs": [
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"stateMutability": "view",
"type": "function"
},
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
"type": "function"
},
{
"inputs": [],
"name": "totalSupply",
"outputs": [
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"stateMutability": "view",
"type": "function"
}
];
const ADDRESS = "0x4c93eDf225D2be8FcbA90A1dEF7A272391a17C4D";
(async () => {
  // const currentUrl = new URL(window.location.href)
  // const forwarderOrigin = currentUrl.hostname === 'localhost'
  //   ? 'http://localhost:8000'
  //   : undefined
  const onboardButton = document.getElementById('connect');

  //Created check function to see if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

//We create a new MetaMask onboarding object to use in our app
// const onboarding = new MetaMaskOnboarding({ forwarderOrigin });


//This will start the onboarding proccess
const onClickInstall = () => {
  onboardButton.innerText = 'Onboarding in progress';
  onboardButton.disabled = true;
  //On this object we have startOnboarding which will start the onboarding process for our end user
  // onboarding.startOnboarding();
  window.open('https://metamask.io/download/')
};

const onClickConnect = async () => {
  try {
    // Will open the MetaMask UI
    // You should disable this button while the request is pending!
    await ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    console.error(error);
  }
};

//------Inserted Code------\\
const MetaMaskClientCheck = () => {
  //Now we check to see if MetaMask is installed
  if (!isMetaMaskInstalled()) {
    //If it isn't installed we ask the user to click to install it
    onboardButton.innerText = 'Click here to install MetaMask!';
    //When the button is clicked we call this function
    onboardButton.onclick = onClickInstall;
    //The button is now disabled
    onboardButton.disabled = false;
  } else {
    //If MetaMask is installed we ask the user to connect to their wallet
    onboardButton.innerText = 'Connect';
    //When the button is clicked we call this function to connect the users MetaMask Wallet
    onboardButton.onclick = onClickConnect;
    //The button is now disabled
    onboardButton.disabled = false;
  }
};
MetaMaskClientCheck();

  if (window.ethereum) {
    // await ethereum.request({ method: 'eth_requestAccounts' });

    window.web3 = new Web3(window.ethereum);

    var accounts = await web3.eth.getAccounts();
    account = accounts[0]
    onboardButton.innerText = account.substring(0,6) + '...' + account.substring(account.length - 4);

    contract = new web3.eth.Contract(ABI, ADDRESS);

    if(accounts.length == 0) {
      console.log('f');
      document.getElementById('mint').onclick = () => {
        console.log('hi');
        onclickConnect();
      }
    } else {
      document.getElementById('mint').onclick = () => {
        contract.methods.safeMint(account).send({ from: account, value : "10000000000000000"});
      }
    }
  }
  }
)();

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    // this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
    var faq = this.children[1];
    faq.classList.toggle('faq-section__expand--open');
  });
}
