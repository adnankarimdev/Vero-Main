import React from "react";
import { Inter } from "next/font/google";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface MarkdownReaderProps {
  content: string;
}

const inter = Inter({ subsets: ["latin"] });

const MarkdownReader: React.FC<MarkdownReaderProps> = ({ content }) => {
  return (
    <div>
      <ScrollArea className="h-[80vh]">
        <div className="p-8">
          <ReactMarkdown
            className={` ${inter.className}`}
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
              li: ({ node, ...props }) => <li className="mb-2" {...props} />,
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
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </ScrollArea>
    </div>
  );
};

export default MarkdownReader;
