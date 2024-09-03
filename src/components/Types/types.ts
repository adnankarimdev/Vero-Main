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
}
