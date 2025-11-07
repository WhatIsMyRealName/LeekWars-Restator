import { EntityStats } from "@/types/EntityStats";
import { useContext, useMemo } from "react";
import { CastableEffect } from "@/types/CastableEffect";
import { calculateCastableEffect } from "@/lib/effects/EffectsHelpers";
import { Castable } from "@/types/Castable";
import { castableCardStyles, hoverEffects } from "./CastableCard.styles";
import CastableEffectCard from "./castable-effect-card/CastableEffectCard";
import { getItemLevels } from "@/lib/items/ItemLevelsHelpers";
import RestatorContext from "@/contexts/RestatorContext";
import ItemLevelBadge from "@/components/item-level/ItemLevel";

const itemLevels = getItemLevels();

export default function CastableCard({
  totalStats,
  castable,
  selected,
  onSelectCastable,
  onDeselectCastable,
}: {
  totalStats: EntityStats;
  castable: Castable;
  selected?: boolean;
  onSelectCastable: (castable: Castable) => void;
  onDeselectCastable: (castableName: string) => void;
}) {
  const restatorContext = useContext(RestatorContext);

  const unsufficientLevel: boolean = useMemo(() => {
    return restatorContext.level < castable.level;
  }, [restatorContext, castable.level]);

  const effects: CastableEffect[] = useMemo(() => {
    const effects = [];

    for (let i = 0; i < castable.effects.length; i++) {
      const effect: CastableEffect | undefined = calculateCastableEffect(
        totalStats,
        castable.effects[i].id,
        castable.effects[i].type,
        castable.effects[i].value1,
        castable.effects[i].value1 + castable.effects[i].value2,
        castable.effects[i].turns
      );
      if (effect) {
        effects.push(effect);
      }
    }
    return effects;
  }, [castable.effects, totalStats]);

  const maxCastWithTP = useMemo(() => {
    let maxCast = 0;
    let originalTp = totalStats.tp || 0;

    for (let i = 0; i < castable.max_uses; i++) {
      if (originalTp >= castable.cost) {
        maxCast++;
        originalTp -= castable.cost;
      } else {
        break;
      }
    }
    return maxCast;
  }, [castable.max_uses, castable.cost, totalStats]);

  const onCardClick = () => {
    if (selected) {
      onDeselectCastable(castable.name);
    } else {
      onSelectCastable(castable);
    }
  };

  return (
    <div
      style={castableCardStyles.gridContainer}
      onClick={onCardClick}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, hoverEffects.cardHover);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, hoverEffects.cardDefault);
      }}
    >
      <ItemLevelBadge
        level={castable.level}
        insufficientLevel={unsufficientLevel}
      />
      <div
        style={castableCardStyles.imageContainer(castable.type, castable.name)}
      ></div>
      <h3 style={castableCardStyles.castableName}>
        {castable.name.replace(/_/g, " ")}
      </h3>
      <div style={castableCardStyles.castableCost}>
        <img
          height={20}
          width={20}
          src={`/assets/images/stats/tp.png`}
          alt={"tpcost"}
        />
        Cost: {castable.cost} TP
      </div>
      {effects.length > 0 && (
        <ul>
          {effects.map((effect, index) => (
            <CastableEffectCard key={index} effect={effect} />
          ))}
        </ul>
      )}
      <div>Max uses: {castable.max_uses}</div>
      <div>
        Max Casts with {totalStats.tp} TP: {maxCastWithTP}
      </div>
      {maxCastWithTP > 1 && effects.length > 0 && (
        <ul>
          {effects.map((effect, index) => (
            <CastableEffectCard
              key={index}
              effect={effect}
              multiplier={maxCastWithTP}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
