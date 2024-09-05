import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableSkeletonLoader() {
  return (
    <Table className="w-full mt-2">
      <TableCaption>
        <Skeleton className="h-4 w-64 mx-auto" />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="h-4 w-20" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-28" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-40" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-48" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-48" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index} className="text-center">
            <TableCell className="text-left">
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16 mx-auto" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16 mx-auto" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16 mx-auto" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16 mx-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
