import { updateScore, showLeaderboard } from '../helpers/LeaderboardAPI';

jest.mock('../helpers/LeaderboardAPI');

test('returns success message for newly created score', () => {
  updateScore('sharmarke', '300').then(({ result }) => {
    expect(result).toBe('Leaderboard score created correctly.');
  }).catch(() => {});
});

test('promise rejects and returns message asking to provide valid username when username not provided', () => {
  updateScore('', '300').catch((error) => {
    expect(error.message).toBe(
      'You need to provide a valid user for the score',
    );
  });
});

test('promise rejects and returns message asking to provide valid score when score not provided', () => {
  updateScore('sharmarke', '').catch((error) => {
    expect(error.message).toBe(
      'You need to provide a valid score for the leaderboard',
    );
  });
});

const mockLeaderboard = jest.fn((user, score) => showLeaderboard(user, score));

test('returns list of scores', () => {
  mockLeaderboard('sharmarke', '350')
    .then((result) => {
      expect(result).toBe('1. sharmarke: 350');
    })
    .catch(() => {});
});