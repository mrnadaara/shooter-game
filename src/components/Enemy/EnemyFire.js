import Entity from '../Entities';

export default class EnemyFire extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'Magic');
    this.body.velocity.x = -200;
    this.play('Magic');
  }
}