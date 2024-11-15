"use client";

import {
  LayoutDashboard,
  ListStart,
  Infinity,
  FilePenLine,
  LogOut,
  MonitorCheck,
  Star,
  MessageCircle,
  Reply,
  Route,
  MonitorCog,
  BadgePlus,
  Logs,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GiSpiderWeb } from "react-icons/gi";
import Logo from "./Logo";
import LogoSvg from "../../app/logo.svg";

const navItems = [
  {
    icon: LayoutDashboard,
    label: "Your Dashboard",
    href: "/dashboard",
    show: true,
  },
  {
    icon: MonitorCog,
    label: "Platform Settings",
    href: "/settings",
    show: true,
  },
  { icon: Logs, label: "Tasks List", href: "/tasks", show: true },
  {
    icon: Route,
    label: "Customer Journey",
    href: "/customer-journies",
    show: true,
  },
  //Hiding Messenger for now, won't release to public just yet.
  { icon: MessageCircle, label: "Messenger", href: "/messenger", show: false },
  { icon: Star, label: "Customer Feedback", href: "/reviews", show: true },
  {
    icon: GiSpiderWeb,
    label: "Website Creator",
    href: "/website-creator",
    show: false,
  },
  { icon: Reply, label: "Respond", href: "/respond", show: true },
  { icon: LogOut, label: "Logout", href: "/", show: true },
];

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    router.push("/");
  };

  return (
    <TooltipProvider>
      <aside className="flex h-screen w-16 flex-col items-center space-y-8 bg-background py-8 transition-all">
        <div className="flex h-12 w-12 items-center justify-center rounded-full">
          <Logo />
        </div>
        <nav className="flex flex-col items-center space-y-2">
          {navItems.map(
            (item) =>
              item.show && (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start px-2",
                        "hover:bg-accent hover:text-accent-foreground"
                      )}
                      asChild
                    >
                      {item.label === "Logout" ? (
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full"
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="ml-2 hidden group-hover:inline-block">
                            {item.label}
                          </span>
                        </button>
                      ) : (
                        <Link href={item.href}>
                          <item.icon className="h-5 w-5" />
                          <span className="ml-2 hidden group-hover:inline-block">
                            {item.label}
                          </span>
                        </Link>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              )
          )}
        </nav>
      </aside>
    </TooltipProvider>
  );
}
