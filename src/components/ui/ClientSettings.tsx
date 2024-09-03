import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Place } from "../Types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { PlaceType } from "../Types/types";

export default function ClientSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    questions: Array(5)
      .fill(null)
      .map((_, i) => ({
        id: i + 1,
        questions: [""],
      })),
    emailIntro: "",
    emailSignature: "",
    emailBody: "",
    emailAppPassword: "",
    clientEmail: "",
    worryRating: 3,
    showWorryDialog: true,
    placeIds: [],
    showComplimentaryItem: false,
    complimentaryItem: "",
    dialogBody: "",
    dialogTitle: "",
    websiteUrls: [],
    userEmail: "",
    places: [],
  });
  const [placeIds, setPlaceIds] = useState([]);
  const [placesInfo, setPlacesInfo] = useState<Place[]>([]);
  const [websiteURLS, setWebsiteURLS] = useState([]);
  const [websiteAndLocation, setWebsiteAndLocation] = useState([]);

  const handleQuestionChange = (
    ratingId: number,
    questionIndex: number,
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === ratingId
          ? {
              ...q,
              questions: q.questions.map((oldQ, i) =>
                i === questionIndex ? value : oldQ
              ),
            }
          : q
      ),
    }));
  };

  const addQuestion = (ratingId: number) => {
    setSettings((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === ratingId ? { ...q, questions: [...q.questions, ""] } : q
      ),
    }));
  };

  const removeQuestion = (ratingId: number, questionIndex: number) => {
    setSettings((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === ratingId
          ? {
              ...q,
              questions: q.questions.filter((_, i) => i !== questionIndex),
            }
          : q
      ),
    }));
  };

  const handleSettingChange = (
    key: string,
    value: string | number | boolean | { id: number; questions: string[] }[]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const validateSettings = () => {
    const errors = [];

    // Validate questions
    settings.questions.forEach((rating) => {
      if (rating.questions.length === 0 || rating.questions[0].trim() === "") {
        errors.push(`Rating ${rating.id} must have at least one question`);
      }
    });

    // Validate email fields
    if (!settings.emailAppPassword) {
      errors.push("Email app password is required");
    }
    if (!settings.clientEmail) {
      errors.push("Client email is required");
    }

    return errors;
  };

  const handleSave = () => {
    const errors = validateSettings();
    console.log(
      "user emaillll in settings:",
      localStorage.getItem("userEmail")
    );

    if (errors.length > 0) {
      errors.forEach((error) => {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: error,
        });
      });
    } else {
      // Here you would typically send the settings to your backend
      console.log("Saving settings:", settings);
      axios
        .post("http://10.0.0.239:8021/backend/save-review-settings/", settings)
        .then((response) => {
          toast({
            title: "Success",
            description: "Settings Updated.",
          });
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: "Failed to update",
            description: error.response.data.error,
          });
        });
      toast({
        title: "Settings Saved",
        description: "Your settings have been successfully updated.",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        console.log("email in local", email);
        if (!email) {
          console.error("Email not found in localStorage");
          return;
        }

        // First, fetch the placeId
        const placeIdResponse = await axios.get(
          `http://10.0.0.239:8021/backend/get-place-id-by-email/${email}/`
        );
        handleSettingChange("placeIds", placeIdResponse.data.placeIds);
        console.log("my place idss", placeIdResponse.data.places);
        handleSettingChange("userEmail", email as string);
        setPlaceIds(placeIdResponse.data.placeIds);
        setPlacesInfo(placeIdResponse.data.places);
        setWebsiteURLS(placeIdResponse.data.websiteUrls);

        const placeIdsAsArray = placeIdResponse.data.places.map(
          (place: any) => place.place_id
        );
        console.log(placeIdsAsArray);
        const placeIdsQuery = placeIdsAsArray.join(",");

        // Then, use the fetched placeId to get the review settings
        const reviewSettingsResponse = await axios.get(
          `http://10.0.0.239:8021/backend/get-review-settings/${placeIdsQuery}/`
        );
        console.log("Fetched review settings:", reviewSettingsResponse);

        // Update the settings state
        setSettings(reviewSettingsResponse.data);
        if (reviewSettingsResponse.data.questions.length == 0) {
          handleSettingChange(
            "questions",
            Array(5)
              .fill(null)
              .map((_, i) => ({
                id: i + 1,
                questions: [""],
              }))
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Customer Review Settings</CardTitle>
        <CardDescription>
          Configure your customer feedback system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="questions">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="ratings">Ratings</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
          </TabsList>
          <TabsContent value="questions">
            {settings.questions.map((rating) => (
              <div key={rating.id} className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Rating {rating.id}</h3>
                </div>
                {rating.questions.map((question, index) => (
                  <div key={index} className="flex items-center mb-2 space-x-2">
                    <Input
                      placeholder={`Question ${index + 1} for rating ${rating.id}`}
                      value={question}
                      onChange={(e) =>
                        handleQuestionChange(rating.id, index, e.target.value)
                      }
                      className="w-3/4"
                    />
                    {index === 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => addQuestion(rating.id)}
                        aria-label={`Add question for rating ${rating.id}`}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    )}
                    {rating.questions.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeQuestion(rating.id, index)}
                        aria-label={`Remove question ${index + 1} for rating ${rating.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </TabsContent>
          <TabsContent value="email">
            <div className="space-y-4">
              <div>
                <Label htmlFor="clientEmail">Client Email</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={settings.clientEmail}
                  onChange={(e) =>
                    handleSettingChange("clientEmail", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="emailAppPassword">App Password</Label>
                <Input
                  id="emailAppPassword"
                  type="password"
                  value={settings.emailAppPassword}
                  onChange={(e) =>
                    handleSettingChange("emailAppPassword", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="emailIntro">Email Introduction</Label>
                <Textarea
                  id="emailIntro"
                  value={settings.emailIntro}
                  onChange={(e) =>
                    handleSettingChange("emailIntro", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="emailBody">Email Body</Label>
                <Textarea
                  id="emailBody"
                  value={settings.emailBody}
                  onChange={(e) =>
                    handleSettingChange("emailBody", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="emailSignature">Email Signature</Label>
                <Textarea
                  id="emailSignature"
                  value={settings.emailSignature}
                  onChange={(e) =>
                    handleSettingChange("emailSignature", e.target.value)
                  }
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="ratings">
            <div className="space-y-4">
              <div>
                <Label htmlFor="worryRating">Worry Rating Threshold</Label>
                <Input
                  id="worryRating"
                  type="number"
                  min="1"
                  max="5"
                  value={settings.worryRating}
                  onChange={(e) =>
                    handleSettingChange("worryRating", parseInt(e.target.value))
                  }
                />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showWorryDialog"
                    checked={settings.showWorryDialog}
                    onCheckedChange={(checked) =>
                      handleSettingChange("showWorryDialog", checked)
                    }
                  />
                  <Label htmlFor="showWorryDialog">Show Worry Dialog</Label>
                </div>

                {settings.showWorryDialog && (
                  <div>
                    <div className="mt-2">
                      <Label htmlFor="dialogTitle">Dialog Title</Label>
                      <Input
                        id="dialogTitle"
                        type="text"
                        value={settings.dialogTitle}
                        onChange={(e) =>
                          handleSettingChange("dialogTitle", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="mt-2">
                      <Label htmlFor="dialogBody">Dialog Body</Label>
                      <Textarea
                        id="dialogBody"
                        value={settings.dialogBody}
                        rows={5}
                        onChange={(e) =>
                          handleSettingChange("dialogBody", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="locations">
            <div className="space-y-4">
              <div>
                <div className="mb-4">
                  {" "}
                  {/* Add margin-bottom to create space */}
                  <Label htmlFor="placeIds">Registered Places</Label>
                  {websiteURLS.map((website, index) => (
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      <div className="text-lg font-medium">
                        <Badge className="text-white">
                          {" " + placesInfo[index].name}
                        </Badge>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="showComplimentaryItem"
                  checked={settings.showComplimentaryItem}
                  onCheckedChange={(checked) =>
                    handleSettingChange("showComplimentaryItem", checked)
                  }
                />
                <Label htmlFor="showComplimentaryItem">
                  Offer Complimentary Item
                </Label>
              </div>
              {settings.showComplimentaryItem && (
                <div>
                  <Label htmlFor="complimentaryItem">Complimentary Item</Label>
                  <Input
                    id="complimentaryItem"
                    value={settings.complimentaryItem}
                    onChange={(e) =>
                      handleSettingChange("complimentaryItem", e.target.value)
                    }
                  />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Settings</Button>
      </CardFooter>
    </Card>
  );
}
