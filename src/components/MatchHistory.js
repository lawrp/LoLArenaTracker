import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MatchHistory = ({ puuid }) => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatchHistory = async () => {
      try {
        const response = await axios.get(`/api/match-history/${puuid}`);
        setMatches(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch match history.');
      }
    };
    fetchMatchHistory();
  }, [puuid]);

  if (error) return <div className="error">{error}</div>;
  if (!matches.length) return <p>Loading match history...</p>;

  return (
    <div>
      <h3>Match History</h3>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            Match ID: {match.metadata.matchId} - Game Mode: {match.info.gameMode}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchHistory;