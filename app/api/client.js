export function getAuthHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

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

