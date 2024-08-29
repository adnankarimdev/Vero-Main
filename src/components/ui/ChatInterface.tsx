import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusIcon, SendIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function ChatInterface() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="Sofia Davis"
            />
            <AvatarFallback>PS</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">Phil & Sebastian</h2>
            <p className="text-sm text-gray-500">Simmons Location</p>
          </div>
        </div>
        <Button size="icon" variant="ghost">
          <PlusIcon className="h-5 w-5" />
          <span className="sr-only">Add action</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
          <p className="text-sm" style={{ whiteSpace: "pre-line" }}>
            What did you enjoy most about your visit to Phil and Sebastian? Did
            you try any of our specialty drinks? What did you think of them? Was
            the service at Phil and Sebastian up to your expectations?
          </p>
        </div>
        <div className="bg-black text-white p-3 rounded-lg max-w-[80%] ml-auto">
          <p className="text-sm">Hey, I'm having trouble with my account.</p>
        </div>
      </CardContent>
      <CardFooter>
        <form className="flex w-full items-center space-x-2">
          <Textarea
            className="flex-grow"
            placeholder="Type your review..."
            rows={1} // This sets the initial number of rows
            style={{ resize: "none" }} // Prevents resizing by the user
          />
          <SendIcon className="h-4 w-4" strokeWidth={3}>
            {" "}
            <span className="sr-only">Send message</span>{" "}
          </SendIcon>
        </form>
      </CardFooter>
    </Card>
  );
}
