import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessful() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <CardTitle className="text-2xl font-bold">
            Payment Successful
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            Thank you for your purchase. Your order has been processed
            successfully. You have been emailed the details of your purchase.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => router.push("/dashboard")}
          >
            Return to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
