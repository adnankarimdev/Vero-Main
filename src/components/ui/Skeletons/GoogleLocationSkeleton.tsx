import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function GoogleLocationSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-[200px]" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-8 w-[120px]" />
          <Skeleton className="h-8 w-[80px]" />
          <Skeleton className="h-8 w-[110px]" />
          <Skeleton className="h-8 w-[90px]" />
        </div>
      </CardContent>
    </Card>
  )
}