import { CHAINS, CONTRACTS, ethers_contracts, hexToUint8Array, transferFromEthNative, tryNativeToHexString, tryNativeToUint8Array } from "@certusone/wormhole-sdk";
import { nativeStringToHexAlgorand } from "@certusone/wormhole-sdk/lib/cjs/algorand";
import { ethers, Signer } from "ethers";
import { ALGORAND_WALLETS, Assets, BRIDGE_FROM_ETHEREUM_STATUS, Chains } from "../../config";
import { NetworkType, Quote, QuoteRequest, Update } from "../../types";
import { BaseBridgeProvider } from "../baseBridgeProvider";
import { getNonAlgorandChain } from "../utils";
import { EthereumUpdate } from "./types";


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
            [Chains.ETH]: [[ethMainnetAssets.ETH.symbol, algoMainnetAssets.WETH.symbol]]
        }
    }

    public supportedChains(network: NetworkType) { 
        return [Chains.ETH];
    }

    public supportedAssetsByChain(chain: string, network: NetworkType) {
        return this.supportedAssetsMaps[network][chain].map(assetMap => assetMap[0]);
    }

    public getQuote(quoteRequest: QuoteRequest) {

        const nonAlgorandChain = getNonAlgorandChain({from: quoteRequest.fromChainName, to: quoteRequest.toChainName});

        // Check if chain is supported
        if(!this.supportedChains(quoteRequest.network).includes(nonAlgorandChain)) return null;

        // Check if asset is supported
        if(!this.supportedAssetsByChain(nonAlgorandChain, quoteRequest.network).includes(quoteRequest.assetName)) return null;


        // Get Quote ...
    }

    public moveAsset(quote: Quote)  {
        if(quote.fromChainName == Chains.ALGO) 
            return this.moveAssetFromAlgorand(quote);

        const nonAlgorandChain = getNonAlgorandChain({from: quote.fromChainName, to: quote.toChainName});
        switch(nonAlgorandChain) {
            case Chains.ETH: 
                return this.moveAssetFromEthereum(quote);
            default:
                break;
        }
    }


    public performNextStep(update: Update) {
        switch(update.quote.fromChainName){
            case Chains.ETH:
                return this.performNextEthereumStep(update as EthereumUpdate);
            default:
                return null;
        }
    }

    private moveAssetFromAlgorand(quote: Quote) {
        switch(quote.fromWallet){
            case ALGORAND_WALLETS.MyAlgo:
                return this.moveUsingMyAlgoWallet(quote);
            case ALGORAND_WALLETS.Pera:
                return this.moveUsingPeraWallet(quote);
            default:
                return null;
        }
    }

    private moveUsingMyAlgoWallet(quote: Quote) {

    }

    private moveUsingPeraWallet(quote: Quote) {

    }

    private async moveAssetFromEthereum(quote: Quote<ethers.providers.JsonRpcSigner>): Promise<EthereumUpdate> {

        const TOKEN_BRIDGE = quote.network == NetworkType.MAINNET ? CONTRACTS.MAINNET.ethereum.token_bridge : CONTRACTS.TESTNET.ethereum.token_bridge;

        const receipt = await transferFromEthNative(
            TOKEN_BRIDGE,
            quote.fromWallet as ethers.Signer,
            quote.amountIn,
            CHAINS.algorand,
            hexToUint8Array(
                tryNativeToHexString(
                    quote.toAddress,
                    CHAINS.algorand
                ) || ""
            ),
        );

        return {quote, receipt, status: BRIDGE_FROM_ETHEREUM_STATUS.WAITING_FOR_SEND_CONFIRMATION}
    }

    private performNextEthereumStep(update: EthereumUpdate){
        switch(update.status){
            case BRIDGE_FROM_ETHEREUM_STATUS.WAITING_FOR_SEND_CONFIRMATION:
                this.waitForEthereumSendConfirmation(update.receipt);
                return {...update, status: BRIDGE_FROM_ETHEREUM_STATUS.SEND_CONFIRMED};
            
            default:
                return {...update, status: BRIDGE_FROM_ETHEREUM_STATUS.SUCCESS}
        }
    }

    private waitForEthereumSendConfirmation(receipt: any){

    }

}