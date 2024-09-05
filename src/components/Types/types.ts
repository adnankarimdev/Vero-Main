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
