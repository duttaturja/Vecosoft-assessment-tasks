"use client";

import { cn } from "@/lib/utils";
import { type Order } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "./status-badge";
import { Package, Copy, Check } from "lucide-react";
import { useState, useCallback } from "react";

interface OrderSummaryCardProps {
  order: Order;
}

export function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!order.trackingNumber) return;
    try {
      await navigator.clipboard.writeText(order.trackingNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: silently fail
    }
  }, [order.trackingNumber]);

  return (
    <Card className="animate-fade-in">
      <CardContent className="space-y-4">
        {/* Header: order number + status */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-semibold text-foreground truncate">
                {order.orderNumber}
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {order.customerName}
            </p>
          </div>
          <StatusBadge status={order.status} exception={order.exception} />
        </div>

        <Separator />

        {/* Items list */}
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Package className="size-5 sm:size-6 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="text-sm font-semibold text-foreground shrink-0">
                ${order.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <Separator />

        {/* Shipping details */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Carrier</p>
            <p className="text-sm font-medium text-foreground mt-0.5">
              {order.carrier}
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Tracking Number</p>
            {order.trackingNumber ? (
              <div className="flex items-center gap-1.5 mt-0.5">
                <p
                  className={cn(
                    "text-sm font-medium font-mono text-foreground truncate"
                  )}
                >
                  {order.trackingNumber}
                </p>
                <button
                  className="shrink-0 text-muted-foreground hover:text-foreground transition-colors active:scale-90"
                  aria-label="Copy tracking number"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="size-3.5 text-status-delivered" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mt-0.5 italic">
                Not available yet
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
