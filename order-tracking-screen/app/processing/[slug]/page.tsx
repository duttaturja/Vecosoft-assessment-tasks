import { notFound } from "next/navigation";
import Link from "next/link";
import { mockOrders } from "@/lib/mockData";
import { getOrderBySlug } from "@/lib/order-helpers";
import { OrderTrackingView } from "@/components/tracking/order-tracking-view";
import { ArrowLeft, Shield } from "lucide-react";

// Generate static params for orders without tracking
export function generateStaticParams() {
  return mockOrders
    .filter((order) => order.exception === "TRACKING_UNAVAILABLE")
    .map((order) => ({
      slug: order.orderNumber,
    }));
}

// Dynamic metadata per order
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const order = getOrderBySlug(slug);
  if (!order) {
    return { title: "Order Not Found" };
  }
  return {
    title: `Processing ${order.orderNumber}`,
    description: `Order ${order.orderNumber} is being processed`,
  };
}

export default async function ProcessingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const order = getOrderBySlug(slug);

  if (!order || order.exception !== "TRACKING_UNAVAILABLE") {
    notFound();
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:px-6 sm:py-8 space-y-4">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground group"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        Back to orders
      </Link>

      {/* Admin view notice */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20 px-4 py-3">
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-blue-900 dark:text-blue-200" />
          <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
            Admin View Only - Tracking Not Available
          </p>
        </div>
        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
          This order is still being processed. Tracking information will be available once the carrier receives the package.
        </p>
      </div>

      <OrderTrackingView order={order} />
    </div>
  );
}
