import Entity from './Entities';

export default class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'Bullet');
    this.body.velocity.x = 200;
  }
}