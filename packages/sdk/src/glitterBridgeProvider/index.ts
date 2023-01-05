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

    private async getFee (asset: any) {
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

    private  async getPrice (asset: any) {
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

    private async _getQuote (quoteRequest: QuoteRequest) {
        
        // xAlgo from solana to Algo
        if (quoteRequest.assetName == solAssets.xALGO?.symbol) {

            const xALGOFee = await this.getFee(solAssets.xALGO?.symbol);
            const xALGORelease = await this.getPrice(solAssets.xALGO?.symbol) 
            return {
                assetName: algoAssets.ALGO?.symbol,
                fromNetworkName: Networks.SOL,
                toNetworkName: Networks.ALGO,
                amountIn: quoteRequest.amountIn,
                amountOut: xALGORelease * Number(quoteRequest.amountIn),
                gasFeeEstimate: xALGOFee,
                bridgeProviderId: null
            }
        } 

        // Algo from Algorand to Solana 
        else if (quoteRequest.assetName == algoAssets.ALGO?.symbol) {

            const ALGOFee = await this.getFee(algoAssets.ALGO?.symbol);
            const ALGORelease = await this.getPrice(algoAssets.ALGO?.symbol) 

            return {
                assetName: solAssets.xALGO?.symbol,
                fromNetworkName: Networks.ALGO,
                toNetworkName: Networks.SOL,
                amountIn: quoteRequest.amountIn,
                amountOut: ALGORelease * Number(quoteRequest.amountIn),
                gasFeeEstimate: ALGOFee,
                bridgeProviderId: null
            }
        }
        
        // SOl from solana to algorand
        else if (quoteRequest.assetName == solAssets.SOLANA?.symbol) {
            const SOLFee = await this.getFee(solAssets.SOLANA?.symbol);
            const SOLRelease = await this.getPrice(solAssets.SOLANA?.symbol) 

            return {
                assetName: algoAssets.xSOL?.symbol,
                fromNetworkName: Networks.SOL,
                toNetworkName: Networks.ALGO,
                amountIn: quoteRequest.amountIn,
                amountOut: Number(quoteRequest.amountIn) * SOLRelease,
                gasFeeEstimate: SOLFee,
                bridgeProviderId: null
            }
        }


        // xSOL from algorand to solana 
        else if (quoteRequest.assetName == algoAssets.xSOL?.symbol) {
            const xSOLFee = await this.getFee(algoAssets.xSOL?.symbol);
            const xSOLRelease = await this.getPrice(algoAssets.xSOL?.symbol) 

            return {
                assetName: solAssets.SOLANA?.symbol,
                fromNetworkName: Networks.ALGO,
                toNetworkName: Networks.SOL,
                amountIn: quoteRequest.amountIn,
                amountOut: Number(quoteRequest.amountIn) * xSOLRelease,
                gasFeeEstimate: xSOLFee,
                bridgeProviderId:  null 
            }

        }

        // USDCs from solana to Algorand
        else if (quoteRequest.assetName  ==  solAssets.USDCs?.symbol) {
            const USDcFee = await this.getFee( solAssets.USDCs?.symbol);
            const USDcRelease = await this.getPrice(solAssets.USDCs?.symbol) 
         
                return {
                        assetName: algoAssets.USDCa?.symbol,
                        fromNetworkName: Networks.SOL,
                        toNetworkName: Networks.ALGO,
                        amountIn: quoteRequest.amountIn,
                        amountOut: Number(quoteRequest.amountIn) * USDcRelease,
                        gasFeeEstimate: USDcFee,
                        bridgeProviderId: null  
                    }
        
        }

        // USDCa from algorand to Solana 
        else if (quoteRequest.assetName == algoAssets.USDCa?.symbol) {
            const USDaFee = await this.getFee( algoAssets.USDCa?.symbol);
            const USDaRelease = await this.getPrice(algoAssets.USDCa?.symbol)

            return {
                assetName: solAssets.USDCs?.symbol,
                fromNetworkName: Networks.ALGO,
                toNetworkName: Networks.SOL,
                amountIn: quoteRequest.amountIn,
                amountOut: Number(quoteRequest.amountIn) * USDaRelease,
                gasFeeEstimate: USDaFee,
                bridgeProviderId: null
            }
        }

        
    }
      

    public async getQuote(quoteRequest: QuoteRequest) {

        const nonAlgorandNetwork = quoteRequest.fromNetworkName === Networks.ALGO ? quoteRequest.toNetworkName : quoteRequest.fromNetworkName;

        // Check if network is supported
        if(!this.supportedNetworks().includes(nonAlgorandNetwork)) return null;

        // Check if asset is supported
        if(!this.supportedAssetsByNetwork(nonAlgorandNetwork).includes(quoteRequest.assetName)) return null;

        // Get Quote ...

        return await this._getQuote(quoteRequest)

    }

    public  moveAsset(quote: any) {

    }
        
    public  performNextStep(update: any) {

    }
}
