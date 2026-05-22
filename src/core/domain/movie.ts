import { Rating } from "./rating";

export interface Movie {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  youtubeUrl: string;
  views: number;
  ratings: Rating[];
  year: number;
  matchRate: number;
  ageRating: string;
  duration: string;
}

