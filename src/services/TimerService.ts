export class TimerService {
    private handlers = new Map<TimerHandlerName, TimerHandler>();
    public init() {
    }

    public registerHandler(handler: TimerHandler): TimerHandlerName {
        const handlerName = this.getNextHandlerName();
        this.handlers.set(handler.name, handler);
        return handlerName;
    }

    public unregisterHandler(handlerName: TimerHandlerName): void {
        this.handlers.has(handlerName) && this.handlers.delete(handlerName);
    }

    private getNextHandlerName(): TimerHandlerName {

    }
}

export type TimerHandlerName = string;
export type TimerHandler = (currentTimestamp: number, elapsedTime: number) => void