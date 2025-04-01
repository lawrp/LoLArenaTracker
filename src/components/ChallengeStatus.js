import React from 'react';

const ChallengeStatus = ({ challengeData }) => {
  if (!challengeData) {
    return <p>Challenge data not available.</p>;
  }

  const totalPointsLevel = challengeData.totalPoints?.level || 'None';
  const totalPointsCurrent = challengeData.totalPoints?.current || 0;
  const challenges = challengeData.challenges || [];

  

  const arenaGodChallenge = challenges.find(
    (challenge) => challenge.challengeId === 602002
  );
  console.table(arenaGodChallenge);

  const arenaChampionOcean = challenges.find(
    (challenge) => challenge.challengeId === 602001
  );


  return (
    <div>
      <h3>Arena God Challenge Status</h3>
      <h4>Arena Challenges:</h4>
      <p> Arena God Challenge: {arenaGodChallenge.value} / 60</p>
      <p> Arena Champion Ocean Challenge: {arenaChampionOcean.value} / 168</p>
    </div>
  );
};

export default ChallengeStatus;