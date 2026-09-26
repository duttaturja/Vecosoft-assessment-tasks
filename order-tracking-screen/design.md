Here are two cohesive color palettes designed specifically for an e-commerce order tracking UI, where semantic colors (success, warning, error) are critical for communicating status quickly.

### Google Font Recommendations

For a tracking dashboard, readability on small text (like tracking numbers and dates) is essential.

* **Primary Font:** **[Inter](https://fonts.google.com/specimen/Inter?utm_source=gemini)**. It is incredibly clean, modern, and readable at small sizes. (It is also the default in many Next.js templates).
* **Monospace Accent (Optional):** **[Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono?utm_source=gemini)**. Use this specifically for the Order IDs and Tracking Numbers (e.g., `ORD-1001`, `FX123456789`) so characters like 'O' and '0' or 'I' and '1' are easily distinguishable.

---

### 1. Light Mode Palette

A clean, high-contrast look that feels like a modern e-commerce platform (similar to Shopify or Amazon).

**Base & Typography**

* **Background:** `#F9FAFB` (Very light gray, keeps the screen from being blinding white)
* **Card / Surface:** `#FFFFFF` (Pure white for the main tracking container)
* **Primary Text:** `#111827` (Dark slate, softer on the eyes than pure black)
* **Secondary Text (Dates, timestamps):** `#6B7280` (Medium gray)
* **Borders / Dividers:** `#E5E7EB` (Light gray for the timeline line)

**Semantic Status Colors**

* **Processing:** `#6366F1` (Indigo - implies active system work)
* **Shipped:** `#3B82F6` (Blue - implies movement/transit)
* **Out for Delivery:** `#F59E0B` (Amber - grabs attention, implies proximity)
* **Delivered:** `#10B981` (Emerald Green - universal success color)

**Exception Colors (The "Situations")**

* **Delayed:** `#EA580C` (Orange - strong warning)
* **Delivered but not received:** `#EF4444` (Red - requires customer service action)
* **Tracking Unavailable:** `#9CA3AF` (Muted gray - neutral, no data yet)

---

### 2. Dark Mode Palette

A sleek, low-eye-strain interface. The semantic colors are desaturated slightly so they don't vibrate against the dark background.

**Base & Typography**

* **Background:** `#0F172A` (Deep slate, avoiding stark black)
* **Card / Surface:** `#1E293B` (Slightly lighter slate to elevate the tracking container)
* **Primary Text:** `#F8FAFC` (Off-white for high readability)
* **Secondary Text (Dates, timestamps):** `#94A3B8` (Muted slate gray)
* **Borders / Dividers:** `#334155` (Dark gray for the timeline line)

**Semantic Status Colors**

* **Processing:** `#818CF8` (Soft Indigo)
* **Shipped:** `#60A5FA` (Soft Blue)
* **Out for Delivery:** `#FBBF24` (Soft Amber)
* **Delivered:** `#34D399` (Soft Emerald Green)

**Exception Colors (The "Situations")**

* **Delayed:** `#FB923C` (Soft Orange)
* **Delivered but not received:** `#F87171` (Soft Red)
* **Tracking Unavailable:** `#64748B` (Dim slate - blends into the dark UI)

### Implementation Tip for Next.js (Tailwind)

If you are using Tailwind CSS, these hex codes align perfectly with Tailwind's default color palette:

* **Light Mode statuses:** `text-indigo-500`, `text-blue-500`, `text-amber-500`, `text-emerald-500`.
* **Dark Mode statuses:** `text-indigo-400`, `text-blue-400`, `text-amber-400`, `text-emerald-400`.