import EventEmitter from 'events';

export default class Events {
    protected emitter: EventEmitter;
    
    constructor() {
        this.emitter = {};

    }

    getEmitter(): EventEmitter {
        return this.emitter;
    }
    
    emit(event: string): void {
        this.emitter.emit(event);
    } 
}