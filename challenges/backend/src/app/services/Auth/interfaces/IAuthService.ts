import IAuthData from "./IAuthData";

/**
 * Interface to define authentication methods
 */
export default interface IAuthService {
    getAuthData(): Promise<IAuthData>;
}