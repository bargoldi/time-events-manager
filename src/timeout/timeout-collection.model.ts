import { originalClearTimeout, originalSetTimeout } from '../overrides/override'
import { TimeoutStatus } from './timeout-status.model';
import { Timeout } from './timeout.model';

export class TimeoutCollection {
	private _timeoutCollection: Timeout[] = [];

	public add(handler: any, timeout?: any, ...args: any[]) {
		let id = originalSetTimeout.apply(window, [this._getWrappedHandler(handler), timeout, args]);
		this._timeoutCollection.push(new Timeout(id, handler, timeout, args));
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

	public getScheduled(): Timeout[] {
		return this._timeoutCollection.filter((value: Timeout) => {
			return value.status === TimeoutStatus.Scheduled;
		});
	}

	public getCompleted(): Timeout[] {
		return this._timeoutCollection.filter((value: Timeout) => {
			return value.status === TimeoutStatus.Completed;
		});
	}

	public getAll(): Timeout[] {
		return this._timeoutCollection;
	}

	public getById(id: number): Timeout {
		return this._timeoutCollection[this._getTimeoutIndexById(id)];
	}

	public removeAll() {
		this._timeoutCollection.forEach((timeout: Timeout) => {
			originalClearTimeout.apply(window, [timeout.id]);
		});

		this._timeoutCollection = [];
	}

	private _getWrappedHandler(handler: Function): Function {
		return (() => {
			this._timeoutCollection[this._getTimeoutIndexByHandler(handler)].status = TimeoutStatus.Completed;
			
			return handler.apply(window);
		});
	}

	private _getTimeoutIndexById(timeoutId: number): number {
		for (let i = 0; i < this._timeoutCollection.length; i++) {
			if (this._timeoutCollection[i].id === timeoutId) {
				return i;
			}
		}

		return -1;
	}

	private _getTimeoutIndexByHandler(handler: Function): number {
		for (let i = 0; i < this._timeoutCollection.length; i++) {
			if (this._timeoutCollection[i].handler === handler) {
				return i;
			}
		}

		return -1;
	}
}
