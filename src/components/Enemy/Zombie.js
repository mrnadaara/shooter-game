import { Math } from 'phaser';
import Entity from '../Entities';

export default class Zombie extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'Zombie1', 'RedZombie');
    this.body.velocity.x = Math.Between(50, 100);
  }
}