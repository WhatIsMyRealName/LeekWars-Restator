import { CSSProperties } from "react";

export interface ICastableCardStyles {
  container: CSSProperties;
  effectValueContainer: CSSProperties;
}

export const castableEffectCardStyles: ICastableCardStyles = {
  container: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
  },
  effectValueContainer: {
    fontWeight: "bold",
    display: "flex",
    gap: 4,
    alignItems: "center",
  },
};
