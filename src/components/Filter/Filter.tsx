"use client";

import styles from "./Filter.module.css";
import cn from "classnames";

import FilterButton from "./FilterButton/FilterButton";

import { useState, useMemo } from "react";
import { FilterKinds, PlaylistType, SortOptions } from "@/types/tracksTypes";
import { FiltersType } from "@/store/features/playlistSlice";

const filterKinds: string[] = [
  "1", // "Искать по:"
  FilterKinds.authors,
  FilterKinds.genres,
  "2", // "Упорядочить по:"
  FilterKinds.year,
];

interface Props {
  visiblePlaylist: PlaylistType;
  filteredPlaylist: PlaylistType;
  filters: FiltersType;
}

export default function Filter({
  visiblePlaylist,
  filteredPlaylist,
  filters,
}: Props) {
  const [openedFilter, setOpenedFilter] = useState<string | null>(null);

  const getUniqueLists = useMemo(() => {
    return (filter: string): string[] => {
      switch (filter) {
        case FilterKinds.authors:
          return Array.from(
            new Set<string>(visiblePlaylist.map((track) => track.author))
          )
            .filter((line) => line !== "-")
            .sort();
        case FilterKinds.genres:
          return Array.from(
            new Set<string>(visiblePlaylist.map((track) => track.genre).flat())
          ).sort();
        case FilterKinds.year:
          return ["По умолчанию", "Сначала новые", "Сначала старые"];
        default:
          return [];
      }
    };
  }, [visiblePlaylist]);

  const getListCounters = useMemo(() => {
    return (filter: string, list: string[]): Record<string, number> => {
      const counters: Record<string, number> = { "": 0 };

      if (filter === FilterKinds.authors)
        for (const item of list) {
          const value = filteredPlaylist.reduce(
            (acc, track) => (track.author === item ? ++acc : acc),
            0
          );

          if (value) counters[item] = value;
        }
      else if (filter === FilterKinds.genres)
        for (const item of list) {
          const value = filteredPlaylist.reduce(
            (acc, track) => (track.genre.includes(item) ? ++acc : acc),
            0
          );

          if (value) counters[item] = value;
        }

      return counters;
    };
  }, [filteredPlaylist]);

  const getCounter = useMemo(() => {
    return (filter: string): number => {
      switch (filter) {
        case FilterKinds.authors:
          return filters.authors.length;
        case FilterKinds.genres:
          return filters.genres.length;
        case FilterKinds.year:
          return filters.sort !== SortOptions.disabled ? -1 : 0;
        default:
          return 0;
      }
    };
  }, [filters]);

  function handleOpenedFilter(filter: string): void {
    if (openedFilter === filter) setOpenedFilter(null);
    else setOpenedFilter(filter);
  }

  return (
    <div className={styles.filter}>
      {filterKinds.map((filter, index) => {
        if (filter === "1")
          return (
            <div key={index} className={styles.filterTitle}>
              Искать по:
            </div>
          );
        else if (filter === "2")
          return (
            <div key={index} className={cn(styles.filterTitle, styles.second)}>
              Упорядочить по:
            </div>
          );

        const list = getUniqueLists(filter);
        const counters = getListCounters(filter, list);
        const counter = getCounter(filter);

        list.sort(
          (lhs, rhs) =>
            ((counters[rhs] ? 1 : 0) - (counters[lhs] ? 1 : 0)) * 1000 +
            lhs.localeCompare(rhs)
        );

        if (openedFilter && !list.length) setOpenedFilter(null);

        return (
          <FilterButton
            key={index}
            title={filter}
            filterList={list}
            filterCounters={counters}
            activeCounter={counter}
            opened={openedFilter === filter}
            openFilter={handleOpenedFilter}
          />
        );
      })}
    </div>
  );
}
