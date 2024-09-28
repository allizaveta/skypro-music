"use client";

import { FilterKind, PlaylistType } from "@/types/tracksTypes";
import styles from "./Filter.module.css";
import { useState } from "react";
import FilterButton from "./FilterButton/FilterButton";

const filterKind: string[] = [
  FilterKind.artist,
  FilterKind.genre,
  FilterKind.year,
];

interface Props {
  playlist: PlaylistType;
}

export default function Filter({ playlist }: Props) {
  const [openedFilter, setOpenedFilter] = useState<string | null>(null);

  function getUniqueLists(filter: string): string[] {
    switch (filter) {
      case FilterKind.artist:
        return Array.from(
          new Set<string>(playlist.map((track) => track.author))
        )
          .filter((line) => line !== "-")
          .sort();
      case FilterKind.genre:
        return Array.from(
          new Set<string>(playlist.map((track) => track.genre).flat())
        ).sort();
      case FilterKind.year:
        return ["По умолчанию", "Сначала новые", "Сначала старые"];
      default:
        return [];
    }
  }

  function handleOpenedFilter(filter: string): void {
    if (openedFilter === filter) setOpenedFilter(null);
    else setOpenedFilter(filter);
  }

  return (
    <div className={styles.filter}>
      <div className={styles.filterTitle}>Искать по:</div>
      {filterKind.map((filter, index) => {
        const list = getUniqueLists(filter);

        if (openedFilter && !list.length) setOpenedFilter(null);

        return (
          <FilterButton
            key={index}
            title={filter}
            opened={openedFilter === filter}
            openFilter={handleOpenedFilter}
            filterList={list}
          />
        );
      })}
    </div>
  );
}
