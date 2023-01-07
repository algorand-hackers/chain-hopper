import { BRIDGES } from "../../config";
import { BaseBridgeProvider } from "../baseBridgeProvider";

const bridgeProviderCache: Record<string, BaseBridgeProvider> = {};

// Frontend will always call this function to create a bridgeProvider based on user selections
// A cached bridgeProvider will be  returned  if already created  before for  efficiency
export function getBridgeProvider(bridgeProviderId: string) {
    if(bridgeProviderCache[bridgeProviderId]) return bridgeProviderCache[bridgeProviderId];
    return createBridgeProvider(bridgeProviderId);
}

function createBridgeProvider(bridgeProviderId: string) {
    const bridgeProvider = new BRIDGES[bridgeProviderId]();
    bridgeProviderCache[bridgeProviderId] = bridgeProvider;

    return bridgeProvider;
}