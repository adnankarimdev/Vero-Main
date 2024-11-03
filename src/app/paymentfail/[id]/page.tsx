"use client";

import PaymentFailed from "@/components/ui/PaymentFailed";
import AnimatedLayout from "@/animations/AnimatedLayout";

export default function Dashboard() {
  return (
    <AnimatedLayout>
      <div className="container mx-auto p-4">
        <PaymentFailed />
      </div>
    </AnimatedLayout>
  );
}
