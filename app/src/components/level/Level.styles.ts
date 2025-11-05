import { CSSProperties } from "react";

export interface ILevelStyles {
  container: CSSProperties;
  title: CSSProperties;
  inputRow: CSSProperties;
  label: CSSProperties;
  input: CSSProperties;
  rangeText: CSSProperties;
  buttonsRow: CSSProperties;
  buttonDown: (disabled: boolean) => CSSProperties;
  buttonUp: (disabled: boolean) => CSSProperties;
}

export const levelStyles: ILevelStyles = {
  container: {
    marginBottom: "20px",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  title: {
    margin: "0 0 15px 0",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    padding: "5px 10px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    width: "80px",
    textAlign: "center" as const,
    fontSize: "16px",
  },
  rangeText: {
    color: "#666",
    fontSize: "14px",
  },
  buttonsRow: {
    display: "flex",
    gap: "10px",
  },
  buttonDown: (disabled: boolean) => ({
    padding: "5px 15px",
    backgroundColor: disabled ? "#ccc" : "#f44336",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: disabled ? "not-allowed" : "pointer",
  }),
  buttonUp: (disabled: boolean) => ({
    padding: "5px 15px",
    backgroundColor: disabled ? "#ccc" : "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: disabled ? "not-allowed" : "pointer",
  }),
};
