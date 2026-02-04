import "./Connections.css";
import { useState } from 'react'
import HeartConfetti from "./HeartConfetti";
import Toast from "./Toast";
import Celebration from "./Celebration"

export default function Connections() {
  const [tiles, setTiles] = useState([
    "WILL YOU", "BE", "MY", "VALENTINE",
    "AURAMAXXING", "JORDAN", "MARC", "7/11",
    "AY", "OH...", "RED ROBIN", "LOVE",
    "ROSE", "WHY", "ARE", "JUN"
  ]);

  const answers = [
    new Set(["BE", "WHY", "OH...", "ARE"]), 
    new Set(["MY", "MARC", "AY", "JUN"]), 
    new Set(["VALENTINE", "JORDAN", "ROSE", "LOVE"]), 
    new Set(["WILL YOU", "AURAMAXXING", "7/11", "RED ROBIN"])
  ];

  const categories = [
    "LETTER HOMOPHONES",
    "MONTHS MINUS A LETTER",
    "LEGENDARY CHICAGO BULLS (SHOUTOUT DENZEL \"OH MY GOODNESS\" VALENTINE)",
    "CONTAINS 'STRANGER THINGS' CHARACTERS"
  ];

  const difficultyColors = [
    "#fabaca", 
    "#cc919f", 
    "#ff4d6d", 
    "#c20f42"  
  ];

  const valentine = new Set(["WILL YOU", "BE", "MY", "VALENTINE"]);
  
  const [selectedTiles, setSelectedTiles] = useState([])
  const [pastGuesses, setPastGuesses] = useState([])
  const [lives, setLives] = useState(4);
  const [solvedCategories, setSolvedCategories] = useState([]);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [toast, setToast] = useState("");
  const [allSolved, setAllSolved] = useState(false);

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
    let valentineGuess = false;
    if (selectedTiles.every(word => valentine.has(word))) {
      valentineGuess = true;
    }
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
      setTiles(tiles.filter((word) => !selectedTiles.includes(word)));
      setSolvedCategories(prev => {
        const updated = [...prev, correctIndex];
        if (updated.length === 4) {
          setAllSolved(true);        
          setConfettiTrigger(c => c + 5); 
        }
        return updated;
      });
    } 
    else if (pastGuesses.some(guessesSet => selectedTiles.every(word => guessesSet.has(word)))) {
      setToast("Already guessed!");
    }
    else {
      if (isOneAway) {
        setToast("Close...");
      } 
      else if (valentineGuess) {
        setToast("You really thought it would be that obvious? Good luck... heh");
      }
      else if (lives == 1) {
        setToast("Wow, y'know what I'll give you one more guess");
      }
      else if (lives == 0) {
        setToast("Yikes... okay one more chance for real this time");
      }
      else if (lives == -1) {
        setToast("Here, just takes these. You need em");
      }
      else if (lives <= -2) {
        setToast("Is it even mathematically possible to have this many wrong guesses?");
      }
      else {
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
        {lives >= -15 && (<div className="life" />)}
        {(lives >= 2 || lives < -1) && (<div className="life" />)}
        {(lives >= 3 || lives < -1) && (<div className="life" />)}
        {(lives >= 4 || lives < -1) && (<div className="life" />)}
        {(lives < -1 && lives >= -2) && (<div className="life" />)}
        {(lives < -1 && lives >= -3) && (<div className="life" />)}
        {(lives < -1 && lives >= -4) && (<div className="life" />)}
        {(lives < -1 && lives >= -5) && (<div className="life" />)}
        {(lives < -1 && lives >= -6) && (<div className="life" />)}
        {(lives < -1 && lives >= -7) && (<div className="life" />)}
        {(lives < -1 && lives >= -8) && (<div className="life" />)}
        {(lives < -1 && lives >= -9) && (<div className="life" />)}
        {(lives < -1 && lives >= -10) && (<div className="life" />)}
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
      <Celebration show={allSolved} onClose={() => setAllSolved(false)}/>
    </div>
  );
}
