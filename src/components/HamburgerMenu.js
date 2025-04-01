import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import MatchHistory from './MatchHistory';
import ChallengeStatus from './ChallengeStatus';
import Champions from './champions';

const HamburgerMenu = ({ puuid, challengeData, profileIconId, setContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSelection = (option) => {
    if (option === 'Match History') {
      setContent(<MatchHistory puuid={puuid} />);
    } else if (option === 'Arena God Challenge Status') {
      setContent(<ChallengeStatus challengeData={challengeData} />);
    } else if (option === 'Champions') {
      setContent(<Champions />);
    } else if (option === 'Logout') {
      setContent(null); // Clear the content
      navigate('/'); // Redirect to login page
    }
    setIsOpen(false);
  };

  return (
    <div className="hamburger-menu">
      <button onClick={toggleMenu}>☰</button>
      {isOpen && (
        <div className="menu">
          <div className="menu-item" onClick={() => handleSelection('Match History')}>
            Match History
          </div>
          <div className="menu-item" onClick={() => handleSelection('Arena God Challenge Status')}>
            Arena God Challenge Status
          </div>
          <div className="menu-item" onClick={() => handleSelection('Champions')}>
            Champions
          </div>
          <div className="menu-item logout-item" onClick={() => handleSelection('Logout')}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;