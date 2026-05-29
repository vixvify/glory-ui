import { ApiResponse } from "../interface/response";
import { MasterDataRepository } from "@/core/ports/master-data.repository";
import httpClient from "@/lib/http";

export class MasterDataRepositoryImpl implements MasterDataRepository {
  async getCategories(): Promise<ApiResponse<string[]>> {
    const response = await httpClient.get<string[]>("/masterdata/categories");
    return response;
  }

  async getUniversities(): Promise<ApiResponse<string[]>> {
    const response = await httpClient.get<string[]>("/masterdata/universities");
    return response;
  }

  async getAgeRatings(): Promise<ApiResponse<string[]>> {
    const response = await httpClient.get<string[]>("/masterdata/ratings");
    return response;
  }
}
