"use client";

import { TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { TbReportAnalytics } from "react-icons/tb";
import { Button } from "./button";
import MarkdownReader from "./MarkdownReader";
import RecordingLoader from "./Skeletons/RecordingLoader";
import { AestheticLoader } from "./Skeletons/GeneratingLoader";

export const description = "A stacked area chart";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: `hsl(var(--chart-${Math.floor(Math.random() * 2) + 1}))`,
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CustomerJourneyChart({
  chartData,
  chartTitle,
  chartDescription,
  chartFact,
  chartFooter,
}: any) {
  const [customerJourneyAnalysis, setCustomerJourneyAnalysis] = useState("");
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [isAlreadyCalled, setIsAlreadyCalled] = useState(false);
  const { toast } = useToast();

  const getCustomerAnalysis = async () => {
    setIsAlertDialogOpen(true);
    if (isAlreadyCalled) {
      return; // If already called, exit the function.
    }
    setIsAlreadyCalled(true);
    setIsContentLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/customer-journey-analysis/`,
        {
          chartData: chartData,
        }
      )
      .then((response) => {
        console.log(response.data.content);
        setIsContentLoading(false);
        setCustomerJourneyAnalysis(response.data.content);
      })
      .catch((error) => {
        setIsContentLoading(false);
        toast({
          title: "Failed to analyze customer",
          description: "Please try again.",
          duration: 1000,
        });
      });
  };

  useEffect(() => {
    setIsAlreadyCalled(false);
  }, [chartData]);
  return (
    <div>
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent className="max-w-4xl">
          <AlertDialogHeader>
            <AlertDialogTitle>{chartTitle}</AlertDialogTitle>
          </AlertDialogHeader>
          {isContentLoading && <AestheticLoader />}
          {!isContentLoading && (
            <MarkdownReader content={customerJourneyAnalysis} />
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Card className="w-full max-w">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {chartTitle.split("Customer: ")[1]}
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardDescription>{chartDescription}</CardDescription>

        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 20,
                right: 12,
                top: 10,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="review_date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="mobile"
                type="natural"
                fill="var(--color-mobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="rating"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                {/* Trending up by 5.2% this month <TrendingUp className="h-4 w-4" /> */}
                {chartFact}
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                {chartFooter}
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-auto"
                    onClick={getCustomerAnalysis}
                  >
                    Deeper Insights
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-black border border-gray-200 shadow-md">
                  <p>{`Find out deeper insights about ${chartTitle.split("Customer: ")[1]}`}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
