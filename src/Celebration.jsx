import "./Celebration.css";

export default function Celebration({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="celebration-overlay" onClick={onClose}>
      <div className="celebration-message" onClick={e => e.stopPropagation()}>
        🎉 NICE!!!... SO WILL YOU... HEH 🫣
      </div>
    </div>
  );
}
