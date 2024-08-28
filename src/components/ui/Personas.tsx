"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'

const personas = [
    {
      name: "Routine-Richard",
      behavior: "Visits daily, often orders the same thing, prefers consistency in flavor and experience.",
      painPoints: "Dislikes when his usual order isn’t available or when the coffee shop is too crowded.",
      motivations: "Values routine and reliability, appreciates a personal touch (e.g., baristas remembering his name and order).",
      quote: "I come here every morning because I know exactly what I’m getting, and it’s always good."
    },
    {
      name: "Social Samantha",
      behavior: "Comes with friends or colleagues, enjoys the ambiance for socializing, often orders a variety of drinks to share.",
      painPoints: "Dislikes when there isn’t enough seating or when the noise level is too high.",
      motivations: "Seeks a cozy, welcoming environment where she can relax and chat with friends.",
      quote: "This place is perfect for catching up with friends over a latte!"
    },
    {
      name: "Eco-Conscious Ethan",
      behavior: "Inquires about the source of your coffee beans, prefers organic and fair-trade options, often brings his own reusable cup.",
      painPoints: "Frustrated by lack of sustainable practices, dislikes excess packaging or waste.",
      motivations: "Prioritizes sustainability and ethical sourcing, willing to pay more for eco-friendly options.",
      quote: "I love that this coffee shop offers fair-trade, organic beans—it’s why I keep coming back!"
    },
    {
      name: "Busy-Becky",
      behavior: "Drops by for a quick coffee on the way to work, values speed and efficiency, often orders to-go.",
      painPoints: "Dislikes long wait times or complicated ordering processes.",
      motivations: "Needs quick and convenient service without sacrificing quality.",
      quote: "I need my coffee fast and to-go, and this place always delivers without a hitch."
    },
    {
      name: "Freelancer Fiona",
      behavior: "Brings her laptop, stays for extended periods, orders coffee and snacks while working.",
      painPoints: "Dislikes unreliable Wi-Fi or lack of available outlets.",
      motivations: "Looks for a comfortable, quiet place to work with good Wi-Fi and a relaxed atmosphere.",
      quote: "This coffee shop is my go-to workspace—I can focus and enjoy great coffee at the same time."
    },
    {
      name: "Family-Friendly Fran",
      behavior: "Visits with children, orders kid-friendly drinks and snacks, appreciates a family-oriented environment.",
      painPoints: "Dislikes when there aren’t enough options for kids or when the environment isn’t family-friendly.",
      motivations: "Seeks a welcoming place where both adults and children can enjoy themselves.",
      quote: "It’s rare to find a coffee shop where I can relax with a coffee while my kids enjoy their treats."
    },
    {
      name: "Trendy-Tina",
      behavior: "Interested in the latest coffee trends, frequently orders specialty drinks, active on social media.",
      painPoints: "Dislikes when the menu lacks innovative or trendy options.",
      motivations: "Seeks to try new and unique coffee experiences, loves sharing them on social media.",
      quote: "I had to try their new seasonal latte—it’s all over Instagram, and it didn’t disappoint!"
    }
  ];

export default function Personas() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {personas.map((persona, index) => (
            <div className="flex-[0_0_100%] min-w-0 pl-4" key={index}>
              <Card className="w-full">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={`/placeholder.svg?height=64&width=64`} alt={persona.name} />
                      <AvatarFallback>{persona.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-2xl font-bold">{persona.name}</h3>
                  </div>
                  <p className="mb-2"><strong>Behavior:</strong> {persona.behavior}</p>
                  <p className="mb-2"><strong>Pain Points:</strong> {persona.painPoints}</p>
                  <p className="mb-2"><strong>Motivations:</strong> {persona.motivations}</p>
                  <p className="italic mt-4">"{persona.quote}"</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}