import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerReviewInfoFromSerializer } from "../Types/types";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import ReviewsSkeletonLoader from "./Skeletons/ReviewsSkeletonLoader";
import FlipCards from "./FlipCards";
import ReviewsClassic from "./ReviewsClassic";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ReviewsTab({}: any) {
  const [placeIds, setPlaceIds] = useState([]);
  const { toast } = useToast();
  const router = useRouter();
  const [streamlinedView, setStreamlinedView] = useState(true);
  const [reviews, setReviews] = useState<CustomerReviewInfoFromSerializer[]>(
    []
  );
  const customerProfiles = [
    {
      id: 1,
      customerProfile: "Grumpy Gus",
      Description: "Totally unimpressed and ready to rant.",
    },
    {
      id: 2,
      customerProfile: "Meh Maggie",
      Description: "Couldn’t care less, just average.",
    },
    {
      id: 3,
      customerProfile: "Content Carl",
      Description: "Fine with it, nothing to write home about.",
    },
    {
      id: 4,
      customerProfile: "Chipper Charlie",
      Description: "Quite happy, had a good time!",
    },
    {
      id: 5,
      customerProfile: "Raving Ricky",
      Description: "Absolutely thrilled, shouting from the rooftops!",
    },
  ];
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) {
          toast({
            title: "Please sign in.",
            duration: 3000,
          });
          router.push("/login");
          console.error("Email not found in localStorage");
          return;
        }

        // First, fetch the placeId
        const placeIdResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/get-place-id-by-email/${email}/`
        );
        setPlaceIds(placeIdResponse.data.placeIds);

        const placeIdsAsArray = placeIdResponse.data.places.map(
          (place: any) => place.place_id
        );
        const placeIdsQuery = placeIdsAsArray.join(",");

        const reviewSettingsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/get-review-settings/${placeIdsQuery}/`
        );
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/get-reviews-by-client-ids/`,
          {
            params: {
              clientIds: placeIdsAsArray,
            },
          }
        );
        const data = response.data as CustomerReviewInfoFromSerializer[];
        const updatedReviews = data.map((review) => {
          // Convert badges JSON string to array or empty array if invalid
          const badgesArray = review.badges ? JSON.parse(review.badges) : [];
          return {
            ...review,
            badges: Array.isArray(badgesArray) ? badgesArray : [],
            internal_google_key_words: findKeywordsInReview(
              review.final_review_body,
              reviewSettingsResponse.data.keywords
            ),
          };
        });
        setReviews(updatedReviews.reverse() as any);
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

  const findKeywordsInReview = (textBody: string, keywordsArray: string[]) => {
    const foundKeywords: string[] = [];

    keywordsArray.forEach((keyword) => {
      if (textBody.toLowerCase().includes(keyword.toLowerCase())) {
        foundKeywords.push(keyword);
      }
    });

    return foundKeywords;
  };

  const avatarImage = (rating: number) => {
    return `/Avatars/rating${rating}.png`;
  };
  return (
    <div className="space-y-8">
      <div className="relative flex justify-end">
        {/* <div className="flex items-center">
          <Switch
            id="airplane-mode"
            checked={streamlinedView}
            onCheckedChange={(checked) => setStreamlinedView(checked)}
          />
          <Label htmlFor="airplane-mode" className="ml-2">
            Streamlined View
          </Label>
        </div> */}
      </div>
      {isLoading && <ReviewsSkeletonLoader />}

      {!isLoading && streamlinedView && <FlipCards reviews={reviews} />}

      {!isLoading && !streamlinedView && <ReviewsClassic reviews={reviews} />}

      {!isLoading && reviews.length == 0 && (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-xl md:text-xl lg:text-xl font-bold tracking-tight">
            Watch Vero work its magic. Reviews coming soon! 🚀
          </h1>
        </div>
      )}
    </div>
  );
}
