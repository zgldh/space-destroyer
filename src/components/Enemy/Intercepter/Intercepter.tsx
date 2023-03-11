import { Component } from 'react';
import { Config } from '../../../Config';
import { EnemyKey, EnemyService } from '../../../services/EnemyService';
import { TimerService } from '../../../services/TimerService';
import './Intercepter.css';

export class Intercepter extends Component<IntercepterProps, IntercepterState> {
  private timerLoopHanlderName = '';
  private speedY = 0.1;

  constructor(props: IntercepterProps) {
    super(props);
    this.state = {
      enemyKey: props.enemyKey,
      x: props.x - Config.ENEMY_WIDTH / 2,
      y: props.y - Config.ENEMY_HEIGHT / 2
    };
  }
  componentDidMount() {
    this.timerLoopHanlderName = TimerService.getInstance().registerHandler(this.gameLoop.bind(this));
  }
  componentWillUnmount() {
    TimerService.getInstance().unregisterHandler(this.timerLoopHanlderName);
    // EnemyService.getInstance().removeEnemy(this.state.enemyKey);
  }

  private gameLoop(currentTimestamp: number, elapsedTime: number): boolean {
    let nextY = this.state.y + elapsedTime * this.speedY;
    if (nextY > Config.SPACE_HEIGHT) {
      console.log("enemy on bottom", this.state.enemyKey, nextY);
      TimerService.getInstance().unregisterHandler(this.timerLoopHanlderName);
      EnemyService.getInstance().removeEnemy(this.state.enemyKey);
    } else {
      this.setState({ y: nextY });
    }
    return true;
  }

  render() {
    return (
      <div className="Intercepter" style={
        {
          width: Config.ENEMY_WIDTH + 'px',
          height: Config.ENEMY_HEIGHT + 'px',
          left: (this.state.x - Config.ENEMY_WIDTH / 2) + 'px',
          top: (this.state.y - Config.ENEMY_HEIGHT / 2) + 'px'
        }
      }></div>
    );
  }
}

export interface IntercepterProps {
  enemyKey: EnemyKey;
  x: number;
  y: number;
}
interface IntercepterState {
  enemyKey: EnemyKey;
  x: number;
  y: number;
}