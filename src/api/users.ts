import { getEmptyError } from "@/types/errorsTypes";
import { UserFormData } from "@/types/usersTypes";

export const UserAPI = {
  uri: "https://webdev-music-003b5b991590.herokuapp.com",
  error: getEmptyError(),

  async requestToEndPoint(endpoint: string, params: RequestInit) {
    const response = await fetch(endpoint, params);
    const data = await response.json();

    if (!response.ok) {
      UserAPI.error.endpoint = endpoint;
      UserAPI.error.status = response.status;
      UserAPI.error.message = data.message;

      throw new Error(JSON.stringify(UserAPI.error));
    }

    UserAPI.error = getEmptyError();

    return data;
  },

  async signIn(userData: UserFormData) {
    return await UserAPI.requestToEndPoint(`${UserAPI.uri}/user/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  },

  async signUp(userData: UserFormData) {
    return await UserAPI.requestToEndPoint(`${UserAPI.uri}/user/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  },

  async getTokens(userData: UserFormData) {
    return await UserAPI.requestToEndPoint(`${UserAPI.uri}/user/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  },

  async refreshTokens(token: string) {
    return await UserAPI.requestToEndPoint(
      `${UserAPI.uri}/user/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: token }),
      }
    );
  },
};
