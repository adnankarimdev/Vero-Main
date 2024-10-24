"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChartCustomerJourneyFormat,
  CustomerReviewInfoFromSerializer,
} from "../Types/types";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomerJourneyChart } from "./CustomerJourneyChart";

type RatingToBadges = {
  [key: number]: string[];
};

export default function CustomerJourney() {
  const router = useRouter();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<CustomerReviewInfoFromSerializer[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [placeIds, setPlaceIds] = useState([]);
  const [customerJournies, setCustomerJournies] = useState<{
    [key: string]: any;
  }>({});
  const [customerEmail, setCustomerEmail] = useState("");
  const [ratingToBadgesData, setRatingsToBadgesData] = useState<RatingToBadges>(
    {}
  );
  const [chartData, setChartData] = useState<ChartCustomerJourneyFormat[]>([]);

  const findKeywordsInReview = (textBody: string, keywordsArray: string[]) => {
    const foundKeywords: string[] = [];
    keywordsArray.forEach((keyword) => {
      if (textBody.toLowerCase().includes(keyword.toLowerCase())) {
        foundKeywords.push(keyword);
      }
    });
    return foundKeywords;
  };

  function groupReviewsByCustomerEmail(
    reviews: CustomerReviewInfoFromSerializer[]
  ) {
    return reviews.reduce((acc: { [key: string]: any }, review) => {
      const { customer_email, rating, review_date, badges } = review;
      if (!acc[customer_email] && customer_email !== "") {
        acc[customer_email] = [];
      }
      if (customer_email !== "") {
        acc[customer_email].push({
          rating,
          review_date,
          badges,
        });
      }
      return acc;
    }, {});
  }

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
        const customerJourniesAdjusted = groupReviewsByCustomerEmail(data);
        console.log("journey", customerJourniesAdjusted);
        setCustomerJournies(customerJourniesAdjusted);
        const updatedReviews = data.map((review) => {
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
        setRatingsToBadgesData(ratingToBadges(updatedReviews));
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(customerJournies).length > 0) {
      handleCustomerClick(Object.keys(customerJournies)[0]);
    }
  }, [customerJournies]);

  function ratingToBadges(reviews: any): Record<number, string[]> {
    return reviews.reduce(
      (acc: any, review: any) => {
        const { rating, badges } = review;
        if (!acc[rating]) {
          acc[rating] = [];
        }
        acc[rating] = acc[rating].concat(badges);
        return acc;
      },
      {} as Record<number, string[]>
    );
  }

  const avatarImage = (rating: number): string => {
    return `/Avatars/rating${rating}.png`;
  };

  const handleCustomerClick = (customer_email: string) => {
    setCustomerEmail(customer_email);
    setChartData(customerJournies[customer_email]);
  };

  return (
    <div className="flex h-screen bg-white">
      {Object.keys(customerJournies).length === 0 && (
        <div className="flex items-center justify-center w-full">
          <p className="text-center">
            {
              "You can start viewing customer journeys once a signed up Vero user leaves reviews for you! 🤗"
            }
          </p>
        </div>
      )}
      {Object.keys(customerJournies).length > 0 && (
        <>
          <div className="w-1/3 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold">Customers</h2>
              <p className="text-gray-500 text-xs">
                Click on a customer to see their journey at your location(s).
              </p>
            </div>
            <ScrollArea className="h-[calc(100vh-5rem)]">
              {Object.keys(customerJournies).map((customer_email, i) => (
                <div
                  key={customer_email}
                  className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCustomerClick(customer_email)}
                >
                  <Avatar className="h-10 w-10 rounded-full">
                    <AvatarImage src={avatarImage(5)} />
                    <AvatarFallback>{customer_email.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold">{customer_email}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div className="flex-1 flex  justify-center">
            <div className="w-4/5 max-w-4xl">
              <CustomerJourneyChart
                chartData={chartData}
                chartTitle={`Customer: ${customerEmail.split("@")[0]}`}
                chartDescription={""}
                chartFact={""}
                chartFooter={`email: ${customerEmail}`}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
