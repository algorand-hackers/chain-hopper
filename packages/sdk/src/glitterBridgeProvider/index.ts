import { Assets, Networks } from "../../config";
import { Quote, QuoteRequest, Update } from "../../types";
import { BaseBridgeProvider } from "../baseBridgeProvider";

export class GlitterBridgeProvider implements BaseBridgeProvider {

    public supportedNetworks() {
        return [Networks.ALGO, Networks.SOL];
    }

    public  supportedAssetsByNetwork(network: string){

    }

    public  moveAsset(quote) {

    }
        
    public  performNextStep(update) {

    }
}