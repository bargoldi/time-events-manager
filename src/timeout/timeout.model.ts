export interface Timeout {
    id: number;
    handler: Function;
    timeout: number;
    arguments: any[];
}
