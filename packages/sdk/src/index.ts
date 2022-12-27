//@ts-nocheck
import { BRIDGES } from "./config";

const bridgeProviderCache = {};

// Frontend will always call this function to create a bridgeProvider based on user selections
// A cached bridgeProvider will be  returned  if already created  before for  efficiency
export function createBridgeProvider(bridgeProviderId: string) {
    if(bridgeProviderCache[bridgeId]) return bridgeProviderCache[bridgeProviderId];
    const bridgeProvider = new BRIDGES[bridgeProviderId]();
    bridgeProviderCache[bridgeProviderId] = bridgeProvider;

    return bridgeProvider;
}