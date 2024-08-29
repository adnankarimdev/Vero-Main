"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bold, Italic, Plus, Circle } from "lucide-react";
import { Textarea } from "./textarea";

type Block = {
  id: string;
  type: "text" | "bullet";
  content: string;
};

export default function NotionInterface() {
  const [title, setTitle] = useState("P&S");
  const [questions, setQuestions] = useState([
    "What did you enjoy most about your visit to Phil and Sebastian?",
    "Did you try any of our specialty drinks? What did you think of them?",
    "Was the service at Phil and Sebastian up to your expectations?",
  ]);
  const [blocks, setBlocks] = useState<Block[]>([
    { id: "1", type: "text", content: "" },
  ]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBlockChange = (id: string, content: string) => {
    setBlocks(
      blocks.map((block) => (block.id === id ? { ...block, content } : block))
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const currentBlock = blocks.find((block) => block.id === id);
      const newBlock: Block = {
        id: Date.now().toString(),
        type: currentBlock?.type || "text",
        content: "",
      };
      setBlocks((blocks) => {
        const index = blocks.findIndex((block) => block.id === id);
        return [
          ...blocks.slice(0, index + 1),
          newBlock,
          ...blocks.slice(index + 1),
        ];
      });
    }
  };

  const toggleFormat = (id: string, format: "bold" | "italic") => {
    setBlocks(
      blocks.map((block) => {
        if (block.id === id && block.type === "text") {
          const tag = format === "bold" ? "**" : "_";
          return { ...block, content: `${tag}${block.content}${tag}` };
        }
        return block;
      })
    );
  };

  const addBlock = (type: "text" | "bullet") => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: "",
    };
    setBlocks((blocks) => [...blocks, newBlock]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <p className="text-3xl font-bold">{title || "Untitled"}</p>
      <div>
        {questions.map((question, index) => (
          <Input
            key={index}
            value={question}
            className="text-sm font-italic border-none outline-none"
            placeholder="Untitled"
            disabled
          />
        ))}
      </div>
      {blocks.map((block) => (
        <div key={block.id} className="flex items-start space-x-2">
          {block.type === "bullet" && (
            <Circle className="h-4 w-4 mt-2 text-muted-foreground" />
          )}
          <div className="flex-grow">
            <Textarea
              value={block.content}
              onChange={(e) => handleBlockChange(block.id, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, block.id)}
              className="w-full border-none outline-none"
              style={{ resize: "none" }}
              rows={1}
              placeholder={
                block.type === "bullet"
                  ? "List item"
                  : "Begin writing your review here!"
              }
            />
          </div>
          {/* {block.type === 'text' && (
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => toggleFormat(block.id, 'bold')}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => toggleFormat(block.id, 'italic')}
              >
                <Italic className="h-4 w-4" />
              </Button>
            </div>
          )} */}
        </div>
      ))}
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={() => addBlock("text")}>
          <Plus className="h-4 w-4 mr-2" /> Text
        </Button>
        <Button variant="outline" size="sm" onClick={() => addBlock("bullet")}>
          <Plus className="h-4 w-4 mr-2" /> Bullet
        </Button>
      </div>
    </div>
  );
}
