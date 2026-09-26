import { cn } from "@/lib/utils";
import { type ExceptionType } from "@/lib/mockData";
import { EXCEPTION_CONFIG } from "@/lib/tracking-utils";
import { AlertTriangle, HelpCircle, CircleAlert } from "lucide-react";

const exceptionIcons: Record<
  Exclude<ExceptionType, null>,
  React.ComponentType<{ className?: string }>
> = {
  DELAYED: AlertTriangle,
  TRACKING_UNAVAILABLE: HelpCircle,
  DELIVERED_NOT_RECEIVED: CircleAlert,
};

interface ExceptionBannerProps {
  exception: Exclude<ExceptionType, null>;
}

export function ExceptionBanner({ exception }: ExceptionBannerProps) {
  const config = EXCEPTION_CONFIG[exception];
  const Icon = exceptionIcons[exception];

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg p-3 sm:p-4",
        config.bgClass
      )}
      role="alert"
    >
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          config.colorClass,
          "bg-background/50"
        )}
      >
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className={cn("text-sm font-semibold", config.colorClass)}>
          {config.label}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
          {config.message}
        </p>
        {exception === "DELIVERED_NOT_RECEIVED" && (
          <button className="mt-2 inline-flex items-center gap-1 rounded-md bg-status-error/10 px-3 py-1.5 text-xs font-medium text-status-error transition-colors hover:bg-status-error/20 active:scale-[0.98]">
            Contact Support
          </button>
        )}
      </div>
    </div>
  );
}
