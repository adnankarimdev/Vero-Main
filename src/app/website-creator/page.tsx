"use client";

import AnimatedLayout from "@/animations/AnimatedLayout";
import ShopWebsiteForm from "@/components/ui/ShopWebsiteForm";

export default function Dashboard() {
  return (
    <AnimatedLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Vero Website</h1>
        <ShopWebsiteForm />
      </div>
    </AnimatedLayout>
  );
}
