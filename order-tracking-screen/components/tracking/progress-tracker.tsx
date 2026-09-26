"use client";

import { cn } from "@/lib/utils";
import { type OrderStatus } from "@/lib/mockData";
import { STATUS_STEPS, STATUS_STEP_INDEX, STATUS_CONFIG } from "@/lib/tracking-utils";
import {
  Package,
  Truck,
  MapPin,
  CircleCheck,
} from "lucide-react";

const stepIcons: Record<OrderStatus, React.ComponentType<{ className?: string }>> = {
  PROCESSING: Package,
  SHIPPED: Truck,
  OUT_FOR_DELIVERY: MapPin,
  DELIVERED: CircleCheck,
};

interface ProgressTrackerProps {
  currentStatus: OrderStatus;
}

export function ProgressTracker({ currentStatus }: ProgressTrackerProps) {
  const currentIndex = STATUS_STEP_INDEX[currentStatus];

  return (
    <div className="w-full px-1">
      {/* Mobile: vertical layout */}
      <div className="flex flex-col gap-0 sm:hidden">
        {STATUS_STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex;
          const Icon = stepIcons[step];
          const config = STATUS_CONFIG[step];

          return (
            <div key={step} className="flex items-start gap-3">
              {/* Vertical line + dot */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    isCompleted && "bg-status-delivered text-white",
                    isCurrent && `${config.bgClass} ${config.colorClass}`,
                    isUpcoming && "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="size-4" />
                </div>
                {index < STATUS_STEPS.length - 1 && (
                  <div
                    className={cn(
                      "w-0.5 h-8 transition-all duration-500",
                      index < currentIndex
                        ? "bg-status-delivered"
                        : "bg-border"
                    )}
                  />
                )}
              </div>
              {/* Label */}
              <div className="pt-1">
                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isCompleted && "text-foreground",
                    isCurrent && config.colorClass,
                    isUpcoming && "text-muted-foreground"
                  )}
                >
                  {config.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: horizontal layout */}
      <div className="hidden sm:flex items-start justify-between">
        {STATUS_STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex;
          const Icon = stepIcons[step];
          const config = STATUS_CONFIG[step];

          return (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    isCompleted && "bg-status-delivered text-white",
                    isCurrent &&
                      `${config.bgClass} ${config.colorClass} ring-2 ring-offset-2 ring-offset-card`,
                    isUpcoming && "bg-muted text-muted-foreground"
                  )}
                  style={
                    isCurrent
                      ? { "--tw-ring-color": `var(--status-${step.toLowerCase().replace(/_/g, "-")})` } as React.CSSProperties
                      : undefined
                  }
                >
                  <Icon className="size-4.5" />
                </div>
                <span
                  className={cn(
                    "text-xs font-medium text-center max-w-16 leading-tight transition-colors",
                    isCompleted && "text-foreground",
                    isCurrent && config.colorClass,
                    isUpcoming && "text-muted-foreground"
                  )}
                >
                  {config.label}
                </span>
              </div>
              {/* Connector line */}
              {index < STATUS_STEPS.length - 1 && (
                <div className="flex-1 mx-2 mt-5">
                  <div
                    className={cn(
                      "h-0.5 w-full rounded-full transition-all duration-500",
                      index < currentIndex
                        ? "bg-status-delivered"
                        : "bg-border"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
