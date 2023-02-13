import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import metamaskLogoM from '../asset/metamask.svg'
import myAlgoLogoM from '../asset/myAlgo.png';
import phantomLogoM from '../asset/phantomLogo.svg';
import Images_Icons from '../constant/icons-images';
import { getSolBalance } from './main';
import { Chains, NetworkType } from '@chain-hopper/sdk';


export const TransactionContext = React.createContext();

const { ethereum, solana } = window;

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

  const [network, setNetwork] = useState(null);

  

  // const checkIfWalletIsConnect = async () => {
  //   // if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
  //   //   try {
  //   //     // if (!ethereum) return 
  //   //     // alert("Please install MetaMask.")
       
  //   //     // const provider = new ethers.providers.Web3Provider(ethereum);
  //   //     const accounts = await ethereum.request({ method: 'eth_accounts' });
  
  //   //     if (accounts.length) {
  //   //       //  setCurrentAccount(await provider.lookupAddress(accounts[0]));
  //   //       setCurrentAccount(accounts[0]);
  //   //       //         var address = '0x1234...';
  //   //       // var name = await provider.lookupAddress(address);
  //   //       // // ethers.js automatically checks that the forward resolution matches.
  //   //     } else {
  //   //       console.log('No accounts found');
  //   //     }
  //   // }catch (error) {
  //   //   console.log(error);
  //   // }else{
  //   //        console.log("Please install Metamask");
  //   //        toast.warning('Please install Metamask', {
  //   //        position: toast.POSITION.TOP_CENTER, 
  //   //        autoClose: 5000
  //   //       });
  //   //     }
  //   if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
  //         // console.log("clicked metamask")
  //          try {
  //               /* Metamask is installed */
  //               const accounts = await ethereum.request({ method: 'eth_accounts' });
  
  //               if (accounts.length) {
  //                       //  setCurrentAccount(await provider.lookupAddress(accounts[0]));
  //                       setCurrentAccount(accounts[0]);
  //                       //         var address = '0x1234...';
  //                       // var name = await provider.lookupAddress(address);
  //                       // // ethers.js automatically checks that the forward resolution matches.
  //                     } else {
  //                       console.log('No accounts found');
  //                     }
  //          } catch (err) {
  //               console.error(err.messages);
  //          }
  //       } else {
  //         /* Metamask is not installed */
  //         if(localStorage.getItem("wallet")){
  //           setCurrentAccount(localStorage.getItem("wallet"));
  //         }
  //          toast.info('Please install Metamask', {
  //          position: toast.POSITION.TOP_CENTER, 
  //          autoClose: 2000
  //         });
  //       }
  // };



  const connectMetamask = async () => {
    try {

      await checkMetaMaskRightNetwork();
      
     
      if (ethereum) {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        setOtherChainAccount(accounts[0]);
        setOtherWalletName("Metamask");
        setOtherWalletImage(metamaskLogoM);
        setOtherScan(`https://etherscan.io/address`);
        setOtherChainName("ethereum");
        setOtherExplorerLogo(Images_Icons.EtherscanLogo);
        setOtherExplorerLogoAltText('Ethereum');
        setOtheExplorerName("EtherScan");
        setOtherWalletProvider(new ethers.providers.Web3Provider(ethereum))
        localStorage.setItem("wallet", accounts[0]);
        // window.location.reload();

        const chainId = await ethereum.send('eth_chainId');

        if (chainId.result === '0x1') {
          setNetwork(NetworkType.MAINNET);
        } else {
          setNetwork(NetworkType.TESTNET);
        }
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
        params: [{ chainId: '0x1' }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x1',
                chainName: 'Ethereum',
                rpcUrls: ['https://eth-mainnet.g.alchemy.com/v2/X6ZbuunfiCSmLDfVARGxggzu5KAbwy35'],
                blockExplorerUrls: ['https://etherscan.io']
              },
            ],
          });
        } catch (error) {
          console.log(alert(error));
        }
      }
      // handle other "switch" errors
    }
  }

  const disconnectWallet = async (chain) => {
    if(chain == Chains.ALGO) {
      await getSolBalance(NetworkType.MAINNET, "d");
      setAlgorandAccount("");
    }else{
      setOtherChainAccount("");
    }
    localStorage.clear();
    toast.info('Disconnected Successfully', {
      position: toast.POSITION.TOP_CENTER, 
      autoClose: 1000,
     });
    // window.location.reload();
  }

  // --------------------------- My Aglo Wallet Context functions -----------------------------

 const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false });

   const settings = {
       shouldSelectOneAccount: false,
       openManager: false
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
       setAlgoscan('https://algoexplorer.io/address');
     } catch (err) {
       console.error(err);
       toast.error('something went wrong... issue might be your network', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
     }
   }

  useEffect(() => {
  }, []);

  // const [phantom, setPhantom] = useState(null);

  // useEffect(() => {
  //   if (window["solana"]?.isPhantom) {
  //     setPhantom(window["solana"]);
  //   } else {
  //     toast.error('Something went wrong connecting to Phantom wallet', {
  //       position: toast.POSITION.TOP_LEFT,
  //       autoClose: 2000
  //     });
  //   }
  // }, [solana]);

  // const connectPhantom = () => {
  //    phantom?.connect();
  // }

  //  --------------------------  Phantom Wallet connect function -------------------------------

  const connectPhantom = async () => {
    try {
        if (solana) {
          // When using this flag, Phantom will only connect and emit a connect event if the application is trusted. Therefore, this can be safely called on page load for new users, as they won't be bothered by a pop-up window even if they have never connected to Phantom before.
          // if user already connected, { onlyIfTrusted: true }
          const response = await solana.connect({ onlyIfTrusted: false });
          console.log(
            "public key",
            response.publicKey.toString()
          );
          setOtherChainAccount(response.publicKey.toString());
          setOtherWalletName("Phantom");
          setOtherWalletImage(phantomLogoM);
          setOtherScan('https://explorer.solana.com/address');
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
        network: network || NetworkType.TESTNET,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
