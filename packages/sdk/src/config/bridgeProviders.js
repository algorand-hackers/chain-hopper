import { BridgeId } from "../types";
import { WormHoleBridgeProvider } from "../wormholeBridgeProvider";
import { GlitterBridgeProvider } from "../glitterBridgeProvider";
export const BRIDGE_PROVIDERS = {
    [BridgeId.WormHole]: WormHoleBridgeProvider,
    [BridgeId.Glitter]: GlitterBridgeProvider
};
