import { notFound } from "next/navigation";
import Link from "next/link";
import { mockOrders } from "@/lib/mockData";
import { getOrderBySlug, getOrderSlug } from "@/lib/order-helpers";
import { OrderTrackingView } from "@/components/tracking/order-tracking-view";
import { ArrowLeft } from "lucide-react";

// Generate static params for all orders
export function generateStaticParams() {
  return mockOrders.map((order) => ({
    slug: getOrderSlug(order),
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
    title: `Track ${order.orderNumber}`,
    description: `Track your order ${order.orderNumber} – ${order.items.map((i) => i.name).join(", ")}`,
  };
}

export default async function TrackingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const order = getOrderBySlug(slug);

  if (!order) {
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

      <OrderTrackingView order={order} />
    </div>
  );
}
