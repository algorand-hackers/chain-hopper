// Here all intraction with the blockchain would be donw with other account setup
import { BigNumber, ethers, Wallet } from "ethers"
import abi from "./abi";
import {
    clusterApiUrl,
    Connection,
    PublicKey
  } from "@solana/web3.js";
import  {AccountLayout, TOKEN_PROGRAM_ID} from '@solana/spl-token';

import { NetworkType } from "@chain-hopper/sdk";
const algosdk = require('algosdk');

// Stating the constants needed in this application
const rpcUrl = "https://eth-mainnet.g.alchemy.com/v2/X6ZbuunfiCSmLDfVARGxggzu5KAbwy35";
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);


export const createWallet = async () => {
    const wallet = await ethers.Wallet.createRandom();

    return {
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic.phrase
    }
}

export const saveWalletDetails = async (address, privateKey, mnemonic) => {
    await localStorage.setItem("w_address", address);
    await localStorage.setItem("w_private_key", privateKey);
    await localStorage.setItem("w_mnemonic", mnemonic);
}


export const createWalletUsingPharse = async (m_string) => {
    const wallet = await ethers.Wallet.fromMnemonic(m_string, `m/44'/60'/0'/0/1`);

    return {
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic.phrase
    }
}


export const getEtherBalance = async (provider, addr, vss) => {
    // getting the address from the localstorage
    const bal = await provider.getBalance(addr);
   
    const bal_ = ethers.utils.formatEther(bal).slice(0, 8);
    

    vss(bal_)
}

export const getSolBalance = async (network, addr, vss) => {
    const publicKey = new PublicKey(addr);
    const solanaNet  = network === NetworkType.MAINNET ? "https://api.metaplex.solana.com/" : clusterApiUrl("testnet");

      let connection = new Connection(solanaNet);

      const bal = await connection.getBalance(publicKey);
   
    const bal_ = ethers.utils.formatUnits(bal, 9).slice(0, 8);
    
    vss(bal_)
}

export const getSolTokenBalance = async (network, addr, contractAddress, decimals, vss) => {
    const publicKey = new PublicKey(addr);

    const solanaNet  = network === NetworkType.MAINNET ? "https://api.metaplex.solana.com/" : clusterApiUrl("testnet");

    let connection = new Connection(solanaNet);

    const tokenData = await connection.getTokenAccountsByOwner(publicKey, {programId:  TOKEN_PROGRAM_ID});

    const tokenBalances = tokenData.value.map((token) => {
        const { mint, amount } = AccountLayout.decode(token.account.data);
        return { contractAddress: mint.toString(), amount: BigNumber.from(amount.toString()) };
    });

    const bal = tokenBalances.find((token) => isEqual(token.contractAddress,contractAddress)).amount;

    const bal_ = ethers.utils.formatUnits(bal, decimals).slice(0, 8);

    vss(bal_);
}

export const getAlgoBalance = async (network, addr, vss) => {
    const algodToken = '';
    const algodServer = network  === NetworkType.MAINNET ? "https://testnet-api.algonode.cloud" : "https://testnet-api.algonode.cloud";
    const algodPort = '';

    let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

    let bal = (await algodClient.accountInformation(addr).do()).amount;
   
    const bal_ = ethers.utils.formatEther(bal).slice(0, 8);
    vss(bal_)
}

export const sendEther = async (amount, to) => {
    // Obtaining the private key
    const pv_key = await localStorage.getItem("w_private_key");

    // Create a wallet instance
    let wallet = new Wallet(pv_key, provider)

    // Declaration of transaction (this is just a send transaction, no need for the data field)
    let tx = {
        to,
        value: ethers.utils.parseEther(amount)
    }

    // Send a transaction
    wallet.sendTransaction(tx)
    .then((txObj) => {
        console.log('txHash', txObj.hash)
        alert("Tranaction Was Successful...")
    })
}


export const getTokenBalance = async (address) => {
    // Obtaining the private key
    const pv_key = await localStorage.getItem("w_private_key");

    // Create a wallet instance
    let wallet = new Wallet(pv_key, provider)

    let token = new ethers.Contract(address, abi, wallet);

    let bal = await token.balanceOf(wallet.address);

    return ethers.utils.formatEther(bal);
}

export const sendERC20Token = async (address, to, amount) => {
    alert("Sending...")
    // Obtaining the private key
    const pv_key = await localStorage.getItem("w_private_key");
    // Create a wallet instance
    let wallet = new Wallet(pv_key, provider);
    let token = new ethers.Contract(address, abi, wallet);
    let dec = await token.decimals();
    try {
        let res = await token.transfer(to, ethers.utils.parseUnits(amount, dec));
        await res.wait();
        alert("Token sent")
        return true;
    } catch {
        return false;
    }
}

export function isEqual(a, b) {
    return a.toLowerCase() === b.toLowerCase();
}

export  function getAddressExplorerLink(template, account ) {
    return template.replace('{address}',  account);
}