import { ChainId, ChainName, CHAINS, CONTRACTS, getEmitterAddressAlgorand, getEmitterAddressEth, getGovernorIsVAAEnqueued, getIsTransferCompletedAlgorand, getIsTransferCompletedEth, getSignedVAA, hexToUint8Array, parseSequenceFromLogAlgorand, parseSequenceFromLogEth, redeemOnAlgorand, redeemOnEthNative, transferFromAlgorand, transferFromEthNative, tryNativeToHexString } from "@certusone/wormhole-sdk";
import { TransactionSignerPair } from "@certusone/wormhole-sdk/lib/cjs/algorand";
import { ethers } from "ethers";
import { ALGORAND_WALLETS, Assets, BRIDGE_STATUS, Chains, ALGORAND_WAIT_FOR_CONFIRMATIONS, getWormHoleRpchost } from "../config";
import { NetworkType, Quote, QuoteRequest, Update } from "../types";
import { BaseBridgeProvider } from "../baseBridgeProvider";
import { getNonAlgorandChain } from "../utils";
import { AlgorandUpdate, EthereumUpdate, GetSignedVAAWithRetryResult, WormHoleUpdate } from "./types";
import {assignGroupID, waitForConfirmation } from 'algosdk';
import { parseEther, parseUnits } from "ethers/lib/utils";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { getAlgoClient } from "../factory/algoClient";


const ethMainnetAssets = Assets.Mainnet.ETH;
const ethTestnetAssets = Assets.Testnet.ETH;
const algoMainnetAssets = Assets.Mainnet.ALGO;
const algoTestnetAssets = Assets.Testnet.ALGO;

export class WormHoleBridgeProvider implements BaseBridgeProvider  {


    readonly supportedAssetsMaps = {
        [NetworkType.MAINNET]: {
            [Chains.ETH]: [[ethMainnetAssets.ETH.symbol, algoMainnetAssets.WETH.symbol]]
        },
        [NetworkType.TESTNET]: {
            [Chains.ETH]: [[ethTestnetAssets.ETH.symbol, algoTestnetAssets.WETH.symbol]]
        }
    }

    public supportedChains(_network: NetworkType) { 
        return [Chains.ETH];
    }

    public supportedAssetsByChain(chain: string, network: NetworkType) {
        return this.supportedAssetsMaps[network][chain].map(assetMap => assetMap[0]);
    }

    public async getQuote(quoteRequest: QuoteRequest): Promise<Quote | null> {

        const nonAlgorandChain = getNonAlgorandChain({from: quoteRequest.fromChainName, to: quoteRequest.toChainName});

        // Check if chain is supported
        if(!this.supportedChains(quoteRequest.network).includes(nonAlgorandChain)) return null;

        // Check if asset is supported
        if(!this.supportedAssetsByChain(nonAlgorandChain, quoteRequest.network).includes(quoteRequest.assetName)) return null;


        // Get Quote ...
        return null;
    }

    public async moveAsset(quote: Quote): Promise<Update>  {
        if(quote.fromChainName == Chains.ALGO) 
            return this.moveAssetFromAlgorand(quote);

        const nonAlgorandChain = getNonAlgorandChain({from: quote.fromChainName, to: quote.toChainName});
        switch(nonAlgorandChain) {
            case Chains.ETH: 
                return this.moveAssetFromEthereum(quote);
            default:
                throw Error('Invalid chain');
        }
    }


    public async performNextStep(update: Update) {
        switch(update.quote.fromChainName){
            case Chains.ETH:
                return this.performNextEthereumStep(update as unknown as EthereumUpdate);
            case Chains.ALGO:
                return this.performNextAlgorandStep(update as unknown as AlgorandUpdate);
            default:
                throw Error('Invalid Chain');
        }
    }

