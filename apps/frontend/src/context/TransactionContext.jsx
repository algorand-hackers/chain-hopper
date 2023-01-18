import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { ethers } from 'ethers';

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
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error('No ethereum object');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);
  
  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        connectWallet,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
