import { request } from "./client";

const BASE_URL = "https://wedev-api.sky.pro/api/user";

// Регистрация нового пользователя
export async function signUp({ login, name, password }) {
  const data = await request(BASE_URL, {
    method: "POST",
    body: JSON.stringify({ login, name, password }),
  });
  return data.user;
}

// Авторизация существующего пользователя
export async function signIn({ login, password }) {
  const data = await request(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ login, password }),
  });
  return data.user;
}
