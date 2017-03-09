import { IntervalCollection } from './interval-collection.model';

var intervalCollection = new IntervalCollection();

setInterval = (handler: any, interval?: any, ...args: any[]): number => {
	return intervalCollection.add(handler, interval, args);
};

clearInterval = function (id: number): void {
	intervalCollection.remove(id);
};