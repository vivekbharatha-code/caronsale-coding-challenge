/**
 * CarOnSaleClient spec file
 */

import { describe, it } from 'mocha';
import { instance, mock, when, anything } from "ts-mockito";
import { expect } from 'chai';
import 'reflect-metadata';

import CarOnSaleClient from './CarOnSaleClient';
import IAPIService from '../../API/interfaces/IAPIService';
import IAuthService from '../../Auth/interfaces/IAuthService';
import IAuthData from '../../Auth/interfaces/IAuthData';
import AuthService from '../../Auth/classes/AuthService';
import APIService from '../../API/classes/APIService';

import { getTestAuthData, getTestAuctionResult } from '../../../utils/test-utils';

describe('Unit Test suite - CarOnSaleClient service', () => {
    let mockedApiService: IAPIService;
    let mockedApiInstance: IAPIService;
    let mockedAuthService: IAuthService;
    let mockedAuthInstance: IAuthService;

    let carOnSaleClient: CarOnSaleClient;

    beforeEach(() => {
        mockedApiService = mock(APIService);
        mockedApiInstance = instance(mockedApiService);
        mockedAuthService = mock(AuthService);
        mockedAuthInstance = instance(mockedAuthService);

        carOnSaleClient = new CarOnSaleClient(mockedApiInstance, mockedAuthInstance);
    });

    it('Should return error when no auth data found', async () => {
        when(mockedAuthService.getAuthData()).thenReturn();
        await carOnSaleClient.getRunningAuctions().catch((e) => {
            expect(e.message).to.be.equal("Cannot read property 'userId' of null");
        });
    });

    it('Should return auctions empty array', async () => {
        const testAuthData: IAuthData = getTestAuthData();
        when(mockedAuthService.getAuthData()).thenResolve(testAuthData);
        when(mockedApiService.get(anything(), anything())).thenResolve({ items: [], page: 0, total: 0 })

        const auctions = await carOnSaleClient.getRunningAuctions();

        expect(auctions.total).to.equal(0);
        expect(auctions.page).to.equal(0);
        expect(auctions.items.length).to.equal(0);
    });

    it('Should return auctions of 1', async () => {
        const testAuthData: IAuthData = getTestAuthData();
        when(mockedAuthService.getAuthData()).thenReturn(Promise.resolve(testAuthData));
        when(mockedApiService.get(anything(), anything())).thenReturn(Promise.resolve(getTestAuctionResult()))

        const auctions = await carOnSaleClient.getRunningAuctions();

        expect(auctions.total).to.equal(1);
        expect(auctions.page).to.equal(1);
        expect(auctions.items.length).to.equal(1);
    });

});