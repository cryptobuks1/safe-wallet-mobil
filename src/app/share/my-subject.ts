/**
 * @class MySubject<T>
 */
import {ObjectUnsubscribedError, Subject, Subscriber, Subscription} from 'rxjs';

export class MySubject<T> extends Subject<T> {

    constructor(private data: T = null) {
        super();
    }

    get value(): T {
        return this.getValue();
    }

    /** @deprecated internal use only */ _subscribe(subscriber: Subscriber<T>): Subscription {
        const subscription = super._subscribe(subscriber);
        if (subscription && !subscription.closed && this.data) {
            subscriber.next(this.data);
        }
        return subscription;
    }

    getValue(): T {
        if (this.hasError) {
            throw this.thrownError;
        } else if (this.closed) {
            throw new ObjectUnsubscribedError();
        } else {
            return this.data;
        }
    }

    next(value: T): void {
        super.next(this.data = value);
    }

    error(value: T): void {
        super.error(this.data = value);
    }

}
