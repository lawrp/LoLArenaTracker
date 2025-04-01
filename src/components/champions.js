import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Champions = () => {
  const [champions, setChampions] = useState([]);
  const [checkedChampions, setCheckedChampions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  // Fetch champions data from API
  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const response = await axios.get('/api/champions');
        setChampions(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch champions.');
      }
    };
    fetchChampions();
  }, []);

  // Load checked champions from localStorage when the component mounts
  useEffect(() => {
    const savedCheckedChampions = localStorage.getItem('checkedChampions');
    if (savedCheckedChampions) {
      setCheckedChampions(JSON.parse(savedCheckedChampions));
    }
  }, []);  // Empty dependency array ensures this runs only once when component mounts

  // Save checked champions to localStorage whenever they change
  useEffect(() => {
    if (checkedChampions.length > 0) {
      localStorage.setItem('checkedChampions', JSON.stringify(checkedChampions));
    }
  }, [checkedChampions]);  // This will save whenever checkedChampions changes

  const toggleChampion = (championId) => {
    setCheckedChampions((prevChecked) => {
      if (prevChecked.includes(championId)) {
        return prevChecked.filter((id) => id !== championId);
      } else {
        return [...prevChecked, championId];
      }
    });
  };

  const filteredUncheckedChamps = champions.filter(
    (champ) => !checkedChampions.includes(champ.id) &&
    champ.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const checkedChamps = champions.filter((champ) =>
    checkedChampions.includes(champ.id)
  );

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

      {/* Unchecked Champions Section */}
      {filteredUncheckedChamps.length > 0 ? (
        <div>
          <h4>Available Champions</h4>
          <div className="champion-grid">
            {filteredUncheckedChamps.map((champion) => (
              <div key={champion.id} className="champion-item">
                <div className="champion-name">{champion.name}</div>
                <img
                  src={champion.image}
                  alt={champion.name}
                  className="champion-icon"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
                />
                <div
                  className={`custom-checkbox`}
                  onClick={() => toggleChampion(champion.id)}
                >
                  <span className="checkmark">✔</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No available champions.</p>
      )}

      {/* Checked Champions Section */}
      {checkedChamps.length > 0 && (
        <div>
          <h4>Completed Champs</h4>
          <div className="champion-grid">
            {checkedChamps.map((champion) => (
              <div key={champion.id} className="champion-item completed">
                <div className="champion-name">{champion.name}</div>
                <img
                  src={champion.image}
                  alt={champion.name}
                  className="champion-icon"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
                />
                <div
                  className={`custom-checkbox checked`}
                  onClick={() => toggleChampion(champion.id)}
                >
                  <span className="checkmark">✔</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Champions;
