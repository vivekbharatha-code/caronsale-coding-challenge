import { ILogger } from "../interface/ILogger";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class Logger implements ILogger {
    /* tslint:disable:no-empty */
    // we can actually remove constructor but as per the better understanding added tslint disable
    public constructor() {
    }

    public log(message: string): void {
        /* tslint:disable: no-console */
        console.log(`[LOG]: ${message}`);
    }

}