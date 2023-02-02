var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CHAINS, CONTRACTS, getEmitterAddressAlgorand, getEmitterAddressEth, getGovernorIsVAAEnqueued, getIsTransferCompletedAlgorand, getIsTransferCompletedEth, getSignedVAA, hexToUint8Array, parseSequenceFromLogAlgorand, parseSequenceFromLogEth, redeemOnAlgorand, redeemOnEthNative, transferFromAlgorand, transferFromEthNative, tryNativeToHexString } from "@certusone/wormhole-sdk";
import { ALGORAND_WALLETS, Assets, BRIDGE_STATUS, Chains, ALGORAND_WAIT_FOR_CONFIRMATIONS, getWormHoleRpchost } from "../config";
import { NetworkType } from "../types";
import { getNonAlgorandChain } from "../utils";
import { assignGroupID, waitForConfirmation } from 'algosdk';
import { parseEther, parseUnits } from "ethers/lib/utils";
import { getAlgoClient } from "../factory/algoClient";
const ethMainnetAssets = Assets.Mainnet.ETH;
const ethTestnetAssets = Assets.Testnet.ETH;
const algoMainnetAssets = Assets.Mainnet.ALGO;
const algoTestnetAssets = Assets.Testnet.ALGO;
export class WormHoleBridgeProvider {
    constructor() {
        this.supportedAssetsMaps = {
            [NetworkType.MAINNET]: {
                [Chains.ETH]: [[ethMainnetAssets.ETH.symbol, algoMainnetAssets.WETH.symbol]]
            },
            [NetworkType.TESTNET]: {
                [Chains.ETH]: [[ethTestnetAssets.ETH.symbol, algoTestnetAssets.WETH.symbol]]
            }
        };
    }
    supportedChains(_network) {
        return [Chains.ETH];
    }
    supportedAssetsByChain(chain, network) {
        return this.supportedAssetsMaps[network][chain].map(assetMap => assetMap[0]);
    }
    getQuote(quoteRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const nonAlgorandChain = getNonAlgorandChain({ from: quoteRequest.fromChainName, to: quoteRequest.toChainName });
            // Check if chain is supported
            if (!this.supportedChains(quoteRequest.network).includes(nonAlgorandChain))
                return null;
            // Check if asset is supported
            if (!this.supportedAssetsByChain(nonAlgorandChain, quoteRequest.network).includes(quoteRequest.assetName))
                return null;
            // Get Quote ...
            return null;
        });
    }
    moveAsset(quote) {
        return __awaiter(this, void 0, void 0, function* () {
            if (quote.fromChainName == Chains.ALGO)
                return this.moveAssetFromAlgorand(quote);
            const nonAlgorandChain = getNonAlgorandChain({ from: quote.fromChainName, to: quote.toChainName });
            switch (nonAlgorandChain) {
                case Chains.ETH:
                    return this.moveAssetFromEthereum(quote);
                default:
                    throw Error('Invalid chain');
            }
        });
    }
    performNextStep(update) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (update.quote.fromChainName) {
                case Chains.ETH:
                    return this.performNextEthereumStep(update);
                case Chains.ALGO:
                    return this.performNextAlgorandStep(update);
                default:
                    throw Error('Invalid Chain');
            }
        });
    }
    moveAssetFromAlgorand(quote) {
        return __awaiter(this, void 0, void 0, function* () {
            const bridges = this.getAlgorandBridges(quote.network);
            const asset = quote.network == NetworkType.MAINNET ? Assets.Mainnet.ALGO[quote.assetName] : Assets.Testnet.ALGO[quote.assetName];
            const transferAmountParsed = parseUnits(quote.amountIn, asset.decimals);
            const feeParsed = parseUnits("0", asset.decimals);
            const algodClient = getAlgoClient(quote.network);
            const txs = yield transferFromAlgorand(algodClient, bridges.tokenBridge, bridges.bridge, quote.fromAddress, BigInt(asset.address), transferAmountParsed.toBigInt(), quote.toAddress, CHAINS.algorand, feeParsed.toBigInt());
            const signedTxs = yield this.signAlgorandTransactions(quote.fromWalletType, quote.fromWallet, txs);
            if (signedTxs) {
                yield getAlgoClient(quote.network).sendRawTransaction(signedTxs).do();
            }
            const result = this.waitForTransactionOnAlgorand(txs[txs.length - 1].tx.txID(), quote.network);
            return { quote, txs, algodClient, result, status: BRIDGE_STATUS.WAITING_FOR_SEND_CONFIRMATION, tokenBridge: bridges.tokenBridge };
        });
    }
    signUsingMyAlgoWallet(wallet, txs) {
        return __awaiter(this, void 0, void 0, function* () {
            assignGroupID(txs.map((tx) => tx.tx));
            const signedTxns = [];
            const lsigSignedTxns = [];
            const walletUnsignedTxns = [];
            // sign all the lsigs
            for (const lsigTx of txs) {
                if (lsigTx.signer) {
                    lsigSignedTxns.push(yield lsigTx.signer.signTxn(lsigTx.tx));
                }
            }
            // assemble the txs for the wallet to sign
            for (const walletTx of txs) {
                if (!walletTx.signer) {
                    walletUnsignedTxns.push(walletTx.tx.toByte());
                }
            }
            const walletSignedTxns = yield wallet.signTransaction(walletUnsignedTxns);
            let lsigIdx = 0;
            let walletIdx = 0;
            for (const originalTx of txs) {
                if (originalTx.signer) {
                    signedTxns.push(lsigSignedTxns[lsigIdx++]);
                }
                else {
                    signedTxns.push(walletSignedTxns[walletIdx++].blob);
                }
            }
            return signedTxns;
        });
    }
    // private signUsingPeraWallet() {
    // }
    moveAssetFromEthereum(quote) {
        return __awaiter(this, void 0, void 0, function* () {
            const TOKEN_BRIDGE = quote.network == NetworkType.MAINNET ? CONTRACTS.MAINNET.ethereum.token_bridge : CONTRACTS.TESTNET.ethereum.token_bridge;
            const BRIDGE = quote.network == NetworkType.MAINNET ? CONTRACTS.MAINNET.ethereum.core : CONTRACTS.TESTNET.ethereum.core;
            const receipt = yield transferFromEthNative(TOKEN_BRIDGE, quote.fromWallet, parseEther(quote.amountIn), CHAINS.algorand, hexToUint8Array(tryNativeToHexString(quote.toAddress, CHAINS.algorand) || ""));
            return { quote, receipt, status: BRIDGE_STATUS.WAITING_FOR_SEND_CONFIRMATION, bridge: BRIDGE, tokenBridge: TOKEN_BRIDGE };
        });
    }
    performNextEthereumStep(update) {
        switch (update.status) {
            case BRIDGE_STATUS.WAITING_FOR_SEND_CONFIRMATION:
                return this.waitForEthereumSendConfirmation(update);
            case BRIDGE_STATUS.SEND_CONFIRMED:
                return this.receiveOnAlgorandChain(update);
            case BRIDGE_STATUS.RECEIVING:
                return this.waitForReceiptOnAlgorandChain(update);
            default:
                return Object.assign(Object.assign({}, update), { status: BRIDGE_STATUS.SUCCESS });
        }
    }
    performNextAlgorandStep(update) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (update.status) {
                case BRIDGE_STATUS.WAITING_FOR_SEND_CONFIRMATION:
                    return yield this.waitForAlgorandSendConfirmation(update);
                case BRIDGE_STATUS.SEND_CONFIRMED:
                    return yield this.receiveOnNonAlgorandChain(update);
                case BRIDGE_STATUS.RECEIVING:
                    return yield this.waitForReceiptConfirmationOnNonAlgorandChain(update);
                default:
                    return Object.assign(Object.assign({}, update), { status: BRIDGE_STATUS.SUCCESS });
            }
        });
    }
    waitForEthereumSendConfirmation(update) {
        return __awaiter(this, void 0, void 0, function* () {
            const sequence = parseSequenceFromLogEth(update.receipt, update.bridge);
            const emitterAddress = getEmitterAddressEth(update.tokenBridge);
            const { vaaBytes } = yield this.getSignedVAAWithRetry(CHAINS.ethereum, emitterAddress, sequence, update.quote.network);
            return Object.assign(Object.assign({}, update), { vaaBytes, status: BRIDGE_STATUS.SEND_CONFIRMED });
        });
    }
    waitForAlgorandSendConfirmation(update) {
        return __awaiter(this, void 0, void 0, function* () {
            const sequence = parseSequenceFromLogAlgorand(update.result);
            const emitterAddress = getEmitterAddressAlgorand(update.tokenBridge);
            const { vaaBytes } = yield this.getSignedVAAWithRetry(CHAINS.algorand, emitterAddress, sequence, update.quote.network);
            return Object.assign(Object.assign({}, update), { signedVAA: vaaBytes, status: BRIDGE_STATUS.SEND_CONFIRMED });
        });
    }
    getSignedVAAWithRetry(emitterChain, emitterAddress, sequence, network, retryAttempts) {
        return __awaiter(this, void 0, void 0, function* () {
            const WORMHOLE_RPC_HOSTS = getWormHoleRpchost(network);
            let currentWormholeRpcHost = -1;
            const getNextRpcHost = () => ++currentWormholeRpcHost % WORMHOLE_RPC_HOSTS.length;
            let attempts = 0;
            while (true) {
                attempts++;
                yield new Promise((resolve) => setTimeout(resolve, 1000));
                const rpcHost = WORMHOLE_RPC_HOSTS[getNextRpcHost()];
                const results = yield Promise.allSettled([
                    getSignedVAA(rpcHost, emitterChain, emitterAddress, sequence),
                    getGovernorIsVAAEnqueued(rpcHost, emitterChain, emitterAddress, sequence),
                ]);
                if (results[0].status === "fulfilled") {
                    return { vaaBytes: results[0].value.vaaBytes, isPending: false };
                }
                if (results[1].status === "fulfilled" && results[1].value.isEnqueued) {
                    return { vaaBytes: undefined, isPending: true };
                }
                if (retryAttempts !== undefined && attempts > retryAttempts) {
                    throw new Error(results[0].reason);
                }
            }
        });
    }
    ;
    receiveOnNonAlgorandChain(update) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (update.quote.toChainName) {
                case Chains.ETH:
                    return this.receiveOnEth(update);
                default:
                    return Object.assign(Object.assign({}, update), { status: BRIDGE_STATUS.FAILED });
            }
        });
    }
    waitForReceiptConfirmationOnNonAlgorandChain(update) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (update.quote.toChainName) {
                case Chains.ETH:
                    return this.waitForReceiptConfirmationOnEth(update);
                default:
                    return Object.assign(Object.assign({}, update), { status: BRIDGE_STATUS.FAILED });
            }
        });
    }
    receiveOnEth(update) {
        return __awaiter(this, void 0, void 0, function* () {
            const TOKEN_BRIDGE = update.quote.network == NetworkType.MAINNET ? CONTRACTS.MAINNET.ethereum.token_bridge : CONTRACTS.TESTNET.ethereum.token_bridge;
            yield redeemOnEthNative(TOKEN_BRIDGE, update.quote.toWallet, update.vaaBytes);
            return Object.assign(Object.assign({}, update), { status: BRIDGE_STATUS.RECEIVING });
        });
    }
    waitForReceiptConfirmationOnEth(update) {
        return __awaiter(this, void 0, void 0, function* () {
            const TOKEN_BRIDGE = update.quote.network == NetworkType.MAINNET ? CONTRACTS.MAINNET.ethereum.token_bridge : CONTRACTS.TESTNET.ethereum.token_bridge;
            let transferCompleted = yield getIsTransferCompletedEth(TOKEN_BRIDGE, update.quote.toWallet, update.vaaBytes);
            while (!transferCompleted) {
                yield new Promise((r) => setTimeout(r, 5000)); //@Todo not sure why at intervals of 5seconds
                transferCompleted = yield getIsTransferCompletedEth(TOKEN_BRIDGE, update.quote.toWallet, update.vaaBytes);
            }
            return Object.assign(Object.assign({}, update), { status: BRIDGE_STATUS.SUCCESS });
        });
    }
    receiveOnAlgorandChain(update) {
        return __awaiter(this, void 0, void 0, function* () {
            const algodClient = getAlgoClient(update.quote.network);
            const bridges = this.getAlgorandBridges(update.quote.network);
            const txs = yield redeemOnAlgorand(algodClient, bridges.tokenBridge, bridges.bridge, update.vaaBytes, update.quote.fromAddress);
            const signedTxs = yield this.signAlgorandTransactions(update.quote.toWalletType, update.quote.toWallet, txs);
            if (signedTxs) {
                yield getAlgoClient(update.quote.network).sendRawTransaction(signedTxs).do();
            }
            yield this.waitForTransactionOnAlgorand(txs[txs.length - 1].tx.txID(), update.quote.network);
            return Object.assign(Object.assign({}, update), { status: BRIDGE_STATUS.RECEIVING });
        });
    }
    waitForReceiptOnAlgorandChain(update) {
        return __awaiter(this, void 0, void 0, function* () {
            const algodClient = getAlgoClient(update.quote.network);
            const bridges = this.getAlgorandBridges(update.quote.network);
            let transferCompleted = yield getIsTransferCompletedAlgorand(algodClient, bridges.tokenBridge, update.vaaBytes);
            while (!transferCompleted) {
                yield new Promise((r) => setTimeout(r, 5000)); //@Todo not sure why at intervals of 5seconds
                transferCompleted = yield getIsTransferCompletedAlgorand(algodClient, bridges.tokenBridge, update.vaaBytes);
            }
            return Object.assign(Object.assign({}, update), { status: BRIDGE_STATUS.SUCCESS });
        });
    }
    getAlgorandBridges(network) {
        const TOKEN_BRIDGE_ID = BigInt(network == NetworkType.MAINNET ? CONTRACTS.MAINNET.algorand.token_bridge : CONTRACTS.TESTNET.algorand.token_bridge);
        const BRIDGE_ID = BigInt(network == NetworkType.MAINNET ? CONTRACTS.MAINNET.algorand.core : CONTRACTS.TESTNET.algorand.core);
        return { tokenBridge: TOKEN_BRIDGE_ID, bridge: BRIDGE_ID };
    }
    signAlgorandTransactions(walletType, wallet, txs) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (walletType) {
                case ALGORAND_WALLETS.MyAlgo:
                    return yield this.signUsingMyAlgoWallet(wallet, txs);
                case ALGORAND_WALLETS.Pera:
                    return undefined; //@Todo  update  this
                default:
                    break;
            }
        });
    }
    waitForTransactionOnAlgorand(txID, network) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield waitForConfirmation(getAlgoClient(network), txID, ALGORAND_WAIT_FOR_CONFIRMATIONS);
        });
    }
}
