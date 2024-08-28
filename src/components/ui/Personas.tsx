"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const personas = [
  {
    name: "Social Samantha",
    behavior: "Comes with friends or colleagues, enjoys the ambiance for socializing, often orders a variety of drinks to share.",
    painPoints: "Dislikes when there isn't enough seating or when the noise level is too high.",
    motivations: "Seeks a cozy, welcoming environment where she can relax and chat with friends.",
    quote: "This place is perfect for catching up with friends over a latte!"
  },
  {
    name: "Networking Nick",
    behavior: "Frequently organizes casual business meetings, prefers quiet corners for discussions.",
    painPoints: "Frustrated by unreliable Wi-Fi or lack of power outlets.",
    motivations: "Looks for a professional yet relaxed atmosphere to impress clients and partners.",
    quote: "It's my go-to spot for informal business meetings - great coffee and a perfect ambiance!"
  },
  {
    name: "Study Sarah",
    behavior: "Spends long hours studying or working on her laptop, often orders multiple drinks throughout her stay.",
    painPoints: "Dislikes when tables are too small or when the cafe closes early.",
    motivations: "Seeks a quiet, comfortable space with good lighting and stable Wi-Fi for productive work sessions.",
    quote: "I can always count on getting my best work done here!"
  },
  {
    name: "Foodie Fred",
    behavior: "Comes for the specialty coffee and unique food pairings, often takes photos of his orders.",
    painPoints: "Disappointed when menu items are unavailable or if the presentation is lackluster.",
    motivations: "Searches for new and exciting flavor experiences and Instagram-worthy presentations.",
    quote: "Their seasonal specials never fail to impress my taste buds!"
  },
  {
    name: "Eco-conscious Emma",
    behavior: "Always brings her own reusable cup, prefers organic and locally sourced options.",
    painPoints: "Frustrated by excessive packaging or non-recyclable materials.",
    motivations: "Seeks out cafes that align with her values of sustainability and environmental responsibility.",
    quote: "I love how they prioritize sustainability in every aspect of their business!"
  },
  {
    name: "Quick-stop Quincy",
    behavior: "Rushes in for a quick coffee to-go, often during peak hours.",
    painPoints: "Gets annoyed by long queues or slow service.",
    motivations: "Looks for efficiency, speed, and consistency in his coffee run.",
    quote: "No matter how busy it gets, I can always count on fast service and great coffee here!"
  },
  {
    name: "Wellness Wendy",
    behavior: "Prefers herbal teas and health-conscious menu options, often visits after yoga or gym sessions.",
    painPoints: "Disappointed when there are limited healthy or dietary-specific options.",
    motivations: "Seeks out cafes that offer nutritious choices and align with her wellness-focused lifestyle.",
    quote: "I appreciate how they cater to various dietary needs without compromising on taste!"
  }
]

function PersonaCard({ persona }: { persona: typeof personas[0] }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={persona.name} />
            <AvatarFallback>{persona.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <CardTitle>{persona.name}</CardTitle>
        </div>
      </CardHeader>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            {isOpen ? "Hide Details" : "Show Details"}
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <p className="mb-2"><strong>Behavior:</strong> {persona.behavior}</p>
            <p className="mb-2"><strong>Pain Points:</strong> {persona.painPoints}</p>
            <p className="mb-2"><strong>Motivations:</strong> {persona.motivations}</p>
            <p className="italic mt-4">"{persona.quote}"</p>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
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
  )
}