import { Assets, Chains } from "../../config";
import { BridgeId, NetworkType, Quote, QuoteRequest, Update } from "../../types";
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

    private async _getQuote (quoteRequest: QuoteRequest): Promise<Quote | null> {
        
        // xAlgo from solana to Algo
        if (quoteRequest.assetName == solMainnetAssets.xALGO?.symbol) {

            const xALGOFee = await this.getFee(solMainnetAssets.xALGO?.symbol);
            const xALGORelease = await this.getPrice(solMainnetAssets.xALGO?.symbol) 
            return {
              ...quoteRequest,
                assetName: algoMainnetAssets.ALGO?.symbol,
                fromChainName: Chains.SOL,
                toChainName: Chains.ALGO,
                amountIn: quoteRequest.amountIn,
                amountOut: xALGORelease * Number(quoteRequest.amountIn),
                gasFeeEstimate: xALGOFee,
                bridgeId: BridgeId.Glitter
            }
        } 

        // Algo from Algorand to Solana 
        else if (quoteRequest.assetName == algoMainnetAssets.ALGO?.symbol) {

            const ALGOFee = await this.getFee(algoMainnetAssets.ALGO?.symbol);
            const ALGORelease = await this.getPrice(algoMainnetAssets.ALGO?.symbol) 

            return {
              ...quoteRequest,
                assetName: solMainnetAssets.xALGO?.symbol,
                fromChainName: Chains.ALGO,
                toChainName: Chains.SOL,
                amountIn: quoteRequest.amountIn,
                amountOut: ALGORelease * Number(quoteRequest.amountIn),
                gasFeeEstimate: ALGOFee,
                bridgeId: BridgeId.Glitter
            }
        }
        
        // SOl from solana to algorand
        else if (quoteRequest.assetName == solMainnetAssets.SOLANA?.symbol) {
            const SOLFee = await this.getFee(solMainnetAssets.SOLANA?.symbol);
            const SOLRelease = await this.getPrice(solMainnetAssets.SOLANA?.symbol) 

            return {
              ...quoteRequest,
                assetName: algoMainnetAssets.xSOL?.symbol,
                fromChainName: Chains.SOL,
                toChainName: Chains.ALGO,
                amountIn: quoteRequest.amountIn,
                amountOut: Number(quoteRequest.amountIn) * SOLRelease,
                gasFeeEstimate: SOLFee,
                bridgeId: BridgeId.Glitter
            }
        }


        // xSOL from algorand to solana 
        else if (quoteRequest.assetName == algoMainnetAssets.xSOL?.symbol) {
            const xSOLFee = await this.getFee(algoMainnetAssets.xSOL?.symbol);
            const xSOLRelease = await this.getPrice(algoMainnetAssets.xSOL?.symbol) 

            return {
              ...quoteRequest,
                assetName: solMainnetAssets.SOLANA?.symbol,
                fromChainName: Chains.ALGO,
                toChainName: Chains.SOL,
                amountIn: quoteRequest.amountIn,
                amountOut: Number(quoteRequest.amountIn) * xSOLRelease,
                gasFeeEstimate: xSOLFee,
                bridgeId: BridgeId.Glitter
            }

        }

        // USDCs from solana to Algorand
        else if (quoteRequest.assetName  ==  solMainnetAssets.USDCs?.symbol) {
            const USDcFee = await this.getFee( solMainnetAssets.USDCs?.symbol);
            const USDcRelease = await this.getPrice(solMainnetAssets.USDCs?.symbol) 
         
                return {
                        ...quoteRequest,
                        assetName: algoMainnetAssets.USDCa?.symbol,
                        fromChainName: Chains.SOL,
                        toChainName: Chains.ALGO,
                        amountIn: quoteRequest.amountIn,
                        amountOut: Number(quoteRequest.amountIn) * USDcRelease,
                        gasFeeEstimate: USDcFee,
                        bridgeId: BridgeId.Glitter
                      }
        
        }

        // USDCa from algorand to Solana 
        else if (quoteRequest.assetName == algoMainnetAssets.USDCa?.symbol) {
            const USDaFee = await this.getFee( algoMainnetAssets.USDCa?.symbol);
            const USDaRelease = await this.getPrice(algoMainnetAssets.USDCa?.symbol)

            return {
              ...quoteRequest,
                assetName: solMainnetAssets.USDCs?.symbol,
                fromChainName: Chains.ALGO,
                toChainName: Chains.SOL,
                amountIn: quoteRequest.amountIn,
                amountOut: Number(quoteRequest.amountIn) * USDaRelease,
                gasFeeEstimate: USDaFee,
                bridgeId: BridgeId.Glitter
            }
        }

        return null;
        
    }
      

    public async getQuote(quoteRequest: QuoteRequest): Promise<Quote | null> {

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
