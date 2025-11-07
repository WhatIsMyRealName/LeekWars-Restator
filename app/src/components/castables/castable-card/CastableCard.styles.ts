import { CastableType } from "@/types/Castable";
import { CSSProperties } from "react";
import {
  getChipImageUrlByName,
  getWeaponImageUrlByName,
} from "../CastableUtils";

export interface ICastableCardStyles {
  gridContainer: CSSProperties;
  imageContainer: (
    castableType: CastableType,
    castableName: string
  ) => CSSProperties;
  castableName: CSSProperties;
  castableCost: CSSProperties;
}

export const castableCardStyles: ICastableCardStyles = {
  gridContainer: {
    padding: "10px",
    backgroundColor: "white",
    border: "1px solid #e0e0e0",
    borderRadius: "6px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "all 0.2s ease",
    cursor: "pointer",
    position: "relative",
    color: "#2c3e50",
    gap: "8px",
    display: "flex",
    flexDirection: "column" as const,
  },
  imageContainer: (type: CastableType, name: string) => ({
    backgroundImage: `url("${
      type === "weapon"
        ? getWeaponImageUrlByName(name)
        : getChipImageUrlByName(name)
    }")`,
    width: "100%",
    height: "80px",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }),
  castableName: {
    textTransform: "capitalize",
    textAlign: "center",
    borderBottom: "1px solid #ccc",
  },
  castableCost: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
};

// Hover effect styles (since inline styles can't handle pseudo-selectors)
export const hoverEffects = {
  cardHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
  },
  cardDefault: {
    transform: "translateY(0)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};
