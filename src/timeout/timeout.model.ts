import { TimeoutStatus } from './timeout-status.model';

export class Timeout {
    id: number;
    handler: Function;
    timeout: number;
    arguments: any[];
    timestamp: number;
    status: TimeoutStatus;

    constructor(id: number, handler: Function, timeout: number, ...args: any[]) {
        this.id = id;
        this.handler = handler;
        this.timeout = timeout;
        this.arguments = args;
        this.timestamp = Date.now();
        this.status = TimeoutStatus.Scheduled;
    }
}
