import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ArrowUpCircle, BadgePlus, CirclePlus } from "lucide-react";
import axios from "axios";

export default function ShowWebsiteBadge() {
  const { toast } = useToast();
  const router = useRouter();
  const handleDirectToWebsiteCreator = () => {

    router.push("/website-creator");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "bg-gradient-to-r from-purple-500 to-rose-400  text-white text-xs font-medium mt-2 ml-2 ",
      )}
      onClick={handleDirectToWebsiteCreator}
    >
      <CirclePlus className="w-5 h-5" />
      <span>Create Business Website</span>
    </Button>
  );
}
