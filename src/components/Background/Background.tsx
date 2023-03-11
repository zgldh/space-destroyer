import { Component, ReactElement } from 'react';
import { Config } from '../../Config';
import { TimerService } from '../../services/TimerService';
import './Background.css';
import { Star } from './Star/Star';

export class Background extends Component<BackgroundProps, BackgroundState> {

  private timerService: TimerService;
  private timerLoopHanlderName = '';

  stars: ReactElement[] = [];

  constructor(props: BackgroundProps) {
    super(props);
    this.timerService = TimerService.getInstance();
    this.state = {
      nextStarKey: 0,
      currentStarCount: 0,
    };
  }
  componentDidMount() {
    this.timerLoopHanlderName = this.timerService.registerHandler(this.gameLoop.bind(this));
  }
  componentWillUnmount() {
    this.timerService.unregisterHandler(this.timerLoopHanlderName);
  }
  private gameLoop(currentTimestamp: number, elapsedTime: number): boolean {
    if (this.state.currentStarCount < Config.BACKGROUND_STAR_MAX_COUNT) {
      if (Math.random() <= Config.BACKGROUND_STAR_PROBABILITY) {
        this.addNewStar()
        return true;
      }
    }
    return false;
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
    const nextStarKey = this.state.nextStarKey * 1000 + Math.floor(Math.random() * 1000);
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