"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { Send, Copy, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import RecordingLoader from "./Skeletons/RecordingLoader";

export default function GoogleAutoRespond() {
  const { toast } = useToast();
  const router = useRouter();
  const [response, setResponse] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [body, setBody] = useState("");
  const [buisnessName, setBuisnessName] = useState("");
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) {
          toast({
            title: "Please sign in.",
            duration: 3000,
          });
          router.push("/login");
          console.error("Email not found in localStorage");
          return;
        }
        const userData = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/get-user-data/${email}/`
        );
        setBuisnessName(userData.data.business_name);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/generate-google-review-response/`,
        {
          name: name,
          rating: rating,
          body: body,
          businessName: buisnessName,
        }
      )
      .then((response) => {
        setResponse(response.data.content);
        setIsLoading(false);
        toast({
          title: "Success",
          description: "Review response generated.",
          duration: 1000,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          title: "Failed to generate response.",
          description: "Try again.",
          duration: 1000,
        });
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex bg-background">
      <div className="w-1/3 border-r">
        <Card className="mr-4 mt-4">
          <div className="p-4  flex flex-col">
            <div className="space-y-2 flex-grow">
              <Label htmlFor="reviewName">Reviewer Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
              <Label htmlFor="reviewRating">Reviewer Rating</Label>
              <Input
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
              <Label htmlFor="review">Reviewer Google Review</Label>
              <Textarea
                id="review"
                placeholder="Paste the Google review here"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="min-h-[200px] flex-grow"
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-4"
              onClick={handleSubmit}
              disabled={loading}
            >
              <Send className="mr-2 h-4 w-4" /> Generate Response
            </Button>
          </div>
        </Card>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <Card className=" flex flex-col">
          <CardHeader>
            <CardTitle>Generated Response</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            {loading && <RecordingLoader />}
            {!loading && (
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows={30}
                className="min-h-[300px]"
                placeholder="Your generated response will appear here"
              />
            )}
          </CardContent>
          {/* <Separator className="my-4" /> */}
          <CardFooter>
            <Button onClick={handleCopy} className="w-full" disabled={loading}>
              {isCopied ? (
                <>
                  <CheckCheck className="mr-2 h-4 w-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" /> Copy Response
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
