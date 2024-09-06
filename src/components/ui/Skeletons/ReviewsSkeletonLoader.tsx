import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function ReviewsSkeletonLoader() {
  return (
    <div className="space-y-8">
      {[...Array(3)].map((_, index) => (
        <Card key={index} className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex flex-col space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="w-5 h-5 rounded-full" />
                ))}
              </div>
            </CardTitle>
          </CardHeader>
          <Separator className="mb-4" />
          <CardContent className="grid gap-4">
            <div>
              <Skeleton className="h-6 w-36 mb-2" />
              <div className="flex flex-wrap gap-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-5 w-24 rounded-full" />
                ))}
              </div>
            </div>
            <Separator className="mb-4" />
            <div>
              <Skeleton className="h-6 w-24 mb-2" />
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-5 w-20 rounded-full" />
                ))}
              </div>
            </div>
            <Separator className="mb-4" />
            <div>
              <Skeleton className="h-6 w-36 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-2/3 mt-2" />
            </div>
            <Separator className="mb-4" />
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
