export enum NetworkType {
    MAINNET = 'mainnet',
    TESTNET = 'testnet'
}

export enum BridgeId {
    WormHole  = 'WormHole',
    Glitter  =  'Glitter'
}

export type Asset = {
    symbol: string,
    address: string,
    description: string,
    decimals: number
}

export type QuoteRequest<FromWallet = any, ToWallet = any> = {
    amountIn: string,
    assetName: string,
    fromAddress: string,
    fromChainName: string,
    fromWallet: FromWallet,
    fromWalletType:string,
    toAddress: string,
    toChainName: string,
    toWallet: ToWallet,
    toWalletType:string,
    network: NetworkType,
}

export type Quote<FromWallet = any, ToWallet = any> = {
    assetName: string,
    fromAddress: string,
    fromChainName: string,
    fromWallet: FromWallet,
    fromWalletType:string,
    toAddress: string,
    toChainName: string,
    toWallet: ToWallet,
    toWalletType:string,
    amountIn: string ,
    amountOut: string | number,
    gasFeeEstimate: string,
    timeEstimate?: string,
    bridgeId: BridgeId  ,
    network: NetworkType,

}

export type Update = {
    quote: Quote,
    status?: string,
    errorMessage?: string
}

