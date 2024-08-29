"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const personas = [
  {
    name: "Routine-Richard",
    behavior:
      "Visits daily, often orders the same thing, prefers consistency in flavor and experience.",
    painPoints:
      "Dislikes when his usual order isn't available or when the coffee shop is too crowded.",
    motivations:
      "Values routine and reliability, appreciates a personal touch (e.g., baristas remembering his name and order).",
    quote:
      "I come here every morning because I know exactly what I'm getting, and it's always good.",
    photo: "/socialSamantha.png",
  },
  {
    name: "Social-Samantha",
    behavior:
      "Comes in with friends, enjoys trying new drinks, and uses the space for long catch-ups.",
    painPoints:
      "Limited seating, slow Wi-Fi, or feeling rushed during busy hours.",
    motivations:
      "Seeks a welcoming atmosphere for socializing, values diverse menu options.",
    quote:
      "This is my favorite place to meet friends and try the latest seasonal specials!",
    photo: "/socialSamantha.png",
  },
  {
    name: "Work-from-Cafe Wayne",
    behavior:
      "Spends several hours working on laptop, orders multiple drinks throughout the day.",
    painPoints:
      "Lack of power outlets, unstable internet connection, or noisy environment.",
    motivations:
      "Needs a productive workspace outside of home or office, appreciates good coffee and a change of scenery.",
    quote:
      "I'm more productive here than at home, plus the coffee keeps me going all day.",
    photo: "/socialSamantha.png",
  },
  {
    name: "Eco-conscious Emma",
    behavior:
      "Always brings her own reusable cup, asks about sourcing and sustainability practices.",
    painPoints:
      "Single-use plastics, non-recyclable packaging, or lack of plant-based milk options.",
    motivations:
      "Seeks environmentally friendly options, supports businesses with sustainable practices.",
    quote:
      "I love that this cafe prioritizes sustainability. It makes me feel good about my daily coffee habit.",
    photo: "/socialSamantha.png",
  },
  {
    name: "Budget-minded Bob",
    behavior:
      "Visits occasionally, always looks for deals or the cheapest options.",
    painPoints:
      "High prices, lack of loyalty program or discounts, feeling pressured to tip.",
    motivations:
      "Wants to enjoy coffee shop experience without breaking the bank.",
    quote:
      "I like coming here, but I wish they had more affordable options or a punch card system.",
    photo: "/socialSamantha.png",
  },
  {
    name: "Picky Penelope",
    behavior:
      "Very specific about her order, often requests modifications or substitutions.",
    painPoints:
      "Mistakes in her order, inflexibility in customizations, or perceived attitude from staff.",
    motivations:
      "Seeks perfection in her coffee experience, wants to feel heard and accommodated.",
    quote:
      "If I'm paying this much for coffee, it should be exactly how I want it.",
    photo: "/socialSamantha.png",
  },
  {
    name: "Rush-hour Ryan",
    behavior: "Always in a hurry, uses mobile ordering, expects quick service.",
    painPoints:
      "Long wait times, errors in mobile orders, or lack of grab-and-go options.",
    motivations:
      "Needs his caffeine fix quickly and reliably to start his busy day.",
    quote:
      "I need my coffee fast and correct. Every minute counts in my schedule.",
    photo: "/socialSamantha.png",
  },
  {
    name: "Complainer Caroline",
    behavior:
      "Frequently dissatisfied, vocal about her complaints, may leave negative reviews online.",
    painPoints:
      "Perceived poor service, inconsistency in product quality, or any deviation from her expectations.",
    motivations:
      "Seeks attention and validation, may enjoy feeling superior or in control.",
    quote:
      "I've had better coffee from a gas station. The service here is always terrible.",
    photo: "/socialSamantha.png",
  },
  {
    name: "Trendy Tina",
    behavior:
      "Always looking for the latest coffee trends, loves to post her drinks on social media.",
    painPoints:
      "Menu that's too 'basic', lack of photogenic presentation, or missing the latest coffee fads.",
    motivations:
      "Wants to be seen as hip and in-the-know, values aesthetic and novelty.",
    quote:
      "OMG, you guys NEED to try their new charcoal lavender latte. It's so Instagrammable!",
    photo: "/socialSamantha.png",
  },
  {
    name: "First-timer Fred",
    behavior:
      "New to specialty coffee, often confused by menu options, asks lots of questions.",
    painPoints:
      "Feeling overwhelmed by choices, intimidated by coffee jargon, or embarrassed to ask for help.",
    motivations:
      "Curious about coffee culture, wants to learn but needs guidance and patience.",
    quote:
      "I usually just drink instant coffee at home. What's the difference between a latte and a cappuccino?",
    photo: "/socialSamantha.png",
  },
];

function PersonaCard({ persona }: { persona: (typeof personas)[0] }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={persona.photo} />
            <AvatarFallback>
              {persona.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <CardTitle>{persona.name}</CardTitle>
        </div>
      </CardHeader>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            {isOpen ? "Hide Details" : "Show Details"}
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <p className="mb-2">
              <strong>Behavior:</strong> {persona.behavior}
            </p>
            <p className="mb-2">
              <strong>Pain Points:</strong> {persona.painPoints}
            </p>
            <p className="mb-2">
              <strong>Motivations:</strong> {persona.motivations}
            </p>
            <p className="italic mt-4">"{persona.quote}"</p>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

export default function Personas() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Customer Personas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona, index) => (
          <PersonaCard key={index} persona={persona} />
        ))}
      </div>
    </div>
  );
}
