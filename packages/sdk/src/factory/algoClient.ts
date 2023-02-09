//@ts-nocheck
import {Algodv2 } from 'algosdk';
import { NetworkType } from "../../types";
import { getAlgorandHost } from '../config';

let algoClientCache: Record<NetworkType, Algodv2> = {};

export function getAlgoClient(network: NetworkType): Algodv2 {
    if(algoClientCache[network]) return algoClientCache[network];
    return createAlgoClient(network);
}

function createAlgoClient(network: NetworkType): Algodv2 {
    const algorandHost = getAlgorandHost(network);
    const algodClient = new Algodv2(
        algorandHost.algodToken,
        algorandHost.algodServer,
        algorandHost.algodPort
      );   
      algoClientCache[network] = algodClient;

    return algodClient;
}