    private async moveAssetFromAlgorand(quote: Quote) {

        const bridges = this.getAlgorandBridges(quote.network);
        const asset = quote.network == NetworkType.MAINNET ? Assets.Mainnet.ALGO[quote.assetName] : Assets.Testnet.ALGO[quote.assetName];
        const transferAmountParsed = parseUnits(quote.amountIn, asset.decimals );
        const feeParsed = parseUnits("0", asset.decimals);

        const algodClient = getAlgoClient(quote.network);

          const txs = await transferFromAlgorand(
            algodClient,
            bridges.tokenBridge,
            bridges.bridge,
            quote.fromAddress,
            BigInt(asset.address),
            transferAmountParsed.toBigInt(),
            quote.toAddress,
            CHAINS.algorand,
            feeParsed.toBigInt()
          );

        const signedTxs = await this.signAlgorandTransactions(quote.fromWalletType, quote.fromWallet, txs);
        if(signedTxs){
            await getAlgoClient(quote.network).sendRawTransaction(signedTxs).do();
        }

        const result = this.waitForTransactionOnAlgorand(txs[txs.length - 1].tx.txID(), quote.network);

          return {quote, txs, algodClient, result, status: BRIDGE_STATUS.WAITING_FOR_SEND_CONFIRMATION, tokenBridge: bridges.tokenBridge};
        }

    private async signUsingMyAlgoWallet(wallet: MyAlgoConnect, txs: TransactionSignerPair[]) {
        assignGroupID(txs.map((tx) => tx.tx));
        const signedTxns: Uint8Array[] = [];
        const lsigSignedTxns: Uint8Array[] = [];
        const walletUnsignedTxns: Uint8Array[] = [];
        // sign all the lsigs
        for (const lsigTx of txs) {
          if (lsigTx.signer) {
            lsigSignedTxns.push(await lsigTx.signer.signTxn(lsigTx.tx));
          }
        }
        // assemble the txs for the wallet to sign
        for (const walletTx of txs) {
          if (!walletTx.signer) {
            walletUnsignedTxns.push(walletTx.tx.toByte());
          }
        }

        const walletSignedTxns = await wallet.signTransaction(
          walletUnsignedTxns
        );
        let lsigIdx = 0;
        let walletIdx = 0;
        for (const originalTx of txs) {
          if (originalTx.signer) {
            signedTxns.push(lsigSignedTxns[lsigIdx++]);
          } else {
            signedTxns.push(walletSignedTxns[walletIdx++].blob);
          }
        }

        return signedTxns;
    }

    // private signUsingPeraWallet() {

    // }

    private async moveAssetFromEthereum(quote: Quote<ethers.providers.JsonRpcSigner>): Promise<EthereumUpdate> {

        const TOKEN_BRIDGE = quote.network == NetworkType.MAINNET ? CONTRACTS.MAINNET.ethereum.token_bridge : CONTRACTS.TESTNET.ethereum.token_bridge;
        const BRIDGE = quote.network == NetworkType.MAINNET ? CONTRACTS.MAINNET.ethereum.core : CONTRACTS.TESTNET.ethereum.core;

        const receipt = await transferFromEthNative(
            TOKEN_BRIDGE,
            quote.fromWallet as ethers.Signer,
            parseEther(quote.amountIn),
            CHAINS.algorand,
            hexToUint8Array(
                tryNativeToHexString(
                    quote.toAddress,
                    CHAINS.algorand
                ) || ""
            ),
        );

        return {quote, receipt, status: BRIDGE_STATUS.WAITING_FOR_SEND_CONFIRMATION, bridge: BRIDGE, tokenBridge: TOKEN_BRIDGE}
    }

    private performNextEthereumStep(update: EthereumUpdate){
        switch(update.status){
            case BRIDGE_STATUS.WAITING_FOR_SEND_CONFIRMATION:
                return this.waitForEthereumSendConfirmation(update);
            case BRIDGE_STATUS.SEND_CONFIRMED:
                return this.receiveOnAlgorandChain(update);
            case BRIDGE_STATUS.RECEIVING:
                return this.waitForReceiptOnAlgorandChain(update);     
            default:
                return {...update, status: BRIDGE_STATUS.SUCCESS}
        }
    }

