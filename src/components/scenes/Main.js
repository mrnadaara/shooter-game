import Phaser, { Scene } from 'phaser';
import Player from '../Player';
import DruidEnemy from '../Enemy/Druid';
import Hitman from '../../assets/images/game/character/hitman1_machine.png';
import BrownTile from '../../assets/images/game/Tiles/tile_97.png';
import Explosions1 from '../../assets/images/game/explosions/explosion-4.png';
import Explosions2 from '../../assets/images/game/explosions/explosion-2.png';
import Background from '../../assets/images/game/background.png';
import Bullet from '../../assets/images/game/Projectiles/bullet1.png';
import Cannon from '../../assets/images/game/Projectiles/bullet4.png';
import Zombie1 from '../../assets/images/game/enemies/zombie.png';
import Zombie2 from '../../assets/images/game/enemies/zombie-2.png';
import Death from '../../assets/images/game/enemies/death_speaker2.png';
import Druid from '../../assets/images/game/enemies/druid2.png';
import ExplosionSound from '../../assets/sounds/explode.wav';
import PistolSound from '../../assets/sounds/pistol.wav';

export default class Main extends Scene {
  constructor() {
    super({ key: 'Main' });
  }

  preload() {
    this.load.image('Hitman', Hitman);
    this.load.image('BrownTile', BrownTile);
    this.load.spritesheet('Explosions1', Explosions1, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('Explosions2', Explosions2, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image('Background', Background);
    this.load.image('Bullet', Bullet);
    this.load.image('Cannon', Cannon);
    this.load.image('Zombie1', Zombie1);
    this.load.image('Zombie2', Zombie2);
    this.load.image('Death', Death);
    this.load.image('Druid', Druid);

    this.load.audio('Explosions', ExplosionSound);
    this.load.audio('Pistol', PistolSound);
  }

  create() {
    this.anims.create({
      key: 'Explosions1',
      frames: this.anims.generateFrameNumbers('Explosions1'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'Explosions2',
      frames: this.anims.generateFrameNumbers('Explosions2'),
      frameRate: 20,
      repeat: -1,
    });

    this.sfx = {
      explosions: this.sound.add('Explosions'),
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
      delay: 1000,
      callback: () => {
        const enemy = new DruidEnemy(
          this,
          this.game.config.width,
          Phaser.Math.Between(0, this.game.config.height),
        );
        this.enemies.add(enemy);
      },
      callbackScope: this,
      loop: true,
    });

    this.add.image(400, 400, 'Background');
    this.add.text(100, 100, 'Hello Phaser!');

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'Hitman',
    );
  }

  update() {
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
  }
}