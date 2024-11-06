"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconMapType } from "../Types/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, Plus, X, Pencil, PlusCircle, BadgePlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { iconMap, flattenedIconMap } from "@/utils/IconList";
import AnimatedBadgePlusIcon from "./AnimatedIcons/AnimatedBadgePlusIcon";
import SparklesText from "./sparkles-text";
import Particles from "./particles";
import TypingAnimation from "./typing-animation";

interface Category {
  name: string;
  badges: { rating: number; badges: string[] }[];
}

interface RatingBubbleCardClientProps {
  businessName: string;
  categories: any;
  setCategories: any;
  handleSettingChange: any;
  userCardDescription?: string;
  chosenIcon?: string;
  setChosenIcon?: any;
}

export default function RatingBubbleCardClient({
  businessName,
  categories,
  setCategories,
  handleSettingChange,
  userCardDescription,
  chosenIcon,
  setChosenIcon,
}: RatingBubbleCardClientProps) {
  const { toast } = useToast();
  const [categoryRatings, setCategoryRatings] = useState<{
    [key: string]: number;
  }>(
    Object.fromEntries(
      (categories || []).map((category: Category) => [category.name, 0])
    )
  );
  const [selectedBadges, setSelectedBadges] = useState<{
    [key: string]: string[];
  }>({});
  const [newCategory, setNewCategory] = useState("");
  const [newBadge, setNewBadge] = useState("");
  const [newBadgeRating, setNewBadgeRating] = useState(1);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [cardDescription, setCardDescription] = useState(userCardDescription);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSettingChange("cardDescription", e.target.value);
    setCardDescription(e.target.value || "");
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSettingChange("cardDescription", cardDescription);
      setIsEditing(false);
    }
  };

  const handleCardClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    handleSettingChange("categories", categories);
  }, [categories]); // Whenever categories update, this effect will trigger

  const handleIconChange = (value: string) => {
    setChosenIcon(value);
    handleSettingChange("chosenIcon", value);
  };
  const handleCategoryRating = (categoryName: string, newRating: number) => {
    setCategoryRatings((prev) => ({ ...prev, [categoryName]: newRating }));
    setSelectedBadges((prevBadges) => ({
      ...prevBadges,
      [categoryName]: [],
    }));
  };

  const toggleBadge = (categoryName: string, badge: string) => {
    setSelectedBadges((prev) => {
      const categoryBadges = prev[categoryName] || [];
      return {
        ...prev,
        [categoryName]: categoryBadges.includes(badge)
          ? categoryBadges.filter((b) => b !== badge)
          : [...categoryBadges, badge],
      };
    });
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories((prev: Category[]) => {
        const updatedCategories = [
          ...prev,
          {
            name: newCategory,
            badges: [
              { rating: 1, badges: [] },
              { rating: 2, badges: [] },
              { rating: 3, badges: [] },
              { rating: 4, badges: [] },
              { rating: 5, badges: [] },
            ],
          },
        ];

        return updatedCategories;
      });

      setCategoryRatings((prev) => ({ ...prev, [newCategory]: 0 }));
      setNewCategory("");
    }
  };

  const addBadgeToCategory = (categoryName: string) => {
    if (newBadge.trim()) {
      setCategories((prev: Category[]) => {
        const updatedCategories = prev.map((category) =>
          category["name"] === categoryName
            ? {
                ...category,
                badges: category["badges"].map((badge) =>
                  badge["rating"] === newBadgeRating
                    ? {
                        ...badge,
                        badges: [...badge["badges"], newBadge],
                      }
                    : badge
                ),
              }
            : category
        );

        return updatedCategories;
      });

      // Clear the new badge input
      setNewBadge("");
    }
  };

  const removeCategory = (categoryName: string) => {
    setCategories((prev: Category[]) => {
      const updatedCategories = prev.filter(
        (category) => category.name !== categoryName
      );

      // Return the updated categories to update the state
      return updatedCategories;
    });

    setCategoryRatings((prev) => {
      const { [categoryName]: _, ...rest } = prev;
      return rest;
    });

    setSelectedBadges((prev) => {
      const { [categoryName]: _, ...rest } = prev;
      return rest;
    });
  };

  const removeBadge = (categoryName: string, rating: number, badge: string) => {
    setCategories((prev: Category[]) => {
      const updatedCategories = prev.map((category) =>
        category.name === categoryName
          ? {
              ...category,
              badges: category.badges.map((b) =>
                b.rating === rating
                  ? {
                      ...b,
                      badges: b.badges.filter(
                        (badgeName) => badgeName !== badge
                      ),
                    }
                  : b
              ),
            }
          : category
      );

      // Return the updated categories to update the state
      return updatedCategories;
    });
  };

  const SelectedIcon = flattenedIconMap[chosenIcon as keyof IconMapType];

  return (
    <Card className="w-full max-w-3xl border-0">
      <CardHeader>
        <CardTitle className="relative flex items-center justify-center text-sm">
          {/* Title centered in the middle */}
          <div className="absolute left-0 top-0 -mt-4">
            <Select onValueChange={handleIconChange} defaultValue={chosenIcon}>
              <SelectTrigger className="w-half h-1/4">
                {" "}
                {/* Adjust width as needed */}
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                {/* Map through icon groups */}
                <SelectGroup>
                  <SelectLabel>{"Traditional"}</SelectLabel>
                  {Object.entries(iconMap.actions).map(
                    ([key, IconComponent]) => (
                      <SelectItem key={key} value={key}>
                        <IconComponent size={12} />
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>{"Symbols"}</SelectLabel>
                  {Object.entries(iconMap.emotionsAndSymbols).map(
                    ([key, IconComponent]) => (
                      <SelectItem key={key} value={key}>
                        <IconComponent size={12} />
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>{"Animals"}</SelectLabel>
                  {Object.entries(iconMap.animals).map(
                    ([key, IconComponent]) => (
                      <SelectItem key={key} value={key}>
                        <IconComponent size={12} />
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>{"Food & Drinks"}</SelectLabel>
                  {Object.entries(iconMap.foodAndDrink).map(
                    ([key, IconComponent]) => (
                      <SelectItem key={key} value={key}>
                        <IconComponent size={12} />
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>{"Fitness"}</SelectLabel>
                  {Object.entries(iconMap.healthAndFitness).map(
                    ([key, IconComponent]) => (
                      <SelectItem key={key} value={key}>
                        <IconComponent size={12} />
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Centered Title */}
          <SparklesText className="text-sm" text={businessName} sparklesCount={5}/>
        </CardTitle>
        {isEditing ? (
          <Input
            ref={inputRef}
            type="text"
            value={cardDescription}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            className="text-center"
          />
        ) : (
          <CardDescription
            className="flex items-center justify-center space-x-1 mb-2 cursor-pointer"
            onClick={handleCardClick}
          >   
            {cardDescription}
            <Pencil className="ml-2" size={12} />
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {categories.map((category: Category) => (
          <div key={category.name} className="mb-6">
            <div
              className={
                categories.length > 1
                  ? "flex items-center mb-2 justify-between"
                  : "flex items-center mb-2 justify-center"
              }
            >
              {categories.length > 1 && (
                <h3 className="text-lg font-semibold">{category.name}</h3>
              )}
              {/* Centered the stars horizontally */}

              <div
                className={
                  categories.length > 1
                    ? "flex items-center space-x-2"
                    : "flex flex-col items-center mb-2"
                }
              >
                <div className="flex items-center space-x-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        animate={
                          i < categoryRatings[category.name]
                            ? {
                                y: [0, -10, 0],
                              }
                            : {}
                        }
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <SelectedIcon
                          key={i}
                          className={`w-5 h-5 cursor-pointer ${
                            i < categoryRatings[category.name]
                              ? "text-yellow-400"
                              : "text-neutral-400"
                          }`}
                          onClick={() =>
                            handleCategoryRating(category.name, i + 1)
                          }
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                {categories.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    hidden={categories.length <= 1}
                    onClick={() => removeCategory(category.name)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {category.badges
                .find((b) => b.rating === categoryRatings[category.name])
                ?.badges.map((badge) => (
                  <Badge
                    key={badge}
                    variant={
                      selectedBadges[category.name]?.includes(badge)
                        ? "default"
                        : "outline"
                    }
                    className={`cursor-pointer transition-colors ${
                      selectedBadges[category.name]?.includes(badge)
                        ? categoryRatings[category.name] < 4
                          ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                        : ""
                    }`}
                    onClick={() => toggleBadge(category.name, badge)}
                  >
                    {badge}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBadge(
                          category.name,
                          categoryRatings[category.name],
                          badge
                        );
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setEditingCategory(
                      editingCategory === category.name ? null : category.name
                    )
                  }
                  className="mt-2"
                >
                  <AnimatedBadgePlusIcon />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>New Badge</SheetTitle>
                  <SheetDescription>
                    {"Add a new badge and then click done."}
                  </SheetDescription>
                </SheetHeader>
                {
                  <div className="flex flex-col mt-2">
                    <Label className="mb-2">Badge:</Label>
                    <Input
                      value={newBadge}
                      onChange={(e) => setNewBadge(e.target.value)}
                      placeholder="New badge"
                      className="w-128 mb-4"
                    />

                    <Label className="mb-2">Rating:</Label>
                    <Input
                      type="number"
                      value={newBadgeRating}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= 1 && value <= 5) {
                          setNewBadgeRating(value);
                        } else {
                          toast({
                            title: "Rating must be between 1 & 5.",
                            duration: 3000,
                            variant: "destructive",
                          });
                        }
                      }}
                      className="w-16 mb-2"
                    />
                  </div>
                }
                <SheetFooter className="mt-4">
                  <SheetClose asChild>
                    <Button
                      onClick={() => addBadgeToCategory(category.name)}
                      variant="outline"
                    >
                      {"Done"}
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        ))}

        {categories.length > 1 && (
          <div className="flex items-center space-x-2 mt-4">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category"
              className="flex-grow"
            />
            <Button onClick={addCategory} variant="outline">
              Add Category
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
