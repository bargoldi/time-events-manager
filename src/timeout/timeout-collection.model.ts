import { originalClearTimeout, originalSetTimeout } from '../overrides/override'
import { Timeout } from './timeout.model';

export class TimeoutCollection {
	private _timeoutCollection: Timeout[] = [];

	public add(handler: any, timeout?: any, ...args: any[]) {
		let id = originalSetTimeout.apply(window, [handler, timeout, args]);
		this._timeoutCollection.push({id, handler, timeout, arguments: args});

		return id;
	}

	public remove(id: number): void {
		let timeoutIndex = this._getTimeoutIndexById(id);

		if (timeoutIndex !== -1) {
			this._timeoutCollection.splice(timeoutIndex, 1);
		}

		originalClearTimeout.apply(window, [id]);
	}

	public get(index: number): Timeout {
		return this._timeoutCollection[index];
	}

	public getAll(): Timeout[] {
		return this._timeoutCollection;
	}

	public getById(id: number): Timeout {
		return this._timeoutCollection[this._getTimeoutIndexById(id)];
	}

	public removeAll() {
		this._timeoutCollection.forEach((timeout: Timeout) => {
			originalClearTimeout.apply(window, timeout.id);
		});

		this._timeoutCollection = [];
	}

	private _getTimeoutIndexById(timeoutId: number): number {
		for (let i = 0; i < this._timeoutCollection.length; i++) {
			if (this._timeoutCollection[i].id === timeoutId) {
				return i;
			}
		}

		return -1;
	}
}
