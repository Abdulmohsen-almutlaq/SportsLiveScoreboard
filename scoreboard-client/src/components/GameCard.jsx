import React from 'react';
import './GameCard.css';

function GameCard({ game, typeofSport }) {
    // Basketball
    if (!typeofSport || typeofSport === 'basketball') {
        const { homeTeam, awayTeam, period, timeRemaining, gameStatus } = game;
        const getStatusDisplay = () => {
            if (gameStatus === 'final') return 'Final';
            if (gameStatus === 'live') {
                if (period <= 4) {
                    return `Q${period} - ${timeRemaining}`;
                } else {
                    return `OT${period - 4} - ${timeRemaining}`;
                }
            }
            return gameStatus.charAt(0).toUpperCase() + gameStatus.slice(1);
        };
        return (
            <div className="game-card">
                <div className="game-status nba-status">
                    <span>{getStatusDisplay()}</span>
                </div>
                <div className="team-container">
                    <div className="team away">
                        <div className="team-info">
                            <div className={`team-logo ${awayTeam.abbreviation.toLowerCase()}`}>{awayTeam.abbreviation}</div>
                            <div className="team-name">
                                <span className="team-city">{awayTeam.city}</span>
                                <span className="team-nickname">{awayTeam.name}</span>
                            </div>
                            <div className="team-record">({awayTeam.wins}-{awayTeam.losses})</div>
                        </div>
                        <div className="team-score">{awayTeam.score}</div>
                    </div>
                    <div className="team home">
                        <div className="team-info">
                            <div className={`team-logo ${homeTeam.abbreviation.toLowerCase()}`}>{homeTeam.abbreviation}</div>
                            <div className="team-name">
                                <span className="team-city">{homeTeam.city}</span>
                                <span className="team-nickname">{homeTeam.name}</span>
                            </div>
                            <div className="team-record">({homeTeam.wins}-{homeTeam.losses})</div>
                        </div>
                        <div className="team-score">{homeTeam.score}</div>
                    </div>
                </div>
                <div className="game-stats">
                    <div className="stat-row">
                        <div className="stat-label">FG%</div>
                        <div className="stat-value">{awayTeam.stats.fgPercentage}</div>
                        <div className="stat-value">{homeTeam.stats.fgPercentage}</div>
                    </div>
                    <div className="stat-row">
                        <div className="stat-label">3PT</div>
                        <div className="stat-value">{awayTeam.stats.threePointMade}-{awayTeam.stats.threePointAttempts}</div>
                        <div className="stat-value">{homeTeam.stats.threePointMade}-{homeTeam.stats.threePointAttempts}</div>
                    </div>
                    <div className="stat-row">
                        <div className="stat-label">REB</div>
                        <div className="stat-value">{awayTeam.stats.rebounds}</div>
                        <div className="stat-value">{homeTeam.stats.rebounds}</div>
                    </div>
                </div>
            </div>
        );
    }
    // Football
    if (typeofSport === 'football') {
        const { homeTeam, awayTeam, minute, status } = game;
        const getStatusDisplay = () => {
            if (status === 'final') return 'Final';
            if (status === 'live') return `Live - ${minute}'`;
            if (status === 'halftime') return 'Halftime';
            return status.charAt(0).toUpperCase() + status.slice(1);
        };
        return (
            <div className="game-card">
                <div className="game-status">
                    <span>{getStatusDisplay()}</span>
                </div>
                <div className="team-container">
                    <div className="team away">
                        <div className="team-info">
                            <div className={`team-logo ${awayTeam.abbreviation?.toLowerCase()}`}>{awayTeam.abbreviation}</div>
                            <div className="team-name">
                                <span className="team-nickname">{awayTeam.name}</span>
                            </div>
                        </div>
                        <div className="team-score">{awayTeam.score}</div>
                    </div>
                    <div className="team home">
                        <div className="team-info">
                            <div className={`team-logo ${homeTeam.abbreviation?.toLowerCase()}`}>{homeTeam.abbreviation}</div>
                            <div className="team-name">
                                <span className="team-nickname">{homeTeam.name}</span>
                            </div>
                        </div>
                        <div className="team-score">{homeTeam.score}</div>
                    </div>
                </div>
                {(status === 'live' || status === 'final') && (
                    <div className="game-stats">
                        <div className="stat-row">
                            <div className="stat-label">Shots OT</div>
                            <div className="stat-value">{awayTeam.shotsOnTarget}</div>
                            <div className="stat-value">{homeTeam.shotsOnTarget}</div>
                        </div>
                        <div className="stat-row">
                            <div className="stat-label">Poss</div>
                            <div className="stat-value">{awayTeam.possession}%</div>
                            <div className="stat-value">{homeTeam.possession}%</div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    // Tennis
    if (typeofSport === 'tennis') {
        const { player1, player2, status } = game;
        const getStatusDisplay = () => {
            if (status === 'final') return 'Final';
            if (status === 'live') return 'Live';
            return status.charAt(0).toUpperCase() + status.slice(1);
        };
        return (
            <div className="game-card">
                <div className="game-status">
                    <span>{getStatusDisplay()}</span>
                </div>
                <div className="team-container">
                    <div className="team away">
                        <div className="team-info">
                            <div className="team-logo">{player2.country}</div>
                            <div className="team-name">
                                <span className="team-nickname">{player2.name}</span>
                            </div>
                        </div>
                        <div className="team-score">{player2.sets}</div>
                    </div>
                    <div className="team home">
                        <div className="team-info">
                            <div className="team-logo">{player1.country}</div>
                            <div className="team-name">
                                <span className="team-nickname">{player1.name}</span>
                            </div>
                        </div>
                        <div className="team-score">{player1.sets}</div>
                    </div>
                </div>
                <div className="game-stats">
                    <div className="stat-row">
                        <div className="stat-label">Sets</div>
                        <div className="stat-value">{player2.sets}</div>
                        <div className="stat-value">{player1.sets}</div>
                    </div>
                    <div className="stat-row">
                        <div className="stat-label">Games</div>
                        <div className="stat-value">{player2.games}</div>
                        <div className="stat-value">{player1.games}</div>
                    </div>
                    <div className="stat-row">
                        <div className="stat-label">Points</div>
                        <div className="stat-value">{player2.points}</div>
                        <div className="stat-value">{player1.points}</div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default GameCard;