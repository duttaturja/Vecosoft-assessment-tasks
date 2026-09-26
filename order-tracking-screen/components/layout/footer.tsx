import Link from "next/link";
import { Package } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-foreground text-background">
                <Package className="size-3.5" />
              </div>
              <span className="text-sm font-bold tracking-tight text-foreground">
                Vecosoft
              </span>
            </div>
            <p className="max-w-xs text-xs text-muted-foreground leading-relaxed">
              Real-time order tracking for a seamless delivery experience.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Support
              </p>
              <nav className="flex flex-col gap-1.5">
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
                <Link
                  href="/report"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Report Issue
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-border/40 pt-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Vecosoft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
