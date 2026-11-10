const BASE_URL = "https://wedev-api.sky.pro/api/user";

// Единая обработка ответа: 2xx — успех, остальное — ошибка с текстом сервера
async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    const message =
      (typeof data.error === "string" && data.error) ||
      data.message ||
      "Что-то пошло не так. Попробуйте позже";
    throw new Error(message);
  }
  return data;
}

// Регистрация нового пользователя
export async function signUp({ login, name, password }) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify({ login, name, password }),
  });
  const data = await handleResponse(response);
  return data.user; // { id, login, name, token }
}

// Авторизация существующего пользователя
export async function signIn({ login, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ login, password }),
  });
  const data = await handleResponse(response);
  return data.user; // { id, login, name, token }
}
