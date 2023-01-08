import { Component, KeyboardEvent, ReactElement } from 'react';
import './App.css';
import { Background } from './components/Background/Background';
import { PlayerBullet } from './components/SpaceShip/PlayerBullet/PlayerBullet';
import { SpaceShip } from './components/SpaceShip/SpaceShip';
import { TimerService } from './services/TimerService';

class App extends Component<any, AppState> {
  readonly speed = 5;
  readonly spaceBorderTop = 32;
  readonly spaceBorderBottom = 600 - 32;
  readonly spaceBorderLeft = 32;
  readonly spaceBorderRight = 400 - 32;

  private timeService: TimerService;

  readonly background: ReactElement<Background> = <Background></Background>

  // PlayerBullet start
  playerBulletInterval = 150;
  playerBullets: ReactElement[] = [];
  playerBulletLastTime = 0;

  private playerBulletLoop(currentTimestamp: number, elapsedTime: number) {
    // Timestamp
    if (currentTimestamp - this.playerBulletLastTime < this.playerBulletInterval) {
      return;
    }
    this.playerBulletLastTime = currentTimestamp;

    // Fire new bullet
    const bulletKey = this.getNextBulletKey();
    this.playerBullets.push(<PlayerBullet key={bulletKey.toString()} bulletKey={bulletKey} x={this.state.spaceShipX} y={this.state.spaceShipY}
      onTop={(bulletKey) => {
        this.removePlayerBullet(bulletKey)
      }} />)
  }
  private getNextBulletKey(): number {
    const nextPlayerBulletKey = this.state.nextPlayerBulletKey;
    this.setState((state) => ({ nextPlayerBulletKey: state.nextPlayerBulletKey + 1 }));
    return nextPlayerBulletKey;
  }
  private removePlayerBullet(bulletKey: number) {
    this.playerBullets.splice(this.playerBullets.findIndex(item => item.key === `${bulletKey}`), 1);
  }
  // PlayerBullet end

  constructor(props: any) {
    super(props);
    this.timeService = TimerService.getInstance();
    this.state = {
      keyStateLeft: false,
      keyStateRight: false,
      keyStateUp: false,
      keyStateDown: false,
      spaceShipX: this.spaceBorderRight / 2 + 16,
      spaceShipY: this.spaceBorderBottom / 10 * 9,
      nextPlayerBulletKey: 1
    };
  }
  componentDidMount() {
    this.timeService.registerHandler(this.gameLoop.bind(this));
  }

  gameLoop(currentTimestamp: number, elapsedTime: number) {
    if (this.state.keyStateLeft) {
      this.setState((state) => ({ spaceShipX: Math.max(this.spaceBorderTop, state.spaceShipX - this.speed) }));
    }
    if (this.state.keyStateRight) {
      this.setState((state) => ({ spaceShipX: Math.min(this.spaceBorderRight, state.spaceShipX + this.speed) }));
    }
    if (this.state.keyStateUp) {
      this.setState((state) => ({ spaceShipY: Math.max(this.spaceBorderLeft, state.spaceShipY - this.speed) }));
    }
    if (this.state.keyStateDown) {
      this.setState((state) => ({ spaceShipY: Math.min(this.spaceBorderBottom, state.spaceShipY + this.speed) }));
    }

    this.playerBulletLoop(currentTimestamp, elapsedTime);
  }

  keyStateHandle(event: KeyboardEvent<HTMLDivElement>, state: boolean) {
    switch (event.key) {
      case 'ArrowLeft':
        this.setState({ keyStateLeft: state });
        break;
      case 'ArrowRight':
        this.setState({ keyStateRight: state });
        break;
      case 'ArrowUp':
        this.setState({ keyStateUp: state });
        break;
      case 'ArrowDown':
        this.setState({ keyStateDown: state });
        break;
    }
  }

  render() {
    return (
      <div className="App" tabIndex={-1}
        onKeyDown={(e) => this.keyStateHandle(e, true)}
        onKeyUp={(e) => this.keyStateHandle(e, false)}>
        <div className="spaceArea">
          {this.background}
          <div className="PlayerBulletList">{this.playerBullets}</div>
          <SpaceShip x={this.state.spaceShipX} y={this.state.spaceShipY}></SpaceShip>
        </div>
      </div>
    );
  }
}

export default App;

interface AppState {
  spaceShipX: number;
  spaceShipY: number;
  keyStateLeft: boolean;
  keyStateRight: boolean;
  keyStateUp: boolean;
  keyStateDown: boolean;
  nextPlayerBulletKey: number;
}