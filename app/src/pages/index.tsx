import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import { EntityStats } from "@/types/EntityStats";
import Stats from "@/components/stats/Stats";
import { useMemo, useState } from "react";
import { EMPTY_STATS } from "@/constants/Stats.constants";
import CastableList from "@/components/castables/CastableList";
import { EquipableComponent } from "@/types/EquipableComponent";
import { getBonusStatsFromComponents } from "@/lib/stats/StatsHelper";
import EquipableComponents from "@/components/equipable-components/EquipableComponents";
import weaponsData from "@/data/weapons.json";
import chipsData from "@/data/chips.json";
import { Weapon } from "@/types/Weapon";
import { Chip } from "@/types/Chip";
import { Castable } from "@/types/Castable";
import CastableCard from "@/components/castables/castable-card/CastableCard";
import { exportBuild, importBuild } from "@/lib/export/ExportHelpers";
import { indexStyles } from "../styles/home.styles";
import RestatorContext from "@/contexts/RestatorContext";
import { getItemLevels } from "@/lib/items/ItemLevelsHelpers";
import { Analytics } from "@vercel/analytics/next";
import componentsData from "@/data/components.json";

const itemLevels = getItemLevels();

const weapons = Object.values(weaponsData as Record<string, Weapon>)
  .map((w) => ({
    ...w,
    type: "weapon" as const,
  }))
  .sort((a, b) => {
    const levelA = itemLevels[a.name] || 1;
    const levelB = itemLevels[b.name] || 1;
    return levelA - levelB;
  });

