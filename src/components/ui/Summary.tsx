import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star, MessageSquare, ChartSpline } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import JsxParser from "react-jsx-parser";
import Iframe from 'react-iframe'

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
        <CardDescription>Overview of your Google Reviews</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {"Average Rating (All Locations)"}
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageRating}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {"Total Reviews (All Locations"}
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalReviews}</div>
            </CardContent>
          </Card>
          <Card>
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
          </Card>
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
