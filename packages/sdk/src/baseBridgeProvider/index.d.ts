import { NetworkType, Quote, QuoteRequest, Update } from "../types";
export declare abstract class BaseBridgeProvider {
    abstract supportedChains(network: NetworkType): Array<string>;
    abstract supportedAssetsByChain(chain: string, network: NetworkType): string[];
    abstract moveAsset(quote: Quote): Promise<Update>;
    abstract performNextStep(update: Update): Promise<Update>;
    abstract getQuote(quoteRequest: QuoteRequest): Promise<Quote | null>;
}
//# sourceMappingURL=index.d.ts.map