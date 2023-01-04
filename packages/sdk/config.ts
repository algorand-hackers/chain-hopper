import { GlitterBridgeProvider } from "./src/glitterBridgeProvider"
import { WormHoleBridgeProvider } from "./src/wormholeBridgeProvider"

export const BRIDGES = {
    'WormHole': WormHoleBridgeProvider,
    'Glitter': GlitterBridgeProvider
}

export const Networks = {
    SOL: "Solana",
    ALGO: "Algorand"
}



export const Assets = {
    [Networks.SOL]:{
        xALGO: {symbol: 'xALGO', description: 'Wrapped ALGO on Solana'},
    
        SOLANA: {symbol: 'SOL', description: 'Native Solana on Solana '},

        USDCs: {symbol: 'USDCs', description: "USDC on Solana"}
    },
    [Networks.ALGO]:{
        ALGO: {symbol: 'ALGO', description: 'Native ALGO on Algorand'},

        xSOL: {symbol: 'xSOL', description: 'Wrapped Sol on Algorand'},

        USDCa: {symbol: 'USDCs', description: "USDC on Solana"}
    }
}