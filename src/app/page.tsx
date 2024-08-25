"use client";

import { useState } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JsxParser from 'react-jsx-parser';
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, BarChart, PieChart } from "lucide-react";
import { Bar, Pie, Line, Doughnut, Radar, PolarArea, Bubble, Scatter } from 'react-chartjs-2';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement, 
  LineElement, 
  RadarController,
} from "chart.js";
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
  stopWordsArray,
} from "./constants/constants";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  RadarController
);

export default function Dashboard() {
  
  const BarChart = (props:any) => {
    return <Bar {...props} />;
  };
  
  // Wrapper for Pie Chart
  const PieChart = (props:any) => {
    return <Pie {...props} />;
  };
  
  // Wrapper for Line Chart
  const LineChart = (props:any) => {
    return <Line {...props} />;
  };
  
  // Wrapper for Doughnut Chart
  const DoughnutChart = (props:any) => {
    return <Doughnut {...props} />;
  };
  
  // Wrapper for Radar Chart
  const RadarChart = (props:any) => {
    return <Radar {...props} />;
  };
  
  // Wrapper for PolarArea Chart
  const PolarAreaChart = (props:any) => {
    return <PolarArea {...props} />;
  };
  
  // Wrapper for Bubble Chart
  const BubbleChart = (props:any) => {
    return <Bubble {...props} />;
  };
  
  // Wrapper for Scatter Chart
  const ScatterChart = (props:any) => {
    return <Scatter {...props} />;
  };
  const keywords = [
    "Best Coffee",
    "Specialty Coffee",
    "Artisan Coffee",
    "Gourmet Coffee",
    "Freshly Brewed Coffee",
    "Cozy Cafe",
    "Best Coffee Experience",
    "Quiet Coffee Shop",
    "Study Cafe",
    "Coffee Date Spot",
    "Pet-Friendly Cafe",
    "Community Coffee Shop",
    "Coffee Tasting",
    "Barista Crafted Coffee",
    "Signature Coffee Drinks",
    "Custom Blends",
    "Gourmet Pastries",
    "Artisan Teas",
    "Local Bakery Goods",
    "Healthy Snacks",
    "Handmade Desserts",
    "Breakfast Cafe",
    "Brunch Spot",
  ];
  const negativeKeywords = [
    "Bad Service",
    "Rude Staff",
    "Cold Coffee",
    "Overpriced",
    "Stale Pastries",
    "Noisy Environment",
    "Long Wait Times",
    "Uncomfortable Seating",
    "Dirty Tables",
    "Poor Quality",
    "Slow Service",
    "Burnt Coffee",
    "Limited Menu",
    "Crowded",
    "Unfriendly Staff",
    "Weak Coffee",
    "Disappointing Experience",
    "Unhygienic",
    "Underwhelming",
    "Poor WiFi",
  ];
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryGpt, setSearchQueryGpt] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [returnedGraph, setReturnedGraph] = useState<string>("")
  const threshold = 100;

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
    new Set(reviewsData.map((review) => review.location)),
  );

  const filteredReviews =
    selectedLocation && selectedLocation !== "All"
      ? reviewsData.filter((review) => review.location === selectedLocation)
      : reviewsData; // Show all reviews if no location is selected

  const finalFilteredReviews = filteredReviews.filter((review) =>
    searchQuery
      ? review.body.toLowerCase().includes(searchQuery.toLowerCase())
      : true,
  );

  const keywordCounts: KeywordCounts = keywords.reduce(
    (acc: KeywordCounts, keyword) => {
      acc[keyword] = 0;
      return acc;
    },
    {},
  );

  const handleSubmit = () => {
    axios.post("http://localhost:8021/backend/create-charts/", {
      query: searchQueryGpt,
    })
    .then(response => {
      // Handle success response
      const codeString = response.data["content"].replace(/```jsx/g, "").replace(/```/g, "");
      console.log(codeString);
      setReturnedGraph(codeString)
    })
    .catch(error => {
      // Handle error
      console.error(error);
    });
  };

  function getCommonWordsInFiveStarReviews(
    reviews: { rating: string; body: string }[],
  ): [string, number][] {
    const stopWords = new Set(stopWordsArray);

    // Step 1: Filter reviews with a rating of 5
    const fiveStarReviews = reviews.filter(
      (review) => parseInt(review.rating) === 5,
    );

    // Step 2: Tokenize the review text and count word frequency
    const wordFrequency: { [key: string]: number } = {};

    fiveStarReviews.forEach((review) => {
      const words = review.body
        .toLowerCase() // Convert to lowercase to avoid case sensitivity
        .replace(/[^\w\s]/g, "") // Remove punctuation
        .split(/\s+/); // Split by whitespace to get individual words

      words.forEach((word) => {
        if (word.length > 2 && !stopWords.has(word)) {
          // Exclude short words and stop words
          wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }
      });
    });

    // Step 3: Sort words by frequency
    const sortedWords: [string, number][] = Object.entries(wordFrequency).sort(
      (a, b) => b[1] - a[1],
    );

    // Return the sorted word frequency
    return Object.entries(wordFrequency)
      .filter(([_, frequency]) => frequency > threshold) // Filter words above threshold
      .sort(([, a], [, b]) => b - a);
  }
  const commonWords = getCommonWordsInFiveStarReviews(reviewsData);

  type KeywordCounts = {
    [key: string]: number;
  };

  const keywordCountsNegative: KeywordCounts = negativeKeywords.reduce(
    (acc: KeywordCounts, keyword) => {
      acc[keyword] = 0;
      return acc;
    },
    {} as KeywordCounts,
  );

  reviewsData.forEach((review) => {
    keywords.forEach((keyword) => {
      const regex = new RegExp(keyword, "gi");
      const matches = review.body.match(regex);
      if (matches) {
        keywordCounts[keyword] += matches.length;
      }
    });
  });

  reviewsData.forEach((review) => {
    negativeKeywords.forEach((keyword) => {
      const regex = new RegExp(keyword, "gi");
      const matches = review.body.match(regex);
      if (matches) {
        keywordCountsNegative[keyword] += matches.length;
      }
    });
  });
  const ratings = reviewsData.map((review) => parseInt(review.rating));
  const totalReviews = ratings.length;
  const averageRating = (
    ratings.reduce((sum, rating) => sum + rating, 0) / totalReviews
  ).toFixed(1);

  type RatingDistribution = { [key: number]: number };

  const ratingDistribution: RatingDistribution = ratings.reduce(
    (acc: RatingDistribution, rating) => {
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    },
    {},
  );

  const barData = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "Number of Reviews",
        data: [
          ratingDistribution[1] || 0,
          ratingDistribution[2] || 0,
          ratingDistribution[3] || 0,
          ratingDistribution[4] || 0,
          ratingDistribution[5] || 0,
        ],
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "Rating Distribution",
        data: [
          ratingDistribution[1] || 0,
          ratingDistribution[2] || 0,
          ratingDistribution[3] || 0,
          ratingDistribution[4] || 0,
          ratingDistribution[5] || 0,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Google Reviews Dashboard</h1>
      <Tabs defaultValue="summary">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="keywords">Top Keywords</TabsTrigger>
          <TabsTrigger value="Auto Respond to Reviews">
            Auto Respond to Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
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
                  <CardTitle>Ask your reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Input
                      className="w-full h-[50px] px-4 py-3 text-lg overflow-x-auto"
                      placeholder=""
                      value={searchQueryGpt}
                      onChange={(e) => setSearchQueryGpt(e.target.value)}
                    />
                    <Button variant="outline" onClick={handleSubmit}>Submit</Button>
                  </div>
                </CardContent>
              </Card>
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
                          CardContent
                        }}
                          jsx={returnedGraph}
                        />
                      )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>
                List of your recent Google Reviews
              </CardDescription>
              {/* Sorting Controls */}
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
                    {uniqueLocations.map((location, index) => (
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
                {finalFilteredReviews.map((review, index) => (
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
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="distribution"></TabsContent>
        <TabsContent value="keywords">
          <Card>
            <CardHeader>
              <CardTitle>Top Keywords</CardTitle>
              <CardDescription>
                Keywords most frequently mentioned in reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Flex container for the two cards */}
              <div className="flex space-x-4">
                {/* Positive Keywords Card */}
                <Card className="flex-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Positive Keywords
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(keywordCounts).map(([keyword, count]) => (
                        <div key={keyword} className="text-lg font-medium">
                          <Badge
                            variant="destructive"
                            className="bg-green-500 text-white"
                          >
                            {keyword}: {count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Negative Keywords Card */}
                <Card className="flex-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Negative Keywords
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(keywordCountsNegative).map(
                        ([keyword, count]) => (
                          <div key={keyword} className="text-lg font-medium">
                            <Badge variant="destructive">
                              {keyword}: {count}
                            </Badge>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Common Words in 5-Star Reviews</CardTitle>
                    <CardDescription>
                      These are the words most frequently mentioned in 5-star
                      reviews.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {commonWords.map(([word, count], index) => (
                        <div key={index} className="flex justify-between">
                          <Badge
                            variant="destructive"
                            style={{
                              backgroundColor: "#C0AD8D",
                              color: "#FFFFFF",
                            }}
                          >
                            {word}: {count}
                          </Badge>
                          {/* <span className="text-lg font-medium">{word}</span>
              <span className="text-lg font-medium">{count}</span> */}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Auto Respond to Reviews">
          <Card>
            <CardHeader>
              <CardTitle>Coming soon!</CardTitle>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
