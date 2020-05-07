const gameID = 'vjpJFLaEVRsVpdx9QnSF';

export const updateScore = async (user, score) => {
  const response = await fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
        score,
      }),
    },
  );

  const result = await response.json();
  if (response.status === 400) {
    throw new Error(result.message);
  }

  return result;
};

export const getScores = async () => {
  const response = await fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`,
    {
      method: 'GET',
    },
  );

  const result = await response.json();
  if (response.status === 400) {
    throw new Error(result.message);
  }
  return result;
};

const reorderLeaderboard = ({ result }) => {
  let leaderboard = '';
  result.sort((a, b) => b.score - a.score);
  const top5 = result.slice(0, 5);
  top5.forEach(({ user, score }, index) => {
    leaderboard += `${index + 1}. ${user}: ${score}\n`;
  });
  return leaderboard;
};

export const showLeaderboard = async (user, score) => {
  let fetchLeaderboard;
  if (score === 0) {
    fetchLeaderboard = getScores().then(
      ({ result }) => reorderLeaderboard({ result }),
      (error) => {
        throw new Error(error);
      },
    );
  } else {
    fetchLeaderboard = await Promise.all([
      updateScore(user, score),
      getScores(),
    ]).then(
      (result) => reorderLeaderboard(result[1]),
      (error) => {
        throw new Error(error);
      },
    );
  }

  return fetchLeaderboard;
};