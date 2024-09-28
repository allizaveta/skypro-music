"use client";

import styles from "./Sidebar.module.css";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAppSelector } from "@/store/store";
import { useInitCatalogs } from "@/hooks/useInitCatalogs";
import {
  catalogsImages,
  CatalogImageDetails,
  CatalogsOptions,
} from "@/types/tracksTypes";
import SidebarPersonal from "./SidebarPersonal/SidebarPersonal";

function Sidebar() {
  useInitCatalogs();

  const { catalogName, catalogs } = useAppSelector((state) => state.playlist);

  return (
    <div className={styles.sidebar}>
      <SidebarPersonal />

      <div className={styles.sidebarList}>
        {catalogs.map((catalog) => {
          const details: CatalogImageDetails =
            catalogsImages[catalog.name as CatalogsOptions];

          if (catalog.name === catalogName)
            return (
              <div key={catalog._id}>
                <Image
                  src={details.path}
                  alt={details.alt}
                  width={250}
                  height={150}
                />
              </div>
            );
          else
            return (
              <Link key={catalog._id} href={`/tracks/catalogs/${catalog._id}`}>
                <Image
                  src={details.path}
                  alt={details.alt}
                  width={250}
                  height={150}
                />
              </Link>
            );
        })}
      </div>
    </div>
  );
}

export default React.memo(Sidebar);
