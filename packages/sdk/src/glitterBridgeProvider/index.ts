import { Assets, Chains, BRIDGE_STATUS } from "../config";
import { AssetKeys, BridgeId, NetworkType, Quote, QuoteRequest, Update } from "../types";
import { BaseBridgeProvider } from "../baseBridgeProvider";
import { getNonAlgorandChain } from "../utils";
import { GlitterBridgeSDK } from 'glitter-bridge-sdk';


const baseURL =  'https://api.glitterfinance.org/api'

const sdk = new GlitterBridgeSDK();

const algorand = sdk.algorand;
const solana = sdk.solana;

const solMainnetAssets = Assets[NetworkType.MAINNET][Chains.SOL];
const algoMainnetAssets = Assets[NetworkType.MAINNET][Chains.ALGO];
const solTestnetAssets = Assets[NetworkType.TESTNET][Chains.SOL];
const algoTestnetAssets = Assets[NetworkType.TESTNET][Chains.ALGO];

export class GlitterBridgeProvider implements BaseBridgeProvider {

      readonly supportedAssetsMaps = {        
        [NetworkType.MAINNET]: {
          [Chains.SOL]: [
            [AssetKeys.xALGO_Glitter, AssetKeys.ALGO], 
            [AssetKeys.SOL, AssetKeys.xSOL_Glitter], 
            [AssetKeys.USDCs, AssetKeys.USDCa] 
          ],
        },
        [NetworkType.TESTNET]: {
            [Chains.SOL]: [
              [AssetKeys.xALGO_Glitter, AssetKeys.ALGO], 
              [AssetKeys.SOL, AssetKeys.xSOL_Glitter], 
              [AssetKeys.USDCs, AssetKeys.USDCa] 
            ],        
        }
      };


    public supportedChains(network: NetworkType) { 
         return [Chains.SOL];
    }

    public supportedDepositAssetsByChain(chain: string, network: NetworkType) {
        return this.supportedAssetsMaps[network][chain].map(assetMap => assetMap[0]);
    }

    private supportedWithdrawAssetsByChain(chain: string, network: NetworkType) {
      return this.supportedAssetsMaps[network][chain].map(assetMap => assetMap[1]);
    }

    public supportedWithdrawalAssets(network: NetworkType) {
      let assets = new Set();
      this.supportedChains(network).forEach(chain => {
        this.supportedWithdrawAssetsByChain(chain, network).forEach(asset => assets.add(asset));
      });

      return Array.from(assets) as AssetKeys[];
    }
    
    public supportedChainsByWithdrawalAsset(network: NetworkType, asset: AssetKeys) {
      return  this.supportedChains(network).filter(chain => 
        this.supportedWithdrawAssetsByChain(chain, network).includes(asset)
      )
    }
   

    public async getQuote(quoteRequest: QuoteRequest): Promise<Quote | null> {

        const nonAlgorandChain = getNonAlgorandChain({from: quoteRequest.fromChainName, to: quoteRequest.toChainName});

        // Check if chain is supported
        if(!this.supportedChains(quoteRequest.network).includes(nonAlgorandChain)) return null;

        // Check if asset is supported
        const  supportedDepositAssets = this.supportedDepositAssetsByChain(nonAlgorandChain, quoteRequest.network);
        const  supportedWithdrawAssets = this.supportedWithdrawAssetsByChain(nonAlgorandChain, quoteRequest.network);

        if(!supportedDepositAssets.includes(quoteRequest.assetKey) && !supportedWithdrawAssets.includes(quoteRequest.assetKey)) return null;

        // Get Quote ...

        return await this._getQuote(quoteRequest)

    }

    public async moveAsset(quote: Quote):Promise<Update> {
      if(quote.assetKey == AssetKeys.ALGO){
       return  this.bridgeAlgoToxAlgo(quote)
      }

      else if (quote.assetKey == AssetKeys.xALGO_Glitter){
        return this.bridgexAlgoToAlgo(quote)
      }

      else if (quote.assetKey ==  AssetKeys.SOL){
        return this.bridgeSolToxSol(quote)
      }

      else {
        return this.bridgexAlgoToAlgo(quote)
      } 

    }
        
