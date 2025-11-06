import { EntityStats } from "@/types/EntityStats";

const thresholdStats: Array<keyof EntityStats> = [
  "strength",
  "wisdom",
  "resistance",
  "agility",
  "science",
  "magic",
];

export const updateStatsOnAddCapital = (
  statKey: keyof EntityStats,
  amount: number,
  investedStats: EntityStats,
  investedCapital: number
) => {
  const newInvestedStats = { ...investedStats };
  let usedCapital = 0;

  for (let i = 0; i < amount; i++) {
    // strength, wisdom, resistance, agility, science, magic
    if (thresholdStats.includes(statKey)) {
      if (newInvestedStats[statKey] < 200) {
        newInvestedStats[statKey] += 2;
        usedCapital++;
      } else if (newInvestedStats[statKey] < 400) {
        newInvestedStats[statKey] += 1;
        usedCapital++;
      } else if (newInvestedStats[statKey] < 600) {
        newInvestedStats[statKey] += 1;
        usedCapital += 2;
      } else {
        newInvestedStats[statKey] += 1;
        usedCapital += 3;
      }
    }
    // life
    if (statKey == "life") {
      if (newInvestedStats.life < 1000) {
        newInvestedStats.life += 4;
        usedCapital++;
      } else if (newInvestedStats.life < 2000) {
        newInvestedStats.life += 3;
        usedCapital++;
      } else {
        newInvestedStats.life += 2;
        usedCapital++;
      }
    }
    // frequency
    if (statKey == "frequency") {
      newInvestedStats.frequency += 1;
      usedCapital++;
    }
    // cores & ram
    if (statKey == "cores" || statKey == "ram") {
      newInvestedStats[statKey] += 1;
      if (newInvestedStats[statKey] == 1) {
        usedCapital += 20;
      } else {
        let cost = (newInvestedStats[statKey] + 1) * 10;

        if (cost > 100) {
          cost = 100;
        }
        usedCapital += cost;
      }
    }
    // tp
    if (statKey == "tp") {
      newInvestedStats.tp += 1;
      if (newInvestedStats.tp == 1) {
        usedCapital += 30;
      } else {
        let cost = 30 + (newInvestedStats.tp - 1) * 5;

        if (cost > 100) {
          cost = 100;
        }
        usedCapital += cost;
      }
    }
    // mp
    if (statKey == "mp") {
      newInvestedStats.mp += 1;
      if (newInvestedStats.mp == 1) {
        usedCapital += 20;
      } else {
        let cost = 20 + (newInvestedStats.mp - 1) * 20;

        if (cost > 180) {
          cost = 180;
        }
        usedCapital += cost;
      }
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
