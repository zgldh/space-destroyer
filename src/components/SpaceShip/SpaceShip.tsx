import { Component } from 'react';
import { Config } from '../../Config';
import './SpaceShip.css';

export class SpaceShip extends Component<SpaceShipProps> {
  readonly width = Config.SPACESHIP_WIDTH;
  readonly height = Config.SPACESHIP_HEIGHT;

  constructor(props: SpaceShipProps) {
    super(props);
    this.state = {
      x: props.x - this.width / 2,
      y: props.y - this.height / 2
    };
  }

  render() {
    return (
      <div className="SpaceShip" style={
        {
          width: this.width + 'px',
          height: this.height + 'px',
          left: (this.props.x - this.width / 2) + 'px',
          top: (this.props.y - this.height / 2) + 'px'
        }
      }></div>
    );
  }
}

export interface SpaceShipProps {
  x: number;
  y: number;
}