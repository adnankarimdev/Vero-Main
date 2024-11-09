"use client";

import React, { useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { Inter } from "next/font/google";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Link,
  Image,
  Table,
} from "lucide-react";

interface MarkdownEditorProps {
  initialContent?: string;
  setPassedContent: (content: string) => void;
}
const inter = Inter({ subsets: ["latin"] });

export default function MarkdownEditorWriter({
  initialContent = "",
  setPassedContent,
}: MarkdownEditorProps) {
  const [content, setContent] = useState(initialContent);
  setPassedContent(initialContent);

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
    setPassedContent(event.target.value);
  };

  const insertFormatting = useCallback(
    (start: string, end: string = "") => {
      const textarea = document.querySelector("textarea");
      if (textarea) {
        const selectionStart = textarea.selectionStart;
        const selectionEnd = textarea.selectionEnd;
        const selectedText = content.substring(selectionStart, selectionEnd);
        const replacement = start + selectedText + end;
        const newContent =
          content.substring(0, selectionStart) +
          replacement +
          content.substring(selectionEnd);
        setContent(newContent);
        textarea.focus();
        textarea.setSelectionRange(
          selectionStart + start.length,
          selectionEnd + start.length
        );
      }
    },
    [content]
  );

  const formatActions = [
    { icon: Bold, label: "Bold", action: () => insertFormatting("**", "**") },
    { icon: Italic, label: "Italic", action: () => insertFormatting("*", "*") },
    // { icon: Underline, label: "Underline", action: () => insertFormatting("<u>", "</u>") },
    // { icon: Strikethrough, label: "Strikethrough", action: () => insertFormatting("~~", "~~") },
    {
      icon: List,
      label: "Unordered List",
      action: () => insertFormatting("- "),
    },
    {
      icon: ListOrdered,
      label: "Ordered List",
      action: () => insertFormatting("1. "),
    },
    {
      icon: Heading1,
      label: "Heading 1",
      action: () => insertFormatting("# "),
    },
    {
      icon: Heading2,
      label: "Heading 2",
      action: () => insertFormatting("## "),
    },
    {
      icon: Heading3,
      label: "Heading 3",
      action: () => insertFormatting("### "),
    },
    { icon: Quote, label: "Blockquote", action: () => insertFormatting("> ") },
    {
      icon: Code,
      label: "Inline Code",
      action: () => insertFormatting("`", "`"),
    },
    {
      icon: Link,
      label: "Link",
      action: () => insertFormatting("[", "](url)"),
    },
    // { icon: Image, label: "Image", action: () => insertFormatting("![alt text](", ")") },
    {
      icon: Table,
      label: "Table",
      action: () =>
        insertFormatting(
          "| Header | Header |\n| ------ | ------ |\n| Cell   | Cell   |"
        ),
    },
  ];

  return (
    <div>
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-transparent">
          <TabsTrigger
            value="preview"
            className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="write"
            className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Write
          </TabsTrigger>
        </TabsList>
        <TabsContent value="write">
          <div
            className="rounded-t-md flex flex-wrap justify-center"
            role="toolbar"
            aria-label="Formatting options"
          >
            <TooltipProvider>
              {formatActions.map(({ icon: Icon, label, action }, index) => (
                <React.Fragment key={label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={action}
                        aria-label={label}
                      >
                        <Icon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{label}</p>
                    </TooltipContent>
                  </Tooltip>
                  {(index + 1) % 7 === 0 && (
                    <Separator orientation="vertical" className="h-8" />
                  )}
                </React.Fragment>
              ))}
            </TooltipProvider>
          </div>
          <Textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Write your markdown here..."
            className="min-h-[70vh] w-full p-4 font-mono text-sm rounded-t-none"
          />
        </TabsContent>
        <TabsContent value="preview">
          <ScrollArea className="">
            <div className="p-4">
              <ReactMarkdown
                className={`${inter.className}`}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-3xl font-semibold mb-4 mt-8 text-gray-800 dark:text-gray-100"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      className="text-2xl font-semibold mb-3 mt-6 text-gray-800 dark:text-gray-100"
                      {...props}
                    />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4
                      className="text-xl font-semibold mb-2 mt-4 text-gray-800 dark:text-gray-100"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      className="list-disc list-inside mb-4 text-gray-600 dark:text-gray-300"
                      {...props}
                    />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      className="list-decimal list-inside mb-4 text-gray-600 dark:text-gray-300"
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="mb-2" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 underline"
                      {...props}
                    />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 mb-4 italic text-gray-600 dark:text-gray-300"
                      {...props}
                    />
                  ),
                  img: ({ node, ...props }) => (
                    <img
                      className="max-w-full h-auto rounded-lg my-6"
                      {...props}
                      alt={props.alt || ""}
                    />
                  ),
                  hr: ({ node, ...props }) => (
                    <hr
                      className="my-8 border-t border-gray-300 dark:border-gray-600"
                      {...props}
                    />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto mb-6">
                      <table
                        className="min-w-full divide-y divide-gray-300 dark:divide-gray-600"
                        {...props}
                      />
                    </div>
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                      {...props}
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td
                      className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300"
                      {...props}
                    />
                  ),
                  u: ({ node, ...props }) => <u {...props} />,
                  del: ({ node, ...props }) => (
                    <del className="line-through" {...props} />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
