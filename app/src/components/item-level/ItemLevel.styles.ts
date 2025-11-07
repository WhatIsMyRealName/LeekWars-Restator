export interface ItemLevelBadgeStyles {
  levelContainer: React.CSSProperties;
}

export const itemLevelBadgeStyles: ItemLevelBadgeStyles = {
  levelContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    padding: "4px 8px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
    borderRadius: 4,
    fontSize: 10,
    fontWeight: "bold",
    pointerEvents: "none",
  },
};
