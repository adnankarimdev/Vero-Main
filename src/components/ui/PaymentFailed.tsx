import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertCircle } from "lucide-react"

export default function PaymentFailed() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <CardTitle className="text-2xl font-bold">Payment Unsuccessful</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            We're sorry, but your payment could not be processed at this time.
          </p>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Error Code</span>
              <span className="text-gray-600">ERR-1234</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Date</span>
              <span className="text-gray-600">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Amount</span>
              <span className="text-gray-600">$99.99</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            This could be due to insufficient funds, an expired card, or a temporary issue with your payment provider.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full">Try Again</Button>
          <Button variant="outline" className="w-full">
            Contact Support
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}