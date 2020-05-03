import { Math } from 'phaser';
import Entity from '../Entities';

export default class SkeletonZombie extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'Zombie2', 'SkeletonZombie');
    this.body.velocity.x = Math.Between(50, 100);
  }
}