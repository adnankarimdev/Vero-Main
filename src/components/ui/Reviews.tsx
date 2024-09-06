import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  MapPin,
  ThumbsUp,
  ThumbsDown,
  Send,
  Clock,
  Mail,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  CustomerReviewInfo,
  CustomerReviewInfoFromSerializer,
} from "../Types/types";
import { useState, useEffect } from "react";
import axios from "axios";
import ReviewsSkeletonLoader from "./Skeletons/ReviewsSkeletonLoader";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ReviewsTab({
  searchQuery,
  setSearchQuery,
  uniqueLocations,
  setSelectedLocation,
  finalFilteredReviews,
}: any) {
  const [placeIds, setPlaceIds] = useState([]);
  const [reviews, setReviews] = useState<CustomerReviewInfoFromSerializer[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        console.log("email in local", email);
        if (!email) {
          console.error("Email not found in localStorage");
          return;
        }

        // First, fetch the placeId
        const placeIdResponse = await axios.get(
          `http://localhost:8021/backend/get-place-id-by-email/${email}/`
        );
        setPlaceIds(placeIdResponse.data.placeIds);

        const placeIdsAsArray = placeIdResponse.data.places.map(
          (place: any) => place.place_id
        );
        console.log(placeIdsAsArray);
        const placeIdsQuery = placeIdsAsArray.join(",");

        const response = await axios.get(
          "http://localhost:8021/backend/get-reviews-by-client-ids/",
          {
            params: {
              clientIds: placeIdsAsArray,
            },
          }
        );
        console.log("Reviews:", response.data);
        const data = response.data as CustomerReviewInfoFromSerializer[];
        const updatedReviews = data.map((review) => {
          // Convert badges JSON string to array or empty array if invalid
          const badgesArray = review.badges ? JSON.parse(review.badges) : [];
          return {
            ...review,
            badges: Array.isArray(badgesArray) ? badgesArray : [],
          };
        });
        setReviews(updatedReviews);
        console.log(updatedReviews);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        false;
      }
    };

    fetchData();
  }, []);

  const capitalizeFirstLetter = (string: string) => {
    if (!string) return ""; // Handle empty or null strings
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="space-y-8">
      {isLoading && <ReviewsSkeletonLoader />}
      {reviews.map((review) => (
        <Card key={review.id} className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="flex items-center">{review.location}</span>
                <span className="text-sm text-muted-foreground">
                  {review.review_date}
                </span>
              </div>

              <span className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </span>
            </CardTitle>
          </CardHeader>
          <Separator className="mb-4" />
          <CardContent className="grid gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Review Analysis</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(review.analyzed_review_details).length != 0 && (
                  <Badge variant="outline">
                    Emotion:{" "}
                    {capitalizeFirstLetter(
                      review.analyzed_review_details.emotion
                    )}
                  </Badge>
                )}
                {Object.keys(review.analyzed_review_details).length != 0 && (
                  <Badge variant="outline">
                    Tone:{" "}
                    {capitalizeFirstLetter(review.analyzed_review_details.tone)}
                  </Badge>
                )}
                <Badge variant="outline">
                  {review.posted_to_google_review
                    ? "Posted to Google: 🥳"
                    : "Posted to Google: 🚫"}
                </Badge>
                {review.generated_review_body !== "" && (
                  <Badge variant="outline">{"AI-assisted review: 🤖"}</Badge>
                )}
                <Badge variant="outline">
                  {review.email_sent_to_company
                    ? "Email Sent: ✅"
                    : "Email Sent: ❌"}
                </Badge>
                <Badge variant="outline">
                  {"Review Writing Time: "}
                  {review.time_taken_to_write_review_in_seconds.toFixed(2)}s
                </Badge>
              </div>
            </div>
            <div>
              <Separator className="mb-4" />
              <h3 className="text-lg font-semibold mb-2">Badges</h3>
              <div className="flex flex-wrap gap-2">
                {review.rating == 5 &&
                  review.badges.map((badge, index) => (
                    <Badge
                      key={index}
                      className="bg-green-500 text-white hover:bg-green-500 hover:text-white cursor-pointer"
                    >
                      {badge}
                    </Badge>
                  ))}
                {review.rating < 5 && (
                  <span className="text-sm text-muted-foreground">
                    {
                      "Badges are given by customers for perfect ratings of 5 stars."
                    }
                  </span>
                )}
              </div>
            </div>
            <div>
              <Separator className="mb-4" />
              <h3 className="text-lg font-semibold mb-2">Review Content</h3>
              <p className="text-sm text-muted-foreground">
                {review.final_review_body ||
                  review.generated_review_body ||
                  "The customer did not provide any review content."}
              </p>
            </div>
            <div>
              <Separator className="mb-4" />
              <h3 className="text-lg font-semibold mb-2">Analysis Reasoning</h3>
              {review.analyzed_review_details.reasoning !== "" && (
                <p className="text-sm text-muted-foreground">
                  {review.analyzed_review_details.reasoning}
                </p>
              )}

              {Object.keys(review.analyzed_review_details).length == 0 && (
                <p className="text-sm text-muted-foreground">
                  {
                    "A 5 star review was left, but no review body was created by the customer."
                  }
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      {!isLoading && reviews.length == 0 && (
        <div className="flex justify-center items-center h-screen">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <span className="flex items-center text-md font-semibold justify-center">
                  Watch Redefeyn work its magic. Reviews coming soon! 🚀
                </span>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      )}
    </div>
  );
}
