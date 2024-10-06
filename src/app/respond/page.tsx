"use client";

import GoogleAutoRespond from "@/components/ui/GoogleAutoRespond";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Vero Respond</h1>
      <GoogleAutoRespond />
    </div>
  );
}