const chips = Object.values(chipsData as Record<string, Chip>)
  .map((c) => ({
    ...c,
    type: "chip" as const,
  }))
  .sort((a, b) => {
    const levelA = itemLevels[a.name] || 1;
    const levelB = itemLevels[b.name] || 1;
    return levelA - levelB;
  });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [level, setLevel] = useState<number>(301);
  const [investedStats, setInvestedStats] = useState<EntityStats>(EMPTY_STATS);
  const [investedCapital, setInvestedCapital] = useState<number>(0);

  const [bonusStats, setBonusStats] = useState<EntityStats>(EMPTY_STATS);

  const [equippedComponents, setEquippedComponents] = useState<
    EquipableComponent[]
  >([]);

  const [selectedWeapons, setSelectedWeapons] = useState<Castable[]>([]);
  const [selectedChips, setSelectedChips] = useState<Castable[]>([]);

  const totalCapital = useMemo(() => {
    return (
      50 +
      5 * (level - 1) +
      Math.floor(level / 100) * 45 +
      Math.floor((level - 1) / 300) * 95
    );
  }, [level]);

  const baseStats: EntityStats = useMemo(() => {
    return {
      ...EMPTY_STATS,
      life: 100 + (level - 1) * 3,
      frequency: 100,
      cores: 1,
      ram: 6,
      tp: 10,
      mp: 3,
    };
  }, [level]);

  const totalStats: EntityStats = useMemo(() => {
    return {
      life: baseStats.life + investedStats.life + bonusStats.life,
      strength:
        baseStats.strength + investedStats.strength + bonusStats.strength,
      wisdom: baseStats.wisdom + investedStats.wisdom + bonusStats.wisdom,
      agility: baseStats.agility + investedStats.agility + bonusStats.agility,
      resistance:
        baseStats.resistance + investedStats.resistance + bonusStats.resistance,
      science: baseStats.science + investedStats.science + bonusStats.science,
      magic: baseStats.magic + investedStats.magic + bonusStats.magic,
      frequency:
        baseStats.frequency + investedStats.frequency + bonusStats.frequency,
      cores: baseStats.cores + investedStats.cores + bonusStats.cores,
      ram: baseStats.ram + investedStats.ram + bonusStats.ram,
      tp: baseStats.tp + investedStats.tp + bonusStats.tp,
      mp: baseStats.mp + investedStats.mp + bonusStats.mp,
    };
  }, [baseStats, investedStats, bonusStats]);

  const onInvestedCapitalChange = (
    newInvested: EntityStats,
    investedCapital: number
  ) => {
    setInvestedCapital(investedCapital);
    setInvestedStats(newInvested);
  };

  const onEquipComponent = (component: EquipableComponent) => {
    const newEquippedComponents = [...equippedComponents, component];
    const newBonusStats = getBonusStatsFromComponents(newEquippedComponents);

    setBonusStats(newBonusStats);
    setEquippedComponents(newEquippedComponents);
  };

  const onUnequipComponent = (componentId: number) => {
    const newEquippedComponents = equippedComponents.filter(
      (component) => component.id !== componentId
    );
    const newBonusStats = getBonusStatsFromComponents(newEquippedComponents);

    setBonusStats(newBonusStats);
    setEquippedComponents(newEquippedComponents);
  };

  const onSelectCastable = (castable: Castable) => {
    if (castable.type === "weapon") {
      setSelectedWeapons((prevSelected) => [...prevSelected, castable]);
      return;
    }
    if (castable.type === "chip") {
      setSelectedChips((prevSelected) => [...prevSelected, castable]);
      return;
    }
  };

  const onDeselectCastable = (castableName: string) => {
    if (selectedWeapons.find((c) => c.name === castableName)) {
      setSelectedWeapons((prevSelected) =>
        prevSelected.filter((s) => s.name !== castableName)
      );
      return;
    }
    if (selectedChips.find((c) => c.name === castableName)) {
      setSelectedChips((prevSelected) =>
        prevSelected.filter((s) => s.name !== castableName)
      );
      return;
    }
  };

  const maxWeapons = useMemo(() => {
    if (level < 100) {
      return 2;
    }
    if (level < 200) {
      return 3;
    }
    return 4;
  }, [level]);

  const weaponOverflow = useMemo(() => {
    return selectedWeapons.length > maxWeapons;
  }, [selectedWeapons, maxWeapons]);

  const maxChips = useMemo(() => {
    return totalStats.ram;
  }, [totalStats.ram]);

  const chipOverflow = useMemo(() => {
    return selectedChips.length > maxChips;
  }, [selectedChips, maxChips]);

  const handleImportBuild = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const buildData = importBuild(content);

      if (!buildData) {
        alert("Failed to import build. Please check the file format.");
        return;
      }

      // Set level
      setLevel(buildData.level);

      // Set invested stats and capital
      setInvestedStats(buildData.investedStats);
      setInvestedCapital(buildData.investedCapital);

      // Set bonus stats
      setBonusStats(buildData.bonusStats);

      // Load equipped components
      const componentsDataTyped = componentsData as unknown as Record<
        string,
        Omit<EquipableComponent, "level">
      >;
      const components = Object.values(componentsDataTyped).map((c) => ({
        ...c,
        level: itemLevels[c.name] || 1,
      }));
      const loadedComponents = buildData.equippedComponentIds
        .map((id) => components.find((c) => c.id === id))
        .filter((c): c is EquipableComponent => c !== undefined);
      setEquippedComponents(loadedComponents);

      // Load selected weapons
      const loadedWeapons = buildData.selectedWeaponIds
        .map((id) => weapons.find((w) => w.item === id))
        .filter((w) => w !== undefined);
      setSelectedWeapons(loadedWeapons as Castable[]);

      // Load selected chips
      const loadedChips = buildData.selectedChipIds
        .map((id) => chips.find((c) => c.id === id))
        .filter((c) => c !== undefined);
      setSelectedChips(loadedChips as Castable[]);

      alert("Build imported successfully!");
    };
    reader.readAsText(file);

    // Reset the input so the same file can be imported again
    event.target.value = "";
  };

  return (
    <RestatorContext.Provider value={{ level }}>
      <Head>
        <title>Restator Remastered</title>
        <meta
          property="og:image"
          content="https://leek-wars-restator.vercel.app/assets/images/restator.png"
        ></meta>
        <meta
          name="description"
          content="A tool for theory crafting Leek Wars builds"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <meta
          property="og:url"
          content="https://leek-wars-restator.vercel.app/"
        ></meta>
      </Head>
      <div
        style={indexStyles.pageContainer}
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <Analytics />
        <input
          id="import-build"
          type="file"
          accept=".json"
          onChange={handleImportBuild}
          style={{ display: "none" }}
        />
        <div style={indexStyles.container} className="container">
          <div style={indexStyles.topContainer} className="topContainer">
            <div
              style={indexStyles.leftSideContainer}
              className="statsContainer"
            >
              <div style={indexStyles.actionButtonsContainer}>
                <a
                  target="_blank"
                  href="https://github.com/Bux42/LeekWars-Restator"
                  title="GitHub Repository"
                  style={indexStyles.actionButton}
                >
                  <img
                    alt="github"
                    height={32}
                    width={32}
                    src="https://cdn3.iconfinder.com/data/icons/social-media-2169/24/social_media_social_media_logo_github-512.png"
                  />
                </a>
                <img
                  src="/assets/images/icons/export.png"
                  alt="export"
                  title="Export Build"
                  height={32}
                  width={32}
                  style={indexStyles.actionButton}
                  onClick={() =>
                    exportBuild(
                      level,
                      investedStats,
                      investedCapital,
                      bonusStats,
                      equippedComponents,
                      selectedChips,
                      selectedWeapons
                    )
                  }
                />
                <label
                  htmlFor="import-build"
                  title="Import Build"
                  style={indexStyles.importLabel}
                >
                  <img
                    src="/assets/images/icons/import.png"
                    alt="import"
                    height={32}
                    width={32}
                    style={indexStyles.actionButton}
                  />
                </label>
              </div>
              <Stats
                baseStats={baseStats}
                investedStats={investedStats}
                bonusStats={bonusStats}
                totalStats={totalStats}
                totalCapital={totalCapital}
                investedCapital={investedCapital}
                level={level}
                setLevel={setLevel}
                onInvestedCapitalChange={onInvestedCapitalChange}
              />
            </div>
            <div
              style={indexStyles.rightSideItemContainer}
              className="selectedCastables"
            >
              <h2 style={{ color: weaponOverflow ? "red" : undefined }}>
                Equipped Weapons ({selectedWeapons.length}/{maxWeapons})
              </h2>
              <div
                style={indexStyles.selectedCastablesContainer}
                className="selectedCastablesContainer"
              >
                {selectedWeapons.map((castable) => (
                  <CastableCard
                    key={castable.id}
                    castable={castable}
                    onDeselectCastable={onDeselectCastable}
                    onSelectCastable={onSelectCastable}
                    totalStats={totalStats}
                    selected
                  />
                ))}
              </div>
            </div>
            <div
              style={indexStyles.rightSideItemContainer}
              className="selectedCastables"
            >
              <h2 style={{ color: chipOverflow ? "red" : undefined }}>
                Equipped Chips ({selectedChips.length}/{maxChips})
              </h2>
              <div
                style={indexStyles.selectedCastablesContainer}
                className="selectedCastablesContainer"
              >
                {selectedChips.map((castable) => (
                  <CastableCard
                    key={castable.id}
                    castable={castable}
                    onDeselectCastable={onDeselectCastable}
                    onSelectCastable={onSelectCastable}
                    totalStats={totalStats}
                    selected
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bottomContainer" style={indexStyles.bottomContainer}>
            <div
              className="componentsChipsWeaponsContainer"
              style={indexStyles.componentsChipsWeaponsContainer}
            >
              <div
                style={indexStyles.rightSideItemContainer}
                className="componentsContainer"
              >
                <EquipableComponents
                  equippedComponents={equippedComponents}
                  onEquipComponent={onEquipComponent}
                  onUnequipComponent={onUnequipComponent}
                />
              </div>
              <div
                style={indexStyles.rightSideItemContainer}
                className="weaponsContainer"
              >
                <CastableList
                  castablesType="weapons"
                  totalStats={totalStats}
                  castables={weapons}
                  onDeselectCastable={onDeselectCastable}
                  onSelectCastable={onSelectCastable}
                  selectedCastables={selectedWeapons}
                />
              </div>
              <div
                style={indexStyles.rightSideItemContainer}
                className="chipsContainer"
              >
                <CastableList
                  castablesType="chips"
                  totalStats={totalStats}
                  castables={chips}
                  onDeselectCastable={onDeselectCastable}
                  onSelectCastable={onSelectCastable}
                  selectedCastables={selectedChips}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </RestatorContext.Provider>
  );
}
