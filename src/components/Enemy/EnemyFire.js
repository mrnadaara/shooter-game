import Entity from '../Entities';

export default class EnemyFire extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'Cannon');
    this.body.velocity.x = -200;
  }
}