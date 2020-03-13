import IAuctionItem from "./IAuctionItem";
/**
 * Interface to define the api json response for running auctions data
 */
export default interface IAuctionResult {
    items: IAuctionItem[];
    page: number;
    total: number;
}