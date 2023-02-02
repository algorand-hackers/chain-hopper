export declare enum NetworkType {
    MAINNET = "mainnet",
    TESTNET = "testnet"
}
export declare enum BridgeId {
    WormHole = "WormHole",
    Glitter = "Glitter"
}
export declare type Asset = {
    symbol: string;
    address: string;
    description: string;
    decimals: number;
};
export declare type QuoteRequest<FromWallet = any, ToWallet = any> = {
    amountIn: string;
    assetName: string;
    fromAddress: string;
    fromChainName: string;
    fromWallet: FromWallet;
    fromWalletType: string;
    toAddress: string;
    toChainName: string;
    toWallet: ToWallet;
    toWalletType: string;
    network: NetworkType;
};
export declare type Quote<FromWallet = any, ToWallet = any> = {
    assetName: string;
    fromAddress: string;
    fromChainName: string;
    fromWallet: FromWallet;
    fromWalletType: string;
    toAddress: string;
    toChainName: string;
    toWallet: ToWallet;
    toWalletType: string;
    amountIn: string;
    amountOut: string | number;
    gasFeeEstimate: string;
    timeEstimate?: string;
    bridgeId: BridgeId;
    network: NetworkType;
};
export declare type Update = {
    quote: Quote;
    status?: string;
    errorMessage?: string;
};
//# sourceMappingURL=types.d.ts.map