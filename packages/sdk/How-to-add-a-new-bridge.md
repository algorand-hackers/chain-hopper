# How to add a new bridges to the bridge aggregator
Currently only two bridges are integrated into the bridge aggregator. These are:
- Glitter SDK 
- WormHole SDK

## To add a new Bridge, do the following

- Craate a new class that extends and implements the functions of [BaseBridgeProvider](src/baseBridgeProvider/index.ts). 

- Add the new bridge to enum BridgeId in [types](https://github.com/algorand-hackers/chain-hopper/blob/develop/packages/sdk/src/types.ts#:~:text=export%20enum%20BridgeId,%7D) and [BRIDGE_PROVIDERS](src/config/bridgeProviders.ts)

- Add extra [Chains](https://github.com/algorand-hackers/chain-hopper/blob/develop/packages/sdk/src/config/index.ts#:~:text=export%20const%20Chains,%7D), [Wallets](https://github.com/algorand-hackers/chain-hopper/blob/develop/packages/sdk/src/config/index.ts#:~:text=export%20const%20EVM_WALLETS,%27Solflare%27%7D) and Assets supported by the bridge to [config](src/config/index.ts)
