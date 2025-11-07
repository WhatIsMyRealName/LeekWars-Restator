import itemsNamesToLevel from "@/data/items_names_to_level.json";

export const getItemLevels = (): Record<string, number> => {
  return itemsNamesToLevel as Record<string, number>;
};
