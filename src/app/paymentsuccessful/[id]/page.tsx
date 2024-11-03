"use client";

import PaymentSuccessful from "@/components/ui/PaymentSuccessful";
import AnimatedLayout from "@/animations/AnimatedLayout";

export default function Dashboard() {
  return (
    <AnimatedLayout>
      <div className="container mx-auto p-4">
        <PaymentSuccessful />
      </div>
    </AnimatedLayout>
  );
}
