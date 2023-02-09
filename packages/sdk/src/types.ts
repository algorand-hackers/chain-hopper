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
    decimals: number,
    imageUrl: string
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

export interface TimeEstimate {
    low: number,
    high: number,
}

export interface GasFeeEstimate {
    send?: string,
    receive?: string,
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
    gasFeeEstimate?: GasFeeEstimate,
    timeEstimate?: {send: TimeEstimate, receive: TimeEstimate },
    bridgeId: BridgeId  ,
    network: NetworkType,

}

export type Update = {
    quote: Quote,
    status?: string,
    errorMessage?: string
}

