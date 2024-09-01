"use client";

import { useState } from "react";
import {
  reviewsDataSimmons,
  reviewsDataBridgeland,
  reviewsDataCalgaryPlace,
  reviewsDataChinook,
  reviewsDataFarmers,
  reviewsDataHudsons,
  reviewsDataMarda,
  reviewsDataMissions,
  reviewsDataStephenAve,
} from "../constants/constants";
import Reviews from "@/components/ui/Reviews";

export default function Dashboard() {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const reviewsData = [
    ...reviewsDataSimmons,
    ...reviewsDataBridgeland,
    ...reviewsDataCalgaryPlace,
    ...reviewsDataChinook,
    ...reviewsDataFarmers,
    ...reviewsDataHudsons,
    ...reviewsDataMarda,
    ...reviewsDataMissions,
    ...reviewsDataStephenAve,
  ];

  const uniqueLocations = Array.from(
    new Set(reviewsData.map((review) => review.location))
  );

  const filteredReviews =
    selectedLocation && selectedLocation !== "All"
      ? reviewsData.filter((review) => review.location === selectedLocation)
      : reviewsData;

  const finalFilteredReviews = filteredReviews.filter((review) =>
    searchQuery
      ? review.body.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div className="container mx-auto p-4">
            <Reviews
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            uniqueLocations={uniqueLocations}
            setSelectedLocation={setSelectedLocation}
            finalFilteredReviews={finalFilteredReviews}
          />
    </div>
  );
}
