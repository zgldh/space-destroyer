import { ReactElement } from "react";
import { TimerService } from "./TimerService";

export class EnemyService {
    private static instance: EnemyService;
    private nextEnemyKey: EnemyKey;
    private currentEnemyCount: number;
    private enemies: ReactElement[] = [];

    private timerService: TimerService;
    private timerLoopHanlderName = '';

    constructor() {
        this.timerService = TimerService.getInstance();
        this.nextEnemyKey = 0;
        this.currentEnemyCount = 0;
    }

    public static getInstance(): EnemyService {
        if (EnemyService.instance == null) {
            EnemyService.instance = new EnemyService();
            EnemyService.instance.init();
        }
        return EnemyService.instance;
    }

    public init(): void {
        this.enemies = [];
        this.timerLoopHanlderName = this.timerService.registerHandler(this.gameLoop.bind(this));
    }

    public destroy(): void {
        this.timerService.unregisterHandler(this.timerLoopHanlderName);
        this.enemies = [];
    }

    public getEnemies(): ReactElement[] {
        return this.enemies;
    }

    /**
     * TODO
     * @param enemyType 
     * @param x 
     * @param y 
     */
    public addEnemy(enemyType: string, x: number, y: number): EnemyKey {
        throw new Error(`addEnemy not implemented`)
    }

    public removeEnemy(enemyKey: EnemyKey): void {
        this.enemies.splice(this.enemies.findIndex(item => item.key === `${enemyKey}`), 1);
    }

    private gameLoop(currentTimestamp: number, elapsedTime: number) {
        if(this.currentEnemyCount === 0){
            // this.addEnemy('a',);
        }
    }

    private getNextEnemyKey(): number {
        const nextEnemyKey = this.nextEnemyKey * 1000 + Math.floor(Math.random() * 1000);
        this.nextEnemyKey = this.nextEnemyKey + 1;
        return nextEnemyKey;
    }
}

export type EnemyKey = number;