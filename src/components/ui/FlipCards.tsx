"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { CustomerReviewInfoFromSerializer } from "../Types/types";
import { MdFlip } from "react-icons/md";

type Review = {
  id: string;
  rating: number;
  location: string;
  review_date: string;
  analyzed_review_details: {
    emotion?: string;
    tone?: string;
    reasoning?: string;
  };
  posted_to_google_review: boolean;
  generated_review_body: string;
  email_sent_to_company: boolean;
  posted_with_bubble_rating_platform: boolean;
  badges: string[];
  internal_google_key_words: string[];
  final_review_body: string;
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ReviewCard({ review }: { review: CustomerReviewInfoFromSerializer }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const avatarImage = (rating: number) => {
    return `/Avatars/rating${rating}.png`;
  };
  return (
    <div
      className="w-full h-[400px] perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of the card */}
        <Card className="absolute w-full h-full backface-hidden ">
          <CardHeader className="flex flex-col items-center justify-center h-full ">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={avatarImage(review.rating)} />
            </Avatar>
            <CardTitle className="text-2xl mb-2">{review.location}</CardTitle>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating
                      ? "text-primary fill-primary"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-muted-foreground">{review.review_date}</p>
          </CardHeader>
        </Card>

        {/* Back of the card */}
        <Card className="absolute w-full h-full backface-hidden rotate-y-180 overflow-auto">
          <CardContent className="grid gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 mt-4">
                Review Analysis
              </h3>
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
                    ? "Posted to Google: ✅"
                    : "Posted to Google: 🚫"}
                </Badge>
                <Badge variant="outline">
                  {review.posted_with_in_store_mode
                    ? "In Store Review: ✅"
                    : "In Store Review: 🚫"}
                </Badge>
                {review.generated_review_body !== "" && (
                  <Badge variant="outline">{"AI-assisted review: ✅"}</Badge>
                )}
                <Badge variant="outline">
                  {review.email_sent_to_company
                    ? review.posted_with_in_store_mode
                      ? "Email Sent with Generated Review: ✅"
                      : "Email Sent: ✅ (No Follow-up)"
                    : "Email Sent: ❌"}
                </Badge>
                {/* <Badge variant="outline">
                  {"Review Writing Time: "}
                  {review.time_taken_to_write_review_in_seconds.toFixed(2)}s
                </Badge> */}
              </div>
            </div>
            <div>
              <Separator className="mb-4" />
              <h3 className="text-lg font-semibold mb-2">Badges</h3>
              <div className="flex flex-wrap gap-2">
                {review.posted_with_bubble_rating_platform &&
                  review.badges.map((badge, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-white-500 text-black "
                    >
                      {badge}
                    </Badge>
                  ))}
                {!review.posted_with_bubble_rating_platform && (
                  <span className="text-sm text-muted-foreground">
                    {"Free form platform was used."}
                  </span>
                )}
              </div>
            </div>
            <div>
              <Separator className="mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Google Keywords Mentioned
              </h3>
              <div className="flex flex-wrap gap-2">
                {review.posted_to_google_review &&
                  review.internal_google_key_words.map((badge, index) => (
                    <Badge
                      key={index}
                      className="bg-green-500 text-white hover:bg-green-500 hover:text-white cursor-pointer"
                    >
                      {badge}
                    </Badge>
                  ))}
                {!review.posted_to_google_review && (
                  <span className="text-sm text-muted-foreground">
                    {
                      "No keywords mentioned since this review was not posted to Google."
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
              <h3 className="text-lg font-semibold mb-2">
                Suggested Improvements
              </h3>
              {review.analyzed_review_details.reasoning !== "" && (
                <p className="text-sm text-muted-foreground">
                  {review.analyzed_review_details.reasoning}
                </p>
              )}

              {review.posted_with_bubble_rating_platform && (
                <p className="text-sm text-muted-foreground">
                  {
                    "Posted with Bubble Platform. Analysis is given by the badges."
                  }
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function FlipCards({
  reviews,
}: {
  reviews: CustomerReviewInfoFromSerializer[];
}) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
