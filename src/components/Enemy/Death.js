import { Math } from 'phaser';
import Entity from '../Entities';

export default class Death extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'Death', 'Death');
    this.body.velocity.x = Math.Between(50, 100);
  }
}