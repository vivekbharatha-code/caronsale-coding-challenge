/**
 * AuctionMonitorApp spec file
 */
import { describe, it } from 'mocha';
import { instance, mock, when, spy, capture } from "ts-mockito";
import { expect } from 'chai';
import 'reflect-metadata';

// interfaces
import ICarOnSaleClient from './services/CarOnSaleClient/interfaces/ICarOnSaleClient';
import { ILogger } from './services/Logger/interface/ILogger';

import CarOnSaleClient from './services/CarOnSaleClient/classes/CarOnSaleClient';
import { getTestAuctionResult } from './utils/test-utils';
import { Logger } from './services/Logger/classes/Logger';
import { AuctionMonitorApp } from './AuctionMonitorApp';

describe('Unit Test suite - AuctionMonitorApp', () => {
    let mockedCarOnSaleClient: ICarOnSaleClient;
    let mockedCarOnSaleClientInstance: ICarOnSaleClient;
    let mockedLogger: ILogger;
    let mockedLoggerInstance: ILogger;

    let auctionMonitorApp: AuctionMonitorApp;
    const realProcessExit = process.exit;

    beforeEach(() => {
        mockedCarOnSaleClient = mock(CarOnSaleClient);
        mockedCarOnSaleClientInstance = instance(mockedCarOnSaleClient);

        mockedLogger = mock(Logger);
        mockedLoggerInstance = instance(mockedLogger);

        auctionMonitorApp = new AuctionMonitorApp(mockedLoggerInstance, mockedCarOnSaleClientInstance);

        // mocking process.exit
        const exitMock = (e: number) => {
            /* tslint:disable: no-console */
            console.log(`process.exit called with code ${e}`);
        }

        process.exit = exitMock as never;
    });

    after(() => {
        process.exit = realProcessExit;
    });

    it('Should return error with invalid authorization', async () => {
        when(mockedCarOnSaleClient.getRunningAuctions()).thenReject(new Error('Invalid Authorization'));

        await auctionMonitorApp.start().catch(e => {
            expect(e.message).equal('Invalid Authorization');
        });
    });

    it('Should return success with expected analysis', async () => {
        when(mockedCarOnSaleClient.getRunningAuctions()).thenResolve(getTestAuctionResult());
        const spiedProcess = spy(process);

        await auctionMonitorApp.start();
        // process should exit with 0
        expect(capture(spiedProcess.exit).last()[0]).equal(0);
        // Print analysis of auctions
        const analysisPrintString =
            '{\n    "numberOfAuctions": 1,\n    "avgNumberOfBids": 10,\n    "avgPercentageOfAuctionProgress": 10\n}';
        expect(capture(mockedLogger.log).last()[0]).equal(analysisPrintString);
    });

});