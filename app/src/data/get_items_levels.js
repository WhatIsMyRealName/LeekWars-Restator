// chrome source tab
/*
Source > leek-wars-client > src > model > items.ts
You can find an example of items.ts in the current directory.
*/

// in console, set items variable to the obj from items.ts
// items = {...};

// 8 (COMPONENT)
// 2 (CHIP)
// 1 (WEAPON)
itemTypes = [2, 8, 1];

allItemsKeys = Object.keys(items).filter((key) =>
  itemTypes.includes(items[key].type)
);

itemNamesToLevels = {};

for (const key of allItemsKeys) {
  const item = items[key];
  itemNamesToLevels[item.name] = item.level;
}

console.log(itemNamesToLevels);

// for (const key of allItemsKeys) {
//   const item = items[key];
//   console.log(item);
// }
