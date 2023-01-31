import { BridgeId } from "../types";
import { BaseBridgeProvider } from "../baseBridgeProvider";
import { BRIDGE_PROVIDERS } from "../config/bridgeProviders";

const bridgeProviderCache: {[bridgeId in BridgeId]?: BaseBridgeProvider} = {};

// Frontend will always call this function to create a bridgeProvider based on user selections
// A cached bridgeProvider will be  returned  if already created  before for  efficiency
export function getBridgeProvider(bridgeId: BridgeId) {
    if(bridgeProviderCache[bridgeId]) return bridgeProviderCache[bridgeId];
    return createBridgeProvider(bridgeId);
}

function createBridgeProvider(bridgeProviderId: BridgeId) {
    const bridgeProvider = new BRIDGE_PROVIDERS[bridgeProviderId]();
    bridgeProviderCache[bridgeProviderId] = bridgeProvider;

    return bridgeProvider;
}