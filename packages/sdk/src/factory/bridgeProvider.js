import { BRIDGE_PROVIDERS } from "../config/bridgeProviders";
const bridgeProviderCache = {};
// Frontend will always call this function to create a bridgeProvider based on user selections
// A cached bridgeProvider will be  returned  if already created  before for  efficiency
export function getBridgeProvider(bridgeId) {
    if (bridgeProviderCache[bridgeId])
        return bridgeProviderCache[bridgeId];
    return createBridgeProvider(bridgeId);
}
function createBridgeProvider(bridgeProviderId) {
    const bridgeProvider = new BRIDGE_PROVIDERS[bridgeProviderId]();
    bridgeProviderCache[bridgeProviderId] = bridgeProvider;
    return bridgeProvider;
}
