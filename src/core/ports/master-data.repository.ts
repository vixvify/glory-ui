import { ApiResponse } from "@/infra/interface/response";
import { Category, University, AgeRating } from "../domain/movie";

export interface MasterDataRepository {
  getCategories(): Promise<ApiResponse<Category[]>>;
  getUniversities(): Promise<ApiResponse<University[]>>;
  getAgeRatings(): Promise<ApiResponse<AgeRating[]>>;
}