    private async performNextAlgorandStep(update: AlgorandUpdate){
        switch(update.status){
            case BRIDGE_STATUS.WAITING_FOR_SEND_CONFIRMATION:
                return await this.waitForAlgorandSendConfirmation(update);
            case BRIDGE_STATUS.SEND_CONFIRMED:
                return await this.receiveOnNonAlgorandChain(update);
            case BRIDGE_STATUS.RECEIVING:
                return await this.waitForReceiptConfirmationOnNonAlgorandChain(update);
            default:
                return {...update, status: BRIDGE_STATUS.SUCCESS}
        }
    }

    private async waitForEthereumSendConfirmation(update: EthereumUpdate){
        const sequence = parseSequenceFromLogEth(
            update.receipt,
            update.bridge,
          );
          const emitterAddress = getEmitterAddressEth(
            update.tokenBridge
          );
          const { vaaBytes } = await this.getSignedVAAWithRetry(
            CHAINS.ethereum,
            emitterAddress,
            sequence,
            update.quote.network
          );

        return {...update, vaaBytes, status: BRIDGE_STATUS.SEND_CONFIRMED};

    }


    private async waitForAlgorandSendConfirmation(update: AlgorandUpdate){
        const sequence = parseSequenceFromLogAlgorand(update.result);
        const emitterAddress = getEmitterAddressAlgorand(update.tokenBridge);

        const { vaaBytes } = await this.getSignedVAAWithRetry(
            CHAINS.algorand,
            emitterAddress,
            sequence,
            update.quote.network
        );

        return {...update, signedVAA: vaaBytes, status: BRIDGE_STATUS.SEND_CONFIRMED};
    }

    private async getSignedVAAWithRetry (
        emitterChain: ChainId | ChainName,
        emitterAddress: string,
        sequence: string,
        network: NetworkType,
        retryAttempts?: number
      ): Promise<GetSignedVAAWithRetryResult> {
        const WORMHOLE_RPC_HOSTS = getWormHoleRpchost(network);
        let currentWormholeRpcHost = -1;
        const getNextRpcHost = () =>
          ++currentWormholeRpcHost % WORMHOLE_RPC_HOSTS.length;
        let attempts = 0;
        while (true) {
          attempts++;
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const rpcHost = WORMHOLE_RPC_HOSTS[getNextRpcHost()];
          const results = await Promise.allSettled([
            getSignedVAA(rpcHost, emitterChain, emitterAddress, sequence),
            getGovernorIsVAAEnqueued(rpcHost, emitterChain, emitterAddress, sequence),
          ]);
          if (results[0].status === "fulfilled") {
            return { vaaBytes: results[0].value.vaaBytes, isPending: false };
          }
          if (results[1].status === "fulfilled" && results[1].value.isEnqueued) {
            return { vaaBytes: undefined, isPending: true };
          }
          if (retryAttempts !== undefined && attempts > retryAttempts) {
            throw new Error(results[0].reason);
          }
        }
      };
    

      private async receiveOnNonAlgorandChain(update: AlgorandUpdate) {
        switch(update.quote.toChainName) {
            case Chains.ETH: 
                return this.receiveOnEth(update);
            default:
                return {...update, status: BRIDGE_STATUS.FAILED};

        }
      }

      private async waitForReceiptConfirmationOnNonAlgorandChain(update: AlgorandUpdate) {
        switch(update.quote.toChainName) {
            case Chains.ETH: 
                return this.waitForReceiptConfirmationOnEth(update);
            default:
                return {...update, status: BRIDGE_STATUS.FAILED};

        }
      }

      
      private async receiveOnEth(update:AlgorandUpdate) {
        const TOKEN_BRIDGE = update.quote.network == NetworkType.MAINNET ? CONTRACTS.MAINNET.ethereum.token_bridge : CONTRACTS.TESTNET.ethereum.token_bridge;
        await redeemOnEthNative(TOKEN_BRIDGE, update.quote.toWallet, update.vaaBytes as Uint8Array);

        return {...update, status: BRIDGE_STATUS.RECEIVING};
      }


