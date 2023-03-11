import { Component, KeyboardEvent, ReactElement } from 'react';
import './App.css';
import { Background } from './components/Background/Background';
import { EnemyLayer } from './components/Enemy/EnemyLayer';
import { PlayerBullet } from './components/SpaceShip/PlayerBullet/PlayerBullet';
import { SpaceShip } from './components/SpaceShip/SpaceShip';
import { Config } from './Config';
import { TimerService } from './services/TimerService';

class App extends Component<any, AppState> {
  private timeService: TimerService;

  readonly background: ReactElement<Background> = <Background></Background>

  // PlayerBullet start
  playerBullets: ReactElement[] = [];
  playerBulletLastTime = 0;

  private playerBulletLoop(currentTimestamp: number, elapsedTime: number) {
    // Timestamp
    if (currentTimestamp - this.playerBulletLastTime < Config.PLAYER_BULLET_INTERVAL) {
      return;
    }
    this.playerBulletLastTime = currentTimestamp;

    // Fire new bullet
    const bulletKey = this.getNextBulletKey();
    this.playerBullets.push(<PlayerBullet key={bulletKey.toString()} bulletKey={bulletKey} x={this.state.spaceShipX} y={this.state.spaceShipY - Config.SPACESHIP_HEIGHT / 2}
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
      spaceShipX: Config.SPACESHIP_START_X,
      spaceShipY: Config.SPACESHIP_START_Y,
      nextPlayerBulletKey: 1
    };
  }
  componentDidMount() {
    this.timeService.registerHandler(this.gameLoop.bind(this));
  }

  private gameLoop(currentTimestamp: number, elapsedTime: number): boolean {
    if (this.state.keyStateLeft) {
      this.setState((state) => ({ spaceShipX: Math.max(Config.SPACE_BORDER_TOP, state.spaceShipX - Config.SPACESHIP_SPEED) }));
    }
    if (this.state.keyStateRight) {
      this.setState((state) => ({ spaceShipX: Math.min(Config.SPACE_BORDER_RIGHT, state.spaceShipX + Config.SPACESHIP_SPEED) }));
    }
    if (this.state.keyStateUp) {
      this.setState((state) => ({ spaceShipY: Math.max(Config.SPACE_BORDER_LEFT, state.spaceShipY - Config.SPACESHIP_SPEED) }));
    }
    if (this.state.keyStateDown) {
      this.setState((state) => ({ spaceShipY: Math.min(Config.SPACE_BORDER_BOTTOM, state.spaceShipY + Config.SPACESHIP_SPEED) }));
    }

    this.playerBulletLoop(currentTimestamp, elapsedTime);
    return true;
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
        <div className="spaceArea" style={
          {
            height: Config.SPACE_HEIGHT + 'px',
            width: Config.SPACE_WIDTH + 'px'
          }
        }>
          {this.background}
          <div className="PlayerBulletList">{this.playerBullets}</div>
          <EnemyLayer></EnemyLayer>
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