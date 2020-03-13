/**
 * Interface to define Authenticatoin response data structure
 */
export default interface IAuthData {
    token: string;
    authenticated: boolean;
    userId: string;
    internalUserId: number;
    internalUserUUID: string;
    type: number;
    privileges: string;
}