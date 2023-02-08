### How to add a new bridges to the bridge aggregator
Currently only two bridges are integrated into the bridge aggregator. These are:
- Glitter SDK 
- WormHole SDK

Both SDKs have a seperate folder where they both contain  a unified list of functions that would be called by the frontend, these lists are specified in the baseBridge script.Although each individual bridgeProvider will provide their own implementations for these functions. 

So to implement new bridges, it would follow this implementation where new folder is created for the bridge SDK and it follows the unified lists of fuctions that would b called by the frontend. 

The SDK package used by the frontend would then be rebuilt, then this makes it possible to integrate the pacckage into the frontend.