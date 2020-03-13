import { injectable, inject } from "inversify";
import ICarOnSaleClient from "../interfaces/ICarOnSaleClient";
import IAPIService from "../../API/interfaces/IAPIService";
import IAuthService from "../../Auth/interfaces/IAuthService";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import IAuctionResult from "../interfaces/IAuctionResult";

/**
 * This Service is to access auctions data from CarOnSale API
 */
@injectable()
export default class CarOnSaleClient implements ICarOnSaleClient {

    public constructor(@inject(DependencyIdentifier.API_SERVICE) private _apiService: IAPIService,
        @inject(DependencyIdentifier.AUTH_SERVICE) private _authService: IAuthService) {
    }

    public async getRunningAuctions(): Promise<IAuctionResult> {
        const authData = await this._authService.getAuthData();
        const headers = { userid: authData.userId, authtoken: authData.token };
        return await this._apiService.get('/v2/auction/buyer/', { headers });
    }
}