// types.ts (or inside the same file)
export type OrderStatus = 'PROCESSING' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
export type ExceptionType = 'DELAYED' | 'TRACKING_UNAVAILABLE' | 'DELIVERED_NOT_RECEIVED' | null;

export interface TrackingEvent {
  id: string;
  date: string; // ISO Date string
  location: string;
  description: string;
  status: OrderStatus;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  status: OrderStatus;
  exception: ExceptionType;
  estimatedDeliveryDate: string | null;
  carrier: string;
  trackingNumber: string | null;
  items: Array<{ name: string; quantity: number; imagePlaceholder: string }>;
  trackingHistory: TrackingEvent[];
}

// mockOrders.ts
export const mockOrders: Order[] = [
  // ==========================================
  // STANDARD OUTCOMES (No special situations)
  // ==========================================
  
  {
    id: "1",
    orderNumber: "ORD-1001",
    customerName: "Jane Doe",
    status: "PROCESSING",
    exception: null,
    estimatedDeliveryDate: "2026-09-30T17:00:00Z",
    carrier: "FedEx",
    trackingNumber: "FX123456789",
    items: [{ name: "Wireless Earbuds", quantity: 1, imagePlaceholder: "/api/placeholder/80/80" }],
    trackingHistory: [
      { id: "e1", date: "2026-09-26T10:00:00Z", location: "Warehouse", description: "Order confirmed and being packed", status: "PROCESSING" }
    ]
  },
  {
    id: "2",
    orderNumber: "ORD-1002",
    customerName: "John Smith",
    status: "SHIPPED",
    exception: null,
    estimatedDeliveryDate: "2026-09-28T17:00:00Z",
    carrier: "UPS",
    trackingNumber: "1Z9999999999999999",
    items: [{ name: "Mechanical Keyboard", quantity: 1, imagePlaceholder: "/api/placeholder/80/80" }],
    trackingHistory: [
      { id: "e2", date: "2026-09-26T14:30:00Z", location: "Los Angeles, CA", description: "Package arrived at transit facility", status: "SHIPPED" },
      { id: "e1", date: "2026-09-25T09:00:00Z", location: "Warehouse", description: "Order confirmed", status: "PROCESSING" }
    ]
  },
  {
    id: "3",
    orderNumber: "ORD-1003",
    customerName: "Alice Johnson",
    status: "OUT_FOR_DELIVERY",
    exception: null,
    estimatedDeliveryDate: "2026-09-26T20:00:00Z",
    carrier: "USPS",
    trackingNumber: "9400100000000000000000",
    items: [{ name: "Coffee Beans 1kg", quantity: 2, imagePlaceholder: "/api/placeholder/80/80" }],
    trackingHistory: [
      { id: "e3", date: "2026-09-26T07:15:00Z", location: "Chattogram, BD", description: "Package is out for delivery", status: "OUT_FOR_DELIVERY" },
      { id: "e2", date: "2026-09-25T22:00:00Z", location: "Chattogram Sort Facility", description: "Package arrived at local facility", status: "SHIPPED" },
      { id: "e1", date: "2026-09-24T10:00:00Z", location: "Warehouse", description: "Order confirmed", status: "PROCESSING" }
    ]
  },
  {
    id: "4",
    orderNumber: "ORD-1004",
    customerName: "Bob Williams",
    status: "DELIVERED",
    exception: null,
    estimatedDeliveryDate: "2026-09-25T17:00:00Z",
    carrier: "DHL",
    trackingNumber: "DHL123456789",
    items: [{ name: "Running Shoes", quantity: 1, imagePlaceholder: "/api/placeholder/80/80" }],
    trackingHistory: [
      { id: "e4", date: "2026-09-25T14:45:00Z", location: "Front Porch", description: "Delivered, left at front door", status: "DELIVERED" },
      { id: "e3", date: "2026-09-25T08:00:00Z", location: "Local Facility", description: "Out for delivery", status: "OUT_FOR_DELIVERY" },
      { id: "e2", date: "2026-09-24T18:00:00Z", location: "Transit Hub", description: "Package in transit", status: "SHIPPED" },
      { id: "e1", date: "2026-09-24T09:00:00Z", location: "Warehouse", description: "Order confirmed", status: "PROCESSING" }
    ]
  },

  // ==========================================
  // SPECIFIC SITUATIONS (Edge Cases)
  // ==========================================

  {
    // SITUATION 1: Tracking not available yet
    id: "5",
    orderNumber: "ORD-1005",
    customerName: "Emma Davis",
    status: "PROCESSING",
    exception: "TRACKING_UNAVAILABLE",
    estimatedDeliveryDate: "2026-10-02T17:00:00Z",
    carrier: "Pending",
    trackingNumber: null, // No tracking yet
    items: [{ name: "Office Chair", quantity: 1, imagePlaceholder: "/api/placeholder/80/80" }],
    trackingHistory: [
      { id: "e1", date: "2026-09-26T16:00:00Z", location: "Warehouse", description: "Order confirmed. Carrier is awaiting the package.", status: "PROCESSING" }
    ]
  },
  {
    // SITUATION 2: Delayed order
    id: "6",
    orderNumber: "ORD-1006",
    customerName: "Michael Brown",
    status: "SHIPPED",
    exception: "DELAYED",
    estimatedDeliveryDate: "2026-10-05T17:00:00Z", // Pushed back date
    carrier: "FedEx",
    trackingNumber: "FX987654321",
    items: [{ name: "Winter Jacket", quantity: 1, imagePlaceholder: "/api/placeholder/80/80" }],
    trackingHistory: [
      { id: "e3", date: "2026-09-26T12:00:00Z", location: "Denver, CO", description: "Weather delay. Delivery will be rescheduled.", status: "SHIPPED" },
      { id: "e2", date: "2026-09-24T15:00:00Z", location: "Chicago, IL", description: "Package arrived at transit facility", status: "SHIPPED" },
      { id: "e1", date: "2026-09-23T11:00:00Z", location: "Warehouse", description: "Order confirmed", status: "PROCESSING" }
    ]
  },
  {
    // SITUATION 3: Delivered but not received
    id: "7",
    orderNumber: "ORD-1007",
    customerName: "Sarah Wilson",
    status: "DELIVERED",
    exception: "DELIVERED_NOT_RECEIVED",
    estimatedDeliveryDate: "2026-09-25T17:00:00Z",
    carrier: "Amazon Logistics",
    trackingNumber: "TBA1234567890",
    items: [{ name: "Smart Watch", quantity: 1, imagePlaceholder: "/api/placeholder/80/80" }],
    trackingHistory: [
      { id: "e4", date: "2026-09-25T13:20:00Z", location: "Mailbox", description: "Delivered in/at mailbox", status: "DELIVERED" },
      { id: "e3", date: "2026-09-25T07:30:00Z", location: "Local Facility", description: "Out for delivery", status: "OUT_FOR_DELIVERY" },
      { id: "e2", date: "2026-09-24T20:00:00Z", location: "Transit Hub", description: "Package in transit", status: "SHIPPED" },
      { id: "e1", date: "2026-09-24T10:00:00Z", location: "Warehouse", description: "Order confirmed", status: "PROCESSING" }
    ]
  }
];