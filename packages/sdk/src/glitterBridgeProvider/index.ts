import { Assets, Chains } from "../../config";
import { NetworkType, Quote, QuoteRequest, Update } from "../../types";
import { BaseBridgeProvider } from "../baseBridgeProvider";
import { getNonAlgorandChain } from "../utils";

const solMainnetAssets = Assets.Mainnet.SOL;
const solTestnetAssets = Assets.Testnet.SOL;
const algoMainnetAssets = Assets.Mainnet.ALGO;
const algoTestnetAssets = Assets.Testnet.ALGO;
const baseURL =  'https://api.glitterfinance.org/api'

export class GlitterBridgeProvider implements BaseBridgeProvider {

      readonly supportedAssetsMaps = {        
        [NetworkType.MAINNET]: {
          [Chains.SOL]: [
            [solMainnetAssets.xALGO?.symbol, algoMainnetAssets.ALGO.symbol], 
            [solMainnetAssets.SOLANA?.symbol, algoMainnetAssets.xSOL.symbol], 
            [solMainnetAssets.USDCs?.symbol, algoMainnetAssets.USDCa.symbol] 
          ],
        },
        [NetworkType.TESTNET]: {
            [Chains.SOL]: [
              [solTestnetAssets.xALGO?.symbol, algoTestnetAssets.ALGO.symbol], 
              [solTestnetAssets.SOLANA?.symbol, algoTestnetAssets.xSOL.symbol], 
              [solTestnetAssets.USDCs?.symbol, algoTestnetAssets.USDCa.symbol] 
            ],        
        }
      };


    public supportedChains(network: NetworkType) { 
        return [Chains.SOL];
    }

    public supportedAssetsByChain(chain: string, network: NetworkType) {
        return this.supportedAssetsMaps[network][chain].map(assetMap => assetMap[0]);
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

        const nonAlgorandChain = getNonAlgorandChain({from: quoteRequest.fromChainName, to: quoteRequest.toChainName});

        // Check if chain is supported
        if(!this.supportedChains(quoteRequest.network).includes(nonAlgorandChain)) return null;

        // Check if asset is supported
        if(!this.supportedAssetsByChain(nonAlgorandChain, quoteRequest.network).includes(quoteRequest.assetName)) return null;

        // Get Quote ...

        return await this._getQuote(quoteRequest)

    }

    public  moveAsset(quote: any) {

    }
        
    public  performNextStep(update: any) {

    }
}
