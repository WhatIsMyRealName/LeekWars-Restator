import { EntityStats } from "@/types/EntityStats";
import { EquipableComponent } from "@/types/EquipableComponent";

const thresholdStats: Array<keyof EntityStats> = [
  "strength",
  "wisdom",
  "resistance",
  "agility",
  "science",
  "magic",
];

export const getBonusStatsFromComponents = (
  equippedComponents: EquipableComponent[]
): EntityStats => {
  const bonusStats: EntityStats = {
    life: 0,
    strength: 0,
    wisdom: 0,
    agility: 0,
    resistance: 0,
    science: 0,
    magic: 0,
    frequency: 0,
    cores: 0,
    ram: 0,
    tp: 0,
    mp: 0,
  };

  equippedComponents.forEach((component) => {
    component.stats.forEach(([statName, statValue]) => {
      if (statName in bonusStats) {
        bonusStats[statName as keyof EntityStats] += statValue;
      }
    });
  });

  return bonusStats;
};

export const calculateCapitalCostAndStatsIncrease = (
  statKey: keyof EntityStats,
  currentStatValue: number,
  targetStatValue: number
): { totalCost: number; totalIncrease: number } => {
  let totalCost = 0;
  let totalIncrease = 0;
  let tempStatValue = currentStatValue;

  while (tempStatValue < targetStatValue) {
    // strength, wisdom, resistance, agility, science, magic
    if (thresholdStats.includes(statKey)) {
      if (tempStatValue < 200) {
        tempStatValue += 2;
        totalCost += 1;
        totalIncrease += 2;
      } else if (tempStatValue < 400) {
        tempStatValue += 1;
        totalCost += 1;
        totalIncrease += 1;
      } else if (tempStatValue < 600) {
        tempStatValue += 1;
        totalCost += 2;
        totalIncrease += 1;
      } else {
        tempStatValue += 1;
        totalCost += 3;
        totalIncrease += 1;
      }
    }
    // life
    else if (statKey == "life") {
      if (tempStatValue < 1000) {
        tempStatValue += 4;
        totalCost += 1;
        totalIncrease += 4;
      } else if (tempStatValue < 2000) {
        tempStatValue += 3;
        totalCost += 1;
        totalIncrease += 3;
      } else {
        tempStatValue += 2;
        totalCost += 1;
        totalIncrease += 2;
      }
    }
    // frequency
    else if (statKey == "frequency") {
      tempStatValue += 1;
      totalCost += 1;
      totalIncrease += 1;
    } else if (statKey == "cores" || statKey == "ram") {
      tempStatValue += 1;
      if (tempStatValue == 1) {
        totalCost += 20;
      } else {
        let cost = (tempStatValue + 1) * 10;

        if (cost > 100) {
          cost = 100;
        }
        totalCost += cost;
      }
      totalIncrease += 1;
    } else if (statKey == "tp") {
      tempStatValue += 1;
      if (tempStatValue == 1) {
        totalCost += 30;
      } else {
        let cost = 30 + (tempStatValue - 1) * 5;

        if (cost > 100) {
          cost = 100;
        }
        totalCost += cost;
      }
      totalIncrease += 1;
    } else if (statKey == "mp") {
      tempStatValue += 1;
      if (tempStatValue == 1) {
        totalCost += 20;
      } else {
        let cost = 20 + (tempStatValue - 1) * 20;

        if (cost > 180) {
          cost = 180;
        }
        totalCost += cost;
      }
      totalIncrease += 1;
    }
  }

  return {
    totalCost,
    totalIncrease,
  };
};

export const updateStatsOnAddCapital = (
  statKey: keyof EntityStats,
  amount: number,
  investedStats: EntityStats,
  investedCapital: number
) => {
  const newInvestedStats = { ...investedStats };
  let usedCapital = 0;
  let addedStats = 0;

  for (let i = 0; i < amount; i++) {
    const { totalCost, totalIncrease } = calculateCapitalCostAndStatsIncrease(
      statKey,
      newInvestedStats[statKey],
      newInvestedStats[statKey] + 1
    );

    newInvestedStats[statKey] += totalIncrease;
    usedCapital += totalCost;
    addedStats += totalIncrease;

    if (addedStats >= amount) {
      break;
    }
  }

  return {
    newInvestedStats: newInvestedStats,
    newInvestedCapital: investedCapital + usedCapital,
  };
};

export const updateStatsOnRemoveCapital = (
  statKey: keyof EntityStats,
  amount: number,
  investedStats: EntityStats,
  investedCapital: number
) => {
  const newInvestedStats = { ...investedStats };

  let restoredCapital = 0;

  for (let i = 0; i < amount; i++) {
    // strength, wisdom, resistance, agility, science, magic
    if (thresholdStats.includes(statKey)) {
      if (newInvestedStats[statKey] > 600) {
        newInvestedStats[statKey] -= 1;
        restoredCapital += 3;
      } else if (newInvestedStats[statKey] > 400) {
        newInvestedStats[statKey] -= 1;
        restoredCapital += 2;
      } else if (newInvestedStats[statKey] > 200) {
        newInvestedStats[statKey] -= 1;
        restoredCapital++;
      } else if (newInvestedStats[statKey] > 0) {
        newInvestedStats[statKey] -= 2;
        restoredCapital++;
      }
    }
    // life
    if (statKey == "life") {
      if (newInvestedStats.life > 2002) {
        newInvestedStats.life -= 2;
        restoredCapital++;
      } else if (newInvestedStats.life > 1000) {
        newInvestedStats.life -= 3;
        restoredCapital++;
      } else if (newInvestedStats.life > 0) {
        newInvestedStats.life -= 4;
        restoredCapital++;
      }
    }
    // frequency
    if (statKey == "frequency" && newInvestedStats.frequency > 0) {
      newInvestedStats.frequency -= 1;
      restoredCapital++;
    }
    // cores & ram
    if (statKey == "cores" || statKey == "ram") {
      if (newInvestedStats[statKey] > 0) {
        newInvestedStats[statKey] -= 1;
        if (newInvestedStats[statKey] == 0) {
          restoredCapital += 20;
        } else {
          let cost = (newInvestedStats[statKey] + 2) * 10;

          if (cost > 100) {
            cost = 100;
          }
          restoredCapital += cost;
        }
      }
    }
    // tp
    if (statKey == "tp") {
      if (newInvestedStats.tp > 0) {
        newInvestedStats.tp -= 1;
        if (newInvestedStats.tp == 0) {
          restoredCapital += 30;
        } else {
          let cost = 30 + newInvestedStats.tp * 5;

          if (cost > 100) {
            cost = 100;
          }
          restoredCapital += cost;
        }
      }
    }
    // mp
    if (statKey == "mp") {
      if (newInvestedStats.mp > 0) {
        newInvestedStats.mp -= 1;
        if (newInvestedStats.mp == 0) {
          restoredCapital += 20;
        } else {
          let cost = 20 + newInvestedStats.mp * 20;

          if (cost > 180) {
            cost = 180;
          }
          restoredCapital += cost;
        }
      }
    }
  }

  return {
    newInvestedStats: newInvestedStats,
    newInvestedCapital: investedCapital - restoredCapital,
  };
};
