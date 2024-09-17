import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function TabsSkeletonLoader() {
  return (
    <Tabs defaultValue="badges">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="badges">Badges</TabsTrigger>
        <TabsTrigger value="email">Email</TabsTrigger>
        <TabsTrigger value="locations">Locations</TabsTrigger>
      </TabsList>

      <TabsContent value="badges">
        <div className="flex justify-end mb-4">
          <Skeleton className="h-10 w-10" />
        </div>
        {[1, 2, 3].map((rating) => (
          <div key={rating} className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-6 w-32" />
            </div>
            {[1, 2].map((question) => (
              <div key={question} className="flex items-center mb-2 space-x-2">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            ))}
          </div>
        ))}
      </TabsContent>

      <TabsContent value="email">
        <div className="space-y-4">
          {[
            "Client Email",
            "App Password",
            "Email Introduction",
            "Email Body",
            "Email Signature",
          ].map((field) => (
            <div key={field}>
              <Label>{field}</Label>
              <Skeleton
                className={
                  field.includes("Email")
                    ? "h-24 w-full mt-2"
                    : "h-10 w-full mt-2"
                }
              />
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="ratings">
        <div className="space-y-4">
          <div>
            <Label>Worry Rating Threshold</Label>
            <p className="text-gray-500 text-xs">
              Sets the rating threshold to block customers from posting reviews
              on Google, best kept at 4.
            </p>
            <Skeleton className="h-10 w-full mt-2" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-10" />
            <Label>Show Worry Dialog</Label>
          </div>
          <div>
            <Label>Dialog Title</Label>
            <p className="text-gray-500 text-xs">
              This is the worry dialog title that will be shown to customers who
              select a review rating less than the worry rating threshold.
            </p>
            <Skeleton className="h-10 w-full mt-2" />
          </div>
          <div>
            <Label>Dialog Body</Label>
            <p className="text-gray-500 text-xs">
              This is the worry dialog body that will be shown to customers who
              select a review rating less than the worry rating threshold.
            </p>
            <Skeleton className="h-24 w-full mt-2" />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="locations">
        <div className="space-y-4">
          <div className="mb-4">
            <Label>Registered Places</Label>
            {[1, 2, 3].map((place) => (
              <div key={place} className="text-lg font-medium mt-2">
                <Skeleton className="h-8 w-32 inline-block" />
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-10" />
            <Label>Offer Complimentary Item</Label>
          </div>
          <div>
            <Label>Complimentary Item</Label>
            <p className="text-gray-500 text-xs">
              Specify the complimentary items you'd like to offer, which will be
              included in the email when addressing concerns.
            </p>
            <Skeleton className="h-10 w-full mt-2" />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
