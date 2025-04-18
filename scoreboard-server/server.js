// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Game simulation data
let gameData = {
  homeTeam: {
    city: "Los Angeles",
    name: "Lakers",
    abbreviation: "LAL",
    wins: 51,
    losses: 31,
    score: 52,
    stats: {
      fgPercentage: "36.2%",
      threePointMade: 4,
      threePointAttempts: 28,
      rebounds: 35
    }
  },
  awayTeam: {
    city: "Boston",
    name: "Celtics",
    abbreviation: "BOS",
    wins: 56,
    losses: 26,
    score: 69,
    stats: {
      fgPercentage: "44.8%",
      threePointMade: 14,
      threePointAttempts: 34,
      rebounds: 32
    }
  },
  period: 3,
  timeRemaining: "6:42",
  gameStatus: "live" // can be 'scheduled', 'live', 'halftime', 'final'
};

// Champions League football simulation data
let footballData = {
  homeTeam: {
    name: "Real Madrid",
    abbreviation: "RMA",
    score: 1,
    shotsOnTarget: 3,
    possession: 54
  },
  awayTeam: {
    name: "Manchester City",
    abbreviation: "MCI",
    score: 2,
    shotsOnTarget: 5,
    possession: 46
  },
  minute: 67,
  status: "live" // can be 'scheduled', 'live', 'halftime', 'final'
};

// Tennis match simulation data
let tennisData = {
  player1: {
    name: "Novak Djokovic",
    country: "SRB",
    sets: 1,
    games: 3,
    points: 15
  },
  player2: {
    name: "Carlos Alcaraz",
    country: "ESP",
    sets: 1,
    games: 4,
    points: 30
  },
  status: "live" // can be 'scheduled', 'live', 'final'
};

// Function to randomly update the score
function simulateGameProgress() {
  if (gameData.gameStatus !== 'live') return;
  
  // Random point scored (0, 1, 2 or 3 points)
  const scoringTeam = Math.random() > 0.5 ? 'homeTeam' : 'awayTeam';
  const pointsScored = Math.floor(Math.random() * 4);
  
  if (pointsScored > 0) {
    gameData[scoringTeam].score += pointsScored;
    
    // Update stats based on points scored
    if (pointsScored === 3) {
      gameData[scoringTeam].stats.threePointMade += 1;
      gameData[scoringTeam].stats.threePointAttempts += 1;
    } else if (pointsScored === 2 || pointsScored === 1) {
      // Update field goal percentage
      const newPercentage = Math.min(Math.max(
        parseFloat(gameData[scoringTeam].stats.fgPercentage) + (Math.random() * 0.5 - 0.25),
        35.0), 65.0).toFixed(1);
      gameData[scoringTeam].stats.fgPercentage = newPercentage + "%";
    }
  } else {
    // Missed shot
    if (Math.random() > 0.7) {
      gameData[scoringTeam].stats.threePointAttempts += 1;
    }
  }
  
  // Random rebound
  const reboundTeam = Math.random() > 0.5 ? 'homeTeam' : 'awayTeam';
  if (Math.random() > 0.7) {
    gameData[reboundTeam].stats.rebounds += 1;
  }
  
  // Update time
  const currentMinutes = parseInt(gameData.timeRemaining.split(':')[0]);
  const currentSeconds = parseInt(gameData.timeRemaining.split(':')[1]);
  let newSeconds = currentSeconds - Math.floor(Math.random() * 24);
  let newMinutes = currentMinutes;
  
  if (newSeconds < 0) {
    newMinutes -= 1;
    newSeconds += 60;
  }
  
  if (newMinutes < 0) {
    // End of quarter
    gameData.period += 1;
    if (gameData.period > 4) {
      // Game ended
      if (gameData.homeTeam.score === gameData.awayTeam.score) {
        // Overtime
        gameData.timeRemaining = "5:00";
      } else {
        gameData.gameStatus = "final";
        gameData.timeRemaining = "0:00";
      }
    } else {
      // New quarter
      gameData.timeRemaining = "12:00";
    }
  } else {
    gameData.timeRemaining = `${newMinutes}:${newSeconds.toString().padStart(2, '0')}`;
  }
}

// Simulate football match progress
function simulateFootballProgress() {
  if (footballData.status !== 'live') return;
  // Randomly update score
  if (Math.random() > 0.8) {
    const scoringTeam = Math.random() > 0.5 ? 'homeTeam' : 'awayTeam';
    footballData[scoringTeam].score += 1;
    footballData[scoringTeam].shotsOnTarget += 1;
  } else if (Math.random() > 0.5) {
    // Random shot on target
    const team = Math.random() > 0.5 ? 'homeTeam' : 'awayTeam';
    footballData[team].shotsOnTarget += 1;
  }
  // Randomly update possession
  let possession = 50 + Math.floor(Math.random() * 11) - 5;
  possession = Math.max(40, Math.min(60, possession));
  footballData.homeTeam.possession = possession;
  footballData.awayTeam.possession = 100 - possession;
  // Update minute
  footballData.minute += Math.floor(Math.random() * 3) + 1;
  if (footballData.minute >= 90) {
    footballData.status = 'final';
    footballData.minute = 90;
  }
}

// Simulate tennis match progress
function simulateTennisProgress() {
  if (tennisData.status !== 'live') return;
  // Randomly update points
  const pointWinner = Math.random() > 0.5 ? 'player1' : 'player2';
  tennisData[pointWinner].points += 15;
  if (tennisData[pointWinner].points > 40) {
    tennisData[pointWinner].games += 1;
    tennisData[pointWinner].points = 0;
    tennisData[pointWinner === 'player1' ? 'player2' : 'player1'].points = 0;
    // Check for set win
    if (tennisData[pointWinner].games >= 6 && (tennisData[pointWinner].games - tennisData[pointWinner === 'player1' ? 'player2' : 'player1'].games) >= 2) {
      tennisData[pointWinner].sets += 1;
      tennisData.player1.games = 0;
      tennisData.player2.games = 0;
    }
    // End match after 3 sets
    if (tennisData[pointWinner].sets === 3) {
      tennisData.status = 'final';
    }
  }
}

// Simulate game progress every 3 seconds
setInterval(simulateGameProgress, 3000);
setInterval(simulateFootballProgress, 3000);
setInterval(simulateTennisProgress, 3000);

// API endpoint to get current game data
app.get('/api/game', (req, res) => {
  res.json(gameData);
});

app.get('/api/football', (req, res) => {
  res.json(footballData);
});

app.get('/api/tennis', (req, res) => {
  res.json(tennisData);
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
