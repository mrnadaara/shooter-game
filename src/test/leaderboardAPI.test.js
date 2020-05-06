import { createGame, updateScore, getScores } from '../helpers/LeaderboardAPI';

const fetchMock = require('fetch-mock');

test('returns a unique identifier for newly created game', () => {
  fetchMock.post(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games',
    { result: 'Game with ID: Zl4d7IVkemOTTVg2fUdz added.' },
  );
  createGame('Hitman: Battle of the Unknown').then((result) => {
    expect(result).toMatch(
      /(Game with ID:)/,
    );
    console.log(result);
  });
});

test('returns message for newly created score', () => {
  fetchMock.post(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdz/scores',
    { result: 'Leaderboard score created correctly.' },
  );
  updateScore('Hitman: Battle of the Unknown').then((result) => {
    expect(result).toMatch(/(Game with ID:)/);
    console.log(result);
  });
});

test('returns list of scores', () => {
  fetchMock.get(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdz/scores',
    { result: 'Game with ID: Zl4d7IVkemOTTVg2fUdz added.' },
  );
  getScores('Hitman: Battle of the Unknown').then((result) => {
    expect(result).toMatch(/(Game with ID:)/);
    console.log(result);
  });
});