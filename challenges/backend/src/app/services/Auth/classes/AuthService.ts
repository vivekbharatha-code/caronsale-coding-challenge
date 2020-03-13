import crypto from 'crypto';
import { injectable, inject } from 'inversify';

// interfaces
import IAPIService from './../../API/interfaces/IAPIService';
import IAuthData from '../interfaces/IAuthData';
import IAuthService from '../interfaces/IAuthService';

import { DependencyIdentifier } from '../../../DependencyIdentifiers';
/**
 * This service will get the authentication details from the CarOnSale API
 */
@injectable()
export default class AuthService implements IAuthService {
    public constructor(@inject(DependencyIdentifier.API_SERVICE) private _apiService: IAPIService) {
    }

    private sha512 = (text: string): string => {
        const hash = crypto.createHash('sha512');
        return hash.update(text).digest("hex");
    }

    private hashPasswordWithCycles = (plainTextPassword: string, cycles: number = 5): string => {
        let password = `${plainTextPassword}`;
        for (let v = 0; v < cycles; v++) {
            password = this.sha512(password);
        }
        return password;
    }

    public getAuthData = async (): Promise<IAuthData> => {
        /**
         * TIP: we can save authData in private variable and use the same without hitting again by checking the
         * token expiry and use POST /v1​/authentication​/{userMailId} API to revalidate and
         * extend the token session tome
         */
        const hashedPassword =
            this.hashPasswordWithCycles(process.env.API_USER_PASSWORD, parseInt(process.env.PASSWORD_HASH_CYCLES || '5', 10));
        return await this._apiService.put(`/v1/authentication/${process.env.API_USER_EMAIL}`, { password: hashedPassword });
    }

}