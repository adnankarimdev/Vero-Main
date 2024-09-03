"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const onGetStarted = () => {
    router.push("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">
            Welcome to Redefeyn
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Redefeyn helps businesses collect authentic feedback and manage
            their reputation through an intuitive dashboard.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full" size="lg" onClick={onGetStarted}>
            Get Started
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
