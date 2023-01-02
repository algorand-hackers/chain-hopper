//@ts-nocheck
// This class contains a unified list of functions that Frontend will be interacting with
// Each individual bridgeProvider will provide their own implementations for these functions
// However return values should follow a standard format irrespective of the difference in implementation

import { Quote, Update } from "../../types";

export abstract class BaseBridgeProvider {

    // Return the list of networks supported by this bridgeProvider
    public abstract supportedNetworks();

    // Return the list of assets supported by this bridgeProvider for the specified network
    public abstract supportedAssetsByNetwork(network: string);

    public abstract moveAsset(quote);
        
    public abstract performNextStep(update);
        

    // ...Add other common functions

}