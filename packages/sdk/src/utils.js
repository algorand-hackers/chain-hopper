import { Chains } from "./config";
export function getNonAlgorandChain({ from, to }) {
    return from === Chains.ALGO ? to : from;
}
