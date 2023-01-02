import { Assets, Networks } from "../../config";
import { Quote, QuoteRequest, Update } from "../../types";
import { BaseBridgeProvider } from "../baseBridgeProvider";

const solAssets = Assets[Networks.SOL];
const algoAssets = Assets[Networks.ALGO];

export class WormHoleBridgeProvider implements BaseBridgeProvider  {
   
    readonly supportedAssetsMaps = {
        [Networks.SOL]: [[solAssets.xALGO?.symbol, algoAssets.ALGO?.symbol],  [] , [] ]
    }

    public supportedNetworks() { 
        return [Networks.ALGO, Networks.SOL];
    }

    public supportedAssetsByNetwork(network: string) {
        return this.supportedAssetsMaps[network].map(assetMap => assetMap[0]);
    }

    public getQuote(quoteRequest: QuoteRequest) {

        const nonAlgorandNetwork = quoteRequest.fromNetworkName === Networks.ALGO ? quoteRequest.toNetworkName : quoteRequest.fromNetworkName;

        // Check if network is supported
        if(!this.supportedNetworks().includes(nonAlgorandNetwork)) return null;

        // Check if asset is supported
        if(!this.supportedAssetsByNetwork(nonAlgorandNetwork).includes(quoteRequest.assetName)) return null;


        // Get Quote ...
    }

    public moveAsset(quote: Quote)  {
        
    }

    public performNextStep(update: Update) {
        
    }


}