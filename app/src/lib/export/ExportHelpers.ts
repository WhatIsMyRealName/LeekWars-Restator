import { Castable } from "@/types/Castable";
import { EntityStats } from "@/types/EntityStats";
import { EquipableComponent } from "@/types/EquipableComponent";

export interface BuildExport {
  level: number;
  investedStats: EntityStats;
  investedCapital: number;
  bonusStats: EntityStats;
  equippedComponentIds: number[];
  selectedWeaponIds: number[];
  selectedChipIds: number[];
  totalCapital: number;
}

const buildToJson = (
  level: number,
  investedStats: EntityStats,
  investedCapital: number,
  bonusStats: EntityStats,
  equippedComponents: EquipableComponent[],
  selectedChips: Castable[],
  selectedWeapons: Castable[]
): string => {
  const weaponIds = selectedWeapons
    .map((w) => w.item)
    .filter((id): id is number => id !== undefined);
  const chipIds = selectedChips.map((c) => c.id);
  const componentIds = equippedComponents.map((c) => c.id);

  const totalCapital =
    50 +
    5 * (level - 1) +
    Math.floor(level / 100) * 45 +
    Math.floor((level - 1) / 300) * 95;

  const obj: BuildExport = {
    level,
    investedStats,
    investedCapital,
    bonusStats,
    equippedComponentIds: componentIds,
    selectedWeaponIds: weaponIds,
    selectedChipIds: chipIds,
    totalCapital,
  };

  return JSON.stringify(obj, null, 2);
};

export const exportBuild = (
  level: number,
  investedStats: EntityStats,
  investedCapital: number,
  bonusStats: EntityStats,
  equippedComponents: EquipableComponent[],
  selectedChips: Castable[],
  selectedWeapons: Castable[]
) => {
  const buildJson = buildToJson(
    level,
    investedStats,
    investedCapital,
    bonusStats,
    equippedComponents,
    selectedChips,
    selectedWeapons
  );

  const blob = new Blob([buildJson], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `restator_build_level_${level}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importBuild = (jsonString: string): BuildExport | null => {
  try {
    const parsed = JSON.parse(jsonString);

    // Validate the structure
    if (
      typeof parsed.level !== "number" ||
      typeof parsed.investedCapital !== "number" ||
      typeof parsed.totalCapital !== "number" ||
      !parsed.investedStats ||
      !parsed.bonusStats ||
      !Array.isArray(parsed.equippedComponentIds) ||
      !Array.isArray(parsed.selectedWeaponIds) ||
      !Array.isArray(parsed.selectedChipIds)
    ) {
      console.error("Invalid build file structure");
      return null;
    }

    return parsed as BuildExport;
  } catch (error) {
    console.error("Failed to parse build file:", error);
    return null;
  }
};
