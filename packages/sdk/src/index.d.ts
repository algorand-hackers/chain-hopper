import { NetworkType, Quote, QuoteRequest, Update } from "./types";
export declare function allSupportedChains(network: NetworkType): string[];
export declare function supportedAssetsByChain(chain: string, network: NetworkType): string[];
export declare function getQuotes(quoteRequest: QuoteRequest): Promise<Quote[]>;
export declare function moveAsset(quote: Quote): Promise<Update>;
export declare function performNextStep(update: Update): Promise<Update>;
//# sourceMappingURL=index.d.ts.map