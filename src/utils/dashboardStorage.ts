// Utility để quản lý dữ liệu dashboard trong localStorage

export interface DashboardTransaction {
  id: string
  serviceId: string
  serviceTitle: string
  price: number // SOL amount
  priceString: string // Original price string like "0.045 SOL"
  timestamp: number
  category?: string
}

export interface DashboardData {
  transactions: DashboardTransaction[]
}

const STORAGE_KEY = 'palpaxai_dashboard_data'

// Khởi tạo dữ liệu mặc định
const getDefaultData = (): DashboardData => ({
  transactions: [],
})

// Lấy dữ liệu từ localStorage
export const getDashboardData = (): DashboardData => {
  if (typeof window === 'undefined') {
    return getDefaultData()
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return getDefaultData()
    }
    const data = JSON.parse(stored) as DashboardData
    return {
      ...getDefaultData(),
      ...data,
    }
  } catch (error) {
    console.error('Error reading dashboard data from localStorage:', error)
    return getDefaultData()
  }
}

// Lưu dữ liệu vào localStorage
export const saveDashboardData = (data: DashboardData): void => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving dashboard data to localStorage:', error)
  }
}

// Thêm transaction mới (khi hire service)
export const addTransaction = (transaction: Omit<DashboardTransaction, 'id' | 'timestamp'>): void => {
  const data = getDashboardData()
  const newTransaction: DashboardTransaction = {
    ...transaction,
    id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    timestamp: Date.now(),
  }

  data.transactions.push(newTransaction)
  saveDashboardData(data)
  
  // Dispatch custom event để các component khác có thể lắng nghe
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('dashboardTransactionAdded', { detail: newTransaction }))
  }
}

// Reset tất cả dữ liệu về 0
export const resetDashboardData = (): void => {
  saveDashboardData(getDefaultData())
}

// Parse price string (ví dụ: "0.045 SOL" -> 0.045)
export const parsePrice = (priceString: string): number => {
  const match = priceString.match(/(\d+\.?\d*)/)
  if (match) {
    return parseFloat(match[1])
  }
  return 0
}

// Lấy transactions theo tháng
export const getTransactionsByMonth = (transactions: DashboardTransaction[]) => {
  const months: Record<string, number> = {}

  transactions.forEach((tx) => {
    const txDate = new Date(tx.timestamp)
    const monthKey = `${txDate.getFullYear()}-${String(txDate.getMonth() + 1).padStart(2, '0')}`
    months[monthKey] = (months[monthKey] || 0) + tx.price
  })

  return months
}

// Lấy transactions trong tháng hiện tại
export const getCurrentMonthTransactions = (transactions: DashboardTransaction[]) => {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  return transactions.filter((tx) => {
    const txDate = new Date(tx.timestamp)
    return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear
  })
}

// Lấy transactions trong tháng trước
export const getLastMonthTransactions = (transactions: DashboardTransaction[]) => {
  const today = new Date()
  const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1
  const lastMonthYear = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear()

  return transactions.filter((tx) => {
    const txDate = new Date(tx.timestamp)
    return txDate.getMonth() === lastMonth && txDate.getFullYear() === lastMonthYear
  })
}

