import { IntervalCollection } from './interval-collection.model';

export var intervalCollection = new IntervalCollection();

window.setInterval = (handler: any, interval?: any, ...args: any[]): number => {
	return intervalCollection.add(() => {
		handler();
	}, interval, args);
};

window.clearInterval = function (id: number): void {
	intervalCollection.remove(id);
};