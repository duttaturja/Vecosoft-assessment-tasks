import Link from "next/link";
import { mockOrders } from "@/lib/mockData";
import { getOrderTrackingUrl } from "@/lib/order-helpers";
import { STATUS_CONFIG } from "@/lib/tracking-utils";
import { formatDate, formatRelativeDate } from "@/lib/tracking-utils";
import { StatusBadge } from "@/components/tracking/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Package,
  ChevronRight,
  Truck,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:px-6 sm:py-8 space-y-6">
      {/* Admin view notice */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/20 px-4 py-3">
        <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
          🔒 Admin View Only
        </p>
        <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
          This page displays all orders for administrative purposes. Individual tracking links are sent to customers.
        </p>
      </div>

      {/* Page header */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-foreground text-background">
            <Truck className="size-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              Your Orders
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {mockOrders.length} orders · Click to view tracking details
            </p>
          </div>
        </div>
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {mockOrders.map((order, index) => {
          const config = STATUS_CONFIG[order.status];
          const trackingUrl = getOrderTrackingUrl(order);

          return (
            <Link
              key={order.id}
              href={trackingUrl}
              className="block group"
            >
              <Card className="transition-all duration-200 hover:ring-2 hover:ring-foreground/10 hover:shadow-md active:scale-[0.99]">
                <CardContent>
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Order icon */}
                    <div
                      className={`flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-xl ${config.bgClass} transition-transform duration-200 group-hover:scale-105`}
                    >
                      <Package className={`size-5 sm:size-5.5 ${config.colorClass}`} />
                    </div>

                    {/* Order info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-sm sm:text-base font-semibold text-foreground font-mono">
                          {order.orderNumber}
                        </h2>
                        <StatusBadge
                          status={order.status}
                          exception={order.exception}
                          size="sm"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {order.items.map((item) => item.name).join(", ")}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        {order.estimatedDeliveryDate && (
                          <span>
                            Est.{" "}
                            {order.status === "DELIVERED"
                              ? "Delivered"
                              : formatRelativeDate(order.estimatedDeliveryDate)}
                          </span>
                        )}
                        <span className="text-border">·</span>
                        <span className="font-mono text-[11px]">
                          ${order.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Chevron */}
                    <ChevronRight className="size-4 sm:size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