    public  performNextStep(_update: any): Promise<Update> {
      throw Error('Not Implemented');
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
      if (quoteRequest.assetKey == AssetKeys.xALGO_Glitter) {

          const xALGOFee = await this.getFee(AssetKeys.xALGO_Glitter);
          const xALGORelease = await this.getPrice(AssetKeys.xALGO_Glitter) 
          return {
            ...quoteRequest,
              outputAssetKey: AssetKeys.ALGO,
              fromChainName: Chains.SOL,
              toChainName: Chains.ALGO,
              amountIn: quoteRequest.amountIn,
              amountOut: xALGORelease * Number(quoteRequest.amountIn),
              gasFeeEstimate: xALGOFee,
              bridgeId: BridgeId.Glitter
          }
      } 

      // Algo from Algorand to Solana 
      else if (quoteRequest.assetKey == AssetKeys.ALGO) {

          const ALGOFee = await this.getFee(AssetKeys.ALGO);
          const ALGORelease = await this.getPrice(AssetKeys.ALGO) 

          return {
            ...quoteRequest,
              outputAssetKey: AssetKeys.xALGO_Glitter,
              fromChainName: Chains.ALGO,
              toChainName: Chains.SOL,
              amountIn: quoteRequest.amountIn,
              amountOut: ALGORelease * Number(quoteRequest.amountIn),
              gasFeeEstimate: ALGOFee,
              bridgeId: BridgeId.Glitter
          }
      }
      
      // SOl from solana to algorand
      else if (quoteRequest.assetKey == AssetKeys.SOL) {
          const SOLFee = await this.getFee(AssetKeys.SOL);
          const SOLRelease = await this.getPrice(AssetKeys.SOL) 

          return {
            ...quoteRequest,
              outputAssetKey: AssetKeys.xSOL_Glitter,
              fromChainName: Chains.SOL,
              toChainName: Chains.ALGO,
              amountIn: quoteRequest.amountIn,
              amountOut: Number(quoteRequest.amountIn) * SOLRelease,
              gasFeeEstimate: SOLFee,
              bridgeId: BridgeId.Glitter
          }
      }


      // xSOL from algorand to solana 
      else if (quoteRequest.assetKey == AssetKeys.xSOL_Glitter) {
          const xSOLFee = await this.getFee(AssetKeys.xSOL_Glitter);
          const xSOLRelease = await this.getPrice(AssetKeys.xSOL_Glitter) 

          return {
            ...quoteRequest,
              outputAssetKey: AssetKeys.SOL,
              fromChainName: Chains.ALGO,
              toChainName: Chains.SOL,
              amountIn: quoteRequest.amountIn,
              amountOut: Number(quoteRequest.amountIn) * xSOLRelease,
              gasFeeEstimate: xSOLFee,
              bridgeId: BridgeId.Glitter
          }

      }

      // USDCs from solana to Algorand
      else if (quoteRequest.assetKey  ==  AssetKeys.USDCs) {
          const USDcFee = await this.getFee( AssetKeys.USDCs);
          const USDcRelease = await this.getPrice(AssetKeys.USDCs) 
       
              return {
                      ...quoteRequest,
                      outputAssetKey: AssetKeys.USDCa,
                      fromChainName: Chains.SOL,
                      toChainName: Chains.ALGO,
                      amountIn: quoteRequest.amountIn,
                      amountOut: Number(quoteRequest.amountIn) * USDcRelease,
                      gasFeeEstimate: USDcFee,
                      bridgeId: BridgeId.Glitter
                    }
      
      }

      // USDCa from algorand to Solana 
      else if (quoteRequest.assetKey == AssetKeys.USDCa) {
          const USDaFee = await this.getFee( AssetKeys.USDCa);
          const USDaRelease = await this.getPrice(AssetKeys.USDCa)

          return {
              ...quoteRequest,
              outputAssetKey: AssetKeys.USDCs,
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
  
    let startingBalance = await solana?.getTokenBalance(quote.toAddress, solMainnetAssets[AssetKeys.xALGO_Glitter].symbol);
    let bridged = await algorand?.bridge(quote.fromWallet, algoMainnetAssets[AssetKeys.ALGO].symbol, Chains.SOL,quote.toAddress, solMainnetAssets[AssetKeys.xALGO_Glitter].symbol, Number(quote.amountIn));
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
   let bridged = await solana?.bridge(quote.fromWallet, solMainnetAssets[AssetKeys.xALGO_Glitter].symbol, Chains.ALGO, quote.toAddress, algoMainnetAssets[AssetKeys.ALGO].symbol, Number(quote.amountIn));
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

   let startingBalance = await algorand?.getTokenBalance(quote.toAddress, algoMainnetAssets[AssetKeys.xSOL_Glitter].symbol);
   let bridged = await solana?.bridge(quote.fromWallet, solMainnetAssets[AssetKeys.SOL].symbol, Chains.ALGO, quote.toAddress, algoMainnetAssets[AssetKeys.xSOL_Glitter].symbol, Number(quote.amountIn));
   let newBalance = await algorand?.waitForTokenBalanceChange(quote.toAddress, "xSOL", Number(startingBalance),90)

   if (bridged == true) {
    return {quote, status:BRIDGE_STATUS.SUCCESS}
  }
 else  {
  return {quote, status:BRIDGE_STATUS.FAILED}
 }
  }
  
  // Bridge xSol to sol from Algorand to Solana
  private async bridgexSolToSol (quote: Quote) {
    let startingBalance = await solana?.getBalance(quote.toAddress);
    let bridged = await algorand?.bridge(quote.fromWallet, algoMainnetAssets[AssetKeys.xSOL_Glitter].symbol, Chains.SOL, quote.toAddress, solMainnetAssets[AssetKeys.SOL].symbol, Number(quote.amountIn));
    let newBalance = await solana?.waitForBalanceChange(quote.toAddress, Number(startingBalance),90);

    if (bridged == true) {
      return {quote, status:BRIDGE_STATUS.SUCCESS}
    }
   else  {
    return {quote, status:BRIDGE_STATUS.FAILED}
   }
  }

  // Returns the erc20 balance for an address on the algorand blockchain 

  public async returnAlgoBalance (address: string, symbol: string) {
    let bal = await algorand?.getTokenBalance(address, symbol); 
    return bal;
  }

   // Returns the erc20 balance for an address on the solana blockchain 

   public async returnSolBalance (address: string, symbol: string)  {
    let bal = await solana?.getTokenBalance(address, symbol); 
    return bal;
  }
  
    
}
