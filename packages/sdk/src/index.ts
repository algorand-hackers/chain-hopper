//@ts-nocheck
import { BRIDGES } from "./config";

const bridgeCache = {};

// Frontend will always call this function to create a bridge based on user selections
// A cached bridge will be  returned  if already created  before for  efficiency
export function createBridge(bridgeId: string) {
    if(bridgeCache[bridgeId]) return bridgeCache[bridgeId];
    const bridge = new BRIDGES[bridgeId]();
    bridgeCache[bridgeId] = bridge;

    return bridge;
}