      private async waitForReceiptConfirmationOnEth(update:AlgorandUpdate) {
        const TOKEN_BRIDGE = update.quote.network == NetworkType.MAINNET ? CONTRACTS.MAINNET.ethereum.token_bridge : CONTRACTS.TESTNET.ethereum.token_bridge;
        let transferCompleted = await getIsTransferCompletedEth(
            TOKEN_BRIDGE,
            update.quote.toWallet,
            update.vaaBytes as Uint8Array
        );
        while (!transferCompleted) {
            await new Promise((r) => setTimeout(r, 5000)); //@Todo not sure why at intervals of 5seconds
            transferCompleted = await getIsTransferCompletedEth(
                TOKEN_BRIDGE,
                update.quote.toWallet,
                update.vaaBytes as Uint8Array
            );
        }

        return {...update, status: BRIDGE_STATUS.SUCCESS};
      }

      private async receiveOnAlgorandChain(update: WormHoleUpdate<any>) {
        const algodClient = getAlgoClient(update.quote.network);
        const bridges = this.getAlgorandBridges(update.quote.network);

        const txs = await redeemOnAlgorand(
            algodClient,
            bridges.tokenBridge,
            bridges.bridge,
            update.vaaBytes as Uint8Array,
            update.quote.fromAddress
        );

        const signedTxs = await this.signAlgorandTransactions(update.quote.toWalletType, update.quote.toWallet, txs);
        if(signedTxs){
            await getAlgoClient(update.quote.network).sendRawTransaction(signedTxs).do();
        }

        await this.waitForTransactionOnAlgorand(txs[txs.length - 1].tx.txID(), update.quote.network);

        return {...update, status: BRIDGE_STATUS.RECEIVING};

      }

      private async waitForReceiptOnAlgorandChain(update: WormHoleUpdate<any>) {
        const algodClient = getAlgoClient(update.quote.network);
        const bridges = this.getAlgorandBridges(update.quote.network);

        let transferCompleted = await getIsTransferCompletedAlgorand(
            algodClient,
            bridges.tokenBridge,
            update.vaaBytes as Uint8Array
        );

        while (!transferCompleted) {
            await new Promise((r) => setTimeout(r, 5000)); //@Todo not sure why at intervals of 5seconds
            transferCompleted = await getIsTransferCompletedAlgorand(
                algodClient,
                bridges.tokenBridge,
                update.vaaBytes as Uint8Array
            );
        }


        return {...update, status: BRIDGE_STATUS.SUCCESS};

      }


      private  getAlgorandBridges(network: NetworkType) {

        const TOKEN_BRIDGE_ID = BigInt(network == NetworkType.MAINNET ? CONTRACTS.MAINNET.algorand.token_bridge : CONTRACTS.TESTNET.algorand.token_bridge);
        const BRIDGE_ID = BigInt(network == NetworkType.MAINNET ? CONTRACTS.MAINNET.algorand.core : CONTRACTS.TESTNET.algorand.core);

        return {tokenBridge: TOKEN_BRIDGE_ID, bridge: BRIDGE_ID}
      }

      private async signAlgorandTransactions(walletType: string, wallet: any, txs: TransactionSignerPair[]): Promise<Uint8Array[] | undefined> {

        switch(walletType){
            case ALGORAND_WALLETS.MyAlgo:
                return await this.signUsingMyAlgoWallet(wallet, txs);
            case ALGORAND_WALLETS.Pera:
                return undefined; //@Todo  update  this
            default:
                break;
        }        
      }

      private async waitForTransactionOnAlgorand(txID: string, network: NetworkType)  {
        return await waitForConfirmation(
            getAlgoClient(network),
            txID,
            ALGORAND_WAIT_FOR_CONFIRMATIONS
          );
      }

}