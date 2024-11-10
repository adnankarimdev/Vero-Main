'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GripVertical } from 'lucide-react'

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
}

type Column = {
  id: string;
  title: string;
  bugs: Bug[];
}

export default function KanbanBoard({ initialBugs }: { initialBugs: Bug[] }) {
  const [columns, setColumns] = useState<Column[]>(() => {
    const statuses = Array.from(new Set(initialBugs.map(bug => bug.status)))
    return statuses.map(status => ({
      id: status,
      title: status,
      bugs: initialBugs.filter(bug => bug.status === status)
    }))
  })

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return

    const sourceColumn = columns.find(col => col.id === source.droppableId)
    const destColumn = columns.find(col => col.id === destination.droppableId)

    if (!sourceColumn || !destColumn) return

    if (source.droppableId === destination.droppableId) {
      const newBugs = Array.from(sourceColumn.bugs)
      const [reorderedItem] = newBugs.splice(source.index, 1)
      newBugs.splice(destination.index, 0, reorderedItem)

      const newColumns = columns.map(col =>
        col.id === sourceColumn.id ? { ...col, bugs: newBugs } : col
      )

      setColumns(newColumns)
    } else {
      const sourceBugs = Array.from(sourceColumn.bugs)
      const [movedBug] = sourceBugs.splice(source.index, 1)
      const destBugs = Array.from(destColumn.bugs)
      destBugs.splice(destination.index, 0, { ...movedBug, status: destColumn.id })

      const newColumns = columns.map(col => {
        if (col.id === sourceColumn.id) return { ...col, bugs: sourceBugs }
        if (col.id === destColumn.id) return { ...col, bugs: destBugs }
        return col
      })

      setColumns(newColumns)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4 overflow-x-auto">
        {columns.map(column => (
          <div key={column.id} className="flex-shrink-0 w-72">
            <Card>
              <CardHeader>
                <CardTitle>{column.title}</CardTitle>
              </CardHeader>
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <CardContent 
                    {...provided.droppableProps} 
                    ref={provided.innerRef} 
                    className={`min-h-[200px] transition-colors duration-200 ${
                      snapshot.isDraggingOver ? 'bg-secondary' : ''
                    }`}
                  >
                    {column.bugs.map((bug, index) => (
                      <Draggable key={bug.id} draggableId={bug.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`mb-2 transition-transform duration-200 ${
                              snapshot.isDragging ? 'scale-105' : ''
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
                                  <h3 className="font-semibold">{bug.title}</h3>
                                </div>
                                {/* <p className="text-sm text-muted-foreground mb-2">{bug.description}</p> */}
                                <div className="flex justify-between items-center">
                                  <Badge variant="secondary">{bug.priority}</Badge>
                                  <span className="text-xs text-muted-foreground">{new Date(bug.createdAt).toLocaleDateString()}</span>
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
              </Droppable>
            </Card>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}