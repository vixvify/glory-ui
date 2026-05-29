import { ApiResponse } from "@/infra/interface/response";

export interface MasterDataRepository {
  getCategories(): Promise<ApiResponse<string[]>>;
  getUniversities(): Promise<ApiResponse<string[]>>;
  getAgeRatings(): Promise<ApiResponse<string[]>>;
}
