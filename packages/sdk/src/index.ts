//@ts-nocheck
import { BRIDGES } from "./config";

const bridgeProviderCache = {};

// Frontend will always call this function to create a bridgeProvider based on user selections
// A cached bridgeProvider will be  returned  if already created  before for  efficiency
export function getBridgeProvider(bridgeProviderId: string) {
    if(bridgeProviderCache[bridgeId]) return bridgeProviderCache[bridgeProviderId];
    return createBridgeProvider(bridgeProviderId);
}

function createBridgeProvider(bridgeProviderId: string) {
    const bridgeProvider = new BRIDGES[bridgeProviderId]();
    bridgeProviderCache[bridgeProviderId] = bridgeProvider;

    return bridgeProvider;
}

// Combine the  supported  assets of all bridge providers and return it. This function is
// beyond the scope of any particular bridge provider
export function allSupportedAssets() {

}


// ... Add other functions that frontend will need to call without using a specific bridge provider