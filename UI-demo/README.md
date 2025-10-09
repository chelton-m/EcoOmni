# EcoOmni UI Demo

A beautiful, modern **single-page scrollable dashboard** for EcoOmni - transforming scattered café data into intelligent insights.

## 🎨 Design Philosophy

EcoOmni helps busy café managers **connect the dots** between sales, waste, and inventory data. The UI reflects this with:

- **Single-page scrollable design** - everything flows naturally as you scroll
- **Exact match to provided designs** - follows the three dashboard images precisely
- **Clean, card-based layouts** with rounded corners and soft shadows
- **Green & Blue color scheme** representing sustainability and trust
- **Smooth scroll-triggered animations** using Framer Motion for a polished feel
- **Connected Insight cards** that highlight intelligent correlations in the data

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the UI-demo folder:
```bash
cd UI-demo
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📂 Project Structure

```
UI-demo/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with navigation
│   └── page.tsx           # Single-page scrollable dashboard
├── components/            # Reusable components
│   ├── Navigation.tsx     # Top navigation bar with smooth scrolling
│   ├── EmptyState.tsx     # First-time user experience
│   ├── ScrollableDashboard.tsx  # Main scrollable dashboard container
│   ├── ConnectedInsight.tsx  # Intelligent insight cards
│   ├── FileImportModal.tsx   # Multi-step import flow
│   ├── KPICard.tsx        # Animated KPI cards
│   └── sections/          # Dashboard sections
│       ├── SalesSection.tsx    # Sales pipeline (matches image 1)
│       ├── InventorySection.tsx # Inventory dashboard (matches image 2)
│       └── WasteSection.tsx     # Waste management (matches image 3)
├── context/               # React Context for state
│   └── DataContext.tsx    # User data state management
└── utils/                 # Utilities and mock data
    └── mockData.ts        # All mock/placeholder data
```

## 🎭 Key Features

### 1. Empty State Experience
First-time users see a welcoming empty state with:
- Friendly welcome message
- Clear value proposition
- Prominent CTA to import first report
- Ghosted dashboard preview in background

### 2. File Import Flow
Three-step modal for data import:
- **Step 1:** Drag & drop file upload
- **Step 2:** AI-powered column mapping with animated highlights
- **Step 3:** Success confirmation with custom "connecting dots" animation

### 3. Main Dashboard
Once data is imported:
- Connected Insight card at the top
- Four animated KPI cards with CountUp effects
- Revenue and order charts
- Quick insights section

### 4. Scrollable Dashboard Sections

**Sales Pipeline Section (matches image 1):**
- **COGS PER PRODUCT** - Horizontal progress bars for Matcha Latte (75%), Cappuccino (20%), Coffee Latte (5%)
- **TIME IN THE DAY WHERE SALE PRODUCTS IS HIGH** - Pie chart with Coffee Latte (33%), Avocado Smoothies (30.9%), Matcha Latte (20.6%), Lemonade (15.5%)
- **PRODUCT REVENUE BASED ON SELLING POINTS** - Line chart comparing Top-Selling vs Top-earning products

**Inventory Pipeline Section (matches image 2):**
- **Inventory Levels by Product** - Vertical bar chart with Arabica Beans, Fresh Milk, Syrup, Matcha Powder, Sugar
- **Stockout Rate** - Monthly gauge charts (January 25%, February 65%, March 55%, April 60%)
- **Inventory Costs** - Pie chart with Holding Costs (5000), Ordering Costs (3000), Shortage Costs (1000)
- **Inventory Turnover Rate** - Quarterly rates (Q1: 4, Q2: 3.5, Q3: 4.2, Q4: 3.8)
- **Lead Time Analysis** - Horizontal bar chart for Product A-D with days

**Waste Management Section (matches image 3 with EcoOmni colors):**
- **Total Food Waste Collected** - KPI showing 2.5k tons (+12%)
- **Food Waste Collected by Region** - Horizontal bar chart for EAP, ECA, LAC, MENA, NA, SA, SSA
- **Total Waste Collected Over Time** - Line chart from Jan-Jun 2024
- **Total Food Waste Diverted** - KPI showing 1.8k tons (+25%)
- **Landfill Usage** - KPI showing 700 tons (-5%)
- **Waste Disposal Methods** - Pie chart (Recycling 72%, Landfill 28%)
- **Waste Collection by Sector** - Horizontal bar chart (Residential, Commercial, Industrial)
- **Waste Collection Details** - Table with region breakdown

## 🎨 Animations & Interactions

- **Scroll-triggered animations** - Each section animates as you scroll into view
- **Staggered entrance** animations for dashboard cards within sections
- **Bar charts** grow from bottom up with smooth transitions
- **Line charts** draw from left to right with path animations
- **CountUp** animations for large numbers in KPIs
- **Hover effects** with scale and shadow on cards
- **Pulse animation** on Connected Insight cards
- **Custom SVG animation** for "connecting dots" in import flow
- **Smooth scrolling** navigation between sections

## 🎨 Color Palette

```css
Green:
- eco-green-50 to eco-green-900
- Primary: #16a34a (eco-green-600)

Blue:
- eco-blue-50 to eco-blue-900
- Primary: #3b82f6 (eco-blue-500)

Gradients:
- from-eco-green-600 to-eco-blue-600
- from-eco-green-50 to-eco-blue-50
```

## 🔄 State Management

The app uses React Context (`DataContext`) to manage:
- `hasData` - Whether user has imported data (shows empty state vs. populated dashboard)
- `showImportModal` - Controls the file import modal visibility

To toggle between empty and populated states during development, modify the initial state in `context/DataContext.tsx`.

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Icons:** Heroicons
- **File Upload:** react-dropzone
- **Count Animations:** react-countup

## 🎯 Demo Flow

1. User lands on empty state
2. Clicks "Import Your First Report"
3. Uploads a file (drag & drop or browse)
4. Reviews AI-detected column mappings
5. Clicks "Import Data" and sees processing animation
6. Success! Dashboard populates with scrollable sections
7. User scrolls down to explore:
   - Connected Insight at the top
   - Sales Pipeline section (matches image 1 exactly)
   - Inventory Pipeline section (matches image 2 exactly)
   - Waste Management section (matches image 3 with EcoOmni colors)
8. Can use navigation to jump to sections or import additional reports

## 🚢 Building for Production

```bash
npm run build
npm start
```

## 📝 Notes

- This is a **UI demo only** - no backend integration
- All data is **mock/placeholder** data
- User state resets on page refresh
- Designed for desktop/tablet viewing (responsive design included)

---

Built with ❤️ for EcoOmni

