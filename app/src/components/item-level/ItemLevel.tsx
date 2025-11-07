import { itemLevelBadgeStyles } from "./ItemLevel.styles";

export default function ItemLevelBadge({
  level,
  insufficientLevel,
}: {
  level: number;
  insufficientLevel: boolean;
}) {
  return (
    <div>
      <p style={itemLevelBadgeStyles.levelContainer}>
        lvl {level} {insufficientLevel && "⚠️"}
      </p>
    </div>
  );
}
