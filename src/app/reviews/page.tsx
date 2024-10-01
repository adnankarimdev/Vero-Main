"use client";

import Reviews from "@/components/ui/Reviews";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Vero Reviews</h1>
      <Reviews />
    </div>
  );
}
