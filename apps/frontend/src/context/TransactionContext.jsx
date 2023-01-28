import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import Web3 from 'web3';
export const TransactionContext = React.createContext();

const { ethereum } = window;

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');

  const checkIfWalletIsConnect = async () => {
    // if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
    //   try {
    //     // if (!ethereum) return 
    //     // alert("Please install MetaMask.")
       
    //     // const provider = new ethers.providers.Web3Provider(ethereum);
    //     const accounts = await ethereum.request({ method: 'eth_accounts' });
  
    //     if (accounts.length) {
    //       //  setCurrentAccount(await provider.lookupAddress(accounts[0]));
    //       setCurrentAccount(accounts[0]);
    //       //         var address = '0x1234...';
    //       // var name = await provider.lookupAddress(address);
    //       // // ethers.js automatically checks that the forward resolution matches.
    //     } else {
    //       console.log('No accounts found');
    //     }
    // }catch (error) {
    //   console.log(error);
    // }else{
    //        console.log("Please install Metamask");
    //        toast.warning('Please install Metamask', {
    //        position: toast.POSITION.TOP_CENTER, 
    //        autoClose: 5000
    //       });
    //     }
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
          // console.log("clicked metamask")
           try {
                /* Metamask is installed */
                const accounts = await ethereum.request({ method: 'eth_accounts' });
  
                if (accounts.length) {
                        //  setCurrentAccount(await provider.lookupAddress(accounts[0]));
                        setCurrentAccount(accounts[0]);
                        //         var address = '0x1234...';
                        // var name = await provider.lookupAddress(address);
                        // // ethers.js automatically checks that the forward resolution matches.
                      } else {
                        console.log('No accounts found');
                      }
           } catch (err) {
                console.error(err.messages);
           }
        } else {
          /* Metamask is not installed */
          if(localStorage.getItem("wallet")){
            setCurrentAccount(localStorage.getItem("wallet"));
          }
         
           toast.warning('Please install Metamask', {
           position: toast.POSITION.TOP_CENTER, 
           autoClose: 5000
          });
        }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return 
      // alert("Please install MetaMask.")

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setCurrentAccount(accounts[0]);
      localStorage.setItem("wallet", accounts[0]);
      // window.location.reload();
    } catch (error) {
      console.log(error);
       throw new Error('No ethereum object');
    }
  };

  const disconnectWallet = async () => {
    setCurrentAccount("");
    localStorage.clear();
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
       setCurrentAccount(addresses[0].toString())
    
     } catch (err) {
       console.error(err);
       toast.error('something went wrong... issue might be your network', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
     }
   }

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);
  
  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        connectWallet,
        connectToMyAlgo,
        disconnectWallet,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
