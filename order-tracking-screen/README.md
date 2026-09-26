# Vecosoft Order Tracking System

A modern, real-time order tracking application built with Next.js that provides both admin and customer views for package delivery monitoring.

## Overview

This application provides a comprehensive order tracking solution with two distinct views:

- **Admin View** (`/`): Displays all orders for administrative purposes. This page is intended for internal use only and shows a complete list of all active orders with their current status.
- **Customer Tracking Pages** (`/track/[slug]`): Individual tracking pages that are sent to respective customers via unique URLs. Each customer receives a personalized tracking link to monitor their specific order.

## Features

- 🎨 **Dark/Light Mode**: Toggle between dark and light themes with persistent preferences
- 📦 **Real-time Tracking**: Visual progress indicators showing current order status
- 📍 **Delivery Timeline**: Detailed timeline of order events from placement to delivery
- ⚠️ **Exception Handling**: Clear notifications for delivery issues or delays
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🔗 **Unique Tracking URLs**: Each order has a unique slug-based URL for customer access

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd order-tracking-screen
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the admin view.

## Project Structure

```
order-tracking-screen/
├── app/
│   ├── page.tsx              # Admin view - lists all orders
│   ├── track/[slug]/         # Customer tracking pages
│   │   └── page.tsx          # Individual order tracking view
│   ├── contact/              # Contact support page
│   └── report/               # Report issue page
├── components/
│   ├── layout/
│   │   ├── navbar.tsx        # Navigation with theme toggle
│   │   └── footer.tsx        # Footer with support links
│   ├── tracking/             # Order tracking components
│   └── ui/                   # Reusable UI components
└── lib/
    ├── mockData.ts           # Sample order data
    ├── order-helpers.ts      # Order utility functions
    └── tracking-utils.ts     # Tracking status utilities
```

## Usage

### Admin View

The homepage (`/`) is designed for **admin use only**. It displays:
- A banner indicating this is an admin-only view
- Complete list of all orders
- Quick status overview for each order
- Links to individual tracking pages

### Customer Tracking

Customers receive unique tracking URLs in the format:
```
https://yourdomain.com/track/[unique-slug]
```

Each tracking page shows:
- Order details and summary
- Current delivery status with visual indicators
- Estimated delivery date
- Detailed timeline of package movements
- Exception notifications (if applicable)

### Theme Switching

Users can toggle between light and dark modes using the theme button in the navbar. The preference is saved locally and persists across sessions.

## Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Inter, Roboto Mono

## Support

For support options, users can:
- Visit the **Contact** page (accessible via footer)
- Submit issues via the **Report Issue** page (accessible via footer)

## License

[Add your license information here]

## Contributing

[Add contribution guidelines here]
