import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config'; // Import the base URL

const Champions = () => {
  const [champions, setChampions] = useState([]);
  const [selectedChampions, setSelectedChampions] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/champions`);
        setChampions(response.data);
        const initialSelected = response.data.reduce((acc, champion) => {
          acc[champion.id] = false;
          return acc;
        }, {});
        setSelectedChampions(initialSelected);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch champions.');
      }
    };
    fetchChampions();
  }, []);

  const toggleChampion = (championId) => {
    setSelectedChampions((prev) => ({
      ...prev,
      [championId]: !prev[championId],
    }));
  };

  const filteredChampions = champions.filter((champion) =>
    champion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rows = [];
  for (let i = 0; i < filteredChampions.length; i += 10) {
    rows.push(filteredChampions.slice(i, i + 10));
  }

  if (error) return <div className="error">{error}</div>;
  if (!champions.length) return <p>Loading champions...</p>;

  return (
    <div className="champions-section">
      <h3>Champions</h3>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search champions by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="clear-search">
            Clear
          </button>
        )}
      </div>
      {filteredChampions.length === 0 ? (
        <p>No champions found.</p>
      ) : (
        rows.map((row, rowIndex) => (
          <div key={rowIndex} className="champion-row">
            {row.map((champion) => (
              <div key={champion.id} className="champion-item">
                <div className="champion-name">{champion.name}</div>
                <img
                  src={champion.image}
                  alt={champion.name}
                  className="champion-icon"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
                />
                <div
                  className={`custom-checkbox ${selectedChampions[champion.id] ? 'checked' : ''}`}
                  onClick={() => toggleChampion(champion.id)}
                >
                  {selectedChampions[champion.id] && <span className="checkmark">✔</span>}
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Champions;