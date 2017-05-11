export abstract class Timeout {
    id: number;
    handler: Function;
    timeout: number;
    arguments: any[];
    timestamp: number;
}
