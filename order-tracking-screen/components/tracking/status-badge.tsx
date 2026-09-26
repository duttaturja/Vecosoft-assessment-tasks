import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { type OrderStatus, type ExceptionType } from "@/lib/mockData";
import { STATUS_CONFIG, EXCEPTION_CONFIG } from "@/lib/tracking-utils";
import {
  Package,
  Truck,
  MapPin,
  CircleCheck,
  AlertTriangle,
  CircleAlert,
  HelpCircle,
} from "lucide-react";

const statusIcons: Record<OrderStatus, React.ReactNode> = {
  PROCESSING: <Package className="size-3.5" />,
  SHIPPED: <Truck className="size-3.5" />,
  OUT_FOR_DELIVERY: <MapPin className="size-3.5" />,
  DELIVERED: <CircleCheck className="size-3.5" />,
};

const exceptionIcons: Record<Exclude<ExceptionType, null>, React.ReactNode> = {
  DELAYED: <AlertTriangle className="size-3.5" />,
  TRACKING_UNAVAILABLE: <HelpCircle className="size-3.5" />,
  DELIVERED_NOT_RECEIVED: <CircleAlert className="size-3.5" />,
};

interface StatusBadgeProps {
  status: OrderStatus;
  exception?: ExceptionType;
  size?: "sm" | "default";
}

export function StatusBadge({
  status,
  exception,
  size = "default",
}: StatusBadgeProps) {
  // If there's an exception, show it instead of the normal status
  if (exception) {
    const config = EXCEPTION_CONFIG[exception];
    return (
      <Badge
        variant="outline"
        className={cn(
          "gap-1.5 border-transparent font-medium",
          config.bgClass,
          config.colorClass,
          size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"
        )}
      >
        {exceptionIcons[exception]}
        {config.label}
      </Badge>
    );
  }

  const config = STATUS_CONFIG[status];
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 border-transparent font-medium",
        config.bgClass,
        config.colorClass,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"
      )}
    >
      {statusIcons[status]}
      {config.label}
    </Badge>
  );
}
