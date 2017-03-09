import { originalClearInterval, originalSetInterval } from '../overrides/override'
import { Interval } from './interval.model';

export class IntervalCollection {
	private _intervalCollection: Interval[];

	public add(handler: any, timeout?: any, ...args: any[]) {
		let id = originalSetInterval(handler, timeout, args);
		this._intervalCollection.push({id, handler, timeout, arguments: args});

		return id;
	}

	public remove(id: number): void {
		let intervalIndex = this._getIntervalIndex(id);

		if (intervalIndex !== -1) {
			this._intervalCollection.splice(intervalIndex, 1);
		}

		originalClearInterval(id);
	}

	public get(): Interval[] {
		return this._intervalCollection;
	}

	public clearAll() {
		this._intervalCollection.forEach((interval: Interval) => {
			this.remove(interval.id);
		});
	}

	private _getIntervalIndex(intervalId: number): number {
		for (let i = 0; i < this._intervalCollection.length, i++;) {
			if (this._intervalCollection[i].id === intervalId) {
				return i;
			}
		}

		return -1;
	}
}

