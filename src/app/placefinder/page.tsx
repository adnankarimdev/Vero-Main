"use client";

import GooglePlacesAutocomplete from "@/components/ui/GooglePlacesAutocomplete";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-center min-h-screen">
        <GooglePlacesAutocomplete />
      </div>
    </div>
  );
}
