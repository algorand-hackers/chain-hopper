//@ts-nocheck
// This class contains a unified list of functions that Frontend will be interacting with
// Each individual bridgeProvider will provide their own implementations for these functions
// However return values should follow a standard format irrespective of the difference in implementation

export abstract class BaseBridgeProvider {

    // Return the list of assets supported by this bridgeProvider
    public abstract supportedAssets();

    // ...Add other common functions

}