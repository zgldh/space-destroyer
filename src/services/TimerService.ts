import { Config } from "../Config";

export class TimerService {
    private lastTimestamp = new Date().getTime();
    private handlers = new Map<TimerHandlerName, TimerHandler>();
    private handleIndex = 0;
    private isRunning = false;

    private static instance: TimerService;

    public static getInstance(): TimerService {
        if (TimerService.instance == null) {
            TimerService.instance = new TimerService();
            TimerService.instance.init();
        }
        return TimerService.instance;
    }

    public init(): void {
        this.isRunning = true;
        setTimeout(() => this.timeHandler.apply(this), Config.PLANCK_TIME);
    }

    public destroy(): void {
        this.isRunning = false;
        this.handlers.clear();
    }

    private timeHandler() {
        if (false === this.isRunning) {
            return;
        }
        const currentTimestamp = new Date().getTime();
        const elapsedTime = currentTimestamp - this.lastTimestamp
        this.handlers.forEach((handler) => {
            handler(currentTimestamp, elapsedTime);
        });
        this.lastTimestamp = currentTimestamp;

        setTimeout(() => this.timeHandler.apply(this), Config.PLANCK_TIME);
    }

    public registerHandler(handler: TimerHandler): TimerHandlerName {
        const handlerName = this.getNextHandlerName();
        this.handlers.set(handlerName, handler);
        return handlerName;
    }

    public unregisterHandler(handlerName: TimerHandlerName): void {
        this.handlers.has(handlerName) && this.handlers.delete(handlerName);
    }

    private getNextHandlerName(): TimerHandlerName {
        const timestamp = new Date().getTime();
        const name = `${timestamp}_${this.handleIndex}`;
        this.handleIndex = this.handleIndex + 1;
        return name;
    }
}

export type TimerHandlerName = string;
export type TimerHandler = (currentTimestamp: number, elapsedTime: number) => void