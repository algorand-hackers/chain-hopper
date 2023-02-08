# How to add a new bridges to the bridge aggregator
Currently only two bridges are integrated into the bridge aggregator. These are:
- Glitter SDK 
- WormHole SDK

## To add a new Bridge, do the following

- Craate a new class that extends and implements the functions of [BaseBridgeProvider](src/baseBridgeProvider/index.ts). 

- Add the new bridge to enum BridgeId in [types](src/types.ts) and BRIDGE_PROVIDERS in [bridgeProviders.ts](src/config/bridgeProviders.ts)

- Add extra Chains, Wallets and Assets supported by the bridge to [config](src/config/index.ts)