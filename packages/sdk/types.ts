export enum NetworkType {
    MAINNET = 'mainnet',
    TESTNET = 'testnet'
}

export type QuoteRequest<FromWallet = any, ToWallet = any> = {
    amountIn: string,
    assetName: string,
    fromAddress: string,
    fromChainName: string,
    fromWallet?: FromWallet,
    fromWalletType?:string,
    toAddress: string,
    toChainName: string,
    toWallet?: ToWallet,
    toWalletType?:string,
    network: NetworkType,
}

export type Quote<FromWallet = any, ToWallet = any> = {
    assetName: string,
    fromAddress: string,
    fromChainName: string,
    fromWallet?: FromWallet,
    fromWalletType?:string,
    toAddress: string,
    toChainName: string,
    toWallet?: ToWallet,
    toWalletType?:string,
    amountIn: string,
    amountOut: string,
    gasFeeEstimate: string,
    timeEstimate: string,
    bridgeProviderId: string  ,
    network: NetworkType,

}

export type Update = {
    quote: Quote,
    status?: string,
    errorMessage?: string
}

