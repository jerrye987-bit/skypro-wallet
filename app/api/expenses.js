import { getAuthHeaders, request } from './client'
import { formatDate, dateToApi, isoDateToApi } from '~/utils/dates'

const BASE_URL = 'https://wedev-api.sky.pro/api/transactions'

/** @type {Record<string, string>} */
export const CATEGORY_LABELS = {
  food: 'Еда',
  transport: 'Транспорт',
  housing: 'Жилье',
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

export async function getExpenses({ sortBy, filterBy } = {}) {
  const params = new URLSearchParams()
  if (sortBy) params.set('sortBy', sortBy)
  if (filterBy) params.set('filterBy', filterBy)
  const query = params.toString() ? `?${params}` : ''

  const data = await request(`${BASE_URL}${query}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  })
  return Array.isArray(data) ? data : data.data || []
}

export async function addExpense({ description, category, amount, date }) {
  const data = await request(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      description,
      sum: Number(amount),
      category,
      date: isoDateToApi(date),
    }),
  })
  return extractList(data)
}


export async function deleteExpense(id) {
  const data = await request(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  return extractList(data)
}

export function mapTransaction(t) {
  return {
    id: t._id,
    description: t.description,
    category: CATEGORY_LABELS[t.category] || t.category,
    amount: t.sum,
    date: formatDate(new Date(t.date)),
  }
}


export const sortByDate = (list) =>
  [...list].sort((a, b) => new Date(b.date) - new Date(a.date))

export async function getExpensesByPeriod(start, end) {
  const data = await request(`${BASE_URL}/period`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      start: dateToApi(start),
      end: dateToApi(end),
    }),
  })
  return extractList(data)
}
