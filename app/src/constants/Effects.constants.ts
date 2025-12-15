// EFFECT IDS

import { EntityStats } from "@/types/EntityStats";

export const TYPE_DAMAGE = 1;
export const TYPE_HEAL = 2;
export const TYPE_BUFF_STRENGTH = 3;
export const TYPE_BUFF_AGILITY = 4;
export const TYPE_RELATIVE_SHIELD = 5;
export const TYPE_ABSOLUTE_SHIELD = 6;
export const TYPE_BUFF_MP = 7;
export const TYPE_BUFF_TP = 8;
export const TYPE_DEBUFF = 9;
export const TYPE_TELEPORT = 10;
export const TYPE_PERMUTATION = 11;
export const TYPE_VITALITY = 12;
export const TYPE_POISON = 13;
export const TYPE_SUMMON = 14;
export const TYPE_RESURRECT = 15;
export const TYPE_KILL = 16;
export const TYPE_SHACKLE_MP = 17;
export const TYPE_SHACKLE_TP = 18;
export const TYPE_SHACKLE_STRENGTH = 19;
export const TYPE_DAMAGE_RETURN = 20;
export const TYPE_BUFF_RESISTANCE = 21;
export const TYPE_BUFF_WISDOM = 22;
export const TYPE_ANTIDOTE = 23;
export const TYPE_SHACKLE_MAGIC = 24;
export const TYPE_AFTEREFFECT = 25;
export const TYPE_VULNERABILITY = 26;
export const TYPE_ABSOLUTE_VULNERABILITY = 27;
export const TYPE_LIFE_DAMAGE = 28;
export const TYPE_STEAL_ABSOLUTE_SHIELD = 29;
export const TYPE_NOVA_DAMAGE = 30;
export const TYPE_RAW_BUFF_MP = 31;
export const TYPE_RAW_BUFF_TP = 32;
export const TYPE_POISON_TO_SCIENCE = 33;
export const TYPE_DAMAGE_TO_ABSOLUTE_SHIELD = 34;
export const TYPE_DAMAGE_TO_STRENGTH = 35;
export const TYPE_NOVA_DAMAGE_TO_MAGIC = 36;
export const TYPE_RAW_ABSOLUTE_SHIELD = 37;
export const TYPE_RAW_BUFF_STRENGTH = 38;
export const TYPE_RAW_BUFF_MAGIC = 39;
export const TYPE_RAW_BUFF_SCIENCE = 40;
export const TYPE_RAW_BUFF_AGILITY = 41;
export const TYPE_RAW_BUFF_RESISTANCE = 42;
export const TYPE_PROPAGATION = 43;
export const TYPE_RAW_BUFF_WISDOM = 44;
export const TYPE_NOVA_VITALITY = 45;
export const TYPE_ATTRACT = 46;
export const TYPE_SHACKLE_AGILITY = 47;
export const TYPE_SHACKLE_WISDOM = 48;
export const TYPE_REMOVE_SHACKLES = 49;
export const TYPE_MOVED_TO_MP = 50;
export const TYPE_PUSH = 51;
export const TYPE_RAW_BUFF_POWER = 52;
export const TYPE_REPEL = 53;
export const TYPE_RAW_RELATIVE_SHIELD = 54;
export const TYPE_ALLY_KILLED_TO_AGILITY = 55;
export const TYPE_KILL_TO_TP = 56;
export const TYPE_RAW_HEAL = 57;
export const TYPE_CRITICAL_TO_HEAL = 58;
export const TYPE_ADD_STATE = 59;
export const TYPE_TOTAL_DEBUFF = 60;

// EFFECT IDS TO STATS
export const EffectIdToStatMap: { [key: number]: keyof EntityStats } = {
  [TYPE_DAMAGE]: "strength",
  [TYPE_HEAL]: "wisdom",
  [TYPE_POISON]: "magic",
  [TYPE_NOVA_DAMAGE]: "science",
  [TYPE_ABSOLUTE_SHIELD]: "resistance",
  [TYPE_RELATIVE_SHIELD]: "resistance",
};

// EFFECT BOOST TO STATS
export const EffectNovaBoostClassicToStatMap: {
  [key: number]: keyof EntityStats;
} = {
  [TYPE_BUFF_STRENGTH]: "strength",
  [TYPE_BUFF_AGILITY]: "agility",
  [TYPE_BUFF_WISDOM]: "wisdom",
  [TYPE_BUFF_RESISTANCE]: "resistance",
  [TYPE_BUFF_MP]: "mp",
  [TYPE_BUFF_TP]: "tp",
};

export const EffectClassicBoostToStatMap: {
  [key: number]: keyof EntityStats;
} = {
  [TYPE_RAW_BUFF_STRENGTH]: "strength",
  [TYPE_RAW_BUFF_AGILITY]: "agility",
  [TYPE_RAW_BUFF_WISDOM]: "wisdom",
  [TYPE_RAW_BUFF_RESISTANCE]: "resistance",
  [TYPE_RAW_BUFF_MP]: "mp",
  [TYPE_RAW_BUFF_TP]: "tp",
  [TYPE_RAW_BUFF_MAGIC]: "magic",
  [TYPE_RAW_BUFF_SCIENCE]: "science",
  [TYPE_DAMAGE_RETURN]: "agility",
};

export const EffectShackleTypes: number[] = [
  TYPE_SHACKLE_AGILITY,
  TYPE_SHACKLE_WISDOM,
  TYPE_SHACKLE_MAGIC,
  TYPE_SHACKLE_STRENGTH,
  TYPE_SHACKLE_MP,
  TYPE_SHACKLE_TP,
];
