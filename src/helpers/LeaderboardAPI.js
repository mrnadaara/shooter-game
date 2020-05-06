export const createGame = async (name) => {
  const response = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', {
      body: JSON.stringify({
        name,
      }),
    },
  );

  const result = await response.json();
  return result;
};
