"use client";

import React, { useState } from "react";
import Script from "next/script";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./button";
import axios from "axios";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";
import { Place } from "../Types/types";

const GOOGLE_MAPS_API_KEY = "AIzaSyDEJBvbJXfBOqam_dohKIp-9OT6ZBYB2rY";
const GOOGLE_MAPS_API_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;

declare global {
  interface Window {
    google: any;
  }
}

export default function SocialSetup(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [socialHandle, setSocialHandle] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const determineFormattedAddress = () => {
    if (localStorage.getItem("accountType") === "online-business") {
      return "online_place";
    } else if (localStorage.getItem("accountType") === "influencer") {
      return "influencer_place";
    } else {
      return "";
    }
  };
  const handleLocationsSubmit = () => {
    const newPlace: Place = {
      name: socialHandle,
      formatted_address: determineFormattedAddress(),
      place_id: socialHandle,
    };

    newPlace.currentRating = "0";
    newPlace.currentTotalReviews = "0";
    newPlace.websiteUrl = "";
    newPlace.googleTypes = [];

    setIsLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/set-place-ids/`, {
        places: [newPlace],
        userEmail: localStorage.getItem("userEmail"),
      })
      .then((response) => {
        toast({
          title: "Success",
          description: "Instagram handle stored.",
          duration: 1000,
        });
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          title: "Failed to update",
          description: error.response.data.error,
          duration: 1000,
        });
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the state without the '@' symbol
    setSocialHandle(e.target.value.replace(/^@/, ""));
  };
  return (
    <div className="w-full max-w-md space-y-4">
      <Script src={GOOGLE_MAPS_API_URL} />
      <style jsx global>{`
        .pac-container {
          border-radius: 0.5rem;
          border: 1px solid hsl(var(--border));
          box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          font-family: var(--font-sans);
          font-size: 0.875rem;
          z-index: 1100;
        }
        .pac-item {
          padding: 0.5rem 0.75rem;
          color: hsl(var(--foreground));
        }
        .pac-item:hover {
          background-color: hsl(var(--accent));
        }
        .pac-item-selected {
          background-color: hsl(var(--accent));
        }
        .pac-matched {
          font-weight: 600;
        }
      `}</style>
      <div className="space-y-2">
        <Label htmlFor="location">Social Handle</Label>
        <div className="relative">
          <Input
            value={`@${socialHandle}`} // Always display '@' at the beginning
            onChange={handleChange} // Update state without the '@'
            id="location"
            type="text"
            placeholder="Enter any social handle"
            className="w-full"
          />
        </div>
        <Button
          onClick={handleLocationsSubmit}
          variant="outline"
          disabled={isLoading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
