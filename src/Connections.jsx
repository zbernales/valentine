import "./Connections.css";
import { useState } from 'react'

export default function Connections() {
  const [tiles, setTiles] = useState([
    "WILL YOU", "BE", "MY", "VALENTINE",
    "AURAMAXXING", "JORDAN", "ROSE", "7/11",
    "WHY", "OH...", "RED ROBIN", "LOVE",
    "THEIR", "ITS", "ARE", "OUR"
  ]);
  const [selectedTiles, setSelectedTiles] = useState([])
  const [pastGuesses, setPastGuesses] = useState([])
  const [lives, setLives] = useState(4);
  const words = [
    "WILL YOU", "BE", "MY", "VALENTINE",
    "AURAMAXXING", "JORDAN", "ROSE", "7/11",
    "WHY", "OH...", "RED ROBIN", "LOVE",
    "THEIR", "ITS", "ARE", "OUR"
  ];
  const answers = [
    new Set([2, 12, 13, 15]), 
    new Set([1, 8, 9, 14]), 
    new Set([3, 5, 6, 11]), 
    new Set([0, 4, 7, 10])
  ];
  const categories = [
    "POSSESSIVE ADJECTIVES",
    "LETTER HOMOPHONES",
    "CONTAINS 'STRANGER THINGS' CHARACTERS",
    "LEGENDARY CHICAGO BULLS (AND DENZEL VALENTINE)"
  ]

  const handleSelect = (idx) => {
    if (!selectedTiles.includes(idx) && selectedTiles.length !== 4) {
      setSelectedTiles([...selectedTiles, idx]);
    } else {
      setSelectedTiles(selectedTiles.filter(i => i !== idx));
    }
  }

  const handleSubmit = () => {
    let isCorrect = false;
    let isOneAway = false;
    answers.forEach(answerSet => {
      const matches = selectedTiles.filter(idx => 
        answerSet.has(idx)
      ).length;
      if (matches === 4) isCorrect = true;
      if (matches === 3) isOneAway = true;
    })
    if (isCorrect) {
      alert('Correct');
      setSelectedTiles([]);
      //setTiles(tiles.filter((_, idx) => !selectedTiles.includes(idx)));
    } 
    else if (pastGuesses.some(guessesSet => selectedTiles.every(idx => guessesSet.has(idx)))) {
      alert('Already Guessed');
    }
    else {
      if (isOneAway) {
        alert('One Away');
      } else {
        alert('Incorrect')
      }
      setLives(lives - 1);
    }
    setPastGuesses([...pastGuesses, new Set(selectedTiles)]);
  }

  return (
    <div className="connections-page">
      <h1 className="title">Connections</h1>
      <div className="grid">
        {tiles.map((word, idx) => (
          <div
            key={idx}
            className={selectedTiles.includes(idx) ? "selectedTile" : "tile"}
            onClick={() => handleSelect(idx)}
          >
            {word}
          </div>
        ))}
      </div>

      <div className="lives">
        {lives >= 1 && (<div className="life" />)}
        {lives >= 2 && (<div className="life" />)}
        {lives >= 3 && (<div className="life" />)}
        {lives >= 4 && (<div className="life" />)}
      </div>

      <button
        className="submit-button"
        disabled={selectedTiles.length !== 4}
        onClick={() => handleSubmit()}
      >
        Submit
      </button>

    </div>
  );
}
