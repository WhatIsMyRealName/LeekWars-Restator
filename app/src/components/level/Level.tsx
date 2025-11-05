import { levelStyles } from "./Level.styles";

const MIN_LEVEL = 1;
const MAX_LEVEL = 301;

export default function Level({
  level,
  setLevel,
}: {
  level: number;
  setLevel: (level: number) => void;
}) {
  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= MIN_LEVEL && value <= MAX_LEVEL) {
      setLevel(value);
    } else if (e.target.value === "") {
      // Allow empty input for better UX while typing
      setLevel(MIN_LEVEL);
    }
  };

  const handleLevelUp = () => {
    if (level < MAX_LEVEL) {
      setLevel(level + 1);
    }
  };

  const handleLevelDown = () => {
    if (level > MIN_LEVEL) {
      setLevel(level - 1);
    }
  };

  return (
    <div style={levelStyles.container}>
      <h3 style={levelStyles.title}>Level Controls</h3>
      <div style={levelStyles.inputRow}>
        <label htmlFor="level-input" style={levelStyles.label}>
          Level:
        </label>
        <input
          id="level-input"
          type="number"
          min={MIN_LEVEL}
          max={MAX_LEVEL}
          value={level}
          onChange={handleLevelChange}
          style={levelStyles.input}
        />
        <span style={levelStyles.rangeText}>
          ({MIN_LEVEL} - {MAX_LEVEL})
        </span>
      </div>
      <div style={levelStyles.buttonsRow}>
        <button
          onClick={handleLevelDown}
          disabled={level <= MIN_LEVEL}
          style={levelStyles.buttonDown(level <= MIN_LEVEL)}
        >
          Level Down
        </button>
        <button
          onClick={handleLevelUp}
          disabled={level >= MAX_LEVEL}
          style={levelStyles.buttonUp(level >= MAX_LEVEL)}
        >
          Level Up
        </button>
      </div>
    </div>
  );
}
