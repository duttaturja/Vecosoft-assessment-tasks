"use client";

import { useState } from "react";
import Link from "next/link";
import { mockOrders } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  AlertTriangle,
  PackageX,
  Truck,
  HelpCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

const issueTypes = [
  {
    id: "not-received",
    icon: PackageX,
    label: "Package Not Received",
    description: "Marked as delivered but I don't have it",
  },
  {
    id: "damaged",
    icon: AlertTriangle,
    label: "Damaged Package",
    description: "Package arrived damaged or contents broken",
  },
  {
    id: "wrong-item",
    icon: Truck,
    label: "Wrong Item",
    description: "Received a different item than ordered",
  },
  {
    id: "other",
    icon: HelpCircle,
    label: "Other Issue",
    description: "Something else I need help with",
  },
];

export default function ReportPage() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<string>("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col items-center justify-center py-12 text-center animate-slide-up">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-status-delivered-bg mb-4">
            <CheckCircle2 className="size-8 text-status-delivered" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            Report Submitted
          </h2>
          <p className="mt-1.5 max-w-sm text-sm text-muted-foreground leading-relaxed">
            Thank you for letting us know. Our team will investigate and get
            back to you within 24 hours.
          </p>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            Ticket #RPT-{Math.random().toString(36).substring(2, 8).toUpperCase()}
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/" className={buttonVariants({ variant: "default", size: "lg" })}>
              Back to Orders
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setSubmitted(false);
                setSelectedIssue(null);
                setSelectedOrder("");
                setDetails("");
              }}
            >
              Report Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:px-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          Report an Issue
        </h1>
        <p className="text-sm text-muted-foreground max-w-md">
          Something wrong with your order? Let us know and we&apos;ll help
          resolve it as quickly as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Issue type selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            What type of issue are you experiencing?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {issueTypes.map((issue) => (
              <button
                key={issue.id}
                type="button"
                onClick={() => setSelectedIssue(issue.id)}
                className={`flex items-start gap-3 rounded-xl border p-3 sm:p-4 text-left transition-all duration-200 active:scale-[0.99] ${
                  selectedIssue === issue.id
                    ? "border-foreground/20 bg-card shadow-sm ring-1 ring-foreground/5"
                    : "border-border bg-background hover:bg-muted/50 hover:border-border"
                }`}
              >
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    selectedIssue === issue.id
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <issue.icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {issue.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {issue.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Order selection */}
        <div className="space-y-2">
          <label
            htmlFor="order-select"
            className="text-sm font-medium text-foreground"
          >
            Which order is this about?
          </label>
          <select
            id="order-select"
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring"
            required
          >
            <option value="" disabled>
              Select an order...
            </option>
            {mockOrders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.orderNumber} – {order.items[0]?.name} (${order.price.toFixed(2)})
              </option>
            ))}
          </select>
        </div>

        {/* Details */}
        <div className="space-y-2">
          <label
            htmlFor="details"
            className="text-sm font-medium text-foreground"
          >
            Tell us more (optional)
          </label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Describe the issue in detail..."
            rows={4}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring"
          />
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            size="lg"
            disabled={!selectedIssue || !selectedOrder}
            className="w-full sm:w-auto"
          >
            Submit Report
          </Button>
          <Link href="/" className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full sm:w-auto`}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
