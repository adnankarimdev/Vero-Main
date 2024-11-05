"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "./use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, X } from "lucide-react";

interface Service {
  title: string;
  description: string;
}

interface OpeningHours {
  [key: string]: { open: string; close: string };
}

import RecordingLoader from "./Skeletons/RecordingLoader";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ShopWebsiteForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [tagline, setTagline] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [openingHours, setOpeningHours] = useState<OpeningHours>({
    Monday: { open: "09:00", close: "17:00" },
    Tuesday: { open: "09:00", close: "17:00" },
    Wednesday: { open: "09:00", close: "17:00" },
    Thursday: { open: "09:00", close: "17:00" },
    Friday: { open: "09:00", close: "17:00" },
    Saturday: { open: "10:00", close: "16:00" },
    Sunday: { open: "Closed", close: "Closed" },
  });
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) {
          toast({
            title: "Please sign in.",
            duration: 3000,
          });
          router.push("/login");
          console.error("Email not found in localStorage");
          return;
        } else {
          setIsLoading(false);
          setUserEmail(email);
        }
      } catch (err) {
        router.push("/login");
        setIsLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const [newService, setNewService] = useState<Service>({
    title: "",
    description: "",
  });
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);

  const handleAddService = () => {
    if (newService.title && newService.description) {
      setServices([...services, newService]);
      setNewService({ title: "", description: "" });
      setIsServiceDialogOpen(false);
    }
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  const handleOpeningHoursChange = (
    day: string,
    type: "open" | "close",
    value: string
  ) => {
    setOpeningHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: value },
    }));
  };

  const validateForm = () => {
    if (!businessName.trim()) {
      toast({
        title: "Business name is required",
        description: "Please enter your business name.",
        variant: "destructive",
      });
      return false;
    }
    if (!address.trim()) {
      toast({
        title: "Business address is required",
        description: "Please enter your business address.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const websiteData = {
      userEmail,
      businessName,
      tagline,
      aboutUs,
      services,
      contactInfo: {
        address,
        phoneNumber,
        email,
        openingHours,
      },
      socialMedia: {
        facebook,
        twitter,
        instagram,
        linkedin,
      },
    };
    console.log(websiteData);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/website-creator/`,
        {
          data: websiteData,
        }
      )
      .then((response) => {
        setIsLoading(false);
        toast({
          title: "Website information submitted successfully",
          duration: 3000,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          title: "Failed to submit website information",
          description: "Please try again.",
          duration: 3000,
        });
      });
  };

  return (
    <>
      {isLoading && <RecordingLoader />}
      {!isLoading && (
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Website Information Form</CardTitle>
            <CardDescription>
              Fill out the details for your business website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline or Short Description</Label>
                <Input
                  id="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aboutUs">About Us</Label>
                <Textarea
                  id="aboutUs"
                  value={aboutUs}
                  onChange={(e) => setAboutUs(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Services</h3>
                  <Dialog
                    open={isServiceDialogOpen}
                    onOpenChange={setIsServiceDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Service
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add a New Service</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="newServiceTitle">Service Title</Label>
                          <Input
                            id="newServiceTitle"
                            value={newService.title}
                            onChange={(e) =>
                              setNewService({
                                ...newService,
                                title: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newServiceDescription">
                            Service Description
                          </Label>
                          <Textarea
                            id="newServiceDescription"
                            value={newService.description}
                            onChange={(e) =>
                              setNewService({
                                ...newService,
                                description: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <Button onClick={handleAddService} className="w-full">
                          Add Service
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                {services.map((service, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold">
                          {service.title}
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveService(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <p>{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Opening Hours</h3>
                {daysOfWeek.map((day) => (
                  <div key={day} className="flex items-center space-x-4">
                    <Label className="w-24">{day}</Label>
                    <Select
                      value={openingHours[day].open}
                      onValueChange={(value) =>
                        handleOpeningHoursChange(day, "open", value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select opening time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Closed">Closed</SelectItem>
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                          <SelectItem
                            key={hour}
                            value={`${hour.toString().padStart(2, "0")}:00`}
                          >
                            {`${hour.toString().padStart(2, "0")}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span>to</span>
                    <Select
                      value={openingHours[day].close}
                      onValueChange={(value) =>
                        handleOpeningHoursChange(day, "close", value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select closing time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Closed">Closed</SelectItem>
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                          <SelectItem
                            key={hour}
                            value={`${hour.toString().padStart(2, "0")}:00`}
                          >
                            {`${hour.toString().padStart(2, "0")}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Media Links</h3>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    type="url"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    type="url"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    type="url"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="w-full">
              Submit Information
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
