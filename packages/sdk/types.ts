export type NetworkAssets = {
 network: string,
 assets: Array<Asset>
}

export type Asset = {
 name: string,
 networkName: string,
 sourceNetworkName: string,
 mappedAssetName: string | null
}

export type QuoteRequest = {
 amountIn: string,
 assetName: string
 fromNetworkName: string,
 toNetworkName: string,
}

export type Quote = {
    assetName: string,
    fromNetworkName: string,
    toNetworkName: string,
    amountIn: string,
    amountOut: string,
    gasFeeEstimate: string,
    timeEstimate: string,
    bridgeProviderId: string  
}

export type Update = {
    quote: Quote
    status?: string,   
}