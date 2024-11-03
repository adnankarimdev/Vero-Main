"use client";

import Reviews from "@/components/ui/Reviews";
import AnimatedLayout from "@/animations/AnimatedLayout";
export default function Dashboard() {
  return (
    <AnimatedLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Vero Reviews</h1>
        <Reviews />
      </div>
    </AnimatedLayout>
  );
}
