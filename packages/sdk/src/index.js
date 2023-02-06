// Combine the  supported  assets of all bridge providers and return it. This function is
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BridgeId } from "./types";
import { getBridgeProvider } from "./factory/bridgeProvider";
export function allSupportedChains(network) {
    let chains = new Set();
    Object.values(BridgeId).forEach(bridgeId => {
        var _a;
        (_a = getBridgeProvider(bridgeId)) === null || _a === void 0 ? void 0 : _a.supportedChains(network).forEach(chain => chains.add(chain));
    });
    return Array.from(chains);
}
export function supportedAssetsByChain(chain, network) {
    let assets = new Set();
    Object.values(BridgeId).forEach(bridgeId => {
        const bridgeProvider = getBridgeProvider(bridgeId);
        if (bridgeProvider === null || bridgeProvider === void 0 ? void 0 : bridgeProvider.supportedChains(network).includes(chain))
            bridgeProvider === null || bridgeProvider === void 0 ? void 0 : bridgeProvider.supportedAssetsByChain(chain, network).forEach((asset) => assets.add(asset));
    });
    return Array.from(assets);
}
export function getQuotes(quoteRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        let quotes = [];
        Object.values(BridgeId).forEach((bridgeId) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const quote = yield ((_a = getBridgeProvider(bridgeId)) === null || _a === void 0 ? void 0 : _a.getQuote(quoteRequest));
            if (quote)
                quotes.push(quote);
        }));
        return quotes;
    });
}
export function moveAsset(quote) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        return (_a = getBridgeProvider(quote.bridgeId)) === null || _a === void 0 ? void 0 : _a.moveAsset(quote);
    });
}
export function performNextStep(update) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        return (_a = getBridgeProvider(update.quote.bridgeId)) === null || _a === void 0 ? void 0 : _a.performNextStep(update);
    });
}
// ... Add other functions that frontend will need to call without using a specific bridge provider
