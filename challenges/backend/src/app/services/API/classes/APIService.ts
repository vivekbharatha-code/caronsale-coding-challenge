import axios, { AxiosInstance } from 'axios';
import { injectable } from 'inversify';

import IAPIService from './../interfaces/IAPIService';

/**
 * This service abstracts axios functionality and exposes primary 4 HTTP methods.
 * We can extend to other methods as well.
 */
@injectable()
export default class APIService implements IAPIService {
    private _request: AxiosInstance;

    public constructor() {
        this._request = axios.create({
            baseURL: process.env.API_BASE_URL
        });
    }

    public get = async (url: string, config?: any): Promise<any> => {
        return this._request.get(url, config)
            .then((res: any) => res.data);
    }

    public post = async (url: string, data: any, config?: any): Promise<any> => {
        return this._request.post(url, data, config)
            .then((res: any) => res.data);
    }

    public put = async (url: string, data: any, config?: any): Promise<any> => {
        return this._request.put(url, data, config)
            .then((res: any) => res.data);
    }

    public delete = async (url: string, config?: any): Promise<any> => {
        return this._request.delete(url, config)
            .then((res: any) => res.data);
    }
}
