import { TimeoutCollection } from './timeout-collection.model';

var timeoutCollection = new TimeoutCollection();

setTimeout = (handler: any, timeout?: any, ...args: any[]): number => {
	return timeoutCollection.add(handler, timeout, args);
};

clearTimeout = function (id: number): void {
	timeoutCollection.remove(id);
};