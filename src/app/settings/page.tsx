"use client";

import ClientSettings from "@/components/ui/ClientSettings";

export default function DashboardRoute() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Vero Review Platform Settings</h1>
      <ClientSettings />
    </div>
  );
}
