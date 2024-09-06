export type KeywordCounts = {
  [key: string]: number;
};

export type Block = {
  id: string;
  type: "text" | "bullet";
  content: string;
};
export interface PlaceType {
  name: string;
  // other properties...
}
export interface Place {
  name: string;
  formatted_address: string;
  place_id: string;
  currentRating?: string;
  currentTotalReviews?: string;
  websiteUrl?:string;
  googleTypes?:string[];
}

export interface Settings {
  clientEmail?: string;
  complimentaryItem?: string;
  dialogBody?: string;
  dialogTitle?: string;
  emailAppPassword?: string;
  emailBody?: string;
  emailIntro?: string;
  emailSignature?: string;
  placeIds?: any[]; // Assuming placeIds is an array based on default value
  places?: Array<any>;
  questions?: Array<{ id: number; questions: string[] }>;
  showComplimentaryItem?: boolean;
  showWorryDialog?: boolean;
  userEmail?: string;
  websiteUrls?: any[]; // Assuming websiteUrls is an array based on default value
  worryRating?: number;
}

export interface CustomerReviewInfo {
  location: string; // Required string
  placeIdFromReview: string;
  rating: number; // Required number
  badges?: string[]; // Optional array of strings
  postedToGoogleReview?: boolean; // Defaults to false
  generatedReviewBody?: string; // Defaults to empty string
  finalReviewBody?: string; // Defaults to empty string
  emailSentToCompany?: boolean; // Defaults to false
  timeTakenToWriteReview?: number;
}

export interface CustomerReviewInfoFromSerializer {
  analyzed_review_details: object;
  badges: string; // This will be a JSON string initially
  email_sent_to_company: boolean;
  final_review_body: string;
  generated_review_body: string;
  id: number;
  location: string;
  place_id_from_review: string;
  posted_to_google_review: boolean;
  rating: number;
  time_taken_to_write_review_in_seconds: number;
  review_date?: string;
  internal_google_key_words?: string[];
}
