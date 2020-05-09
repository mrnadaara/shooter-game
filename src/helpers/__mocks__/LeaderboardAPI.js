export const updateScore = (user, score) => (
  new Promise((resolve, reject) => {
    if (user === '') {
      reject(new Error('You need to provide a valid user for the score'));
    } else if (score === 0 || !score) {
      reject(
        new Error('You need to provide a valid score for the leaderboard'),
      );
    } else {
      resolve({ result: 'Leaderboard score created correctly.' });
    }
  })
);

export const getScores = () => (
  Promise.resolve({
    result: [
      {
        user: 'sharmarke',
        score: 350,
      },
    ],
  })
);

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
    fetchLeaderboard = await getScores()
      .then(({ result }) => reorderLeaderboard({ result }))
      .catch((error) => {
        throw new Error(error.message);
      });
  } else {
    fetchLeaderboard = await Promise.all([
      updateScore(user, score),
      getScores(),
    ]).then(
      (result) => reorderLeaderboard(result[1]),
    ).catch((error) => {
      throw new Error(error.message);
    });
  }

  return fetchLeaderboard;
};