import { EntityStats } from "@/types/EntityStats";
import { statsStyles } from "./Stats.styles";
import Level from "../level/Level";
import {
  updateStatsOnAddCapital,
  updateStatsOnRemoveCapital,
} from "@/lib/stats/StatsHelper";
import StatButton from "./stat-button/StatButton";

export default function Stats({
  baseStats,
  investedStats,
  bonusStats,
  totalStats,
  totalCapital,
  investedCapital,
  level,
  setLevel,
  onInvestedCapitalChange,
}: {
  baseStats: EntityStats;
  investedStats: EntityStats;
  bonusStats: EntityStats;
  totalStats: EntityStats;
  totalCapital: number;
  investedCapital: number;
  level: number;
  setLevel: (level: number) => void;
  onInvestedCapitalChange: (
    newEntityInvestedStats: EntityStats,
    newInvestedCapital: number
  ) => void;
}) {
  const onAddCapital = (statKey: keyof EntityStats, amount: number) => {
    const { newInvestedStats, newInvestedCapital } = updateStatsOnAddCapital(
      statKey,
      amount,
      investedStats,
      investedCapital
    );
    onInvestedCapitalChange(newInvestedStats, newInvestedCapital);
  };

  const onRemoveCapital = (statKey: keyof EntityStats, amount: number) => {
    const { newInvestedStats, newInvestedCapital } = updateStatsOnRemoveCapital(
      statKey,
      amount,
      investedStats,
      investedCapital
    );

    onInvestedCapitalChange(newInvestedStats, newInvestedCapital);
  };

  return (
    <div style={statsStyles.container}>
      <h3 style={statsStyles.title}>
        <Level level={level} setLevel={setLevel} />
        <span style={statsStyles.capitalBadge}>
          {totalCapital - investedCapital} / {totalCapital} capital
        </span>
      </h3>
      <table style={statsStyles.table}>
        <thead style={statsStyles.tableHeader}>
          <tr style={statsStyles.headerRow}>
            <th style={statsStyles.headerCell}>Stat</th>
            <th style={statsStyles.headerCell}>Base</th>
            <th style={statsStyles.headerCell}>Invested</th>
            <th style={statsStyles.headerCell}>Bonus</th>
            <th style={statsStyles.totalHeaderCell}>Total</th>
          </tr>
        </thead>
        <tbody style={statsStyles.tableBody}>
          {Object.keys(baseStats).map((statKey) => {
            const key = statKey as keyof EntityStats;

            return (
              <tr key={statKey} style={statsStyles.bodyRow}>
                <td style={statsStyles.statNameCell}>
                  <img
                    src={`/assets/images/stats/${key}.png`}
                    alt={key}
                    style={statsStyles.statIcon}
                  />
                  {key}
                </td>
                <td style={statsStyles.valueCell}>{baseStats[key]}</td>
                <td style={statsStyles.investedCell}>
                  <StatButton
                    amount={1}
                    name="minus"
                    disabled={false}
                    onClick={() => onRemoveCapital(key, 1)}
                  />
                  <StatButton
                    amount={10}
                    name="minus"
                    disabled={false}
                    onClick={() => onRemoveCapital(key, 10)}
                  />
                  <StatButton
                    amount={100}
                    name="minus"
                    disabled={false}
                    onClick={() => onRemoveCapital(key, 100)}
                  />
                  <div style={statsStyles.investedValue(investedStats[key])}>
                    {investedStats[key]}
                  </div>
                  <StatButton
                    amount={1}
                    name="add"
                    disabled={false}
                    onClick={() => onAddCapital(key, 1)}
                  />
                  <StatButton
                    amount={10}
                    name="add"
                    disabled={false}
                    onClick={() => onAddCapital(key, 10)}
                  />
                  <StatButton
                    amount={100}
                    name="add"
                    disabled={false}
                    onClick={() => onAddCapital(key, 100)}
                  />
                </td>
                <td style={statsStyles.valueCell}>{bonusStats[key]}</td>
                <td style={statsStyles.totalCell}>{totalStats[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
