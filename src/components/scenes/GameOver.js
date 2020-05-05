import { Scene } from 'phaser';

export default class GameOver extends Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  create() {
    this.sfx = {
      buttonHover: this.sound.add('ButtonHover'),
      start: this.sound.add('start'),
      music: this.sound.add('BGMusic', { loop: true }),
    };

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'play30',
    );

    this.btnPlay.setInteractive();

    this.btnPlay.on(
      'pointerover',
      () => {
        this.btnPlay.play('hoverButton', true);
        this.sfx.buttonHover.play();
      },
      this,
    );

    this.btnPlay.on('pointerout', () => {
      this.btnPlay.anims.stop('hoverButton');
      this.btnPlay.setTexture('play30');
    });

    this.btnPlay.on(
      'pointerup',
      () => {
        this.scene.start('Main');
        this.sfx.start.on('complete', () => {
          this.sfx.music.play();
        });
        this.sfx.start.play();
      },
      this,
    );

    this.title = this.add.text(
      this.game.config.width * 0.5,
      150,
      'Game Over',
      {
        fontFamily: 'monospace',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      },
    );

    this.title.setOrigin(0.5);
  }
}