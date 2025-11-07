// Individual stat entry type - represents a stat name and its value
export type ComponentStat = [string, number];

// Main interface for equipable components
export interface EquipableComponent {
  id: number;
  name: string;
  stats: ComponentStat[];
  template: number;
  level: number;
  equipped?: boolean;
}

// Type for the components data structure (object with string keys and component values)
export type ComponentsData = Record<string, EquipableComponent>;

// Helper type to get all possible stat names from components
export type ComponentStatName =
  | "life"
  | "strength"
  | "wisdom"
  | "agility"
  | "resistance"
  | "science"
  | "magic"
  | "frequency"
  | "cores"
  | "ram"
  | "tp"
  | "mp";

// Optional: Type guard function to check if an object is a valid EquipableComponent
export function isEquipableComponent(obj: unknown): obj is EquipableComponent {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const component = obj as Record<string, unknown>;

  return (
    typeof component.id === "number" &&
    typeof component.name === "string" &&
    Array.isArray(component.stats) &&
    component.stats.every(
      (stat: unknown) =>
        Array.isArray(stat) &&
        stat.length === 2 &&
        typeof stat[0] === "string" &&
        typeof stat[1] === "number"
    ) &&
    typeof component.template === "number"
  );
}
