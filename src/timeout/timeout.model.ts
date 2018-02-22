import { TimeoutStatus } from './timeout-status.model';

export class Timeout {
    uuid: string;
    handler: Function;
    timeout: number;
    arguments: any[];
    id: number;
    timestamp: number;
    status: TimeoutStatus;

    constructor(handler: Function, timeout: number, ...args: any[]) {
        this.uuid = this._generateUuid();
        this.handler = handler;
        this.timeout = timeout;
        this.arguments = args;
        this.id = null;
        this.timestamp = Date.now();
        this.status = TimeoutStatus.Scheduled;
    }

    private _generateUuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
