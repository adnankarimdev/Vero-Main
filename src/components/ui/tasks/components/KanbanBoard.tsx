"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GripVertical, CalendarIcon } from "lucide-react";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { format, isWithinInterval, endOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

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

type Column = {
  id: string;
  title: string;
  bugs: Bug[];
};

export default function KanbanBoard({
  initialBugs,
  onStatusUpdate,
}: {
  initialBugs: Bug[];
  onStatusUpdate: (bug: any, newStatus: string) => void;
}) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [columns, setColumns] = useState<Column[]>(() => {
    const order = ["open", "in progress", "resolved"];

    const statuses = Array.from(new Set(initialBugs.map((bug) => bug.status)))
      .filter((status) => order.includes(status))
      .sort((a, b) => order.indexOf(a) - order.indexOf(b));

    return statuses.map((status) => ({
      id: status,
      title: status,
      bugs: initialBugs.filter((bug) => bug.status === status),
    }));
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    const bugToUpdate = initialBugs.find(
      (item) => item.id === result.draggableId
    );
    if (result.destination?.droppableId) {
      onStatusUpdate(bugToUpdate, result.destination?.droppableId);
    }
    if (!destination) return;

    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destColumn = columns.find(
      (col) => col.id === destination.droppableId
    );

    if (!sourceColumn || !destColumn) return;

    const sourceBugs = Array.from(sourceColumn.bugs);
    const destBugs = Array.from(destColumn.bugs);
    const [movedBug] = sourceBugs.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceBugs.splice(destination.index, 0, movedBug);
      const newColumns = columns.map((col) =>
        col.id === sourceColumn.id ? { ...col, bugs: sourceBugs } : col
      );
      setColumns(newColumns);
    } else {
      destBugs.splice(destination.index, 0, {
        ...movedBug,
        status: destColumn.id,
      });
      const newColumns = columns.map((col) => {
        if (col.id === sourceColumn.id) return { ...col, bugs: sourceBugs };
        if (col.id === destColumn.id) return { ...col, bugs: destBugs };
        return col;
      });
      setColumns(newColumns);
    }
  };

  const filteredColumns = columns.map((column) => ({
    ...column,
    bugs: column.bugs.filter((bug) => {
      const bugDate = new Date(bug.createdAt);
      if (dateRange?.from && dateRange?.to) {
        return isWithinInterval(bugDate, {
          start: dateRange.from,
          end: endOfDay(dateRange.to),
        });
      }
      return true;
    }),
  }));

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Filter by time</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={(newDateRange) => {
                setDateRange(newDateRange);
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 p-4 overflow-x-auto">
          {filteredColumns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-72">
              <Card>
                <CardHeader>
                  <CardTitle>{column.title}</CardTitle>
                </CardHeader>
                <StrictModeDroppable droppableId={column.id} key={column.id}>
                  {(provided, snapshot) => (
                    <CardContent
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`min-h-[200px] transition-colors duration-200 ${
                        snapshot.isDraggingOver ? "bg-secondary" : ""
                      }`}
                    >
                      {column.bugs.map((bug, index) => (
                        <Draggable
                          key={bug.id}
                          draggableId={bug.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`mb-2 transition-transform duration-200 ${
                                snapshot.isDragging ? "scale-105" : ""
                              }`}
                            >
                              <Card>
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div
                                      {...provided.dragHandleProps}
                                      className="cursor-move"
                                      aria-label="Drag handle"
                                    >
                                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <h3 className="font-semibold">
                                      {bug.title}
                                    </h3>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <Badge variant="secondary">
                                      {bug.priority}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      {new Date(
                                        bug.createdAt
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </CardContent>
                  )}
                </StrictModeDroppable>
              </Card>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
