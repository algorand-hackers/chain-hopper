// Combine the  supported  assets of all bridge providers and return it. This function is

import { BRIDGE_PROVIDERS } from "../config";
import { BridgeId, NetworkType, Quote, QuoteRequest, Update } from "../types";
import { getBridgeProvider } from "./factory/bridgeProvider";

export function allSupportedChains(network: NetworkType): string[] {
    let chains = new Set();

    Object.values(BridgeId).forEach(bridgeId => {
        getBridgeProvider(bridgeId)?.supportedChains(network).forEach(chain => chains.add(chain));
    })

    return Array.from(chains) as string[];
}

export function supportedAssetsByChain(chain: string, network: NetworkType): string[]  {
    let assets = new Set();

    Object.values(BridgeId).forEach(bridgeId => {
        getBridgeProvider(bridgeId)?.supportedAssetsByChain(chain, network).forEach((asset) => assets.add(asset));
    })

    return Array.from(assets) as string[];
}

export async function getQuotes(quoteRequest: QuoteRequest): Promise<Quote[]> {
    let quotes:Quote[] = [];

    Object.values(BridgeId).forEach(async bridgeId => {
        const quote = await getBridgeProvider(bridgeId)?.getQuote(quoteRequest);
        if(quote) quotes.push(quote);
    })

    return quotes;
}

export function moveAsset(quote: Quote): Update {
    return getBridgeProvider(quote.bridgeId)?.moveAsset(quote);
}

export function performNextStep(update: Update): Update {
    return getBridgeProvider(update.quote.bridgeId)?.performNextStep(update);
}

// ... Add other functions that frontend will need to call without using a specific bridge provider