import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";
import ICarOnSaleClient from "./services/CarOnSaleClient/interfaces/ICarOnSaleClient";
import IAuctionItem from "./services/CarOnSaleClient/interfaces/IAuctionItem";

interface RunningAuctionsAnalysis {
    numberOfAuctions: number;
    avgNumberOfBids: number;
    avgPercentageOfAuctionProgress: number;
};

@injectable()
export class AuctionMonitorApp {

    public constructor(@inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT) private _carOnSaleClient: ICarOnSaleClient) {
    }

    public async start(): Promise<void> {

        this.logger.log(`Auction Monitor started.`);
        /**
         * Assumption: for running auctions API there are no default limit and offset values in filter,
         * meaning it will result all auctions without pagination
         * If there are default values, lets say limit 10, then we need to
         * alter the getRunningAuctions method to pass limit and offset with a loop and concatinate all results till and do below aggregation
         */
        const runningAuctions = await this._carOnSaleClient.getRunningAuctions();

        // get all totals as per the analysis
        const aggregateData = runningAuctions.items.reduce((totalData, auction: IAuctionItem) => {
            totalData.totalBids += auction.numBids;
            totalData.totalProgress += (auction.currentHighestBidValue / auction.minimumRequiredAsk) * 100;
            return totalData;
        }, { totalBids: 0, totalProgress: 0 });

        const runningAuctionsAnalysis: RunningAuctionsAnalysis = {
            numberOfAuctions: runningAuctions.total,
            avgNumberOfBids: aggregateData.totalBids / runningAuctions.total,
            avgPercentageOfAuctionProgress: aggregateData.totalProgress / runningAuctions.total
        };

        this.logger.log(JSON.stringify(runningAuctionsAnalysis, null, 4));

        process.exit(0);
    }

}