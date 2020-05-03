import { Scene } from 'phaser';

export default class MainMenu extends Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  create() {
    this.scene.start('Main');
  }
}