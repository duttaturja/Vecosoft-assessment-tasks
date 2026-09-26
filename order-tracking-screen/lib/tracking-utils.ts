import { type OrderStatus, type ExceptionType } from "@/lib/mockData";

// Status step ordering for the progress tracker
export const STATUS_STEPS: OrderStatus[] = [
  "PROCESSING",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

export const STATUS_STEP_INDEX: Record<OrderStatus, number> = {
  PROCESSING: 0,
  SHIPPED: 1,
  OUT_FOR_DELIVERY: 2,
  DELIVERED: 3,
};

interface StatusConfig {
  label: string;
  colorClass: string;
  bgClass: string;
  icon: string;
}

export const STATUS_CONFIG: Record<OrderStatus, StatusConfig> = {
  PROCESSING: {
    label: "Processing",
    colorClass: "text-status-processing",
    bgClass: "bg-status-processing-bg",
    icon: "package",
  },
  SHIPPED: {
    label: "Shipped",
    colorClass: "text-status-shipped",
    bgClass: "bg-status-shipped-bg",
    icon: "truck",
  },
  OUT_FOR_DELIVERY: {
    label: "Out for Delivery",
    colorClass: "text-status-out-for-delivery",
    bgClass: "bg-status-out-for-delivery-bg",
    icon: "map-pin",
  },
  DELIVERED: {
    label: "Delivered",
    colorClass: "text-status-delivered",
    bgClass: "bg-status-delivered-bg",
    icon: "check-circle",
  },
};

interface ExceptionConfig {
  label: string;
  colorClass: string;
  bgClass: string;
  message: string;
}

export const EXCEPTION_CONFIG: Record<
  Exclude<ExceptionType, null>,
  ExceptionConfig
> = {
  DELAYED: {
    label: "Delayed",
    colorClass: "text-status-delayed",
    bgClass: "bg-status-delayed-bg",
    message: "Your package is experiencing a delay. Delivery date has been updated.",
  },
  TRACKING_UNAVAILABLE: {
    label: "Tracking Unavailable",
    colorClass: "text-status-unavailable",
    bgClass: "bg-status-unavailable-bg",
    message: "Tracking information is not yet available. Please check back later.",
  },
  DELIVERED_NOT_RECEIVED: {
    label: "Not Received",
    colorClass: "text-status-error",
    bgClass: "bg-status-error-bg",
    message:
      "Package marked as delivered but not received? Contact our support team.",
  },
};

/**
 * Format an ISO date string to a human-readable date.
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format an ISO date string to a human-readable time.
 */
export function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Format an ISO date string to a relative or readable label.
 */
export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";
  if (diffDays > 0 && diffDays <= 7) return `In ${diffDays} days`;
  return formatDate(dateStr);
}
