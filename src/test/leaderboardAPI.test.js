import { updateScore, getScores } from '../helpers/LeaderboardAPI';

const fetchMock = require('fetch-mock');

fetchMock.config.overwriteRoutes = false;

test('returns success message for newly created score', () => {
  fetchMock.post(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/vjpJFLaEVRsVpdx9QnSF/scores',
    { result: 'Leaderboard score created correctly.' },
  );
  updateScore('sharmarke', '300').then((result) => {
    expect(result).toBe('Leaderboard score created correctly.');
  });
});

test('promise rejects and returns message asking to provide valid username when username not provided', () => {
  fetchMock.post(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/vjpJFLaEVRsVpdx9QnSF/scores',
    {
      result: 'You need to provide a valid user for the score',
    },
  );
  updateScore('', '300').catch((result) => {
    expect(result).toBe('You need to provide a valid user for the score');
  });
});

test('promise rejects and returns message asking to provide valid score when score not provided', () => {
  fetchMock.post(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/vjpJFLaEVRsVpdx9QnSF/scores',
    {
      result: 'You need to provide a valid score for the leaderboard',
    },
  );
  updateScore('sharmarke', '').catch((result) => {
    expect(result).toBe(
      'You need to provide a valid score for the leaderboard',
    );
  });
});

test('returns list of scores', () => {
  fetchMock.get(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/vjpJFLaEVRsVpdx9QnSF/scores',
    {
      result: [
        {
          user: 'sharmarke',
          score: 350,
        },
      ],
    },
  );
  getScores().then((result) => {
    expect(Array.isArray(result)).toBe(true);
  });
});