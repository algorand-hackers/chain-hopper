import { Asset, AssetKeys, NetworkType } from "../types"

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
    [NetworkType.MAINNET]: {
        [Chains.SOL]:{
            [AssetKeys.xALGO_Glitter]: {symbol: 'xALGO', description: 'Wrapped ALGO on Solana', address: 'xALGoH1zUfRmpCriy94qbfoMXHtK6NDnMKzT4Xdvgms', decimals: 18, imageUrl: "https://cryptologos.cc/logos/algorand-algo-logo.png?v=002" },
        
            [AssetKeys.SOL]: {symbol: 'SOL', description: 'Native Solana on Solana', address: '', decimals: 9, imageUrl: "https://cryptologos.cc/logos/solana-sol-logo.png?v=024"},
    
            [AssetKeys.USDCs]: {symbol: 'USDC', description: "USDC on Solana", address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', decimals: 6, imageUrl:  "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=002"}
        },
        [Chains.ALGO]:{
            [AssetKeys.ALGO]: {symbol: 'ALGO', description: 'Native ALGO on Algorand', address: '', decimals: 18, imageUrl:  "https://cryptologos.cc/logos/algorand-algo-logo.png?v=002"},
    
            [AssetKeys.xSOL_Glitter]: {symbol: 'xSOL', description: 'Wrapped Sol on Algorand', address: '792313023', decimals: 9, imageUrl: "https://cryptologos.cc/logos/solana-sol-logo.png?v=024"},
    
            [AssetKeys.USDCa]: {symbol: 'USDC', description: "USDC on Algorand", address: '31566704', decimals: 6, imageUrl:  "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=002"},
    
            [AssetKeys.WETH_Wormhole]: {symbol: 'WETH', description: "Wormhole Wrapped ether on algorand", address: '887406851', decimals: 18, imageUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=002"} //@Todo insert correct address
        },
        [Chains.ETH]:{
            [AssetKeys.ETH]: {symbol: 'ETH', description: 'Native ETH on Ethereum', address: '', decimals: 18, imageUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=002"},
        }
    },
    [NetworkType.TESTNET]:  {
        [Chains.SOL]:{
            [AssetKeys.xALGO_Glitter]: {symbol: 'xALGO', description: 'Wrapped ALGO on Solana', address: '', decimals:18, imageUrl:  "https://cryptologos.cc/logos/algorand-algo-logo.png?v=002"},
        
            [AssetKeys.SOL]: {symbol: 'SOL', description: 'Native Solana on Solana', address: '', decimals: 9, imageUrl: "https://cryptologos.cc/logos/solana-sol-logo.png?v=024"},
    
            [AssetKeys.USDCs]: {symbol: 'USDC', description: "USDC on Solana", address: 'CpMah17kQEL2wqyMKt3mZBdTnZbkbfx4nqmQMFDP5vwp', decimals: 6, imageUrl:  "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=002"}
        },
        [Chains.ALGO]:{
            [AssetKeys.ALGO]: {symbol: 'ALGO', description: 'Native ALGO on Algorand', address: '', decimals: 18, imageUrl:  "https://cryptologos.cc/logos/algorand-algo-logo.png?v=002"},
    
            [AssetKeys.xSOL_Glitter]: {symbol: 'xSOL', description: 'Wrapped Sol on Algorand', address: '', decimals: 9, imageUrl: "https://cryptologos.cc/logos/solana-sol-logo.png?v=024"},
    
            [AssetKeys.USDCa]: {symbol: 'USDC', description: "USDC on Algorand", address: '113638050', decimals: 6, imageUrl:  "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=002"},
    
            [AssetKeys.WETH_Wormhole]: {symbol: 'WETH', description: "Wormhole Wrapped ether on algorand", address: '', decimals: 18, imageUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=002"} //@Todo insert correct address
        },
        [Chains.ETH]:{
            [AssetKeys.ETH]: {symbol: 'ETH', description: 'Native ETH on Ethereum', address: '', decimals: 18, imageUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=002"},
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


export const glitterBridgeTokenInformation: any  = {
    Solana: {
        tokens: [
            {
              network: "solana",
              symbol: "SOL",
              address: "11111111111111111111111111111111",
              decimals: 9,
              min_transfer: 0.05,
              fee_divisor: 200,
              name: undefined,
              max_transfer: undefined,
              total_supply: undefined,
            },
            {
              network: "solana",
              symbol: "xALGO",
              address: "xALGoH1zUfRmpCriy94qbfoMXHtK6NDnMKzT4Xdvgms",
              decimals: 6,
              min_transfer: 5,
              fee_divisor: 200,
              name: undefined,
              max_transfer: undefined,
              total_supply: undefined,
            },
            {
              network: "solana",
              symbol: "USDC",
              address: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
              decimals: 6,
              min_transfer: 1,
              fee_divisor: 200,
              name: undefined,
              max_transfer: undefined,
              total_supply: undefined,
            }
          ]
    },

    Algorand: {
        tokens: [
            {
              network: "algorand",
              symbol: "ALGO",
              address: "",
              decimals: 6,
              min_transfer: 5,
              fee_divisor: 200,
              name: undefined,
              max_transfer: undefined,
              total_supply: undefined,
            },
            {
              network: "algorand",
              symbol: "USDC",
              address: 10458941,
              decimals: 6,
              min_transfer: 5,
              fee_divisor: 200,
              name: undefined,
              max_transfer: undefined,
              total_supply: undefined,
            },
            {
              network: "algorand",
              symbol: "xSOL",
              address: 31566704,
              decimals: 9,
              min_transfer: 0.05,
              fee_divisor: 200,
              name: undefined,
              max_transfer: undefined,
              total_supply: undefined,
            }
          ]
    }
   
}