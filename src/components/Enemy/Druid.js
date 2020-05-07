import { Math } from 'phaser';
import Entity from '../Entities';
import EnemyFire from './EnemyFire';

export default class Druid extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'Druid', 'Druid');
    this.body.velocity.x = Math.Between(-50, -100);

    this.shootTimer = this.scene.time.addEvent({
      delay: 2000,
      callback: () => {
        const fire = new EnemyFire(this.scene, this.x, this.y);
        fire.setScale(this.scaleY);
        this.scene.enemyFire.add(fire);
      },
      callbackScope: this,
      loop: true,
    });
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}