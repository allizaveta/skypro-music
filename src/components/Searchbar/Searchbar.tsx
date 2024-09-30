"use client";

import styles from "./Searchbar.module.css";

import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { setFilter } from "@/store/features/playlistSlice";

export default function Searchbar() {
  const dispatch = useDispatch();
  const [queryText, setQueryText] = useState<string>("");

  function handleChangeQueryText(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setQueryText(value);
    dispatch(setFilter({ kind: "queryText", value }));
  }

  return (
    <div className={styles.search}>
      <svg>
        <use xlinkHref="/img/icon/sprite.svg#icon-search" />
      </svg>
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="queryText"
        value={queryText}
        onChange={handleChangeQueryText}
      />
    </div>
  );
}
