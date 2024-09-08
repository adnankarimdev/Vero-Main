'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"
import Masonry from 'react-masonry-css'
import { CustomerReviewInfoFromSerializer } from '../Types/types'

// Assuming you have a type for your review
type Review = {
  id: string
  rating: number
  location: string
  review_date: string
  analyzed_review_details: {
    emotion?: string
    tone?: string
    reasoning?: string
  }
  posted_to_google_review: boolean
  generated_review_body: string
  email_sent_to_company: boolean
  posted_with_bubble_rating_platform: boolean
  badges: string[]
  internal_google_key_words: string[]
  final_review_body: string
}

function avatarImage(rating: number) {
  // Implement your avatar image logic here
  return `/avatars/avatar-${rating}.png`
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default function ReviewGrid({ reviews }: { reviews: CustomerReviewInfoFromSerializer[] }) {
  const [columnCount, setColumnCount] = useState(3)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (gridRef.current) {
        const width = gridRef.current.offsetWidth
        if (width < 640) setColumnCount(1)
        else if (width < 1024) setColumnCount(2)
        else setColumnCount(3)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div ref={gridRef} className="w-full p-4">
      <Masonry
        breakpointCols={columnCount}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {reviews.map((review) => (
          <Card key={review.id} className="mb-4 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={avatarImage(review.rating)} />
                </Avatar>
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
                      className={`w-5 h-5 ${i < review.rating ? "text-primary fill-primary" : "text-muted"}`}
                    />
                  ))}
                </span>
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="grid gap-4 p-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Review Analysis</h3>
                <div className="flex flex-wrap gap-2">
                  {review.analyzed_review_details.emotion && (
                    <Badge variant="secondary">
                      Emotion: {capitalizeFirstLetter(review.analyzed_review_details.emotion)}
                    </Badge>
                  )}
                  {review.analyzed_review_details.tone && (
                    <Badge variant="secondary">
                      Tone: {capitalizeFirstLetter(review.analyzed_review_details.tone)}
                    </Badge>
                  )}
                  <Badge variant={review.posted_to_google_review ? "default" : "destructive"}>
                    {review.posted_to_google_review ? "Posted to Google" : "Not on Google"}
                  </Badge>
                  {review.generated_review_body && (
                    <Badge variant="outline">AI-assisted review</Badge>
                  )}
                  <Badge variant={review.email_sent_to_company ? "default" : "destructive"}>
                    {review.email_sent_to_company ? "Email Sent" : "Email Not Sent"}
                  </Badge>
                </div>
              </div>
              {review.posted_with_bubble_rating_platform && review.badges.length > 0 && (
                <div>
                  <Separator className="my-2" />
                  <h3 className="text-lg font-semibold mb-2">Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    {review.badges.map((badge, index) => (
                      <Badge key={index} variant="outline">{badge}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {review.posted_to_google_review && review.internal_google_key_words.length > 0 && (
                <div>
                  <Separator className="my-2" />
                  <h3 className="text-lg font-semibold mb-2">Google Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {review.internal_google_key_words.map((keyword, index) => (
                      <Badge key={index} variant="secondary">{keyword}</Badge>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <Separator className="my-2" />
                <h3 className="text-lg font-semibold mb-2">Review Content</h3>
                <p className="text-sm text-muted-foreground">
                  {review.final_review_body || review.generated_review_body || "No review content provided."}
                </p>
              </div>
              {review.analyzed_review_details.reasoning && (
                <div>
                  <Separator className="my-2" />
                  <h3 className="text-lg font-semibold mb-2">Analysis Reasoning</h3>
                  <p className="text-sm text-muted-foreground">
                    {review.analyzed_review_details.reasoning}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </Masonry>
    </div>
  )
}