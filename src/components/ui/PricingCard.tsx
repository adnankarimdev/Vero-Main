import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PricingCard() {
  return (
    <Card className="w-full max-w-md mx-auto bg-background text-foreground">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Vero Pricing</CardTitle>
        <CardDescription>Our one price fits all model</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold">Monthly Flat Fee per Location</h3>
          <p className="text-3xl font-bold">$20</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70%]">Variable Charges per Location</TableHead>
              <TableHead className="text-right">Fee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Per Negative Review Intercepted</TableCell>
              <TableCell className="text-right">$2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Per Positive Review Not Posted to Google</TableCell>
              <TableCell className="text-right">$1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Per Positive Review Posted to Google</TableCell>
              <TableCell className="text-right">$1.50</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          All prices are in CAD and billed monthly
        </p>
      </CardFooter>
    </Card>
  )
}