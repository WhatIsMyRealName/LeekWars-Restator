import { CSSProperties } from "react";

export interface IStatsStyles {
  container: CSSProperties;
  title: CSSProperties;
  table: CSSProperties;
  headerRow: CSSProperties;
  headerCell: CSSProperties;
  totalHeaderCell: CSSProperties;
  bodyRow: CSSProperties;
  statNameCell: CSSProperties;
  statIcon: CSSProperties;
  investedCell: CSSProperties;
  investedValue: (value: number) => CSSProperties;
  valueCell: CSSProperties;
  totalCell: CSSProperties;
  capitalBadge: CSSProperties;
}

export const statsStyles: IStatsStyles = {
  container: {
    width: "100%",
    padding: "0",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "20px",
    boxShadow:
      "0 15px 35px rgba(102, 126, 234, 0.3), 0 5px 15px rgba(0, 0, 0, 0.1)",
    overflow: "auto",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(20px)",
  },
  title: {
    color: "white",
    fontSize: "28px",
    fontWeight: "700",
    textAlign: "center" as const,
    margin: "0",
    padding: 24,
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    letterSpacing: "0.5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: "12px",
    flexWrap: "wrap" as const,
  },
  capitalBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "16px",
    fontWeight: "600",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    margin: "0",
    borderRadius: "0 0 20px 20px",
    overflow: "hidden",
  },
  headerRow: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    boxShadow: "0 2px 8px rgba(79, 172, 254, 0.3)",
  },
  headerCell: {
    padding: "10px 12px",
    textAlign: "center" as const,
    color: "white",
    fontSize: "16px",
    fontWeight: "700",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
    letterSpacing: "0.5px",
    border: "none",
    position: "relative" as const,
  },
  totalHeaderCell: {
    padding: "10px 12px",
    textAlign: "center" as const,
    color: "white",
    fontSize: "16px",
    fontWeight: "700",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
    letterSpacing: "0.5px",
    border: "none",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    position: "relative" as const,
  },
  bodyRow: {
    transition: "all 0.3s ease",
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
  },
  statNameCell: {
    padding: "6px 14px",
    fontWeight: "600",
    textTransform: "capitalize" as const,
    backgroundColor: "rgba(102, 126, 234, 0.08)",
    color: "#2c3e50",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border: "none",
    borderRight: "2px solid rgba(102, 126, 234, 0.2)",
  },
  statIcon: {
    width: "24px",
    height: "24px",
    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
    borderRadius: "4px",
    background: "rgba(255, 255, 255, 0.8)",
    padding: "2px",
  },
  valueCell: {
    padding: "6px 14px",
    textAlign: "center" as const,
    fontSize: "16px",
    fontWeight: "600",
    color: "#2c3e50",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    border: "none",
    borderRight: "1px solid rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
  },
  investedCell: {
    padding: "6px 14px",
    textAlign: "center" as const,
    fontSize: "16px",
    fontWeight: "600",
    color: "#2c3e50",
    backgroundColor: "#ede9e9",
    borderRadius: "8px",
    border: "none",
    transition: "all 0.3s ease",
    display: "flex",
    // gap: "2px",
    justifyContent: "space-between",
  },
  investedValue: (value: number) => ({
    marginLeft: 4,
    marginRight: 4,
    fontWeight: value > 0 ? "700" : "600",
    width: "40px",
  }),
  totalCell: {
    padding: "6px 14px",
    textAlign: "center" as const,
    fontWeight: "700",
    fontSize: "18px",
    background: "linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)",
    color: "#2c3e50",
    border: "none",
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
    position: "relative" as const,
  },
};
