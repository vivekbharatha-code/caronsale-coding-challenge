/**
 * This interface defines primary 4 http methods, we can add the other methods as well
 */
export default interface IAPIService {
    get(url: string, config?: any): Promise<any>;
    post(url: string, data: any, config?: any): Promise<any>;
    put(url: string, data: any, config?: any): Promise<any>;
    delete(url: string, config?: any): Promise<any>;
}