import { Assets, Networks } from "../../config";
import { Quote, QuoteRequest, Update } from "../../types";
import { BaseBridgeProvider } from "../baseBridgeProvider";

const solAssets = Assets[Networks.SOL];
const algoAssets = Assets[Networks.ALGO];
const baseURL =  'https://api.glitterfinance.org/api'

export class GlitterBridgeProvider implements BaseBridgeProvider {

      readonly supportedAssetsMaps = {
        [Networks.SOL]: [
            [solAssets.xALGO?.symbol, algoAssets.ALGO?.symbol], 
            [solAssets.SOLANA?.symbol, algoAssets.xSOL?.symbol], 
            [solAssets.USDCs?.symbol, algoAssets.USDCa?.symbol] 
        ],
        [Networks.ALGO]: [
            [algoAssets.ALGO?.symbol, solAssets.xALGO?.symbol],
            [algoAssets.xSOL?.symbol, solAssets.SOLANA?.symbol],
            [algoAssets.USDCa?.symbol, solAssets.USDCs?.symbol]
        ]
    }


    public supportedNetworks() {
        return [Networks.ALGO, Networks.SOL];
    }

    public  supportedAssetsByNetwork(network: string){
        return this.supportedAssetsMaps[network].map(assetMap => assetMap[0]);
    }

    public async getFee (asset: any) {
        try {
            const url = new URL(`${baseURL}/fee/${asset}`)
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error("Data not found");
            }
            const result = await response.json();
            console.log(result)
            return result;
          } catch (err) {
            console.error(err);
          }
    }

    public  async getPrice (asset: any) {
        try {
            const url = new URL(`${baseURL}/release/${asset}`)
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error("Data not found");
            }
            const result = await response.json();
            console.log(result)
            return result;
          } catch (err) {
            console.error(err);
          }
    }
      

    public async getQuote(quoteRequest: QuoteRequest) {

        const nonAlgorandNetwork = quoteRequest.fromNetworkName === Networks.ALGO ? quoteRequest.toNetworkName : quoteRequest.fromNetworkName;

        // Check if network is supported
        if(!this.supportedNetworks().includes(nonAlgorandNetwork)) return null;

        // Check if asset is supported
        if(!this.supportedAssetsByNetwork(nonAlgorandNetwork).includes(quoteRequest.assetName)) return null;

        // Get Quote ...

        const assetReturnPrice = await this.getFee(""); 

        const assetFee = await this.getPrice("");


    }

    public  moveAsset(quote: any) {

    }
        
    public  performNextStep(update: any) {

    }
}
