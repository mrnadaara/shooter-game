import Phaser from 'phaser';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './assets/css/app.css';
import Components from './components';
import { SimpleScene } from './components/scenes';

// const content = new Components();
// content.render();

const gameConfig = {
  width: 680,
  height: 400,
  scene: SimpleScene,
  parent: 'content',
};

const loadGame = new Phaser.Game(gameConfig);

if (document.readyState === 'complete') {
  loadGame();
} else {
  window.addEventListener('load', () => {
    loadGame();
  });
}