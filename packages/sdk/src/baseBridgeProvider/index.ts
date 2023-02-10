// This class contains a unified list of functions that Frontend will be interacting with
// Each individual bridgeProvider will provide their own implementations for these functions
// However return values should follow a standard format irrespective of the difference in implementation

import { NetworkType, Quote, QuoteRequest, Update } from "../types";

export abstract class BaseBridgeProvider {

    // Return the list of chains supported by this bridgeProvider
    public abstract supportedChains(network: NetworkType): Array<string>;

    // Return the list of assets that can be deposited into Algorand from the specified chain and network
    public abstract supportedDepositAssetsByChain(chain: string, network: NetworkType): string[];

    // Return the list of assets that can be withdrawn from algorand into the the chain and network spcified
    public abstract supportedWithdrawAssetsByChain(chain: string, network: NetworkType): string[];

    public abstract moveAsset(quote: Quote): Promise<Update>;
        
    public abstract performNextStep(update: Update): Promise<Update>;

    public abstract getQuote(quoteRequest: QuoteRequest): Promise<Quote | null>;
    
    // ...Add other common functions

}