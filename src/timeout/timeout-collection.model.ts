import { originalClearTimeout, originalSetTimeout } from '../overrides/override'
import { TimeoutStatus } from './timeout-status.model';
import { Timeout } from './timeout.model';

export class TimeoutCollection {
	private _timeoutCollection: Timeout[] = [];

	public add(handler: Function, timeout?: number, ...args: any[]) {
		let newTimeout = new Timeout(handler, timeout, args);
		let id = originalSetTimeout.apply(window, [this._getWrappedHandler(newTimeout.uuid, handler), timeout, args]);
		newTimeout.id = id;
		this._timeoutCollection.push(newTimeout);
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

	private _getWrappedHandler(timeoutUuid: string, handler: Function): Function {
		return ((...args: any[]) => {
			this._timeoutCollection[this._getTimeoutIndexByUuid(timeoutUuid)].status = TimeoutStatus.Completed;

			return handler.apply(window, args);
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

	private _getTimeoutIndexByUuid(uuid: string): number {
		for (let i = 0; i < this._timeoutCollection.length; i++) {
			if (this._timeoutCollection[i].uuid === uuid) {
				return i;
			}
		}

		return -1;
	}
}
