import { originalClearTimeout, originalSetTimeout } from '../overrides/override'
import { Timeout } from './timeout.model';

export class TimeoutCollection {
	private _timeoutCollection: Timeout[];

	public add(handler: any, timeout?: any, ...args: any[]) {
		let id = originalSetTimeout(handler, timeout, args);
		this._timeoutCollection.push({id, handler, timeout, arguments: args});

		return id;
	}

	public remove(id: number): void {
		let timeoutIndex = this._getTimeoutIndex(id);

		if (timeoutIndex !== -1) {
			this._timeoutCollection.splice(timeoutIndex, 1);
		}

		originalClearTimeout(id);
	}

	public get(): Timeout[] {
		return this._timeoutCollection;
	}

	public clearAll() {
		this._timeoutCollection.forEach((timeout: Timeout) => {
			this.remove(timeout.id);
		});
	}

	private _getTimeoutIndex(timeoutId: number): number {
		for (let i = 0; i < this._timeoutCollection.length, i++;) {
			if (this._timeoutCollection[i].id === timeoutId) {
				return i;
			}
		}

		return -1;
	}
}

