import { GameObjects } from 'phaser';

export default class Entity extends GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('type', type);
    this.setData('isDead', false);
  }

  explode(canDestroy) {
    if (!this.getData('isDead')) {
      this.setTexture('Explosions1');
      this.play('Explosions1');

      if (canDestroy) {
        this.scene.sfx.explosions.play();
      } else {
        this.scene.sfx.spell.play();
      }

      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }

      this.setAngle(0);
      this.body.setVelocity(0, 0);

      this.on(
        'animationcomplete',
        () => {
          if (canDestroy) {
            this.destroy();
          } else {
            this.setVisible(true);
          }
        },
        this,
      );

      this.setData('isDead', true);
    }
  }
}