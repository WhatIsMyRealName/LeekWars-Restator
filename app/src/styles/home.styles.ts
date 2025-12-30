export interface IIndexStyles {
  pageContainer: React.CSSProperties;
  container: React.CSSProperties;
  topContainer: React.CSSProperties;
  leftSideContainer: React.CSSProperties;
  actionButtonsContainer: React.CSSProperties;
  actionButton: React.CSSProperties;
  importLabel: React.CSSProperties;
  bottomContainer: React.CSSProperties;
  componentsChipsWeaponsContainer: React.CSSProperties;
  rightSideItemContainer: React.CSSProperties;
  selectedCastablesContainer: React.CSSProperties;
}

export const indexStyles: IIndexStyles = {
  pageContainer: {
    display: "flex",
    padding: "20px",
    gap: "20px",
    width: "100%",
  },
  container: {
    display: "flex",
    gap: "20px",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  topContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    flexWrap: "wrap",
  },
  leftSideContainer: {},
  actionButtonsContainer: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "10px",
  },
  actionButton: {
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  importLabel: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    width: "100%",
    display: "flex",
    gap: "10px",
  },
  componentsChipsWeaponsContainer: {
    width: "100%",
    display: "flex",
    gap: "20px",
    flexDirection: "column",
  },
  rightSideItemContainer: {},
  selectedCastablesContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: "10px",
  },
};
