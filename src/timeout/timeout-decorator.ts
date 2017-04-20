import { TimeoutCollection } from './timeout-collection.model';

export var timeoutCollection = new TimeoutCollection();

window.setTimeout = (handler: any, timeout?: any, ...args: any[]): number => {
	return timeoutCollection.add(handler, timeout, args);
};

window.clearTimeout = function (id: number): void {
	timeoutCollection.remove(id);
};