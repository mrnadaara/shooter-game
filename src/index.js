/* eslint-disable no-unused-vars */
import Phaser, { Game } from 'phaser';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './assets/css/app.css';
import Components from './components';
import { Main, MainMenu, GameOver } from './components/scenes';
import Entity from './components/Entities';

const content = new Components();
content.render();

const gameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 700,
  scene: [Main, GameOver, MainMenu],
  parent: 'main',
  backgroundColor: '#000428',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  pixelArt: true,
  roundPixels: true,
};

if (document.readyState === 'complete') {
  const game = new Game(gameConfig);
} else {
  window.addEventListener('load', () => {
    const game = new Game(gameConfig);
  });
}