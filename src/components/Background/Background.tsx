import { Component, ReactElement } from 'react';
import './Background.css';
import { Star } from './Star/Star';

export class Background extends Component<BackgroundProps, BackgroundState> {

  loopStarted = false;
  private maxStarCount = 20;
  private newStarPossibility = 0.005;

  stars: ReactElement[] = [];

  constructor(props: BackgroundProps) {
    super(props);
    this.state = {
      nextStarKey: 0,
      currentStarCount: 0,
    };
  }
  componentDidMount() {
    if (this.loopStarted === false) {
      this.loopStarted = true;
      this.gameLoop();
    }
  }
  gameLoop() {
    if (this.state.currentStarCount < this.maxStarCount) {
      if (Math.random() <= this.newStarPossibility) {
        this.addNewStar()
      }
    }
    setTimeout(this.gameLoop.bind(this), 1);
  }

  private addNewStar() {
    const starKey = this.getNextStarKey();
    this.stars.push(<Star key={starKey} x={this.getPositionX()} onBottom={() => {
      this.removeStar(starKey)
    }} />);
    this.setState((state) => ({ currentStarCount: state.currentStarCount + 1 }));
  }

  private removeStar(starKey: number) {
    this.stars.splice(this.stars.findIndex(item => item.key === `${starKey}`), 1);
    this.setState((state) => ({ currentStarCount: state.currentStarCount - 1 }));
  }

  private getPositionX(): number {
    return Math.floor(Math.random() * 400);
  }

  private getNextStarKey(): number {
    const nextStarKey = this.state.nextStarKey;
    this.setState((state) => ({ nextStarKey: state.nextStarKey + 1 }));
    return nextStarKey;
  }

  animationTick() {
  }

  render() {
    return (
      <div className="Background">{this.stars}</div>
    );
  }
}

export interface BackgroundProps {
}

interface BackgroundState {
  nextStarKey: number;
  currentStarCount: number;
}