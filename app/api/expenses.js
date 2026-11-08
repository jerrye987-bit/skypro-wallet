const BASE_URL = 'https://wedev-api.sky.pro/api/transactions'

/** @type {Record<string, string>} */

export const CATEGORY_LABELS = {
  food: 'Еда',
  transport: 'Транспорт',
  housing: 'Жильё',
  joy: 'Развлечения',
  education: 'Образование',
  others: 'Другое',
}

async function extractList(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.transactions)) return data.transactions
  if (Array.isArray(data?.data)) return data.data
  return null
}

function getAuthHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function handleResponse(response) {
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || 'Что-то пошло не так. Попробуйте позже')
  }
  return data
}

// Получить список расходов (опционально: сортировка и фильтрация)
export async function getExpenses({ sortBy, filterBy } = {}) {
  const params = new URLSearchParams()
  if (sortBy) params.set('sortBy', sortBy)
  if (filterBy) params.set('filterBy', filterBy)
  const query = params.toString() ? `?${params}` : ''

  const response = await fetch(`${BASE_URL}${query}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  })
  const data = await handleResponse(response)
  // по документации приходит массив; защита на случай обёртки — страховка
  return Array.isArray(data) ? data : data.data || []
}

// Превращаем дату из input type="date" (2025-06-01) в формат API (6-1-2025)
function formatDateToApi(date) {
  const [year, month, day] = String(date).split('-')
  return `${Number(month)}-${Number(day)}-${year}`
}

// Добавить расход; сервер возвращает обновлённый список транзакций
export async function addExpense({ description, category, amount, date }) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      description,
      sum: Number(amount),
      category,
      date: formatDateToApi(date),
    }),
  })
  const data = await handleResponse(response)
  return extractList(data)
}


// Удалить расход; сервер тоже возвращает обновлённый список
export async function deleteExpense(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  const data = await handleResponse(response)
  return extractList(data)
}
