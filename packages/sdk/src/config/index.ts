import { Asset, NetworkType } from "../types"

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


export const Assets: Record<string, Record<string,Record<string, Asset>>> = {
    Mainnet: {
        [Chains.SOL]:{
            xALGO: {symbol: 'xALGO', description: 'Wrapped ALGO on Solana', address: 'xALGoH1zUfRmpCriy94qbfoMXHtK6NDnMKzT4Xdvgms', decimals: 18},
        
            SOL: {symbol: 'SOL', description: 'Native Solana on Solana', address: '', decimals: 9},
    
            USDCs: {symbol: 'USDCs', description: "USDC on Solana", address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', decimals: 6}
        },
        [Chains.ALGO]:{
            ALGO: {symbol: 'ALGO', description: 'Native ALGO on Algorand', address: '', decimals: 18},
    
            xSOL: {symbol: 'xSOL', description: 'Wrapped Sol on Algorand', address: '', decimals: 9},
    
            USDCa: {symbol: 'USDCa', description: "USDC on Algorand", address: '', decimals: 5},
    
            WETH: {symbol: 'WETH', description: "Wormhole Wrapped ether on algorand", address: '', decimals: 18} //@Todo insert correct address
        },
        [Chains.ETH]:{
            ETH: {symbol: 'ETH', description: 'Native ETH on Ethereum', address: '', decimals: 18},
        }
    },
    Testnet:  {
        [Chains.SOL]:{
            xALGO: {symbol: 'xALGO', description: 'Wrapped ALGO on Solana', address: '', decimals:18},
        
            SOL: {symbol: 'SOL', description: 'Native Solana on Solana', address: '', decimals: 9},
    
            USDCs: {symbol: 'USDCs', description: "USDC on Solana", address: 'CpMah17kQEL2wqyMKt3mZBdTnZbkbfx4nqmQMFDP5vwp', decimals: 6}
        },
        [Chains.ALGO]:{
            ALGO: {symbol: 'ALGO', description: 'Native ALGO on Algorand', address: '', decimals: 18},
    
            xSOL: {symbol: 'xSOL', description: 'Wrapped Sol on Algorand', address: '', decimals: 9},
    
            USDCa: {symbol: 'USDCa', description: "USDC on Algorand", address: '', decimals: 6},
    
            WETH: {symbol: 'WETH', description: "Wormhole Wrapped ether on algorand", address: '', decimals: 18} //@Todo insert correct address
        },
        [Chains.ETH]:{
            ETH: {symbol: 'ETH', description: 'Native ETH on Ethereum', address: '', decimals: 18},
        }
    }
}

export const BRIDGE_STATUS = {
    SUCCESS : 'success',
    FAILED : 'failed',
    WAITING_FOR_SEND_CONFIRMATION : 'Waiting for send confirmation',
    SEND_CONFIRMED: 'Send Confirmed',
    RECEIVING: 'receiving',
    WAITING_FOR_RECEIPT_CONFIRMATION: 'waiting for receipt confirmation'
}
export const BRIDGE_FROM_ETHEREUM_STATUS = {
    ...BRIDGE_STATUS,
    WAITING_FOR_APPROVAL_CONFIRMATION : 'Waiting for approval confirmation',
    APPROVAL_CONFIRMED : 'Approval confirmed',
} 
export const BRIDGE_FROM_ALGORAND_STATUS = {
    ...BRIDGE_STATUS,
}
export  const BRIDGE_FROM_SOLANA_STATUS = {
    ...BRIDGE_STATUS,
}

export function getAlgorandHost(network: NetworkType) {
    return network === NetworkType.MAINNET ? {
        algodToken: "",
        algodServer: "https://testnet-api.algonode.cloud", //@Todo change this to mainnet
        algodPort: "",
    } : {
        algodToken: "",
        algodServer: "https://testnet-api.algonode.cloud",
        algodPort: "",
    }
}

export function getWormHoleRpchost(network: NetworkType) {
    return network === NetworkType.MAINNET ? ["https://wormhole-v2-mainnet-api.certus.one"] : ["https://wormhole-v2-testnet-api.certus.one"];
}

export const ALGORAND_WAIT_FOR_CONFIRMATIONS = 4 // 4 rounds. a block is created every round
