import { useEffect, useState } from "react";
import { Place } from "../Types/types";
import { Separator } from "@/components/ui/separator";
import { CustomerReviewInfoFromSerializer } from "../Types/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star, MessageSquare, ChartSpline, Ban } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import JsxParser from "react-jsx-parser";
import Iframe from "react-iframe";
import axios from "axios";
import TableSkeletonLoader from "./Skeletons/TableSkeletonLoader";

export default function SummaryTab({
  averageRating,
  totalReviews,
  searchQueryGpt,
  setSearchQueryGpt,
  handleSubmit,
  loading,
  returnedGraph,
  handlePreMadeQueryClick,
  preMadeQueries,
  BarChart,
  PieChart,
  LineChart,
  DoughnutChart,
  RadarChart,
  PolarAreaChart,
  BubbleChart,
  ScatterChart,
  toast,
}: any) {
  const [placesInfo, setPlacesInfo] = useState<Place[]>([]);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [totalNumberOfFiveStarReviews, setTotalNumberOfFiveStarReviews] =
    useState(0);
  const [totalNegativeReviewsPrevented, setTotalNegativeReviewsPrevented] =
    useState(0);
  const [totalReviewsWithVero, setTotalReviewsWithVero] = useState(0)

  const calculateAdditionalReviews = (
    currentRating: number,
    currentReviews: number,
    targetRating: number
  ): number | string => {
    if (targetRating <= currentRating) {
      return "Target rating must be higher than the current rating.";
    }

    // Total rating points for current reviews
    const totalCurrentPoints = currentRating * currentReviews;

    // Solve for the number of additional reviews needed
    const additionalReviews =
      (targetRating * currentReviews - totalCurrentPoints) / (5 - targetRating);

    // Check if the result is a valid number
    if (isNaN(additionalReviews) || additionalReviews < 0) {
      return "Invalid input values.";
    }

    // Round up to the next whole number
    return Math.ceil(additionalReviews);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        console.log("email in local", email);
        if (!email) {
          console.error("Email not found in localStorage");
          return;
        }

        const placeIdResponse = await axios.get(
          `https://vero.ngrok.dev/backend/get-place-id-by-email/${email}/`
        );
        setPlacesInfo(placeIdResponse.data.places);
        const placeIdsAsArray = placeIdResponse.data.places.map(
          (place: any) => place.place_id
        );
        const response = await axios.get(
          "https://vero.ngrok.dev/backend/get-reviews-by-client-ids/",
          {
            params: {
              clientIds: placeIdsAsArray,
            },
          }
        );
        const placeIdsQuery = placeIdsAsArray.join(",")
        const reviewSettingsResponse = await axios.get(
          `https://vero.ngrok.dev/backend/get-review-settings/${placeIdsQuery}/`
        );
        console.log("Reviews:", response.data);
        console.log(reviewSettingsResponse)
        const data = response.data as CustomerReviewInfoFromSerializer[];
        setTotalReviewsWithVero(data.length)
        setTotalNegativeReviewsPrevented(
          data.filter((item) => item.rating <= reviewSettingsResponse.data.worryRating).length
        );
        setTotalNumberOfFiveStarReviews(
          data.filter((item) => item.rating === 5 && (item.posted_to_google_review || item.posted_to_google_after_email_sent)).length
        );
        setIsTableLoading(false);
      } catch (err) {
        console.error(err);
        setIsTableLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Locations</CardTitle>
        <CardDescription>Overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 mb-10">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {"Average Review Rating with Customers using Vero"}
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{5}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {"Total Reviews with Vero"}
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalReviewsWithVero}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {"Negative Reviews Prevented with Vero"}
              </CardTitle>
              <Ban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalNegativeReviewsPrevented}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {"5 Star Reviews Posted with Vero"}
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalNumberOfFiveStarReviews}
              </div>
            </CardContent>
          </Card>
          {/* <Card>
            <CardHeader>
              <CardTitle>Text to Graph</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Textarea
                  className="w-full h-100px px-4 py-3 text-lg overflow-x-auto"
                  placeholder=""
                  value={searchQueryGpt}
                  onChange={(e) => setSearchQueryGpt(e.target.value)}
                />
                <Button
                  variant="outline"
                  onClick={handleSubmit}
                  className="bg-transparent hover:bg-transparent border-none shadow-none"
                >
                  <ChartSpline />
                </Button>
              </div>
              <div className="mt-4 space-y-2">
                {preMadeQueries.map((query: string, index: number) => (
                  <Button
                    key={index}
                    variant="link"
                    className="text-blue-600 hover:underline"
                    onClick={() => handlePreMadeQueryClick(query)}
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card> */}
          {loading && (
            <div className="flex justify-center items-center h-40">
              <Loader />
            </div>
          )}
          {returnedGraph && (
            <JsxParser
              components={{
                BarChart,
                PieChart,
                LineChart,
                DoughnutChart,
                RadarChart,
                PolarAreaChart,
                BubbleChart,
                ScatterChart,
                Card,
                CardHeader,
                CardTitle,
                CardDescription,
                CardContent,
              }}
              jsx={returnedGraph}
            />
          )}
        </div>
        <Separator className="my-4" />
        <CardHeader>
          <CardTitle>Per Location</CardTitle>
          <CardDescription>Overview</CardDescription>
        </CardHeader>

        {isTableLoading && <TableSkeletonLoader />}
        {!isTableLoading && (
          <Table className="w-full mt-2">
            <TableCaption>An overview of all your locations</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Current Rating</TableHead>
                <TableHead>Total Google Reviews</TableHead>
                <TableHead>5-Star Reviews Needed (+0.1)</TableHead>
                <TableHead>5-Star Reviews with Vero</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {placesInfo.map((place) => (
                <TableRow key={place.place_id} className="text-center">
                  <TableCell className="font-medium text-left">
                    {place.name}
                  </TableCell>
                  <TableCell>{place.currentRating}</TableCell>
                  <TableCell>{place.currentTotalReviews}</TableCell>
                  <TableCell>
                    {calculateAdditionalReviews(
                      Number(place.currentRating!),
                      Number(place.currentTotalReviews),
                      Number(place.currentRating! + 0.1)
                    )}
                  </TableCell>
                  <TableCell>{0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
          </Table>
        )}

        {/* <iframe
src="https://www.chatbase.co/chatbot-iframe/hMDhaNLvdyjoukQKDtZJ2"
width="100%"
style="height: 100%; min-height: 700px"
frameborder="0"
></iframe> */}

        {/* <Iframe url="https://www.chatbase.co/chatbot-iframe/hMDhaNLvdyjoukQKDtZJ2"
        width="640px"
        height="320px"
        id=""
        className=""
        display="block"
        position="relative"/> */}
      </CardContent>
    </Card>
  );
}
