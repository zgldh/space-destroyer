import { ReactElement } from "react";
import { Intercepter } from "../components/Enemy/Intercepter/Intercepter";
import { Config } from "../Config";
import { TimerService } from "./TimerService";

export class EnemyService {
    private static instance: EnemyService;
    private nextEnemyKey: EnemyKey = 0;
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
     * @param enemyType 
     * @param x 
     * @param y 
     */
    public addEnemy(enemyType: string, x: number, y: number): EnemyKey {
        const enemyKey = this.getNextEnemyKey();
        this.enemies.push(<Intercepter key={enemyKey} enemyKey={enemyKey} x={x} y={y} />);
        this.currentEnemyCount++;
        return enemyKey;
    }

    public removeEnemy(enemyKey: EnemyKey): void {
        this.enemies.splice(this.enemies.findIndex(item => item.key === `${enemyKey}`), 1);
        this.currentEnemyCount--;
    }

    private gameLoop(currentTimestamp: number, elapsedTime: number): boolean {
        if (this.currentEnemyCount < 10 && elapsedTime > 1000) {
            this.addEnemy('dummy', this.getStartX(), - Config.ENEMY_HEIGHT);
            return true;
        }
        return false;
    }

    private getStartX(): number {
        return Config.ENEMY_WIDTH + (Config.SPACE_WIDTH - Config.ENEMY_WIDTH) * Math.random();
    }

    private getNextEnemyKey(): number {
        this.nextEnemyKey = this.nextEnemyKey + 1;
        return this.nextEnemyKey;
    }
}

export type EnemyKey = number;