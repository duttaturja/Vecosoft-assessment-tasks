"use client";

import { cn } from "@/lib/utils";
import { type Order } from "@/lib/mockData";
import { STATUS_CONFIG, EXCEPTION_CONFIG } from "@/lib/tracking-utils";
import { ChevronRight, Package } from "lucide-react";

interface OrderSelectorProps {
  orders: Order[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function OrderSelector({
  orders,
  selectedId,
  onSelect,
}: OrderSelectorProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex gap-2 sm:gap-2.5 pb-1 min-w-max sm:flex-wrap sm:min-w-0">
        {orders.map((order) => {
          const isSelected = order.id === selectedId;
          const config = STATUS_CONFIG[order.status];
          const hasException = order.exception !== null;

          return (
            <button
              key={order.id}
              onClick={() => onSelect(order.id)}
              className={cn(
                "group relative flex items-center gap-2 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-left transition-all duration-200",
                "border active:scale-[0.98]",
                isSelected
                  ? "border-foreground/20 bg-card shadow-sm ring-1 ring-foreground/5"
                  : "border-transparent bg-muted/50 hover:bg-muted hover:border-border"
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                  isSelected ? config.bgClass : "bg-background"
                )}
              >
                <Package
                  className={cn(
                    "size-4",
                    isSelected ? config.colorClass : "text-muted-foreground"
                  )}
                />
              </div>

              {/* Info */}
              <div className="min-w-0">
                <p
                  className={cn(
                    "text-xs font-semibold font-mono truncate",
                    isSelected ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {order.orderNumber}
                </p>
                <p className="text-[10px] text-muted-foreground truncate max-w-20">
                  {order.items[0]?.name}
                </p>
              </div>

              {/* Exception dot indicator */}
              {hasException && (
                <span
                  className={cn(
                    "absolute -top-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-background",
                    order.exception === "DELAYED"
                      ? "bg-status-delayed"
                      : order.exception === "DELIVERED_NOT_RECEIVED"
                        ? "bg-status-error"
                        : "bg-status-unavailable"
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
