import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ArrowUpCircle } from "lucide-react";
import axios from "axios";

export default function UpgradeButton() {
  const { toast } = useToast();
  const router = useRouter();
  const handleStripeTest = () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      toast({
        title: "Please sign in.",
        duration: 3000,
      });
      router.push("/login");
      console.error("Email not found in localStorage");
      return;
    }
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/product-page/`,
        {
          product_id: "prod_Qz5SH3mFC68qkl",
          quantity: "1",
          email: email,
        },
        {
          validateStatus: function (status) {
            return status >= 200 && status < 400; // Accept status codes 2xx and 3xx as successful
          },
        }
      )
      .then((response) => {
        window.location.href = response.data.url;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Button
      variant="ghost"
      className="flex items-center space-x-2 bg-green-500 text-white hover:bg-green-600 transition-colors"
      onClick={handleStripeTest}
    >
      <ArrowUpCircle className="w-5 h-5" />
      <span>Upgrade</span>
    </Button>
  );
}
