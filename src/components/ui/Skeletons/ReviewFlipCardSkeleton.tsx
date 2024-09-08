import { Card, CardHeader } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

export default function ReviewFlipCardSkeleton() {
  return (
    <Card className="w-full h-[400px]">
      <CardHeader className="flex flex-col items-center justify-center h-full">
        <Skeleton className="w-24 h-24 rounded-full mb-4" />
        <Skeleton className="h-8 w-3/4 mb-2" />
        <div className="flex items-center mb-2 space-x-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-5 h-5 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
    </Card>
  )
}