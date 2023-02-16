import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ethers, providers } from 'ethers';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import metamaskLogoM from '../asset/metamask.svg'
import myAlgoLogoM from '../asset/myAlgo.png';
import phantomLogoM from '../asset/phantomLogo.svg';
import Images_Icons from '../constant/icons-images';
import { getSolBalance } from './main';
import { Chains, NetworkType } from '@chain-hopper/sdk';




export const TransactionContext = React.createContext();

const { ethereum, solana } = window;
const MainnetID = '0x1';
const TestnetID = '0x2';

export const TransactionsProvider = ({ children }) => {

 

  const [otherChainAccount, setOtherChainAccount] = useState('');
  const [algorandAccount, setAlgorandAccount] = useState('');
  const [algorandWalletName, setAlgorandWalletName] = useState('');
  const [otherWalletName, setOtherWalletName] = useState('');
  const [algorandWalletImage, setAlgorandWalletImage] = useState('');
  const [otherWalletImage, setOtherWalletImage] = useState('');
  const [otherChainName, setOtherChainName] = useState('');
  const [otherExplorerName, setOtheExplorerName] = useState('');
  const [otherExplorerLogo, setOtherExplorerLogo] = useState('');
  const [otherExplorerLogoAltText, setOtherExplorerLogoAltText] = useState('');
  const [otherWalletProvider, setOtherWalletProvider] = useState('');

  const [algoscan, setAlgoscan] = useState('');
  const [otherScan, setOtherScan] = useState('');

  const [network, setNetwork] = useState(NetworkType.TESTNET);
  
 


  const connectMetamask = async () => {
    try {
     
      if (ethereum) {
        await checkMetaMaskRightNetwork();

        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        setOtherChainAccount(accounts[0]);
        setOtherWalletName("Metamask");
        setOtherWalletImage(metamaskLogoM);
        setOtherScan(network === NetworkType.MAINNET ?  'https://etherscan.io/address/{address}' : 'https://goerli.etherscan.io/address/{address}');
        setOtherChainName("ethereum");
        setOtherExplorerLogo(Images_Icons.EtherscanLogo);
        setOtherExplorerLogoAltText('Ethereum');
        setOtheExplorerName("EtherScan");
        setOtherWalletProvider(new ethers.providers.Web3Provider(ethereum))
        localStorage.setItem("wallet", accounts[0]);
        // window.location.reload();
      } else {
        toast.info('Please install Metamask on your browser extension', {
          position: toast.POSITION.TOP_CENTER, 
          autoClose: 2000
         });
      }
       
    } catch (error) {
      console.log(error);
       throw new Error('No ethereum object');
    }
  };

  const checkMetaMaskRightNetwork = async () => {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network === NetworkType.MAINNET ? '0x1' : '0x5' }],
      });
    } catch (switchError) {
          console.log(alert(switchError));
      }
  }



  const disconnectWallet = async (chain) => {
    if(chain == Chains.ALGO) {
      disconnectAlgorandWallet();
      disconnectOtherWallet();
    }else{
      disconnectOtherWallet();
    }
    localStorage.clear();
    toast.info('Disconnected Successfully', {
      position: toast.POSITION.TOP_CENTER, 
      autoClose: 1000,
     });
    // window.location.reload();
  }

  const disconnectAlgorandWallet = async () => {
    setAlgorandAccount("");
  }

  const disconnectOtherWallet = async ()  => {
    setOtherChainAccount("");
  }

  // --------------------------- My Aglo Wallet Context functions -----------------------------

 const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false });

   const settings = {
       shouldSelectOneAccount: false,
       openManager: false,
   };

  async function connectToMyAlgo() {
     try {
       const accounts = await myAlgoConnect.connect(settings);
      //  console.log(accounts)
      //  setCurrentAccount(accounts[0].toString())
       const addresses = accounts.map(account => account.address);
      //  console.log(addresses.toString())
       setAlgorandAccount(addresses[0].toString())
       setAlgorandWalletName("My Algo");
       setAlgorandWalletImage(myAlgoLogoM);
       setAlgoscan(network === NetworkType.MAINNET ?  'https://algoexplorer.io/address/{address}' : 'https://testnet.algoexplorer.io/address/{address}');
     } catch (err) {
       console.error(err);
       toast.error('something went wrong... issue might be your network', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
     }
   }

  useEffect(() => {
    disconnectOtherWallet();
  }, [network]);

  

  //  --------------------------  Phantom Wallet connect function -------------------------------

  const connectPhantom = async () => {
    try {
      
      //  await getNetwork();
        if (solana) {
          // When using this flag, Phantom will only connect and emit a connect event if the application is trusted. Therefore, this can be safely called on page load for new users, as they won't be bothered by a pop-up window even if they have never connected to Phantom before.
          // if user already connected, { onlyIfTrusted: true }
          const response = await solana.connect({ onlyIfTrusted: false, network: 'mainnet' });
          console.log(
            "public key",
            response.publicKey.toString()
          );
          setOtherChainAccount(response.publicKey.toString());
          setOtherWalletName("Phantom");
          setOtherWalletImage(phantomLogoM);
          setOtherScan(network === NetworkType.MAINNET ?  'https://explorer.solana.com/address/{address}' : 'https://explorer.solana.com/address/{address}?cluster=testnet');
          setOtherChainName("solana");
          setOtherExplorerLogo(phantomLogoM);
          setOtherExplorerLogoAltText('Solana');
          setOtheExplorerName("Solana Scan");
      
        } else {
          // alert("Please install phantom wallet");
          toast.info('Please install or unlock phantom wallet (https://phantom.app/)', {
            position: toast.POSITION.TOP_CENTER, 
            autoClose: 2000,
           });
        }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong connecting to Phantom wallet', {
      position: toast.POSITION.TOP_LEFT,
       autoClose: 2000
      });
    }
  };

  
  return (
    <TransactionContext.Provider
      value={{
        algorandAccount,
        otherChainAccount,
        connectMetamask,
        connectToMyAlgo,
        disconnectWallet,
        connectPhantom,
        algorandWalletName,
        otherWalletName,
        algorandWalletImage,
        otherWalletImage,
        algoscan,
        otherScan,
        otherChainName,
        otherExplorerLogo,
        otherExplorerLogoAltText,
        otherExplorerName,
        otherWalletProvider,
        network,
        setNetwork,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
