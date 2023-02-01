var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Assets, Chains, BRIDGE_STATUS } from "../config";
import { BridgeId, NetworkType } from "../types";
import { getNonAlgorandChain } from "../utils";
import { GlitterBridgeSDK } from 'glitter-bridge-sdk';
const solMainnetAssets = Assets.Mainnet.SOL;
const algoMainnetAssets = Assets.Mainnet.ALGO;
const solTestnetAssets = Assets.Testnet.SOL;
const algoTestnetAssets = Assets.Testnet.ALGO;
const baseURL = 'https://api.glitterfinance.org/api';
const sdk = new GlitterBridgeSDK();
const algorand = sdk.algorand;
const solana = sdk.solana;
export class GlitterBridgeProvider {
    constructor() {
        var _a, _b, _c, _d, _e, _f;
        this.supportedAssetsMaps = {
            [NetworkType.MAINNET]: {
                [Chains.SOL]: [
                    [(_a = solMainnetAssets.xALGO) === null || _a === void 0 ? void 0 : _a.symbol, algoMainnetAssets.ALGO.symbol],
                    [(_b = solMainnetAssets.SOLANA) === null || _b === void 0 ? void 0 : _b.symbol, algoMainnetAssets.xSOL.symbol],
                    [(_c = solMainnetAssets.USDCs) === null || _c === void 0 ? void 0 : _c.symbol, algoMainnetAssets.USDCa.symbol]
                ],
            },
            [NetworkType.TESTNET]: {
                [Chains.SOL]: [
                    [(_d = solTestnetAssets.xALGO) === null || _d === void 0 ? void 0 : _d.symbol, algoTestnetAssets.ALGO.symbol],
                    [(_e = solTestnetAssets.SOLANA) === null || _e === void 0 ? void 0 : _e.symbol, algoTestnetAssets.xSOL.symbol],
                    [(_f = solTestnetAssets.USDCs) === null || _f === void 0 ? void 0 : _f.symbol, algoTestnetAssets.USDCa.symbol]
                ],
            }
        };
    }
    supportedChains(network) {
        return [Chains.SOL];
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
            return yield this._getQuote(quoteRequest);
        });
    }
    moveAsset(quote) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (quote.assetName == ((_a = algoMainnetAssets.ALGO) === null || _a === void 0 ? void 0 : _a.symbol)) {
                return this.bridgeAlgoToxAlgo(quote);
            }
            else if (quote.assetName == ((_b = solMainnetAssets.xALGO) === null || _b === void 0 ? void 0 : _b.symbol)) {
                return this.bridgexAlgoToAlgo(quote);
            }
            else if (quote.assetName == ((_c = solMainnetAssets.SOLANA) === null || _c === void 0 ? void 0 : _c.symbol)) {
                return this.bridgeSolToxSol(quote);
            }
            else {
                return this.bridgexAlgoToAlgo(quote);
            }
        });
    }
    performNextStep(_update) {
        throw Error('Not Implemented');
    }
    getFee(asset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = new URL(`${baseURL}/fee/${asset}`);
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error("Data not found");
                }
                const result = yield response.json();
                console.log(result);
                return result;
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    getPrice(asset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = new URL(`${baseURL}/release/${asset}`);
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error("Data not found");
                }
                const result = yield response.json();
                console.log(result);
                return result;
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    _getQuote(quoteRequest) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
        return __awaiter(this, void 0, void 0, function* () {
            // xAlgo from solana to Algo
            if (quoteRequest.assetName == ((_a = solMainnetAssets.xALGO) === null || _a === void 0 ? void 0 : _a.symbol)) {
                const xALGOFee = yield this.getFee((_b = solMainnetAssets.xALGO) === null || _b === void 0 ? void 0 : _b.symbol);
                const xALGORelease = yield this.getPrice((_c = solMainnetAssets.xALGO) === null || _c === void 0 ? void 0 : _c.symbol);
                return Object.assign(Object.assign({}, quoteRequest), { assetName: (_d = algoMainnetAssets.ALGO) === null || _d === void 0 ? void 0 : _d.symbol, fromChainName: Chains.SOL, toChainName: Chains.ALGO, amountIn: quoteRequest.amountIn, amountOut: xALGORelease * Number(quoteRequest.amountIn), gasFeeEstimate: xALGOFee, bridgeId: BridgeId.Glitter });
            }
            // Algo from Algorand to Solana 
            else if (quoteRequest.assetName == ((_e = algoMainnetAssets.ALGO) === null || _e === void 0 ? void 0 : _e.symbol)) {
                const ALGOFee = yield this.getFee((_f = algoMainnetAssets.ALGO) === null || _f === void 0 ? void 0 : _f.symbol);
                const ALGORelease = yield this.getPrice((_g = algoMainnetAssets.ALGO) === null || _g === void 0 ? void 0 : _g.symbol);
                return Object.assign(Object.assign({}, quoteRequest), { assetName: (_h = solMainnetAssets.xALGO) === null || _h === void 0 ? void 0 : _h.symbol, fromChainName: Chains.ALGO, toChainName: Chains.SOL, amountIn: quoteRequest.amountIn, amountOut: ALGORelease * Number(quoteRequest.amountIn), gasFeeEstimate: ALGOFee, bridgeId: BridgeId.Glitter });
            }
            // SOl from solana to algorand
            else if (quoteRequest.assetName == ((_j = solMainnetAssets.SOLANA) === null || _j === void 0 ? void 0 : _j.symbol)) {
                const SOLFee = yield this.getFee((_k = solMainnetAssets.SOLANA) === null || _k === void 0 ? void 0 : _k.symbol);
                const SOLRelease = yield this.getPrice((_l = solMainnetAssets.SOLANA) === null || _l === void 0 ? void 0 : _l.symbol);
                return Object.assign(Object.assign({}, quoteRequest), { assetName: (_m = algoMainnetAssets.xSOL) === null || _m === void 0 ? void 0 : _m.symbol, fromChainName: Chains.SOL, toChainName: Chains.ALGO, amountIn: quoteRequest.amountIn, amountOut: Number(quoteRequest.amountIn) * SOLRelease, gasFeeEstimate: SOLFee, bridgeId: BridgeId.Glitter });
            }
            // xSOL from algorand to solana 
            else if (quoteRequest.assetName == ((_o = algoMainnetAssets.xSOL) === null || _o === void 0 ? void 0 : _o.symbol)) {
                const xSOLFee = yield this.getFee((_p = algoMainnetAssets.xSOL) === null || _p === void 0 ? void 0 : _p.symbol);
                const xSOLRelease = yield this.getPrice((_q = algoMainnetAssets.xSOL) === null || _q === void 0 ? void 0 : _q.symbol);
                return Object.assign(Object.assign({}, quoteRequest), { assetName: (_r = solMainnetAssets.SOLANA) === null || _r === void 0 ? void 0 : _r.symbol, fromChainName: Chains.ALGO, toChainName: Chains.SOL, amountIn: quoteRequest.amountIn, amountOut: Number(quoteRequest.amountIn) * xSOLRelease, gasFeeEstimate: xSOLFee, bridgeId: BridgeId.Glitter });
            }
            // USDCs from solana to Algorand
            else if (quoteRequest.assetName == ((_s = solMainnetAssets.USDCs) === null || _s === void 0 ? void 0 : _s.symbol)) {
                const USDcFee = yield this.getFee((_t = solMainnetAssets.USDCs) === null || _t === void 0 ? void 0 : _t.symbol);
                const USDcRelease = yield this.getPrice((_u = solMainnetAssets.USDCs) === null || _u === void 0 ? void 0 : _u.symbol);
                return Object.assign(Object.assign({}, quoteRequest), { assetName: (_v = algoMainnetAssets.USDCa) === null || _v === void 0 ? void 0 : _v.symbol, fromChainName: Chains.SOL, toChainName: Chains.ALGO, amountIn: quoteRequest.amountIn, amountOut: Number(quoteRequest.amountIn) * USDcRelease, gasFeeEstimate: USDcFee, bridgeId: BridgeId.Glitter });
            }
            // USDCa from algorand to Solana 
            else if (quoteRequest.assetName == ((_w = algoMainnetAssets.USDCa) === null || _w === void 0 ? void 0 : _w.symbol)) {
                const USDaFee = yield this.getFee((_x = algoMainnetAssets.USDCa) === null || _x === void 0 ? void 0 : _x.symbol);
                const USDaRelease = yield this.getPrice((_y = algoMainnetAssets.USDCa) === null || _y === void 0 ? void 0 : _y.symbol);
                return Object.assign(Object.assign({}, quoteRequest), { assetName: (_z = solMainnetAssets.USDCs) === null || _z === void 0 ? void 0 : _z.symbol, fromChainName: Chains.ALGO, toChainName: Chains.SOL, amountIn: quoteRequest.amountIn, amountOut: Number(quoteRequest.amountIn) * USDaRelease, gasFeeEstimate: USDaFee, bridgeId: BridgeId.Glitter });
            }
            return null;
        });
    }
    // Bridge Algo xAlgo from Algorand to Solana
    bridgeAlgoToxAlgo(quote) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let startingBalance = yield (solana === null || solana === void 0 ? void 0 : solana.getTokenBalance(quote.toAddress, (_a = solMainnetAssets.xALGO) === null || _a === void 0 ? void 0 : _a.symbol));
            let bridged = yield (algorand === null || algorand === void 0 ? void 0 : algorand.bridge(quote.fromWallet, (_b = algoMainnetAssets.ALGO) === null || _b === void 0 ? void 0 : _b.symbol, Chains.SOL, quote.toAddress, (_c = solMainnetAssets.xALGO) === null || _c === void 0 ? void 0 : _c.symbol, Number(quote.amountIn)));
            let newBalance = yield (solana === null || solana === void 0 ? void 0 : solana.waitForTokenBalanceChange(quote.toAddress, "xAlgo", Number(startingBalance), 90));
            if (bridged == true) {
                return { quote, status: BRIDGE_STATUS.SUCCESS };
            }
            else {
                return { quote, status: BRIDGE_STATUS.FAILED };
            }
        });
    }
    // Bridge xAlgo to Algo from solana to Algorand
    bridgexAlgoToAlgo(quote) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let startingBalance = yield (algorand === null || algorand === void 0 ? void 0 : algorand.getBalance(quote.toAddress));
            let bridged = yield (solana === null || solana === void 0 ? void 0 : solana.bridge(quote.fromWallet, (_a = solMainnetAssets.xALGO) === null || _a === void 0 ? void 0 : _a.symbol, Chains.ALGO, quote.toAddress, algoMainnetAssets.ALGO.symbol, Number(quote.amountIn)));
            let newBalance = yield (algorand === null || algorand === void 0 ? void 0 : algorand.waitForBalanceChange(quote.toAddress, Number(startingBalance), 90));
            if (bridged == true) {
                return { quote, status: BRIDGE_STATUS.SUCCESS };
            }
            else {
                return { quote, status: BRIDGE_STATUS.FAILED };
            }
        });
    }
    // Bridge Sol to xsol from Solana to Algorand
    bridgeSolToxSol(quote) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let startingBalance = yield (algorand === null || algorand === void 0 ? void 0 : algorand.getTokenBalance(quote.toAddress, algoMainnetAssets.xSOL.symbol));
            let bridged = yield (solana === null || solana === void 0 ? void 0 : solana.bridge(quote.fromWallet, (_a = solMainnetAssets.SOLANA) === null || _a === void 0 ? void 0 : _a.symbol, Chains.ALGO, quote.toAddress, algoMainnetAssets.xSOL.symbol, Number(quote.amountIn)));
            let newBalance = yield (algorand === null || algorand === void 0 ? void 0 : algorand.waitForTokenBalanceChange(quote.toAddress, "xSOL", Number(startingBalance), 90));
            if (bridged == true) {
                return { quote, status: BRIDGE_STATUS.SUCCESS };
            }
            else {
                return { quote, status: BRIDGE_STATUS.FAILED };
            }
        });
    }
    // Bridge xSol to sol from Algorand to Solana
    bridgexSolToSol(quote) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let startingBalance = yield (solana === null || solana === void 0 ? void 0 : solana.getBalance(quote.toAddress));
            let bridged = yield (algorand === null || algorand === void 0 ? void 0 : algorand.bridge(quote.fromWallet, algoMainnetAssets.xSOL.symbol, Chains.SOL, quote.toAddress, (_a = solMainnetAssets.SOLANA) === null || _a === void 0 ? void 0 : _a.symbol, Number(quote.amountIn)));
            let newBalance = yield (solana === null || solana === void 0 ? void 0 : solana.waitForBalanceChange(quote.toAddress, Number(startingBalance), 90));
            if (bridged == true) {
                return { quote, status: BRIDGE_STATUS.SUCCESS };
            }
            else {
                return { quote, status: BRIDGE_STATUS.FAILED };
            }
        });
    }
}
