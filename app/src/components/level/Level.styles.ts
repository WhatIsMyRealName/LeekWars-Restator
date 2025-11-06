import { CSSProperties } from "react";

export interface ILevelStyles {
  container: CSSProperties;
  title: CSSProperties;
  inputRow: CSSProperties;
  label: CSSProperties;
  input: CSSProperties;
}

export const levelStyles: ILevelStyles = {
  container: {
    padding: "24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    color: "white",
  },
  title: {
    margin: "0 0 20px 0",
    fontSize: "24px",
    fontWeight: "700",
    textAlign: "center" as const,
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    letterSpacing: "0.5px",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap" as const,
  },
  label: {
    fontWeight: "600",
    fontSize: "18px",
    color: "rgba(255, 255, 255, 0.95)",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
  },
  input: {
    padding: "12px 16px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "12px",
    width: "100px",
    textAlign: "center" as const,
    fontSize: "18px",
    fontWeight: "600",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    color: "#333",
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    outline: "none",
  },
};
