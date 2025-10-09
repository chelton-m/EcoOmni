# EcoOmni UI Demo

A beautiful, modern dashboard UI for EcoOmni - transforming scattered café data into intelligent insights.

## 🎨 Design Philosophy

EcoOmni helps busy café managers **connect the dots** between sales, waste, and inventory data. The UI reflects this with:

- **Clean, card-based layouts** with rounded corners and soft shadows
- **Green & Blue color scheme** representing sustainability and trust
- **Smooth animations** using Framer Motion for a polished feel
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
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Main dashboard (home)
│   ├── sales/             # Sales pipeline page
│   ├── inventory/         # Inventory pipeline page
│   └── waste/             # Waste management page
├── components/            # Reusable components
│   ├── Navigation.tsx     # Top navigation bar
│   ├── EmptyState.tsx     # First-time user experience
│   ├── Dashboard.tsx      # Main populated dashboard
│   ├── ConnectedInsight.tsx  # Intelligent insight cards
│   ├── FileImportModal.tsx   # Multi-step import flow
│   └── KPICard.tsx        # Animated KPI cards
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

### 4. Pipeline Dashboards

**Sales Pipeline:**
- COGS per product (horizontal progress bars)
- Sales distribution (pie chart)
- Product revenue trends (multi-line chart)

**Inventory Pipeline:**
- Stockout rate & inventory costs KPIs
- Inventory levels by product (bar chart)
- Inventory turnover rates
- Lead time analysis by supplier

**Waste Management:**
- Total waste collected & diverted KPIs
- Waste over time (line chart)
- Top 5 wasted products (horizontal bar chart)
- Waste reduction recommendations

## 🎨 Animations & Interactions

- **Staggered entrance** animations for dashboard cards
- **Bar charts** grow from bottom up
- **Line charts** draw from left to right
- **CountUp** animations for large numbers in KPIs
- **Hover effects** with scale and shadow on cards
- **Pulse animation** on Connected Insight cards
- **Custom SVG animation** for "connecting dots" in import flow

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
6. Success! Redirected to populated dashboard
7. Explores Sales, Inventory, and Waste pipeline pages
8. Can import additional reports via top-right button

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

