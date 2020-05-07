import { Math } from 'phaser';
import Entity from './Entities';
import PlayerFire from './PlayerFire';

export default class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    this.setData('speed', 200);
    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1);
      } else {
        const fire = new PlayerFire(this.scene, this.x, this.y);
        this.scene.playerFire.add(fire);

        this.scene.sfx.pistol.play();
        this.setData('timerShootTick', 0);
      }
    }
  }

  onDestroy(score) {
    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.sound.stopAll();
        this.scene.scene.start('GameOver', { score });
      },
      callbackScope: this,
      loop: false,
    });
  }
}