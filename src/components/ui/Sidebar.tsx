"use client"; // Ensures this is a client component

import {
  LayoutDashboard,
  ListStart,
  Infinity,
  FilePenLine,
  LogOut,
  MonitorCheck,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import LogoSvg from "../../app/logo.svg"

const navItems = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
  // { icon: ListStart, label: "Onboarding", href: "/onboarding" },
  { icon: Star, label: "Reviews", href: "/reviews" },
  { icon: FilePenLine, label: "Settings", href: "/settings" },
  { icon: Infinity, label: "Auto Respond", href: "/autorespond" },
  { icon: LogOut, label: "Logout", href: "/" }, // 'href' can remain for consistency, but will be overridden
];

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    console.log("logged out");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    console.log("logged out");
    router.push("/");
  };

  return (
    <aside className="flex h-screen w-16 flex-col items-center space-y-8 bg-background py-8 transition-all">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
        <span className="text-2xl font-bold text-primary-foreground">A</span>
      </div>
      <nav className="flex flex-col items-center space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.href}
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
        ))}
      </nav>
    </aside>
  );
}
