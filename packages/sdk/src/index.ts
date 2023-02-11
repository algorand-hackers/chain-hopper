// Combine the  supported  assets of all bridge providers and return it. This function is

import { AssetKeys, BridgeId, NetworkType, Quote, QuoteRequest, Update } from "./types";
import { getBridgeProvider } from "./factory/bridgeProvider";
import { ethers } from "ethers";
export * from "./types";
export {Chains, Assets} from  "./config/index";

export function allSupportedChains(network: NetworkType): string[] {
    let chains = new Set();

    Object.values(BridgeId).forEach(bridgeId => {
        getBridgeProvider(bridgeId)?.supportedChains(network).forEach(chain => chains.add(chain));
    })

    return Array.from(chains) as string[];
}

export function supportedDepositAssetsByChain(chain: string, network: NetworkType): string[]  {
    let assets = new Set();

    Object.values(BridgeId).forEach(bridgeId => {
        const bridgeProvider = getBridgeProvider(bridgeId);
        if(bridgeProvider?.supportedChains(network).includes(chain))
            bridgeProvider?.supportedDepositAssetsByChain(chain, network).forEach((asset) => assets.add(asset));
    })

    return Array.from(assets) as string[];
}


export function supportedWithdrawalAssets(network: NetworkType): string[]  {
    let assets = new Set();

    Object.values(BridgeId).forEach(bridgeId => {
        const bridgeProvider = getBridgeProvider(bridgeId);
        bridgeProvider?.supportedWithdrawalAssets(network).forEach((asset) => assets.add(asset));
    })

    return Array.from(assets) as string[];
}


export function supportedChainsByWithdrawalAsset(network: NetworkType, asset: AssetKeys): string[]  {
    let chains = new Set();

    Object.values(BridgeId).forEach(bridgeId => {
        const bridgeProvider = getBridgeProvider(bridgeId);
        bridgeProvider?.supportedChainsByWithdrawalAsset(network, asset).forEach((chain) => chains.add(chain));
    })

    return Array.from(chains) as string[];
}

export async function getQuotes(quoteRequest: QuoteRequest): Promise<Quote[]> {
    let quotes:Quote[] = [];

    Object.values(BridgeId).forEach(async bridgeId => {
        const quote = await getBridgeProvider(bridgeId)?.getQuote(quoteRequest);
        if(quote) quotes.push(quote);
    })

    return quotes;
}

export async function moveAsset(quote: Quote): Promise<Update> {
    return getBridgeProvider(quote.bridgeId)?.moveAsset(quote)!;
}

export async function performNextStep(update: Update): Promise<Update> {
    return getBridgeProvider(update.quote.bridgeId)?.performNextStep(update)!;
}


// ... Add other functions that frontend will need to call without using a specific bridge provider