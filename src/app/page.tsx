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
import JsxParser from "react-jsx-parser";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Star, MessageSquare, BarChart, PieChart } from "lucide-react";
import {
  Bar,
  Pie,
  Line,
  Doughnut,
  Radar,
  PolarArea,
  Bubble,
  Scatter,
} from "react-chartjs-2";
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
import { Button } from "@/components/ui/button";
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
  RadialLinearScale,
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
import SmartReviewBuilder from "@/components/ui/SmartReviewBuilder";

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
  RadarController,
  RadialLinearScale
);

export default function Dashboard() {
  const BarChart = (props: any) => {
    return <Bar {...props} />;
  };

  // Wrapper for Pie Chart
  const PieChart = (props: any) => {
    return <Pie {...props} />;
  };

  // Wrapper for Line Chart
  const LineChart = (props: any) => {
    return <Line {...props} />;
  };

  // Wrapper for Doughnut Chart
  const DoughnutChart = (props: any) => {
    return <Doughnut {...props} />;
  };

  // Wrapper for Radar Chart
  const RadarChart = (props: any) => {
    return <Radar {...props} />;
  };

  // Wrapper for PolarArea Chart
  const PolarAreaChart = (props: any) => {
    return <PolarArea {...props} />;
  };

  // Wrapper for Bubble Chart
  const BubbleChart = (props: any) => {
    return <Bubble {...props} />;
  };

  // Wrapper for Scatter Chart
  const ScatterChart = (props: any) => {
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
  const [returnedGraph, setReturnedGraph] = useState<string>("");
  const { toast } = useToast();
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
    new Set(reviewsData.map((review) => review.location))
  );

  const filteredReviews =
    selectedLocation && selectedLocation !== "All"
      ? reviewsData.filter((review) => review.location === selectedLocation)
      : reviewsData; // Show all reviews if no location is selected

  const finalFilteredReviews = filteredReviews.filter((review) =>
    searchQuery
      ? review.body.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const keywordCounts: KeywordCounts = keywords.reduce(
    (acc: KeywordCounts, keyword) => {
      acc[keyword] = 0;
      return acc;
    },
    {}
  );

  const handleSubmit = () => {
    axios
      .post("http://localhost:8021/backend/create-charts/", {
        query: searchQueryGpt,
      })
      .then((response) => {
        // Handle success response
        const codeString = response.data["content"]
          .replace(/```jsx/g, "")
          .replace(/```/g, "");
        console.log(codeString);
        toast({
          title: "Graph Generated",
        });
        setReturnedGraph(codeString);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  function getCommonWordsInFiveStarReviews(
    reviews: { rating: string; body: string }[]
  ): [string, number][] {
    const stopWords = new Set(stopWordsArray);

    // Step 1: Filter reviews with a rating of 5
    const fiveStarReviews = reviews.filter(
      (review) => parseInt(review.rating) === 5
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
      (a, b) => b[1] - a[1]
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
    {} as KeywordCounts
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
    {}
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

  return <SmartReviewBuilder />;
}
