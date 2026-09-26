import { type Order, mockOrders } from "@/lib/mockData";

/**
 * Get the URL slug for an order.
 * Uses the tracking number when available, otherwise falls back to the order number.
 */
export function getOrderSlug(order: Order): string {
  return order.trackingNumber ?? order.orderNumber;
}

/**
 * Find an order by its slug (tracking number or order number fallback).
 */
export function getOrderBySlug(slug: string): Order | undefined {
  return mockOrders.find(
    (order) =>
      order.trackingNumber === slug || order.orderNumber === slug
  );
}

/**
 * Get the tracking page URL for an order.
 */
export function getOrderTrackingUrl(order: Order): string {
  // Orders without tracking available use processing route (admin view only)
  if (order.exception === "TRACKING_UNAVAILABLE") {
    return `/processing/${order.orderNumber}`;
  }
  return `/track/${getOrderSlug(order)}`;
}
