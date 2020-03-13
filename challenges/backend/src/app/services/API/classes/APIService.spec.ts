/**
 * API Service spec file
 */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import 'reflect-metadata';

// interfaces
import APIService from '../../API/classes/APIService';
import IAPIService from '../../API/interfaces/IAPIService';

/* tslint:disable:no-unused-expression */
describe('Unit Test suite - API Service', () => {
    let apiService: IAPIService;

    process.env.API_BASE_URL = 'https://google.com';

    beforeEach(() => {
        apiService = new APIService();
    });

    it('Should return 404 when we get /invalidUrl', async () => {
        const res = await apiService.get('/invalidUrl')
            .catch(error => {
                expect(error.message).to.equal('Request failed with status code 404');
            });
        expect(res).to.be.undefined;
    });

    it('Should return 200 when we get /', async () => {
        const res = await apiService.get('/');
        expect(res).is.not.empty;
    });

    // We can similar cases for remaining methods
});