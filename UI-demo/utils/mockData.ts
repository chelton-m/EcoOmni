export const mockKPIs = {
  totalRevenue: 45678,
  totalWaste: 342,
  inventoryCosts: 12456,
  stockoutRate: 3.2,
};

export const mockSalesData = [
  { month: 'Jan', revenue: 4200, orders: 156 },
  { month: 'Feb', revenue: 4800, orders: 178 },
  { month: 'Mar', revenue: 5200, orders: 195 },
  { month: 'Apr', revenue: 5600, orders: 210 },
  { month: 'May', revenue: 6100, orders: 228 },
  { month: 'Jun', revenue: 6800, orders: 245 },
];

export const mockCogsData = [
  { name: 'Matcha Latte', value: 85, cogs: 2.40 },
  { name: 'Cappuccino', value: 72, cogs: 1.80 },
  { name: 'Croissant', value: 65, cogs: 1.50 },
  { name: 'Espresso', value: 58, cogs: 1.20 },
  { name: 'Bagel', value: 45, cogs: 0.90 },
];

export const mockSalesDistribution = [
  { name: 'Coffee Drinks', value: 45, color: '#16a34a' },
  { name: 'Pastries', value: 30, color: '#3b82f6' },
  { name: 'Sandwiches', value: 15, color: '#22c55e' },
  { name: 'Other', value: 10, color: '#93c5fd' },
];

export const mockProductRevenue = [
  { month: 'Jan', matcha: 1200, cappuccino: 980, croissant: 650 },
  { month: 'Feb', matcha: 1400, cappuccino: 1050, croissant: 720 },
  { month: 'Mar', matcha: 1650, cappuccino: 1100, croissant: 780 },
  { month: 'Apr', matcha: 1800, cappuccino: 1150, croissant: 820 },
  { month: 'May', matcha: 2100, cappuccino: 1200, croissant: 880 },
  { month: 'Jun', matcha: 2400, cappuccino: 1280, croissant: 920 },
];

export const mockInventoryData = [
  { product: 'Milk', stock: 45, reorderPoint: 30 },
  { product: 'Coffee Beans', stock: 28, reorderPoint: 20 },
  { product: 'Flour', stock: 35, reorderPoint: 25 },
  { product: 'Sugar', stock: 52, reorderPoint: 30 },
  { product: 'Matcha Powder', stock: 18, reorderPoint: 15 },
];

export const mockInventoryTurnover = [
  { item: 'Milk', rate: 12.5 },
  { item: 'Coffee Beans', rate: 8.3 },
  { item: 'Matcha Powder', rate: 15.2 },
  { item: 'Flour', rate: 6.8 },
];

export const mockLeadTimeData = [
  { supplier: 'Dairy Co', avgDays: 2, onTime: 95 },
  { supplier: 'Bean Roasters', avgDays: 5, onTime: 88 },
  { supplier: 'Bakery Supply', avgDays: 3, onTime: 92 },
];

export const mockWasteOverTime = [
  { week: 'Week 1', waste: 28 },
  { week: 'Week 2', waste: 32 },
  { week: 'Week 3', waste: 25 },
  { week: 'Week 4', waste: 30 },
  { week: 'Week 5', waste: 22 },
  { week: 'Week 6', waste: 27 },
];

export const mockTopWastedProducts = [
  { name: 'Milk', units: 45, color: '#16a34a' },
  { name: 'Croissants', units: 32, color: '#22c55e' },
  { name: 'Sandwiches', units: 28, color: '#3b82f6' },
  { name: 'Salads', units: 18, color: '#60a5fa' },
  { name: 'Bagels', units: 15, color: '#93c5fd' },
];

export const connectedInsights = [
  {
    id: 1,
    title: 'Matcha & Milk Connection',
    message: 'This week, your high sales of Matcha Lattes are linked to a 15% increase in milk waste. Consider adjusting your next milk order.',
    icon: 'lightbulb',
  },
  {
    id: 2,
    title: 'Croissant Inventory Alert',
    message: 'Your croissant waste has decreased by 22% since adjusting inventory levels. This optimization saved approximately $340 this month.',
    icon: 'chart',
  },
  {
    id: 3,
    title: 'Weekend Rush Pattern',
    message: 'Weekend sales spike by 45% but inventory orders remain flat. Consider increasing Friday deliveries to reduce Saturday stockouts.',
    icon: 'clock',
  },
];

