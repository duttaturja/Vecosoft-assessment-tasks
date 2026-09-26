import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TrackingSkeleton() {
  return (
    <div className="w-full max-w-lg mx-auto space-y-4 p-4 sm:p-6 animate-fade-in">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>

      {/* Progress tracker skeleton */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between py-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="size-10 rounded-full" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estimated delivery skeleton */}
      <Skeleton className="h-16 w-full rounded-lg" />

      {/* Order summary skeleton */}
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="size-14 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-px w-full" />
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline skeleton */}
      <Card>
        <CardContent>
          <Skeleton className="h-4 w-32 mb-4" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 pb-5 last:pb-0">
              <div className="flex flex-col items-center">
                <Skeleton className="size-8 rounded-full" />
                {i < 3 && <Skeleton className="w-0.5 h-8 mt-1" />}
              </div>
              <div className="flex-1 space-y-1.5 pt-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
