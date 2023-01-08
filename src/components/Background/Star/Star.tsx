import { Component } from 'react';
import './Star.css';

export class Star extends Component<StarProps, StarState> {
  readonly width = 16;
  readonly height = 16;

  loopStarted = false;

  constructor(props: StarProps) {
    super(props);
    this.state = {
      x: this.props.x,
      positionXDirection: 1,
      positionXStep: 0,
      backgroundPositionX: StarPositionX,
      backgroundPositionY: this.getBackgroundPostionY(props.color),
      movementDuration: this.getMovementDuration(props.movementDurtion),
    };
  }

  componentDidMount() {
    if (this.loopStarted === false) {
      this.loopStarted = true;
      setTimeout(() => this.props.onBottom(), this.state.movementDuration * 1000);
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

    setTimeout(this.gameLoop.bind(this), 250);
  }

  private getMovementDuration(movementDurtion: number | undefined): number {
    if (!movementDurtion) {
      movementDurtion = Math.ceil((Math.random() * 100 + 50)) / 10;
    }
    return movementDurtion;
  }

  private getBackgroundPostionY(color: StarColor | undefined): number {
    if (!color) {
      color = Math.floor(Math.random() * StarColorsPositionY.length);
    }
    return StarColorsPositionY[color];
  }

  render() {
    return (
      <div className="Star" style={
        {
          width: this.width + 'px',
          height: this.height + 'px',
          left: (this.state.x - 8) + 'px',
          backgroundPositionX: this.state.backgroundPositionX + 'px',
          backgroundPositionY: this.state.backgroundPositionY + 'px',
          animation: `blink 4s linear infinite, movement ${this.state.movementDuration}s linear`
        }
      }></div>
    );
  }
}

export enum StarColor {
  Red = -468,
  Blue = -488,
  Purple = -508,
  Yellow = -528,
  Green = -548,
  Gray = -568,
}

const StarPositionX = -436;
const StarColorsPositionY = [
  StarColor.Red,
  StarColor.Blue,
  StarColor.Purple,
  StarColor.Yellow,
  StarColor.Green,
  StarColor.Gray,
];

export interface StarProps {
  x: number;
  color?: StarColor;
  movementDurtion?: number;
  onBottom: () => void;
}

interface StarState {
  x: number;
  positionXDirection: number;
  positionXStep: number;
  backgroundPositionX: number;
  backgroundPositionY: number;
  movementDuration: number;
}