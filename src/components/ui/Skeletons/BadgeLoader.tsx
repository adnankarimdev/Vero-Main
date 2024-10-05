import { Badge } from "@/components/ui/badge";

export default function BadgeLoader() {
  return (
    <div className="flex items-center justify-center p-4">
      <span className="flex space-x-1">
        <span
          className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></span>
        <span
          className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></span>
        <span
          className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></span>
      </span>
    </div>
  );
}
