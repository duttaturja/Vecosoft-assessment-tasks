import { cn } from "@/lib/utils";
import { type TrackingEvent } from "@/lib/mockData";
import { STATUS_CONFIG } from "@/lib/tracking-utils";
import { formatDate, formatTime } from "@/lib/tracking-utils";
import {
  Package,
  Truck,
  MapPin,
  CircleCheck,
} from "lucide-react";
import type { OrderStatus } from "@/lib/mockData";

const eventIcons: Record<OrderStatus, React.ComponentType<{ className?: string }>> = {
  PROCESSING: Package,
  SHIPPED: Truck,
  OUT_FOR_DELIVERY: MapPin,
  DELIVERED: CircleCheck,
};

interface DeliveryTimelineProps {
  events: TrackingEvent[];
}

export function DeliveryTimeline({ events }: DeliveryTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        No tracking events available yet.
      </div>
    );
  }

  return (
    <div className="relative">
      {events.map((event, index) => {
        const isFirst = index === 0;
        const isLast = index === events.length - 1;
        const config = STATUS_CONFIG[event.status];
        const Icon = eventIcons[event.status];

        return (
          <div
            key={event.id}
            className={cn(
              "relative flex gap-3 sm:gap-4 pb-6 last:pb-0",
              "animate-slide-up"
            )}
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}
          >
            {/* Timeline spine */}
            <div className="flex flex-col items-center">
              {/* Dot */}
              <div
                className={cn(
                  "relative z-10 flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-full transition-all",
                  isFirst
                    ? `${config.bgClass} ${config.colorClass}`
                    : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="size-3.5 sm:size-4" />
                {/* Pulse ring on most recent event */}
                {isFirst && (
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full animate-pulse-dot opacity-40",
                      config.bgClass
                    )}
                  />
                )}
              </div>
              {/* Connecting line */}
              {!isLast && (
                <div
                  className={cn(
                    "w-px flex-1 min-h-4",
                    "bg-border"
                  )}
                  style={{
                    transformOrigin: "top",
                    animation: `timeline-grow 0.6s ease-out ${index * 80 + 200}ms backwards`,
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-0.5">
              <p
                className={cn(
                  "text-sm font-medium leading-tight",
                  isFirst ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {event.description}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                <span>{formatDate(event.date)}</span>
                <span className="text-border">•</span>
                <span>{formatTime(event.date)}</span>
                {event.location && (
                  <>
                    <span className="text-border">•</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="size-3 shrink-0" />
                      {event.location}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
