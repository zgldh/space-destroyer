import { Component } from 'react';
import { Config } from '../../../Config';
import { TimerService } from '../../../services/TimerService';
import './PlayerBullet.css';

export class PlayerBullet extends Component<PlayerBulletProps, PlayerBulletState> {
  private timerService: TimerService;
  private timerLoopHandlerName: string = '';

  constructor(props: PlayerBulletProps) {
    super(props);
    this.timerService = TimerService.getInstance();
    this.state = {
      x: props.x - Config.PLAYER_BULLET_WIDTH / 2,
      y: props.y - Config.PLAYER_BULLET_HEIGHT / 2
    };
  }
  componentDidMount() {
    this.timerLoopHandlerName = this.timerService.registerHandler(this.gameLoop.bind(this));
  }
  componentWillUnmount() {
    this.timerService.unregisterHandler(this.timerLoopHandlerName);
  }
  private gameLoop(currentTimestamp: number, elapsedTime: number): boolean {
    let nextY = this.state.y - elapsedTime * Config.PLAYER_BULLET_SPEED_Y;
    if (nextY < Config.PLAYER_BULLET_TOP_BORDER) {
      this.timerService.unregisterHandler(this.timerLoopHandlerName);
      this.props.onTop(this.props.bulletKey);
    } else {
      this.setState({ y: nextY });
    }
    return true;
  }

  render() {
    return (
      <div className="PlayerBullet" style={
        {
          width: Config.PLAYER_BULLET_WIDTH + 'px',
          height: Config.PLAYER_BULLET_HEIGHT + 'px',
          left: (this.props.x - Config.PLAYER_BULLET_WIDTH / 2) + 'px',
          top: (this.state.y - Config.PLAYER_BULLET_HEIGHT / 2) + 'px'
        }
      }></div>
    );
  }
}

export interface PlayerBulletProps {
  bulletKey: number;
  x: number;
  y: number;
  onTop: (bulletKey: number) => void;
}

export interface PlayerBulletState {
  x: number;
  y: number;
}