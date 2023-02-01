import { NetworkType, Quote, QuoteRequest, Update } from "../types";
import { BaseBridgeProvider } from "../baseBridgeProvider";
export declare class WormHoleBridgeProvider implements BaseBridgeProvider {
    readonly supportedAssetsMaps: {
        mainnet: {
            [x: string]: string[][];
        };
        testnet: {
            [x: string]: string[][];
        };
    };
    supportedChains(_network: NetworkType): string[];
    supportedAssetsByChain(chain: string, network: NetworkType): string[];
    getQuote(quoteRequest: QuoteRequest): Promise<Quote | null>;
    moveAsset(quote: Quote): Promise<Update>;
    performNextStep(update: Update): Promise<{
        status: string;
        bridge: string;
        vaaBytes?: Uint8Array | undefined;
        tokenBridge: any;
        quote: Quote<any, any>;
        errorMessage?: string | undefined;
    }>;
    private moveAssetFromAlgorand;
    private signUsingMyAlgoWallet;
    private moveAssetFromEthereum;
    private performNextEthereumStep;
    private performNextAlgorandStep;
    private waitForEthereumSendConfirmation;
    private waitForAlgorandSendConfirmation;
    private getSignedVAAWithRetry;
    private receiveOnNonAlgorandChain;
    private waitForReceiptConfirmationOnNonAlgorandChain;
    private receiveOnEth;
    private waitForReceiptConfirmationOnEth;
    private receiveOnAlgorandChain;
    private waitForReceiptOnAlgorandChain;
    private getAlgorandBridges;
    private signAlgorandTransactions;
    private waitForTransactionOnAlgorand;
}
//# sourceMappingURL=index.d.ts.map