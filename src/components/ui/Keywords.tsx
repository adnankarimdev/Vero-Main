import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { KeywordCounts } from "../Types/types";
  
  export default function KeywordsTab({
    keywordCounts,
    keywordCountsNegative,
    commonWords,
  }: any) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Keywords</CardTitle>
          <CardDescription>Keywords most frequently mentioned in reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Card className="flex-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Positive Keywords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(keywordCounts).map(
                    ([keyword, count]) => (
                      <div key={keyword} className="text-lg font-medium">
                        <Badge
                          variant="destructive"
                          className="bg-green-500 text-white"
                        >
                          {`${keyword}: ${count}`}
                        </Badge>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
  
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
                        {`${keyword}: ${count}`}
                        </Badge>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
  
            <Card>
              <CardHeader>
                <CardTitle>Common Words in 5-Star Reviews</CardTitle>
                <CardDescription>
                  These are the words most frequently mentioned in 5-star reviews.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {commonWords.map(
                    ([word, count]: [string, number], index: number) => (
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
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    );
  }