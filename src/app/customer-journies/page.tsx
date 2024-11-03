"use client";

import CustomerJourney from "@/components/ui/CustomerJourney";
import AnimatedLayout from "@/animations/AnimatedLayout";
export default function Dashboard() {
  return (
    <AnimatedLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Vero Customer Journey
        </h1>
        <CustomerJourney />
      </div>
    </AnimatedLayout>
  );
}
