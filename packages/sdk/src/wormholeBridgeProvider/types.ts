import { TransactionSignerPair } from "@certusone/wormhole-sdk/lib/cjs/algorand";
import { Update } from "../../types";
import {Algodv2} from 'algosdk';

export interface WormHoleUpdate<T> extends Update {
    bridge: string,
    vaaBytes?: Uint8Array,
    tokenBridge: T
}

export interface EthereumUpdate extends WormHoleUpdate<string> {
    receipt: any
}

export interface AlgorandUpdate extends WormHoleUpdate<bigint> {
    txs: TransactionSignerPair[],
    result: Record<string,any>,
}

export interface GetSignedVAAWithRetryResult {
    vaaBytes: Uint8Array | undefined;
    isPending: boolean;
  }