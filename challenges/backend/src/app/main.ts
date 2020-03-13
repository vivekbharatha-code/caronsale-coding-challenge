import { Container } from "inversify";

import { config as dotENVConfig } from "dotenv";
dotENVConfig();

// interfaces
import { ILogger } from "./services/Logger/interface/ILogger";
import IAPIService from "./services/API/interfaces/IAPIService";
import ICarOnSaleClient from "./services/CarOnSaleClient/interfaces/ICarOnSaleClient";
import IAuthService from "./services/Auth/interfaces/IAuthService";

import { Logger } from "./services/Logger/classes/Logger";
import { AuctionMonitorApp } from "./AuctionMonitorApp";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import AuthService from "./services/Auth/classes/AuthService";
import APIService from "./services/API/classes/APIService";
import CarOnSaleClient from "./services/CarOnSaleClient/classes/CarOnSaleClient";

/*
 * Create the DI container.
 */
const container = new Container({
    defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<IAPIService>(DependencyIdentifier.API_SERVICE).to(APIService);
container.bind<IAuthService>(DependencyIdentifier.AUTH_SERVICE).to(AuthService);
container.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient);

/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
    await app.start().catch(error => {
        /* tslint:disable: no-console */
        console.log(typeof error.toJSON === 'function' ? error.toJSON() : error);
        process.exit(1);
    });
})();
