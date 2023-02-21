import { Component } from 'react';
import './Intercepter.css';

export class Intercepter extends Component<IntercepterProps> {
  readonly width = 64;
  readonly height = 64;

  constructor(props: IntercepterProps) {
    super(props);
    this.state = {
      x: props.x - this.width / 2,
      y: props.y - this.height / 2
    };
  }

  render() {
    return (
      <div className="Intercepter" style={
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

export interface IntercepterProps {
  x: number;
  y: number;
}