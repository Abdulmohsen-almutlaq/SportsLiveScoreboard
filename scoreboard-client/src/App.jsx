import { useState, useEffect } from 'react';
import './App.css';
import GameCard from './components/GameCard';

function App() {
  const [gameData, setGameData] = useState(null);
  const [footballData, setFootballData] = useState(null);
  const [tennisData, setTennisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const gameRes = await fetch('http://localhost:4000/api/game');
        const footballRes = await fetch('http://localhost:4000/api/football');
        const tennisRes = await fetch('http://localhost:4000/api/tennis');
        if (!gameRes.ok || !footballRes.ok || !tennisRes.ok) {
          throw new Error('Failed to fetch game data');
        }
        const game = await gameRes.json();
        const football = await footballRes.json();
        const tennis = await tennisRes.json();
        setGameData(game);
        setFootballData(football);
        setTennisData(tennis);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGameData();

    // Set up polling every 3 seconds
    const interval = setInterval(fetchGameData, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="loading">Loading game data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <header className="app-header">
        <h1> Sports Live Scoreboard</h1>
      </header>
      <main>
        <div className="card-row">
          {gameData && <div className="card-col"><GameCard game={gameData} /></div>}
          {footballData && <div className="card-col"><GameCard game={footballData} typeofSport="football" /></div>}
          {tennisData && <div className="card-col"><GameCard game={tennisData} typeofSport="tennis" /></div>}
        </div>
      </main>
    </div>
  );
}

export default App;