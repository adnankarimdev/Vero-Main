import React from "react";
import { cn } from "@/lib/utils";

interface AestheticLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export function AestheticLoader({
  size = "md",
  className,
  ...props
}: AestheticLoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center space-x-2",
        {
          "scale-75": size === "sm",
          "scale-100": size === "md",
          "scale-125": size === "lg",
        },
        className
      )}
      {...props}
    >
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-4 w-4 rounded-full bg-primary",
            "animate-pulse",
            "dark:bg-primary-foreground"
          )}
          style={{
            animationDelay: `${index * 150}ms`,
            animationDuration: "1s",
          }}
        ></div>
      ))}
    </div>
  );
}

export function GeneratingLoader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <AestheticLoader size="lg" />
      <p className="text-sm text-muted-foreground animate-pulse">
        Generating...
      </p>
    </div>
  );
}
