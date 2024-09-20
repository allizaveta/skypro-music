import { refreshToken } from "@/app/components/api/tracks";

export async function fetchWithAuth(
  url: string,
  options: RequestInit,
  refresh: string
) {
  let res = await fetch(url, options);

  if (res.status === 401) {
    const newAccessToken = await refreshToken(refresh); // Получение нового Access токена

    // Повторный запрос с новым токеном
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${newAccessToken}`,
    };
    res = await fetch(url, options); // Повторный запрос с обновленными заголовками
  }

  // Проверка успешности запроса
  if (!res.ok) {
    throw new Error(res.statusText); // Выброс ошибки при неудачном запросе
  }

  return res; // Возврат ответа
}
