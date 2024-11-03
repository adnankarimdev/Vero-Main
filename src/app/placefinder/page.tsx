"use client";

import GooglePlacesAutocomplete from "@/components/ui/GooglePlacesAutocomplete";
import AnimatedLayout from "@/animations/AnimatedLayout";

export default function Dashboard() {
  return (
    <AnimatedLayout>
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-screen">
          <GooglePlacesAutocomplete />
        </div>
      </div>
    </AnimatedLayout>
  );
}
