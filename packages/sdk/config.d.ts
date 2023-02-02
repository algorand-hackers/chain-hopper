import { BaseBridgeProvider } from "./src/baseBridgeProvider";
import { Asset, BridgeId, NetworkType } from "./types";
export declare const BRIDGE_PROVIDERS: Record<BridgeId, new () => BaseBridgeProvider>;
export declare const Chains: {
    SOL: string;
    ALGO: string;
    ETH: string;
};
export declare const EVM_WALLETS: {
    Metamask: string;
};
export declare const ALGORAND_WALLETS: {
    MyAlgo: string;
    Pera: string;
};
export declare const SOLANA_WALLETS: {
    Phantom: string;
    Solflare: string;
};
export declare const Assets: Record<string, Record<string, Record<string, Asset>>>;
export declare const BRIDGE_STATUS: {
    SUCCESS: string;
    FAILED: string;
    WAITING_FOR_SEND_CONFIRMATION: string;
    SEND_CONFIRMED: string;
    RECEIVING: string;
    WAITING_FOR_RECEIPT_CONFIRMATION: string;
};
export declare const BRIDGE_FROM_ETHEREUM_STATUS: {
    WAITING_FOR_APPROVAL_CONFIRMATION: string;
    APPROVAL_CONFIRMED: string;
    SUCCESS: string;
    FAILED: string;
    WAITING_FOR_SEND_CONFIRMATION: string;
    SEND_CONFIRMED: string;
    RECEIVING: string;
    WAITING_FOR_RECEIPT_CONFIRMATION: string;
};
export declare const BRIDGE_FROM_ALGORAND_STATUS: {
    SUCCESS: string;
    FAILED: string;
    WAITING_FOR_SEND_CONFIRMATION: string;
    SEND_CONFIRMED: string;
    RECEIVING: string;
    WAITING_FOR_RECEIPT_CONFIRMATION: string;
};
export declare const BRIDGE_FROM_SOLANA_STATUS: {
    SUCCESS: string;
    FAILED: string;
    WAITING_FOR_SEND_CONFIRMATION: string;
    SEND_CONFIRMED: string;
    RECEIVING: string;
    WAITING_FOR_RECEIPT_CONFIRMATION: string;
};
export declare function getAlgorandHost(network: NetworkType): {
    algodToken: string;
    algodServer: string;
    algodPort: string;
};
export declare function getWormHoleRpchost(network: NetworkType): string[];
export declare const ALGORAND_WAIT_FOR_CONFIRMATIONS = 4;
//# sourceMappingURL=config.d.ts.map