export const updateHighscore = async (username: string, highscore: number) => {
    const response = await fetch('/api/leaderboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, highscore }),
    });
  
    const data = await response.json();
    console.log(data);
  };
  