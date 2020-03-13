import IAuctionResult from "./IAuctionResult";

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export default interface ICarOnSaleClient {
    getRunningAuctions(): Promise<IAuctionResult>
}