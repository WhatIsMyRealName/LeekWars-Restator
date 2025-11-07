import componentsData from "@/data/components.json";
import { equipableComponentsStyles } from "./EquipableComponents.styles";
import EquipableComponentCard from "./equipable-component-card/EquipableComponentCard";
import { EquipableComponent } from "@/types/EquipableComponent";
import { getItemLevels } from "@/lib/items/ItemLevelsHelpers";

const itemLevels = getItemLevels();

const getComponents: () => EquipableComponent[] = () => {
  return Object.values(
    componentsData as unknown as Record<string, EquipableComponent>
  ).sort((a, b) => {
    const levelA = itemLevels[a.name] || 1;
    const levelB = itemLevels[b.name] || 1;
    return levelA - levelB;
  });
};

const components = getComponents();
const componentBonuses = [
  "life",
  "strength",
  "wisdom",
  "agility",
  "resistance",
  "science",
  "magic",
  "frequency",
  "cores",
  "ram",
  "tp",
  "mp",
];

export default function EquipableComponents({
  equippedComponents,
  onEquipComponent,
  onUnequipComponent,
}: {
  equippedComponents: EquipableComponent[];
  onEquipComponent: (component: EquipableComponent) => void;
  onUnequipComponent: (componentId: number) => void;
}) {
  const onEquipComponentClicked = (component: EquipableComponent) => {
    onEquipComponent(component);
  };

  const onUnequipComponentClicked = (componentId: number) => {
    onUnequipComponent(componentId);
  };

  // sort components to show equipped ones first
  const allComponentsSorted = [...components].sort(
    (a: EquipableComponent, b: EquipableComponent) =>
      (equippedComponents.includes(b) ? 1 : 0) -
      (equippedComponents.includes(a) ? 1 : 0)
  );
  console.log(components);
  console.log(componentBonuses);

  return (
    <div style={equipableComponentsStyles.container}>
      <div
        style={equipableComponentsStyles.gridContainer}
        className="components-grid-scrollable"
      >
        {allComponentsSorted.map((component) => (
          <EquipableComponentCard
            key={component.id}
            component={component}
            equipped={equippedComponents.some((c) => c.id === component.id)}
            equip={() => onEquipComponentClicked(component)}
            unequip={() => onUnequipComponentClicked(component.id)}
          />
        ))}
      </div>
    </div>
  );
}
