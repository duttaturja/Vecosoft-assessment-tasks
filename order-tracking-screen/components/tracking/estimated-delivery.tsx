import { cn } from "@/lib/utils";
import { type OrderStatus, type ExceptionType } from "@/lib/mockData";
import {
  formatDate,
  formatRelativeDate,
  EXCEPTION_CONFIG,
} from "@/lib/tracking-utils";
import { Calendar, Clock, AlertTriangle } from "lucide-react";

interface EstimatedDeliveryProps {
  estimatedDate: string | null;
  status: OrderStatus;
  exception: ExceptionType;
}

export function EstimatedDelivery({
  estimatedDate,
  status,
  exception,
}: EstimatedDeliveryProps) {
  if (status === "DELIVERED") {
    return (
      <div className="flex items-center gap-3 rounded-lg bg-status-delivered-bg p-3 sm:p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-status-delivered/10 text-status-delivered">
          <Clock className="size-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-status-delivered">
            Delivered
          </p>
          <p className="text-xs text-muted-foreground">
            Your package has been delivered successfully
          </p>
        </div>
      </div>
    );
  }

  if (!estimatedDate) {
    return (
      <div className="flex items-center gap-3 rounded-lg bg-muted p-3 sm:p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background text-muted-foreground">
          <Calendar className="size-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            Delivery date pending
          </p>
          <p className="text-xs text-muted-foreground">
            We&apos;ll update the estimated delivery once your package ships
          </p>
        </div>
      </div>
    );
  }

  const relativeLabel = formatRelativeDate(estimatedDate);
  const formattedDate = formatDate(estimatedDate);
  const isDelayed = exception === "DELAYED";

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg p-3 sm:p-4",
        isDelayed ? "bg-status-delayed-bg" : "bg-muted"
      )}
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full",
          isDelayed
            ? "bg-status-delayed/10 text-status-delayed"
            : "bg-background text-foreground"
        )}
      >
        {isDelayed ? (
          <AlertTriangle className="size-5" />
        ) : (
          <Calendar className="size-5" />
        )}
      </div>
      <div className="min-w-0">
        <p
          className={cn(
            "text-sm font-semibold",
            isDelayed ? "text-status-delayed" : "text-foreground"
          )}
        >
          {isDelayed ? "Delayed — " : ""}
          {relativeLabel}
        </p>
        <p className="text-xs text-muted-foreground">
          Estimated delivery by {formattedDate}
        </p>
        {isDelayed && (
          <p className="mt-1 text-xs text-status-delayed/80">
            {EXCEPTION_CONFIG.DELAYED.message}
          </p>
        )}
      </div>
    </div>
  );
}
