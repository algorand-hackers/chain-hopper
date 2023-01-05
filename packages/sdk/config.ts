import { GlitterBridgeProvider } from "./src/glitterBridgeProvider"
import { WormHoleBridgeProvider } from "./src/wormholeBridgeProvider"

export const BRIDGES = {
    'WormHole': WormHoleBridgeProvider,
    'Glitter': GlitterBridgeProvider
}

export const Chains = {
    SOL: "Solana",
    ALGO: "Algorand",
    ETH: "Ethereum"
}


export const EVM_WALLETS = {
    Metamask: 'Metamask',
}
export const ALGORAND_WALLETS = {MyAlgo: 'MyAlgo', Pera: 'Pera'}

export const SOLANA_WALLETS = {Phantom: 'Phantom', Solflare: 'Solflare'}


export const Assets = {
    Mainnet: {
        SOL:{
            xALGO: {symbol: 'xALGO', description: 'Wrapped ALGO on Solana'},
        
            SOLANA: {symbol: 'SOL', description: 'Native Solana on Solana '},
    
            USDCs: {symbol: 'USDCs', description: "USDC on Solana"}
        },
        ALGO:{
            ALGO: {symbol: 'ALGO', description: 'Native ALGO on Algorand'},
    
            xSOL: {symbol: 'xSOL', description: 'Wrapped Sol on Algorand'},
    
            USDCa: {symbol: 'USDCs', description: "USDC on Solana"},
    
            WETH: {symbol: 'WETH', description: "Wormhole Wrapped ether on algorand"}
        },
        ETH:{
            ETH: {symbol: 'ETH', description: 'Native ETH on Ethereum'},
        }
    },
    Testnet:  {
        SOL:{
            xALGO: {symbol: 'xALGO', description: 'Wrapped ALGO on Solana'},
        
            SOLANA: {symbol: 'SOL', description: 'Native Solana on Solana '},
    
            USDCs: {symbol: 'USDCs', description: "USDC on Solana"}
        },
        ALGO:{
            ALGO: {symbol: 'ALGO', description: 'Native ALGO on Algorand'},
    
            xSOL: {symbol: 'xSOL', description: 'Wrapped Sol on Algorand'},
    
            USDCa: {symbol: 'USDCs', description: "USDC on Solana"},
    
            WETH: {symbol: 'WETH', description: "Wormhole Wrapped ether on algorand"}
        },
        ETH:{
            ETH: {symbol: 'ETH', description: 'Native ETH on Ethereum'},
        }
    }
}

export const BRIDGE_STATUS = {
    SUCCESS : 'success',
    FAILED : 'failed',
    WAITING_FOR_BRIDGE_CONFIRMATION: 'waiting for bridge confirmation',
    WAITING_FOR_RECEIPT_CONFIRMATION: 'waiting for receipt confirmation'
}
export const BRIDGE_FROM_ETHEREUM_STATUS = {
    ...BRIDGE_STATUS,
    WAITING_FOR_APPROVAL_CONFIRMATION : 'Waiting for approval confirmation',
    APPROVAL_CONFIRMED : 'Approval confirmed',
    WAITING_FOR_SEND_CONFIRMATION : 'Waiting for send confirmation',
    SEND_CONFIRMED: 'Send Confirmed'
} 
export const BRIDGE_FROM_ALGORAND_STATUS = {
    ...BRIDGE_STATUS,
}
export  const BRIDGE_FROM_SOLANA_STATUS = {
    ...BRIDGE_STATUS,
}
