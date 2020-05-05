import { Scene } from 'phaser';
import { PlayButton } from '../../helpers';
import ButtonHover from '../../assets/sounds/menu/misc_menu_4.wav';
import Start from '../../assets/sounds/menu/load.wav';
import BGMusic from '../../assets/sounds/backgroundmusic.mp3';

export default class MainMenu extends Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  preload() {
    PlayButton.forEach((button) => {
      this.load.image(button.name, button.asset);
    });

    this.load.audio('ButtonHover', ButtonHover);
    this.load.audio('start', Start);
    this.load.audio('BGMusic', BGMusic);
  }

  create() {
    this.sfx = {
      buttonHover: this.sound.add('ButtonHover'),
      start: this.sound.add('start'),
      music: this.sound.add('BGMusic', { loop: true }),
    };

    this.anims.create({
      key: 'hoverButton',
      frames: PlayButton.map(button => ({ key: button.name })),
      frameRate: 10,
      repeat: -1,
    });

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
      'Hitman: Battle\nof the Unknown',
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