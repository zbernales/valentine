import "./Connections.css";
import { useState } from 'react'

export default function Connections() {
  const [selectedTiles, setSelectedTiles] = useState([])
  const words = [
    "BE", "MY", "VALENTINE", "?",
    "DOG", "JORDAN", "DEROZAN", "HORSE",
    "RED", "SEE", "GREEN", "LAVINE",
    "CAR", "TRAIN", "ARE", "BOAT"
  ];
  const handleSelect = (idx) => {
    if (!selectedTiles.includes(idx) && selectedTiles.length !== 4) {
      setSelectedTiles([...selectedTiles, idx]);
    } else {
      setSelectedTiles(selectedTiles.filter(i => i !== idx));
    }
  }
  return (
    <div className="connections-page">
      <div className="grid">
        {words.map((word, idx) => (
          <div key={idx} className={selectedTiles.includes(idx) ? "selectedTile" : "tile"} onClick={() => handleSelect(idx)}>
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}
