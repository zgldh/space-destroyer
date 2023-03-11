import { Config } from "../Config";

export class TimerService {
    private handlers = new Map<TimerHandlerName, TimerHandlerInfo>();
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
        this.handlers.forEach((handlerInfo) => {
            const elapsedTime = currentTimestamp - handlerInfo.lastTimestamp;
            const timerResult = handlerInfo.handler(currentTimestamp, elapsedTime);
            if(true === timerResult){
                // The timer handler does processed. Update the lastTimestamp
                handlerInfo.lastTimestamp = currentTimestamp;
            }
        });

        setTimeout(() => this.timeHandler.apply(this), Config.PLANCK_TIME);
    }

    public registerHandler(handler: TimerHandler): TimerHandlerName {
        const handlerName = this.getNextHandlerName();
        const timerHandlerInfo:TimerHandlerInfo = {
            name : handlerName,
            handler,
            lastTimestamp: new Date().getTime()
        }
        this.handlers.set(handlerName, timerHandlerInfo);
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
/**
 * Timer handler. 
 * Return true if the handler is well processed. Then the lastTimestamp will be updated so it will get correct elapsedTime next tick.
 * Return false will not update the lastTimestamp. So the elapsedTime will get larger when next tick.
 */
export type TimerHandler = (currentTimestamp: number, elapsedTime: number) => boolean
export interface TimerHandlerInfo {
    name: TimerHandlerName;
    handler: TimerHandler;
    lastTimestamp: number;
} 