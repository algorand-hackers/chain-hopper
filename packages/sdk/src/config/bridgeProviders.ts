import { BaseBridgeProvider } from "../baseBridgeProvider";
import { BridgeId } from "../types";
import { WormHoleBridgeProvider } from "../wormholeBridgeProvider";
import { GlitterBridgeProvider } from "../glitterBridgeProvider"


export const BRIDGE_PROVIDERS: Record<BridgeId, new() => BaseBridgeProvider> = {
    [BridgeId.WormHole]: WormHoleBridgeProvider,
    [BridgeId.Glitter]: GlitterBridgeProvider
}