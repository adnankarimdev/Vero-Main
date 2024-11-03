"use client";

import AutoRespond from "@/components/ui/AutoRespond";
import AnimatedLayout from "@/animations/AnimatedLayout";

export default function Dashboard() {
  return (
    <AnimatedLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Auto Respond Settings
        </h1>
        <AutoRespond />
      </div>
    </AnimatedLayout>
  );
}
