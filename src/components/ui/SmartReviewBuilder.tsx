"use client"

import React, { useState, useEffect } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const categories = [
  {
    name: "Experience and Atmosphere",
    questions: [
      "What did you enjoy most about your visit to Phil and Sebastian?",
      "How would you describe the atmosphere and ambiance of our coffee shop?",
      "Was there a specific moment during your visit that stood out to you?"
    ]
  },
  {
    name: "Product and Quality",
    questions: [
      "What is your favorite drink or food item at Phil and Sebastian, and why?",
      "How would you rate the quality of our coffee compared to other places you've tried?",
      "Did you try any of our specialty drinks? What did you think of them?"
    ]
  },
  {
    name: "Service and Staff",
    questions: [
      "How was your interaction with our staff? Did anyone provide exceptional service?",
      "Was the service at Phil and Sebastian up to your expectations?",
      "How did our baristas help make your visit special?"
    ]
  },
  // {
  //   name: "Comparison and Preferences",
  //   questions: [
  //     "How does Phil and Sebastian compare to other coffee shops you've visited?",
  //     "What makes you choose Phil and Sebastian over other coffee places?",
  //     "If you could change or add one thing to Phil and Sebastian, what would it be?"
  //   ]
  // },
  // {
  //   name: "Specific Experiences",
  //   questions: [
  //     "Did you try our [specific product/event]? What did you think?",
  //     "How did you feel about our seating arrangement and space?",
  //     "What brings you back to Phil and Sebastian?"
  //   ]
  // },
  // {
  //   name: "Value and Recommendations",
  //   questions: [
  //     "Do you think Phil and Sebastian offers good value for the price?",
  //     "Would you recommend Phil and Sebastian to a friend? Why or why not?",
  //     "What would you tell someone who's never visited Phil and Sebastian before?"
  //   ]
  // },
  // {
  //   name: "Unique Experiences",
  //   questions: [
  //     "Did you notice anything unique about Phil and Sebastian that stood out to you?",
  //     "How does our coffee shop contribute to your daily routine or special occasions?"
  //   ]
  // }
]

const SmartReviewBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [reviews, setReviews] = useState<string[]>(new Array(categories.length).fill(''))
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
  const [isReviewComplete, setIsReviewComplete] = useState(false)
  const [showAlert, setShowAlert] = useState(false);
  const [sophisticatedReview, setSophisticatedReview] = useState('')
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Randomly select one question from each category
    const questions = categories.map(category => 
      category.questions[Math.floor(Math.random() * category.questions.length)]
    )
    setSelectedQuestions(questions)
  }, [])

  const handleReviewChange = (review: string) => {
    const newReviews = [...reviews]
    newReviews[currentStep] = review
    setReviews(newReviews)
  }

  const handleNext = () => {
    if (currentStep < categories.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsReviewComplete(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Submitted reviews:", reviews);
    const allReviews = reviews.join('\n');
    // Copy the review text to the clipboard
    navigator.clipboard.writeText(allReviews).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Your review has been copied to the clipboard! You can now paste it into the Google review form."
      })
      
    // Wait for a brief moment to allow the toast to appear before opening the new window
    setTimeout(() => {
      window.open("https://search.google.com/local/writereview?placeid=ChIJzd0u2lRlcVMRoSTjaEEDL_E", "_blank", "noopener,noreferrer");
    }, 2000);

    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        title: "Review failed to Process",
        description: "It's not you, it's us. Please try again."
      })
    });
  };

  const handleSubmitSophisticated = () => {
    // Copy the review text to the clipboard
    navigator.clipboard.writeText(sophisticatedReview).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Your review has been copied to the clipboard! You can now paste it into the Google review form."
      })
      
    // Wait for a brief moment to allow the toast to appear before opening the new window
    setTimeout(() => {
      window.open("https://search.google.com/local/writereview?placeid=ChIJzd0u2lRlcVMRoSTjaEEDL_E", "_blank", "noopener,noreferrer");
    }, 2000);

    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        title: "Review failed to Process",
        description: "It's not you, it's us. Please try again."
      })
    });
  };

  const handleSophisticateReview = () => {
    console.log("Submitted reviews:", reviews);
    const allReviews = reviews.join('\n');
    axios.post("http://localhost:8021/backend/create-review/", {
      allReviewsToSend: allReviews,
    })
    .then(response => {
      // Handle success response
      setSophisticatedReview(response.data.content)
      toast({
        title: "Sophisticated Review Generated",
      })
      setIsDialogOpen(true);
    })
    .catch(error => {
      // Handle error
      console.error(error);
    });

  };

  if (isDialogOpen)
  {
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Sophisticated Review</DialogTitle>
          <Textarea defaultValue={sophisticatedReview} 
          className="w-full min-h-[400px]" 
          onChange={(e) => setSophisticatedReview(e.target.value)}/>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmitSophisticated}>Use Review</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )    
  }
  if (isReviewComplete) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Your Complete Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map((category, index) => (
            <div key={index} className="space-y-2">
              {/* <h3 className="font-semibold">{category.name}</h3> */}
              {/* <p className="text-sm text-muted-foreground">{selectedQuestions[index]}</p> */}
              <p>{reviews[index]}</p>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleSubmit}>Submit Review</Button>
          <Button onClick={handleSophisticateReview}>Sophisticate Review</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{categories[currentStep].name}</CardTitle>
        <Progress value={(currentStep + 1) / categories.length * 100} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium">{selectedQuestions[currentStep]}</p>
        <Textarea
          placeholder="Write your review here..."
          value={reviews[currentStep]}
          onChange={(e) => handleReviewChange(e.target.value)}
          rows={5}
          className="resize-none"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentStep === 0}>Previous</Button>
        <Button onClick={handleNext}>
          {currentStep === categories.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SmartReviewBuilder