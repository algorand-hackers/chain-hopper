import { Assets, Chains, BRIDGE_STATUS } from "../../config";
import { BridgeId, NetworkType, Quote, QuoteRequest, Update } from "../../types";
import { BaseBridgeProvider } from "../baseBridgeProvider";
import { getNonAlgorandChain } from "../utils";
import { GlitterBridgeSDK, BridgeNetworks, GlitterNetworks } from 'glitter-bridge-sdk';
const path = require('path');
const util = require('util');
const fs = require('fs');

const solMainnetAssets = Assets.Mainnet.SOL;
const algoMainnetAssets = Assets.Mainnet.ALGO;
const solTestnetAssets = Assets.Testnet.SOL;
const algoTestnetAssets = Assets.Testnet.ALGO;
const baseURL =  'https://api.glitterfinance.org/api'

const sdk = new GlitterBridgeSDK()
            .setEnvironment(GlitterNetworks.mainnet)
            .connect([BridgeNetworks.algorand, BridgeNetworks.solana]);

const algorand = sdk.algorand;
const solana = sdk.solana;

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
   

    public async getQuote(quoteRequest: QuoteRequest): Promise<Quote | null> {

        const nonAlgorandChain = getNonAlgorandChain({from: quoteRequest.fromChainName, to: quoteRequest.toChainName});

        // Check if chain is supported
        if(!this.supportedChains(quoteRequest.network).includes(nonAlgorandChain)) return null;

        // Check if asset is supported
        if(!this.supportedAssetsByChain(nonAlgorandChain, quoteRequest.network).includes(quoteRequest.assetName)) return null;

        // Get Quote ...

        return await this._getQuote(quoteRequest)

    }

    public async moveAsset(quote: Quote):Promise<Update> {
      if(quote.assetName == algoMainnetAssets.ALGO?.symbol){
       return  this.bridgeAlgoToxAlgo(quote)
      }

      else if (quote.assetName == solMainnetAssets.xALGO?.symbol){
        return this.bridgexAlgoToAlgo(quote)
      }

      else if (quote.assetName ==  solMainnetAssets.SOLANA?.symbol){
        return this.bridgeSolToxSol(quote)
      }

      else {
        return this.bridgexAlgoToAlgo(quote)
      } 

    }
        
    public  performNextStep(update: any) {

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

  // Bridge Algo xAlgo from Algorand to Solana
  private async bridgeAlgoToxAlgo (quote: Quote) {
  
    let startingBalance = await solana?.getTokenBalance(quote.toAddress, solMainnetAssets.xALGO?.symbol);
    let bridged = await algorand?.bridge(quote.fromWallet, algoMainnetAssets.ALGO?.symbol, Chains.SOL,quote.toAddress, solMainnetAssets.xALGO?.symbol, Number(quote.amountIn));
    let newBalance = await solana?.waitForTokenBalanceChange(quote.toAddress, "xAlgo", Number(startingBalance),90);
    if (bridged == true) {
      return {quote, status:BRIDGE_STATUS.SUCCESS}
    }
   else  {
    return {quote, status:BRIDGE_STATUS.FAILED}
   }
   
  }

  // Bridge xAlgo to Algo from solana to Algorand
  private async bridgexAlgoToAlgo (quote: Quote) {

   let startingBalance = await algorand?.getBalance(quote.toAddress);
   let bridged = await solana?.bridge(quote.fromWallet, solMainnetAssets.xALGO?.symbol, Chains.ALGO, quote.toAddress, algoMainnetAssets.ALGO.symbol, Number(quote.amountIn));
   let newBalance =    await algorand?.waitForBalanceChange(quote.toAddress, Number(startingBalance),90);

   if (bridged == true) {
    return {quote, status:BRIDGE_STATUS.SUCCESS}
  }
 else  {
  return {quote, status:BRIDGE_STATUS.FAILED}
 }
  }

  // Bridge Sol to xsol from Solana to Algorand
  private async bridgeSolToxSol (quote: Quote) {

   let startingBalance = await algorand?.getTokenBalance(quote.toAddress, algoMainnetAssets.xSOL.symbol);
   let bridged = await solana?.bridge(quote.fromWallet, solMainnetAssets.SOLANA?.symbol, Chains.ALGO, quote.toAddress, algoMainnetAssets.xSOL.symbol, Number(quote.amountIn));
   let newBalance = await algorand?.waitForTokenBalanceChange(quote.toAddress, "xSOL", Number(startingBalance),90)

   if (bridged == true) {
    return {quote, status:BRIDGE_STATUS.SUCCESS}
  }
 else  {
  return {quote, status:BRIDGE_STATUS.FAILED}
 }
  }
  
  //Bridge xSol to sol from Algorand to Solana
  private async bridgexSolToSol (quote: Quote) {
    let startingBalance = await solana?.getBalance(quote.toAddress);
    let bridged = await algorand?.bridge(quote.fromWallet, algoMainnetAssets.xSOL.symbol, Chains.SOL, quote.toAddress, solMainnetAssets.SOLANA?.symbol, Number(quote.amountIn));
    let newBalance = await solana?.waitForBalanceChange(quote.toAddress, Number(startingBalance),90);

    if (bridged == true) {
      return {quote, status:BRIDGE_STATUS.SUCCESS}
    }
   else  {
    return {quote, status:BRIDGE_STATUS.FAILED}
   }
  }

    
}
