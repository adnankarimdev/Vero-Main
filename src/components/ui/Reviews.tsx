import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";

export default function ReviewsTab({
  searchQuery,
  setSearchQuery,
  uniqueLocations,
  setSelectedLocation,
  finalFilteredReviews,
}: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
        <CardDescription>List of your recent Google Reviews</CardDescription>
        <div className="flex space-x-4 mt-4">
          <Input
            className="w-[300px]"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={0} value="All">
                {" "}
                All{" "}
              </SelectItem>
              {uniqueLocations.map((location: string, index: number) => (
                <SelectItem key={index + 1} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {finalFilteredReviews.map(
            (
              review: {
                location: string;
                date: string;
                rating: string;
                body: string;
              },
              index: number
            ) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{review.location}</CardTitle>
                  <CardDescription>{review.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{review.rating}</span>
                  </div>
                  <p>{review.body}</p>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </CardContent>
    </Card>
    
  );
}
