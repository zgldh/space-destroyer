import { Component } from 'react';
import { TimerService } from '../../../services/TimerService';
import './PlayerBullet.css';

const SPEED_Y = 0.5; // 1 pixels per millisec
const TOP_BORDER = -50;

export class PlayerBullet extends Component<PlayerBulletProps, PlayerBulletState> {
  readonly width = 20;
  readonly height = 10;

  private timerService: TimerService;
  private timerLoopHandlerName: string = '';

  constructor(props: PlayerBulletProps) {
    super(props);
    this.timerService = TimerService.getInstance();
    this.state = {
      x: props.x - this.width / 2,
      y: props.y - this.height / 2
    };
  }
  componentDidMount() {
    this.timerLoopHandlerName = this.timerService.registerHandler(this.gameLoop.bind(this));
  }
  componentWillUnmount() {
    this.timerService.unregisterHandler(this.timerLoopHandlerName);
  }
  gameLoop(currentTimestamp: number, elapsedTime: number) {
    let nextY = this.state.y - elapsedTime * SPEED_Y;
    if (nextY < TOP_BORDER) {
      console.log("on top", this.props.bulletKey, nextY);
      this.timerService.unregisterHandler(this.timerLoopHandlerName);
      this.props.onTop(this.props.bulletKey);
    } else {
      this.setState({ y: nextY });
    }
  }

  render() {
    return (
      <div className="PlayerBullet" style={
        {
          width: this.width + 'px',
          height: this.height + 'px',
          left: (this.props.x - this.width / 2) + 'px',
          top: (this.state.y - this.height / 2) + 'px'
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