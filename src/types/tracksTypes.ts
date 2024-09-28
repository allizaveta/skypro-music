import { UserType } from "@/types/usersTypes";
export interface TrackType {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  logo: {
    type: string;
    data: unknown[];
  };
  track_file: string;
  staredUser: UserType[];
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

export type PlaylistType = TrackType[];

export type CatalogsCollectionType = CatalogType[];

export type CatalogsOptions = keyof CatalogsImagesDetails;

export enum FilterKind {
  artist = "исполнителю",
  genre = "жанру",
  year = "году выпуска",
}
export const catalogsImages: CatalogsImagesDetails = {
  "Плейлист дня": { path: "/img/playlist01.png", alt: "day's playlist" },
  "Танцевальные хиты": {
    path: "/img/playlist02.png",
    alt: "dancing hit's playlist",
  },
  "Инди-заряд": { path: "/img/playlist03.png", alt: "indie's playlist" },
};
