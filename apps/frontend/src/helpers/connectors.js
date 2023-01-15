import {useState} from 'react'

const [walletAddress, setWalletAddress] = useState("")

export const connectWalletMetamask = async () => {

  if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
     try {
          /* Metamask is installed */
          const accounts = await window.ethereum.request({
               method: "eth_requestAccounts"
          });
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
     } catch (err) {
          console.error(err.messages);
     }
  } else {
    /* Metamask is not installed */
    console.log("Please install Metamask");
  }
     
}

export default connectors
