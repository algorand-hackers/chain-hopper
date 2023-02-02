//@ts-nocheck
import { Algodv2 } from '@certusone/wormhole-sdk';
let algoClientCache = {};
export function getAlgoClient(network) {
    if (algoClientCache[network])
        return algoClientCache[network];
    return createAlgoClient(network);
}
function createAlgoClient(network) {
    const algorandHost = getAlgorandHost(network);
    const algodClient = new Algodv2(algorandHost.algodToken, algorandHost.algodServer, algorandHost.algodPort);
    algoClientCache[network] = algodClient;
    return algodClient;
}
