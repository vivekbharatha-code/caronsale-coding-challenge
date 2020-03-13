/**
 * Auth Service spec file
 */
import { describe, it } from 'mocha';
import { instance, mock, when, anything } from "ts-mockito";
import { expect } from 'chai';
import 'reflect-metadata';

// interfaces
import IAPIService from '../../API/interfaces/IAPIService';
import IAuthService from '../interfaces/IAuthService';
import IAuthData from '../interfaces/IAuthData';

import AuthService from '../../Auth/classes/AuthService';
import APIService from '../../API/classes/APIService';

import { getTestAuthData } from '../../../utils/test-utils';

describe('Unit Test suite - Auth Service', () => {
    let mockedApiService: IAPIService;
    let mockedApiInstance: IAPIService;

    let authService: IAuthService;

    before(() => {
        mockedApiService = mock(APIService);
        mockedApiInstance = instance(mockedApiService);

        authService = new AuthService(mockedApiInstance);
    });

    it('Should return an error', async () => {
        when(mockedApiService.put(anything(), anything())).thenReject(new Error('Invalid url'));

        await authService.getAuthData()
            .catch((error) => {
                expect(error.message).equal('Invalid url');
            });
    });

    it('Should return a test data', async () => {
        const testAuthData = getTestAuthData();
        when(mockedApiService.put(anything(), anything())).thenResolve(testAuthData);

        const authData: IAuthData = await authService.getAuthData();

        expect(authData).deep.equal(testAuthData);
    });

});