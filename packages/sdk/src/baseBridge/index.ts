//@ts-nocheck
// This class contains a unified list of functions that Frontend will be interacting with
// Each individual bridge will provide their own implementations for these functions
// However return values should follow a standard format irrespective of the difference in implementation

export abstract class BaseBridge {

    // Return the list of assets supported by this bridge
    public abstract supportedAssets();

    // ...Add other common functions

}