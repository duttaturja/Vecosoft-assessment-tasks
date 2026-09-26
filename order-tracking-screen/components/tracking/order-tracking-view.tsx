import { type Order } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSummaryCard } from "./order-summary-card";
import { ProgressTracker } from "./progress-tracker";
import { DeliveryTimeline } from "./delivery-timeline";
import { EstimatedDelivery } from "./estimated-delivery";
import { ExceptionBanner } from "./exception-banner";

interface OrderTrackingViewProps {
  order: Order;
}

export function OrderTrackingView({ order }: OrderTrackingViewProps) {
  return (
    <div className="w-full max-w-lg mx-auto space-y-4 animate-slide-up">
      {/* Exception alert at top if present */}
      {order.exception && <ExceptionBanner exception={order.exception} />}

      {/* Progress tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground font-medium">
            Delivery Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressTracker currentStatus={order.status} />
        </CardContent>
      </Card>

      {/* Estimated delivery */}
      <EstimatedDelivery
        estimatedDate={order.estimatedDeliveryDate}
        status={order.status}
        exception={order.exception}
      />

      {/* Order summary */}
      <OrderSummaryCard order={order} />

      {/* Tracking timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground font-medium">
            Tracking History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DeliveryTimeline events={order.trackingHistory} />
        </CardContent>
      </Card>
    </div>
  );
}
