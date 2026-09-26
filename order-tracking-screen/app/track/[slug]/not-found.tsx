import Link from "next/link";
import { SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function TrackingNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted mb-4">
        <SearchX className="size-7 text-muted-foreground" />
      </div>
      <h2 className="text-lg font-semibold text-foreground">
        Order Not Found
      </h2>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground leading-relaxed">
        We couldn&apos;t find a tracking number matching this link. Please
        double-check your tracking number or return to your orders.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className={buttonVariants({ variant: "default", size: "lg" })}>
          View All Orders
        </Link>
        <Link href="/report" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Report Issue
        </Link>
      </div>
    </div>
  );
}
