"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MessageSquare } from "lucide-react"
import { Bar, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { reviewsDataSimmons, reviewsDataBridgeland, reviewsDataCalgaryPlace, reviewsDataChinook, reviewsDataFarmers, reviewsDataHudsons, reviewsDataMarda, reviewsDataMissions, reviewsDataStephenAve, stopWordsArray } from "./constants/constants"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function Dashboard() {
  const keywords = ["best coffee", "artisan", "bad"];
  const negativeKeywords = ["bad", "terrible", "rude"]
  const [sortCriteria, setSortCriteria] = useState("location"); // Default sort by location
  const threshold = 100;

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };



  const reviewsData = [
    ...reviewsDataSimmons,
    ...reviewsDataBridgeland,
    ...reviewsDataCalgaryPlace,
    ...reviewsDataChinook,
    ...reviewsDataFarmers,
    ...reviewsDataHudsons,
    ...reviewsDataMarda,
    ...reviewsDataMissions,
    ...reviewsDataStephenAve
  ];

  const sortedReviews = [...reviewsData].sort((a, b) => {
    if (sortCriteria === "location") {
      return a.location.localeCompare(b.location);
    } else if (sortCriteria === "rating") {
      return parseInt(b.rating) - parseInt(a.rating); // Sort by rating in descending order
    } else if (sortCriteria === "date") {
      return new Date(b.date) - new Date(a.date); // Sort by date in descending order
    }
    return 0;
  });

  const keywordCounts = keywords.reduce((acc, keyword) => {
    acc[keyword] = 0;
    return acc;
  }, {});

  function getCommonWordsInFiveStarReviews(reviews: { rating: string, body: string }[]): [string, number][] {
    const stopWords = new Set(stopWordsArray);
  
    // Step 1: Filter reviews with a rating of 5
    const fiveStarReviews = reviews.filter(review => parseInt(review.rating) === 5);
  
    // Step 2: Tokenize the review text and count word frequency
    const wordFrequency: { [key: string]: number } = {};
  
    fiveStarReviews.forEach(review => {
      const words = review.body
        .toLowerCase() // Convert to lowercase to avoid case sensitivity
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .split(/\s+/); // Split by whitespace to get individual words
  
      words.forEach(word => {
        if (word.length > 2 && !stopWords.has(word)) { // Exclude short words and stop words
          wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }
      });
    });
  
    // Step 3: Sort words by frequency
    const sortedWords: [string, number][] = Object.entries(wordFrequency)
      .sort((a, b) => b[1] - a[1]);
  
    // Return the sorted word frequency
    return Object.entries(wordFrequency)
    .filter(([_, frequency]) => frequency > threshold)  // Filter words above threshold
    .sort(([, a], [, b]) => b - a); 
  }
  const commonWords = getCommonWordsInFiveStarReviews(reviewsData);
  

  const keywordCountsNegative = negativeKeywords.reduce((acc, keyword) => {
    acc[keyword] = 0;
    return acc;
  }, {});

  reviewsData.forEach(review => {
    keywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = review.body.match(regex);
      if (matches) {
        keywordCounts[keyword] += matches.length;
      }
    });
  });

  reviewsData.forEach(review => {
    negativeKeywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = review.body.match(regex);
      if (matches) {
        keywordCountsNegative[keyword] += matches.length;
      }
    });
  });
  const ratings = reviewsData.map(review => parseInt(review.rating));
  const totalReviews = ratings.length;
  const averageRating = (ratings.reduce((sum, rating) => sum + rating, 0) / totalReviews).toFixed(1);

  const ratingDistribution = ratings.reduce((acc, rating) => {
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: 'Number of Reviews',
        data: [
          ratingDistribution[1] || 0,
          ratingDistribution[2] || 0,
          ratingDistribution[3] || 0,
          ratingDistribution[4] || 0,
          ratingDistribution[5] || 0
        ],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: 'Rating Distribution',
        data: [
          ratingDistribution[1] || 0,
          ratingDistribution[2] || 0,
          ratingDistribution[3] || 0,
          ratingDistribution[4] || 0,
          ratingDistribution[5] || 0
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
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
          <TabsTrigger value="chat">Chat</TabsTrigger>
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
                    <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{averageRating}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalReviews}</div>
                  </CardContent>
                </Card>
                <Card>
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
              <CardDescription>Distribution of ratings across all reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64">
                  <Bar data={barData} />
                </div>
                <div className="h-64">
                  <Pie data={pieData} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Chat with your Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="w-full h-[500px] border rounded">
                  <iframe src={"https://www.chatbase.co/chatbot-iframe/hMDhaNLvdyjoukQKDtZJ2"} width="100%" height="100%" frameBorder="0"></iframe>
                </div>
              </div>
            </CardContent>
          </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
  <Card>
    <CardHeader>
      <CardTitle>Reviews</CardTitle>
      <CardDescription>List of your recent Google Reviews</CardDescription>
      {/* Sorting Controls */}
      <div className="flex space-x-4 mt-4">
        <button onClick={() => handleSortChange("location")} className="btn">
          Sort by Location
        </button>
        <button onClick={() => handleSortChange("rating")} className="btn">
          Sort by Rating
        </button>
        <button onClick={() => handleSortChange("date")} className="btn">
          Sort by Date
        </button>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {sortedReviews.map((review, index) => (
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
        <TabsContent value="distribution">

        </TabsContent>
        <TabsContent value="keywords">
        <Card>
  <CardHeader>
    <CardTitle>Top Keywords</CardTitle>
    <CardDescription>Keywords most frequently mentioned in reviews</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Flex container for the two cards */}
    <div className="flex space-x-4">
      {/* Positive Keywords Card */}
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Positive Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(keywordCounts).map(([keyword, count]) => (
              <div key={keyword} className="text-lg font-medium">
                {keyword}: {count}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Negative Keywords Card */}
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Negative Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(keywordCountsNegative).map(([keyword, count]) => (
              <div key={keyword} className="text-lg font-medium">
                {keyword}: {count}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
      <CardHeader>
        <CardTitle>Common Words in 5-Star Reviews</CardTitle>
        <CardDescription>These are the words most frequently mentioned in 5-star reviews.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {commonWords.map(([word, count], index) => (
            <div key={index} className="flex justify-between">
              <span className="text-lg font-medium">{word}</span>
              <span className="text-lg font-medium">{count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    </div>
  </CardContent>
</Card>
</TabsContent>
        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Chat with your Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="w-full h-[500px] border rounded">
                  <iframe src={"https://www.chatbase.co/chatbot-iframe/hMDhaNLvdyjoukQKDtZJ2"} width="100%" height="100%" frameBorder="0"></iframe>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}