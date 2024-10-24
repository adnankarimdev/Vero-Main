"use client";

import CustomerJourney from "@/components/ui/CustomerJourney";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Vero Customer Journey
      </h1>
      <CustomerJourney />
    </div>
  );
}
