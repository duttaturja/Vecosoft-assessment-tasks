"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import { mockOrders } from "@/lib/mockData";
import { OrderSelector } from "@/components/tracking/order-selector";
import { OrderTrackingView } from "@/components/tracking/order-tracking-view";
import { TrackingSkeleton } from "@/components/tracking/tracking-skeleton";
import { Package } from "lucide-react";

export function TrackingPage() {
  const [selectedOrderId, setSelectedOrderId] = useState(mockOrders[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const selectedOrder = mockOrders.find((o) => o.id === selectedOrderId)!;

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Small delay for content animation
      setTimeout(() => setShowContent(true), 50);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectOrder = useCallback((id: string) => {
    setShowContent(false);
    setSelectedOrderId(id);
    // Brief transition for visual feedback
    setTimeout(() => setShowContent(true), 150);
  }, []);

  if (isLoading) {
    return <TrackingSkeleton />;
  }

  return (
    <div
      className="w-full max-w-lg mx-auto space-y-5 p-4 sm:p-6 pb-8"
    >
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-foreground text-background">
          <Package className="size-5" />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
            Order Tracking
          </h1>
          <p className="text-xs text-muted-foreground">
            {mockOrders.length} active orders
          </p>
        </div>
      </div>

      {/* Order selector */}
      <OrderSelector
        orders={mockOrders}
        selectedId={selectedOrderId}
        onSelect={handleSelectOrder}
      />

      {/* Tracking detail */}
      <div
        className={
          showContent
            ? "opacity-100 transition-opacity duration-300"
            : "opacity-0 transition-opacity duration-150"
        }
      >
        <OrderTrackingView order={selectedOrder} />
      </div>
    </div>
  );
}
