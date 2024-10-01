"use client";

import Messenger from "@/components/ui/Messenger";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Vero Messenger</h1>
      <Messenger />
    </div>
  );
}
