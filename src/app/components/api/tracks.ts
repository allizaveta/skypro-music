import { SinginFormType } from "@/types/user";
import { fetchWithAuth } from "@/utils/fetchWhithAuth";

export const API_URL = "https://webdev-music-003b5b991590.herokuapp.com/";

export const getTracks = async () => {
  try {
    const res = await fetch(API_URL + `catalog/track/all/`);
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

export async function RegistrationApi({ email, password }: SinginFormType) {
  return fetch(API_URL + `user/signup/`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      username: email,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then(async (response) => {
    if (response.status === 400) {
      const errorResponse = await response.json();
      if (errorResponse.username) {
        throw new Error(errorResponse.username);
      }
      if (errorResponse.email) {
        throw new Error(errorResponse.email);
      }
      if (errorResponse.password) {
        throw new Error(errorResponse.password);
      }
    }
    if (response.status === 500) {
      throw new Error("Сервер сломался");
    }
    return response.json();
  });
}

export async function LoginApi({ email, password }: SinginFormType) {
  return fetch(API_URL + `user/login/`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => {
    if (response.status === 400) {
      return response.json().then((errorResponse) => {
        if (errorResponse.email) {
          throw new Error(errorResponse.email);
        }
        if (errorResponse.password) {
          throw new Error(errorResponse.password);
        }
        throw new Error("Произошла неизвестная ошибка.");
      });
    }
    if (response.status === 401) {
      return response.json().then((errorResponse) => {
        throw new Error(errorResponse.detail);
      });
    }
    return response.json();
  });
}

export const fetchTokens = async ({ email, password }: SinginFormType) => {
  try {
    const response = await fetch(API_URL + `user/token/`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Ошибка" + error);
  }
};

export async function likeTrack(token: string, id: number) {
  const response = await fetch(
    `https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${id}/favorite/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Ошибка сервера");
  }

  const data = await response.json();
  return data.data;
}

export async function dislikeTrack(token: string, id: number) {
  const response = await fetch(`${API_URL}/catalog/track/${id}/favorite/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка сервера");
  }

  const data = await response.json();
  return data.data;
}

export async function fetchFavoriteTracks({
  access,
  refresh,
}: {
  access: string | null;
  refresh: string;
}) {
  const res = await fetchWithAuth(
    API_URL + `catalog/track/favorite/all`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
    refresh
  );
  return res.json();
}

export const refreshToken = async (refresh: string) => {
  try {
    const response = await fetch(API_URL + `token/refresh/`, {
      method: "POST",
      body: JSON.stringify({
        refresh: refresh,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Ошибка" + error);
  }
};

export async function fetchSelectionTracks(id: string) {
  const fullId = Number(id) + 1;
  const response = await fetch(
    `https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/${fullId}/`
  );

  if (!response.ok) {
    throw new Error("Ошибка получения");
  }

  const data = await response.json();
  return data.data;
}
