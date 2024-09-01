import { LayoutDashboard, Star, Settings, Infinity, FilePenLine } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
  { icon: Star, label: "Reviews", href: "/reviews" },
  { icon: Infinity, label: "Auto Respond", href: "/autorespond" },
  { icon: FilePenLine, label: "Settings", href: "/settings" },
]

export default function Sidebar() {
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
            <Link href={item.href}>
              <item.icon className="h-5 w-5" />
              <span className="ml-2 hidden group-hover:inline-block">
                {item.label}
              </span>
            </Link>
          </Button>
        ))}
      </nav>
    </aside>
  )
}