import Phaser, { Scene } from 'phaser';
import Player from '../Player';
import DruidEnemy from '../Enemy/Druid';
import DeathEnemy from '../Enemy/Death';
import SkeletonZombie from '../Enemy/SkeletonZombie';
import Hitman from '../../assets/images/game/character/hitman1_machine.png';
import BrownTile from '../../assets/images/game/Tiles/tile_97.png';
import Background from '../../assets/images/game/background.png';
import Bullet from '../../assets/images/game/Projectiles/bullet1.png';
import Zombie1 from '../../assets/images/game/enemies/zombie.png';
import Zombie2 from '../../assets/images/game/enemies/zombie-2.png';
import Death from '../../assets/images/game/enemies/death_speaker2.png';
import Druid from '../../assets/images/game/enemies/druid2.png';
import { Explosion, Magic } from '../../helpers';
import ExplosionSound from '../../assets/sounds/explode.wav';
import PistolSound from '../../assets/sounds/pistol.wav';
import SpellSound from '../../assets/sounds/spell.wav';

export default class Main extends Scene {
  constructor() {
    super({ key: 'Main' });
    this.score = 0;
  }

  init() {
    this.score = 0;
  }

  preload() {
    this.load.image('Hitman', Hitman);
    this.load.image('BrownTile', BrownTile);
    Explosion.forEach((exp) => {
      this.load.image(exp.name, exp.asset);
    });
    Magic.forEach((spell) => {
      this.load.image(spell.name, spell.asset);
    });
    this.load.image('Background', Background);
    this.load.image('Bullet', Bullet);
    this.load.image('Zombie1', Zombie1);
    this.load.image('Zombie2', Zombie2);
    this.load.image('Death', Death);
    this.load.image('Druid', Druid);

    this.load.audio('Explosions', ExplosionSound);
    this.load.audio('Pistol', PistolSound);
    this.load.audio('Spell', SpellSound);
  }

  create() {
    this.anims.create({
      key: 'Explosions1',
      frames: Explosion.map(exp => ({ key: exp.name })),
      frameRate: 20,
    });

    this.anims.create({
      key: 'Magic',
      frames: Magic.map((spell) => ({ key: spell.name })),
      frameRate: 20,
    });

    this.sfx = {
      explosions: this.sound.add('Explosions'),
      spell: this.sound.add('Spell'),
      pistol: this.sound.add('Pistol'),
    };

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );

    this.enemies = this.add.group();
    this.enemyFire = this.add.group();
    this.playerFire = this.add.group();

    this.time.addEvent({
      delay: 2000,
      callback: () => {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new DruidEnemy(
            this,
            this.game.config.width,
            Phaser.Math.Between(0, this.game.config.height),
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('Death').length < 5) {
            enemy = new DeathEnemy(
              this,
              this.game.config.width,
              Phaser.Math.Between(0, this.game.config.height),
            );
          }
        } else {
          enemy = new SkeletonZombie(
            this,
            this.game.config.width,
            Phaser.Math.Between(0, this.game.config.height),
          );
        }

        if (enemy !== null) {
          enemy.setScale(13 * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.add.image(400, 400, 'Background');

    this.title = this.add.text(
      5,
      20,
      `${localStorage.getItem('playerName')}: ${this.score}`,
      {
        fontFamily: 'monospace',
        fontSize: 28,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      },
    );

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'Hitman',
    );

    this.physics.add.collider(
      this.playerFire,
      this.enemies,
      (playerFire, enemy) => {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          this.score = this.score += 10;
          this.title.setText(`${localStorage.getItem('playerName')}: ${this.score}`);
          enemy.explode(true);
          playerFire.destroy();
        }
      },
    );

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead') && !enemy.getData('isDead')) {
        player.explode(false);
        enemy.explode(true);
        player.onDestroy(this.score);
      }
    });

    this.physics.add.overlap(this.player, this.enemyFire, (player, fire) => {
      if (!player.getData('isDead') && !fire.getData('isDead')) {
        player.explode(false);
        fire.destroy();
        player.onDestroy(this.score);
      }
    });
  }

  update() {
    if (!this.player.getData('isDead')) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData(
          'timerShootTick',
          this.player.getData('timerShootDelay') - 1,
        );
        this.player.setData('isShooting', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (
        enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight
      ) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyFire.getChildren().length; i++) {
      const fire = this.enemyFire.getChildren()[i];
      fire.update();

      if (
        fire.x < -fire.displayWidth
        || fire.x > this.game.config.width + fire.displayWidth
        || fire.y < -fire.displayHeight * 4
        || fire.y > this.game.config.height + fire.displayHeight
      ) {
        if (fire) {
          fire.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerFire.getChildren().length; i++) {
      const fire = this.playerFire.getChildren()[i];
      fire.update();

      if (
        fire.x < -fire.displayWidth
        || fire.x > this.game.config.width + fire.displayWidth
        || fire.y < -fire.displayHeight * 4
        || fire.y > this.game.config.height + fire.displayHeight
      ) {
        if (fire) {
          fire.destroy();
        }
      }
    }
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }
}