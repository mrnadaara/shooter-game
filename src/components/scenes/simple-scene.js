import Phaser from 'phaser';

export default class SimpleScene extends Phaser.Scene {
  preload() {
    this.load.image('cokecan', 'assets/images/game/cokecan.png');
  }

  create() {
    this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
  }
}