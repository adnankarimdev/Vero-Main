"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Bug = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  email?: string;
  email_sent?: string;
  name?: string;
  createdAt: string;
};

export default function TimelineView({ bugs }: { bugs: Bug[] }) {
  const [filter, setFilter] = useState("all");

  const filteredBugs =
    filter === "all" ? bugs : bugs.filter((bug) => bug.status === filter);

  const sortedBugs = filteredBugs.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const statuses = [
    "all",
    ...Array.from(new Set(bugs.map((bug) => bug.status))),
  ];

  return (
    <div className="space-y-4">
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="space-y-8">
        {sortedBugs.map((bug, index) => (
          <div key={bug.id} className="relative pl-4 pb-8">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
            <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary" />
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{bug.title}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {new Date(bug.createdAt).toLocaleString()}
                </div>
              </CardHeader>
              <CardContent>
                {/* <p className="text-sm mb-2">{bug.description}</p> */}
                <div className="flex gap-2">
                  <Badge variant="outline">{bug.status}</Badge>
                  <Badge variant="secondary">{bug.priority}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
