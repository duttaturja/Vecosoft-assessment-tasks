import Link from "next/link";
import { PackageX, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12 sm:px-6 sm:py-16">
      <Card className="border-dashed">
        <CardContent className="pt-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <PackageX className="size-8 text-muted-foreground" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                Order Not Found
              </h1>
              <p className="text-sm text-muted-foreground max-w-sm">
                We couldn't find a processing order with that identifier. Please check your order number and try again.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.98]"
            >
              <ArrowLeft className="size-4" />
              Back to orders
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
