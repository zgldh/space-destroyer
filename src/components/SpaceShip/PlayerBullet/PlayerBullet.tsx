import { Component } from 'react';
import { Background } from '../../Background/Background';
import './PlayerBullet.css';

const SPEED_Y = 1; // 1 pixels per millisec

export class PlayerBullet extends Component<PlayerBulletProps> {
  readonly width = 16;
  readonly height = 16;

  loopStarted = false;

  constructor(props: PlayerBulletProps) {
    super(props);
    this.state = {
      x: props.x - this.width / 2,
      y: props.y - this.height / 2
    };
  }
  componentDidMount() {
    if (this.loopStarted === false) {
      this.loopStarted = true;
      this.gameLoop();
    }
  }
  gameLoop() {
    let nextStep = this.state.positionXStep + this.state.positionXDirection;
    if (nextStep < 0 || nextStep > 4) {
      nextStep = nextStep - (this.state.positionXDirection * 2);
      this.setState((state) => ({ positionXDirection: -state.positionXDirection }));
    }
    this.setState({ positionXStep: nextStep });
    this.setState({ backgroundPositionX: StarPositionX - (20 * nextStep) });

    setTimeout(this.gameLoop.bind(this), 1);
  }

  render() {
    return (
      <div className="PlayerBullet" style={
        {
          left: (this.props.x - this.width / 2) + 'px',
          top: (this.props.y - this.height / 2) + 'px'
        }
      }></div>
    );
  }
}

export interface PlayerBulletProps {
  x: number;
  y: number;
  onTop: () => void;
}