import Phaser from 'phaser';
import Entity from '../Entities';

export default class Death extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'Death', 'Death');
    this.body.velocity.x = Phaser.Math.Between(-50, -100);
    this.states = {
      MOVE_LEFT: 'MOVE_LEFT',
      CHASE: 'CHASE',
    };
    this.state = this.states.MOVE_LEFT;
  }

  update() {
    if (!this.getData('isDead') && this.scene.player) {
      if (
        Phaser.Math.Distance.Between(
          this.x,
          this.y,
          this.scene.player.x,
          this.scene.player.y,
        ) < 320
      ) {
        this.state = this.states.CHASE;
      }

      if (this.state === this.states.CHASE) {
        const dx = this.scene.player.x - this.x;
        const dy = this.scene.player.y - this.y;

        const angle = Math.atan2(dy, dx);

        const speed = 100;
        this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
      }
    }
  }
}