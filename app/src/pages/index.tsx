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
import { exportBuild } from "@/lib/export/ExportHelpers";
import { indexStyles } from "../styles/home.styles";
import RestatorContext from "@/contexts/RestatorContext";
import { getItemLevels } from "@/lib/items/ItemLevelsHelpers";

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
  const [level, setLevel] = useState<number>(1);
  const [investedStats, setInvestedStats] = useState<EntityStats>(EMPTY_STATS);
  const [investedCapital, setInvestedCapital] = useState<number>(0);

  const [bonusStats, setBonusStats] = useState<EntityStats>(EMPTY_STATS);

  const [equippedComponents, setEquippedComponents] = useState<
    EquipableComponent[]
  >([]);

  const [selectedCastables, setSelectedCastables] = useState<Castable[]>([]);

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
    setSelectedCastables((prevSelected) => [...prevSelected, castable]);
  };

  const onDeselectCastable = (castableName: string) => {
    setSelectedCastables((prevSelected) =>
      prevSelected.filter((s) => s.name !== castableName)
    );
  };

  return (
    <RestatorContext.Provider value={{ level }}>
      <Head>
        <title>Restator Remastered</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div
        style={indexStyles.container}
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <a
          style={indexStyles.githubLink}
          target="_blank"
          href="https://github.com/Bux42/LeekWars-Restator"
        >
          <img
            alt="github"
            height={32}
            width={32}
            src="https://cdn3.iconfinder.com/data/icons/social-media-2169/24/social_media_social_media_logo_github-512.png"
          />
        </a>
        <img
          src="/assets/images/icons/save.png"
          alt="export"
          style={indexStyles.exportLink}
          onClick={() => exportBuild(totalStats, selectedCastables, level)}
        />
        <div style={indexStyles.topContainer} className="topContainers">
          <div style={indexStyles.leftSideContainer} className="leftSide">
            <h2>Characteristics</h2>
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
          <div className="rightSide" style={indexStyles.rightSideContainer}>
            <div
              className="componentsChipsWeaponsContainer"
              style={indexStyles.componentsChipsWeaponsContainer}
            >
              <div
                style={indexStyles.rightSideItemContainer}
                className="componentsContainer"
              >
                <h2>Components ({equippedComponents.length} equipped) </h2>
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
                <h2>Weapons</h2>
                <CastableList
                  totalStats={totalStats}
                  castables={weapons}
                  onDeselectCastable={onDeselectCastable}
                  onSelectCastable={onSelectCastable}
                  selectedCastables={selectedCastables}
                />
              </div>
              <div
                style={indexStyles.rightSideItemContainer}
                className="chipsContainer"
              >
                <h2>Chips</h2>
                <CastableList
                  totalStats={totalStats}
                  castables={chips}
                  onDeselectCastable={onDeselectCastable}
                  onSelectCastable={onSelectCastable}
                  selectedCastables={selectedCastables}
                />
              </div>
            </div>
            <div
              style={indexStyles.rightSideItemContainer}
              className="selectedCastables"
            >
              <h2>Equipped Weapons / Chips ({selectedCastables.length})</h2>
              <div
                style={indexStyles.selectedCastablesContainer}
                className="selectedCastablesContainer"
              >
                {selectedCastables.map((castable) => (
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
        </div>
      </div>
    </RestatorContext.Provider>
  );
}
