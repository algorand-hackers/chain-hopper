import { Chains } from "./config";

export function getNonAlgorandChain({from, to}: {from: string,  to: string}) {
    return from === Chains.ALGO ? to : from;
}
