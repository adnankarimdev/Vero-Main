import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TopCustomer } from "../Types/types";

interface TopCustomersTableProps {
  customers: TopCustomer[];
}

export default function TopCustomersTable({
  customers = [],
}: TopCustomersTableProps) {
  return (
    <Table className="w-full mt-2">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Email</TableHead>
          <TableHead className="text-right">Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium text-left">
              {" "}
              <a
                href={`mailto:${customer.email}`}
                className="flex items-center hover:text-primary transition-colors"
                aria-label={`Send email to ${customer.email}`}
              >
                <Badge className="bg-emerald-500">{customer.email}</Badge>
              </a>
            </TableCell>
            <TableCell className="font-medium text-right">
              {customer.count}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
