import { UserType } from "@/types/usersTypes";

/* interfaces */

export interface TrackType {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  release_value: number;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  // logo:                string | null
  logo: {
    type: string;
    data: unknown[];
  };
  track_file: string;
  staredUser: UserType[];
}

export interface TrackIndex {
  _id: number;
  num: number;
}

export interface CatalogType {
  _id: number;
  name: string;
  items: number[];
  owner: number[];
  __v: number;
}

export interface CatalogImageDetails {
  path: string;
  alt: string;
}

export interface CatalogsImagesDetails {
  "Плейлист дня": CatalogImageDetails;
  "Танцевальные хиты": CatalogImageDetails;
  "Инди-заряд": CatalogImageDetails;
}

/* types */

export type PlaylistType = TrackType[];

export type CatalogsCollectionType = CatalogType[];

export type CatalogsOptions = keyof CatalogsImagesDetails;

/* enumerations */

export enum SortOptions {
  disabled = "По умолчанию", // 0,
  newOnTop = "Сначала новые", // 1,
  oldOnTop = "Сначала старые", // 2,
}

export enum FilterKinds {
  authors = "исполнителю",
  genres = "жанру",
  year = "году выпуска",
}

/* constants */

export const catalogsImages: CatalogsImagesDetails = {
  "Плейлист дня": { path: "/img/playlist01.png", alt: "day's playlist" },
  "Танцевальные хиты": {
    path: "/img/playlist02.png",
    alt: "dancing hit's playlist",
  },
  "Инди-заряд": { path: "/img/playlist03.png", alt: "indie's playlist" },
};
