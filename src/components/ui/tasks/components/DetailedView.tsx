import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

type Bug = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee?: {
    name: string;
    avatar: string;
  };
  createdAt?: string;
  updatedAt?: string;
  comments?: {
    id: string;
    author: string;
    content: string;
    createdAt: string;
  }[];
};

const inter = Inter({ subsets: ["latin"] });

export default function DetailedView({
  bug,
  onBack,
}: {
  bug: Bug;
  onBack: () => void;
}) {
  return (
    <div>
      <CardHeader className="flex flex-row items-center">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to list
        </Button>
        <div className="flex-grow flex justify-center">
          <CardTitle className="text-2xl">{bug.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Badge
            variant={
              bug.status === "Open"
                ? "default"
                : bug.status === "In Progress"
                  ? "secondary"
                  : "outline"
            }
          >
            {bug.status}
          </Badge>
          <Badge
            variant={
              bug.priority === "High"
                ? "destructive"
                : bug.priority === "Medium"
                  ? "default"
                  : "secondary"
            }
          >
            <ArrowUp className="mr-1 h-3 w-3" />
            {bug.priority}
          </Badge>
          <span className="text-sm text-muted-foreground">#{bug.id}</span>
          <div className="flex-grow flex justify-end">
            <AlertCircle className="mr-1 h-4 w-4" />

            <span className="text-sm text-muted-foreground">
              Opened on {bug.createdAt}
            </span>
          </div>
        </div>

        <Separator />
        <div>
          {/* <p className={`text-muted-foreground ${inter.className}`}>{bug.description}</p> */}
          <MarkdownReader content={bug.description} />
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
          <div className="flex items-center">
            <AlertCircle className="mr-1 h-4 w-4" />
            Opened on {bug.createdAt}
          </div>
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
