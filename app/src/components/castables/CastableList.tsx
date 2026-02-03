import { EntityStats } from "@/types/EntityStats";
import CastableCard from "./castable-card/CastableCard";
import { castableListStyles } from "./CastableList.styles";
import { Castable } from "@/types/Castable";
import StatFilter from "../stat-filter/StatFilter";
import {
  CHIPS_STAT_FILTERS,
  WEAPONS_STAT_FILTERS,
} from "@/constants/StatFilters.constants";
import { IFilterStat } from "@/types/FilterStat";
import React from "react";
import { EffectIdToStatMap } from "@/constants/Effects.constants";

export default function CastableList({
  totalStats,
  castables,
  selectedCastables,
  onSelectCastable,
  onDeselectCastable,
  castablesType,
}: {
  totalStats: EntityStats;
  castables: Castable[];
  selectedCastables: Castable[];
  onSelectCastable: (castable: Castable) => void;
  onDeselectCastable: (castableName: string) => void;
  castablesType: "weapons" | "chips";
}) {
  const [filterStats, setFilterStats] = React.useState<IFilterStat[]>([]);

  const onFilterStatSelect = (stat: IFilterStat) => {
    let updatedFilterStats: IFilterStat[];
    if (filterStats.includes(stat)) {
      updatedFilterStats = filterStats.filter(
        (key: IFilterStat) => key !== stat
      ) as unknown as IFilterStat[];
    } else {
      updatedFilterStats = [
        ...(filterStats as unknown as IFilterStat[]),
        stat,
      ] as unknown as IFilterStat[];
    }
    setFilterStats(updatedFilterStats);
  };

    // sort castables to show equipped ones first
  const allCastablesSorted = [...castables].sort(
    (a: Castable, b: Castable) =>
      (selectedCastables.includes(b) ? 1 : 0) -
      (selectedCastables.includes(a) ? 1 : 0)
  );

  // filter castables based on selected stats
  const filteredCastables = allCastablesSorted.filter((castable) => {
    if (filterStats.length === 0) {
      return true;
    }

    for (const castableEffect of castable.effects) {
      for (const filterStat of filterStats) {
        if (EffectIdToStatMap[castableEffect.id] === filterStat.key) {
          return true;
        }
      }
    }
    return false;
  });

  return (
    <div
      style={castableListStyles.container}
      className="components-grid-scrollable"
    >
      <h2>{castablesType === "weapons" ? "Weapons" : "Chips"}</h2>
      <StatFilter
        onSelectStat={onFilterStatSelect}
        allFilterStats={
          castablesType === "weapons"
            ? WEAPONS_STAT_FILTERS
            : CHIPS_STAT_FILTERS
        }
      />
      <div style={castableListStyles.gridContainer}>
        {filteredCastables.map((castable: Castable) => (
          <CastableCard
            key={castable.id}
            castable={castable}
            totalStats={totalStats}
            onDeselectCastable={onDeselectCastable}
            onSelectCastable={onSelectCastable}
            equipped={selectedCastables.some((s) => s.name === castable.name)}
            inSelectedContainer={false}
          />
        ))}
      </div>
    </div>
  );
}
