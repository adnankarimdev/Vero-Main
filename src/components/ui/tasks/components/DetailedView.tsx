import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ArrowUp,
  ChevronLeft,
  Clock,
  MessageSquare,
  Send,
} from "lucide-react";
import { Separator } from "../../separator";
import MarkdownReader from "../../MarkdownReader";
import MarkdownEditorWriter from "../../MarkdownEditorWriter";
import AnimatedSaveIcon from "../../AnimatedIcons/AnimatedSaveIcon";

type Bug = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  email?: string;
  email_sent?: string;
  name?: string;
  assignee?: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt?: string;
  comments?: {
    id: string;
    author: string;
    content: string;
    createdAt: string;
  }[];
};

const priorityColors = {
  low: "bg-green-100 text-green-800 hover:bg-green-200",
  medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  high: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  critical: "bg-red-100 text-red-800 hover:bg-red-200",
};

const inter = Inter({ subsets: ["latin"] });

export default function DetailedView({
  bug,
  onBack,
  onStatusUpdate,
  onDrawerChange,
  onDescriptionUpdate,
}: {
  bug: Bug;
  onBack: () => void;
  onDrawerChange: () => void;
  onStatusUpdate: (bug: any, newStatus: string) => void;
  onDescriptionUpdate: (bug: any, newDescription: string) => void;
}) {
  const [status, setStatus] = useState(bug.status);
  const [content, setContent] = useState("");
  const createdAt = new Date(`${bug.createdAt} UTC`);
  const localTimeString = createdAt.toLocaleString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Set to false if you prefer a 24-hour format
  });

  const handleStatusUpdate = (newStatus: string) => {
    setStatus(newStatus);
    onStatusUpdate(bug, newStatus);
    onDrawerChange();
  };

  const handleDescriptionUpdate = () => {
    onDescriptionUpdate(bug, content);
    onDrawerChange();
  };

  return (
    <div>
      <CardHeader className="flex flex-row items-center">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to list
        </Button>
        <div className="flex justify-between w-full items-center">
          <CardTitle className="text-2xl flex-grow text-center">
            <div className="flex flex-col ">
              <span className="text-sm text-muted-foreground">{bug.id}</span>
              {bug.title}
            </div>
            <div className="flex flex-col ">
              <div className="space-x-4">
                <Badge
                  className={`${priorityColors[bug.priority as keyof typeof priorityColors]} w-24 justify-center`}
                >
                  {bug.priority}
                </Badge>
              </div>
              <div
                className="space-x-4"
                hidden={bug.email == "" && bug.name == ""}
              >
                <Badge variant="outline">
                  {"Concern from: "}{" "}
                  <span className="text-green-500 ml-1">{bug.name}</span>
                </Badge>
              </div>
              <div
                className="space-x-4"
                hidden={!bug.email_sent || bug.email_sent == "False"}
              >
                <Badge variant="outline" className="bg-green-500 text-white">
                  {"Email Sent"}
                </Badge>
              </div>
            </div>
            <div className="flex-grow flex justify-end"></div>
          </CardTitle>
          <Select value={status} onValueChange={handleStatusUpdate}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between">
          <Button onClick={handleDescriptionUpdate} variant="outline">
            <AnimatedSaveIcon />
          </Button>

          <span className="inline-flex items-center text-sm ">
            <AlertCircle className="mr-1 h-4 w-4" />
            Opened on {localTimeString}
          </span>
        </div>
        <Separator />
        <div>
          {/* <p className={`text-muted-foreground ${inter.className}`}>{bug.description}</p> */}

          <MarkdownEditorWriter
            initialContent={content === "" ? bug.description : content}
            setPassedContent={setContent}
          />
        </div>

        {/* <div>
          <h3 className="text-lg font-semibold mb-2">Assignee</h3>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={bug.assignee.avatar} alt={bug.assignee.name} />
              <AvatarFallback>{bug.assignee.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <span>{bug.assignee.name}</span>
          </div>
        </div> */}

        <div className="flex space-x-4 text-sm text-muted-foreground">
          {/* <div className="flex items-center">
            <AlertCircle className="mr-1 h-4 w-4" />
            Opened on {bug.createdAt}
          </div> */}
          {/* <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            Updated on {new Date(bug.updatedAt).toLocaleDateString()}
          </div> */}
        </div>

        {/* <div>
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <div className="space-y-4">
            {bug.comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold">{comment.author}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-2">{comment.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}
      </CardContent>
    </div>
  );
}
