import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CustomerReviewInfoFromSerializer } from "../Types/types";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendIcon } from "lucide-react";

// Type definitions for messages and the message state
interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

type MessagesState = {
  [key: number]: Message[];
};

type RatingToBadges = {
  [key: number]: string[]; // Adjust the value type as needed
};

export default function Messenger() {
  const [messages, setMessages] = useState<MessagesState>({
    1: [
      {
        id: 1,
        sender: "John",
        content: "Wanna know anything about your 1 star ratings?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ],
    2: [
      {
        id: 1,
        sender: "Alice",
        content: "Wanna know anything about your 2 star ratings?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ],
    3: [
      {
        id: 1,
        sender: "Bob",
        content: "Wanna know anything about your 3 star ratings?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ],
    4: [
      {
        id: 1,
        sender: "Tom",
        content: "Wanna know anything about your 4 star ratings?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ],
    5: [
      {
        id: 1,
        sender: "John",
        content: "Wanna know anything about your 5 star ratings?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ],
  });
  const { toast } = useToast();
  const [inputMessage, setInputMessage] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<number>(5); // Default to rating 5
  const [reviews, setReviews] = useState<CustomerReviewInfoFromSerializer[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [placeIds, setPlaceIds] = useState([]);
  const [ratingToBadgesData, setRatingsToBadgesData] = useState<RatingToBadges>(
    {}
  );
  const findKeywordsInReview = (textBody: string, keywordsArray: string[]) => {
    const foundKeywords: string[] = [];

    keywordsArray.forEach((keyword) => {
      if (textBody.toLowerCase().includes(keyword.toLowerCase())) {
        foundKeywords.push(keyword);
      }
    });

    return foundKeywords;
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) {
          console.error("Email not found in localStorage");
          return;
        }

        // First, fetch the placeId
        const placeIdResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/get-place-id-by-email/${email}/`
        );
        setPlaceIds(placeIdResponse.data.placeIds);

        const placeIdsAsArray = placeIdResponse.data.places.map(
          (place: any) => place.place_id
        );
        const placeIdsQuery = placeIdsAsArray.join(",");

        const reviewSettingsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/get-review-settings/${placeIdsQuery}/`
        );
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/get-reviews-by-client-ids/`,
          {
            params: {
              clientIds: placeIdsAsArray,
            },
          }
        );
        const data = response.data as CustomerReviewInfoFromSerializer[];
        const updatedReviews = data.map((review) => {
          // Convert badges JSON string to array or empty array if invalid
          const badgesArray = review.badges ? JSON.parse(review.badges) : [];
          return {
            ...review,
            badges: Array.isArray(badgesArray) ? badgesArray : [],
            internal_google_key_words: findKeywordsInReview(
              review.final_review_body,
              reviewSettingsResponse.data.keywords
            ),
          };
        });
        setReviews(updatedReviews.reverse() as any);
        console.log(updatedReviews);
        setRatingsToBadgesData(ratingToBadges(updatedReviews));
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        false;
      }
    };

    fetchData();
  }, []);

  function ratingToBadges(reviews: any): Record<number, string[]> {
    return reviews.reduce(
      (acc: any, review: any) => {
        const { rating, badges } = review;

        // If the rating key does not exist, initialize an empty array
        if (!acc[rating]) {
          acc[rating] = [];
        }

        // Concatenate the badges for the current rating
        acc[rating] = acc[rating].concat(badges);

        return acc;
      },
      {} as Record<number, string[]>
    );
  }

  const handleSendMessage = (): void => {
    //before sending, see which rating is currently being "talked" with.
    // Extract by key.
    // console.log(ratingToBadgesData[selectedRating])

    if (inputMessage.trim() !== "") {
      const userId = messages[selectedRating].length + 1;
      const newMessage = {
        id: userId,
        sender: "You",
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => ({
        ...prev,
        [selectedRating]: [...prev[selectedRating], newMessage], // Append new message
      }));

      setInputMessage("");

      // Axios call here
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/chat-with-badges/`,
          {
            context: ratingToBadgesData[selectedRating],
          }
        )
        .then((response) => {
          const responseMessage = {
            id: userId + 1, // Ensure this ID is unique
            sender: "Rating " + selectedRating.toString(),
            content: response.data["content"],
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };

          setMessages((prev) => ({
            ...prev,
            [selectedRating]: [...prev[selectedRating], responseMessage], // Append response message
          }));
        })
        .catch((error) => {
          toast({
            title: "Failed to login",
            description: error.response.data.error,
            duration: 1000,
          });
        });
    }
  };

  const avatarImage = (rating: number): string => {
    return `/Avatars/rating${rating}.png`;
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-1/4 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Chats</h2>
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => setSelectedRating(i + 1)} // Set selected rating
            >
              <Avatar className="h-10 w-10 rounded-full">
                <AvatarImage src={avatarImage(i + 1)} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <p className="font-semibold">Rating {i + 1}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={avatarImage(selectedRating)} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h2 className="ml-4 text-xl font-bold">Rating {selectedRating}</h2>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          {messages[selectedRating]?.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.sender === "You" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-3 rounded-2xl ${
                  message.sender === "You"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs mt-1 opacity-50">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 flex items-center">
          <Input
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            className="flex-1 rounded-full"
          />
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 rounded-full"
            onClick={handleSendMessage}
          >
            <SendIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
