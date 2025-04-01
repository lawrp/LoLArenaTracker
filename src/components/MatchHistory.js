import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config'; // Import the base URL

const MatchHistory = ({ puuid }) => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatchHistory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/match-history/${puuid}`);
        setMatches(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch match history.');
      }
    };
    fetchMatchHistory();
  }, [puuid]);

  if (error) return <div className="error">{error}</div>;
  if (!matches.length) return <p>No match history available.</p>;

  return (
    <div>
      <h3>Match History</h3>
      {matches.map((match, index) => (
        <div key={index}>
          <p>Match {index + 1}: {match.metadata?.matchId || 'Unknown Match'}</p>
        </div>
      ))}
    </div>
  );
};

export default MatchHistory;