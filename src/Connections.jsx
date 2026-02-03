import "./Connections.css";
import { useState } from 'react'
import HeartConfetti from "./HeartConfetti";
import Toast from "./Toast.jsx";

export default function Connections() {
  const [tiles, setTiles] = useState([
    "WILL YOU", "BE", "MY", "VALENTINE",
    "AURAMAXXING", "JORDAN", "ROSE", "7/11",
    "WHY", "OH...", "RED ROBIN", "LOVE",
    "THEIR", "ITS", "ARE", "OUR"
  ]);

  const answers = [
    new Set(["MY", "THEIR", "ITS", "OUR"]), 
    new Set(["BE", "WHY", "OH...", "ARE"]), 
    new Set(["VALENTINE", "JORDAN", "ROSE", "LOVE"]), 
    new Set(["WILL YOU", "AURAMAXXING", "7/11", "RED ROBIN"])
  ];

  const categories = [
    "POSSESSIVE ADJECTIVES",
    "LETTER HOMOPHONES",
    "LEGENDARY CHICAGO BULLS (AND DENZEL VALENTINE)",
    "CONTAINS 'STRANGER THINGS' CHARACTERS"
  ];

  const difficultyColors = [
    "#fabaca", 
    "#cc919f", 
    "#ff4d6d", 
    "#c20f42"  
  ];
  
  const [selectedTiles, setSelectedTiles] = useState([])
  const [pastGuesses, setPastGuesses] = useState([])
  const [lives, setLives] = useState(4);
  const [solvedCategories, setSolvedCategories] = useState([]);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [toast, setToast] = useState("");

  const handleSelect = (word) => {
    if (!selectedTiles.includes(word) && selectedTiles.length !== 4) {
      setSelectedTiles([...selectedTiles, word]);
    } else {
      setSelectedTiles(selectedTiles.filter(w => w !== word));
    }
  }

  const handleSubmit = () => {
    let isCorrect = false;
    let isOneAway = false;
    let correctIndex = null;
    answers.forEach((answerSet, idx) => {
      const matches = selectedTiles.filter(word => 
        answerSet.has(word)
      ).length;
      if (matches === 4) {
        isCorrect = true;
        correctIndex = idx;
      }
      if (matches === 3) isOneAway = true;
    })
    if (isCorrect) {
      setConfettiTrigger(c => c + 1);
      setSelectedTiles([]);
      setSolvedCategories([...solvedCategories, correctIndex]);
      setTiles(tiles.filter((word) => !selectedTiles.includes(word)));
    } 
    else if (pastGuesses.some(guessesSet => selectedTiles.every(word => guessesSet.has(word)))) {
      setToast("Already guessed!");
    }
    else {
      if (isOneAway) {
        setToast("Close...");
      } else {
        setToast("Nope");
      }
      setLives(lives - 1);
    }
    setPastGuesses([...pastGuesses, new Set(selectedTiles)]);
  }

  function SolutionBox({ category, words, color }) {
    return (
      <div className="solution-box" style={{ backgroundColor: color }}>
        <div className="solution-title">{category}</div>
        <div className="solution-words">
          {words.map((word, idx) => (
            <div key={idx} className="solution-word">{word}</div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="connections-page">
      <h1 className="title">Connections</h1>
        {solvedCategories.map(catIdx => (
          <SolutionBox
            key={catIdx}
            category={categories[catIdx]}
            words={Array.from(answers[catIdx])}
            color={difficultyColors[catIdx]}
          />
        ))}
      <div className="grid">
        {tiles.map((word, idx) => (
          <div
            key={idx}
            className={selectedTiles.includes(word) ? "selectedTile" : "tile"}
            onClick={() => handleSelect(word)}
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
      <HeartConfetti trigger={confettiTrigger} />
      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}
