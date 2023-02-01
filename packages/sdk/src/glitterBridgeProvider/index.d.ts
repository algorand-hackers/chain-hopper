import { NetworkType, Quote, QuoteRequest, Update } from "../types";
import { BaseBridgeProvider } from "../baseBridgeProvider";
export declare class GlitterBridgeProvider implements BaseBridgeProvider {
    readonly supportedAssetsMaps: {
        mainnet: {
            [x: string]: string[][];
        };
        testnet: {
            [x: string]: string[][];
        };
    };
    supportedChains(network: NetworkType): string[];
    supportedAssetsByChain(chain: string, network: NetworkType): string[];
    getQuote(quoteRequest: QuoteRequest): Promise<Quote | null>;
    moveAsset(quote: Quote): Promise<Update>;
    performNextStep(_update: any): Promise<Update>;
    private getFee;
    private getPrice;
    private _getQuote;
    private bridgeAlgoToxAlgo;
    private bridgexAlgoToAlgo;
    private bridgeSolToxSol;
    private bridgexSolToSol;
}
//# sourceMappingURL=index.d.ts.map