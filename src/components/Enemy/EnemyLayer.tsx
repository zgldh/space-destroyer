import { Component } from 'react';
import { EnemyService } from '../../services/EnemyService';
import './EnemyLayer.css';

export class EnemyLayer extends Component<EnemyLayerProps> {

  private enemyService: EnemyService;

  constructor(props: EnemyLayerProps) {
    super(props);
    this.enemyService = EnemyService.getInstance();
  }
  componentDidMount() {
    this.enemyService.init();
  }
  componentWillUnmount() {
    this.enemyService.destroy();
  }

  animationTick() {
  }

  render() {
    return (
      <div className="EnemyLayer">{this.enemyService.getEnemies()}</div>
    );
  }
}

export interface EnemyLayerProps {
}
 