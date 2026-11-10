// Единый HTTP-клиент для всех запросов к API

export function getAuthHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// Сервер может вернуть и { error: "текст" }, и { error: true, message: "текст" }
function extractErrorMessage(data) {
  if (typeof data?.error === 'string') return data.error
  if (typeof data?.message === 'string') return data.message
  return 'Что-то пошло не так. Попробуйте позже'
}

async function handleResponse(response) {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(extractErrorMessage(data))
  }

  return data
}

// Сетевые сбои (нет соединения) → понятное сообщение; остальное — как есть
export async function request(url, options) {
  try {
    const response = await fetch(url, options)
    return await handleResponse(response)
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Нет соединения с сервером. Проверьте интернет', {
        cause: error,
      })
    }
    throw error
  }
}

