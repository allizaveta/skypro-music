export const API_URL = "https://webdev-music-003b5b991590.herokuapp.com";

export const getTracks = async () => {
  try {
    const res = await fetch(API_URL + `/catalog/track/all/`);
    if (!res.ok) {
      throw new Error("Ошибка при получении треков");
    }
    const tracksData = await res.json();
    return tracksData.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};
