import "./Connections.css";

export default function Connections() {
  const words = [
    "BE", "MY", "VALENTINE", "?",
    "DOG", "CAT", "MOUSE", "HORSE",
    "RED", "BLUE", "GREEN", "YELLOW",
    "CAR", "TRAIN", "PLANE", "BOAT"
  ];

  return (
    <div className="connections-page">
      <div className="grid">
        {words.map((word, idx) => (
          <div key={idx} className="tile">
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}
