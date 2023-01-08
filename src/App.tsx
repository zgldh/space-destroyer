import { Component, KeyboardEvent, ReactElement } from 'react';
import './App.css';
import { Background } from './components/Background/Background';
import { PlayerBullet } from './components/SpaceShip/PlayerBullet/PlayerBullet';
import { SpaceShip } from './components/SpaceShip/SpaceShip';

class App extends Component<any, AppState> {
  readonly speed = 2;
  readonly spaceBorderTop = 32;
  readonly spaceBorderBottom = 600 - 32;
  readonly spaceBorderLeft = 32;
  readonly spaceBorderRight = 400 - 32;
 
  loopStarted = false;

  readonly background:ReactElement<Background> = <Background></Background>

  // PlayerBullet start
  playerBulletInterval = 200;
  playerBullets: ReactElement[] = [];
  playerBulletLastTime = 0;

  private playerBulletLoop(){
    // Timestamp
    const currentTimestamp = new Date().getTime();
    if(currentTimestamp - this.playerBulletLastTime < this.playerBulletInterval){
      return;
    }
    this.playerBulletLastTime = currentTimestamp;

    // Fire new bullet
    const bulletKey = this.getNextBulletKey();
    this.playerBullets.push(<PlayerBullet key={bulletKey} x={this.state.spaceShipX} y={this.state.spaceShipY} onTop={() => {
      this.removePlayerBullet(bulletKey)
    }} />)
  }
  private getNextBulletKey() : number {
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
    if (this.loopStarted === false) {
      this.loopStarted = true;
      this.gameLoop();
    }
  }

  gameLoop() { 
    if (this.state.keyStateLeft) {
      this.setState((state) => ({ spaceShipX: Math.max(this.spaceBorderTop, state.spaceShipX - this.speed) }));
    }
    if (this.state.keyStateRight) {
      this.setState((state)=>({spaceShipX: Math.min(this.spaceBorderRight, this.state.spaceShipX + this.speed)}));
    }
    if (this.state.keyStateUp) {
      this.setState((state)=>({spaceShipY: Math.max(this.spaceBorderLeft, this.state.spaceShipY - this.speed)}));
    }
    if (this.state.keyStateDown) {
      this.setState((state)=>({spaceShipY: Math.min(this.spaceBorderBottom, this.state.spaceShipY + this.speed)}));
    } 
    
    // Trigger children component gameLoop()
    this.background.gameLoop();

    this.playerBulletLoop();

    setTimeout(this.gameLoop.bind(this), 1);
  }

  keyStateHandle(event: KeyboardEvent<HTMLDivElement>, state: boolean) { 
    switch (event.key) {
      case 'ArrowLeft':
        this.setState({keyStateLeft:  state});
        break;
      case 'ArrowRight':
        this.setState({keyStateRight:  state});
        break;
      case 'ArrowUp':
        this.setState({keyStateUp:  state});
        break;
      case 'ArrowDown':
        this.setState({keyStateDown:  state});
        break;
    } 
  }

  render() {
    return (
      <div className="App" tabIndex={-1}
        onKeyDown={(e) => this.keyStateHandle(e, true)}
        onKeyUp={(e) => this.keyStateHandle(e, false)}>
        {this.background}
        <div className="PlayerBulletList">{this.playerBullets}</div>
        <SpaceShip x={this.state.spaceShipX} y={this.state.spaceShipY}></SpaceShip>
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