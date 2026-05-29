import { ApiResponse } from "../interface/response";
import { CrewMemberRepository } from "@/core/ports/crew-member.repository";
import { CrewMember } from "@/core/domain/movie";
import httpClient from "@/lib/http";

export class CrewMemberRepositoryImpl implements CrewMemberRepository {
  async getAllCrewMembers(): Promise<ApiResponse<CrewMember[]>> {
    return await httpClient.get<CrewMember[]>("/crew-members/all");
  }

  async searchCrewMembers(query: string): Promise<ApiResponse<CrewMember[]>> {
    return await httpClient.get<CrewMember[]>(`/crew-members/search?q=${query}`);
  }

  async getCrewMemberById(id: string): Promise<ApiResponse<CrewMember>> {
    return await httpClient.get<CrewMember>(`/crew-members/${id}`);
  }

  async createCrewMember(name: string): Promise<ApiResponse<CrewMember>> {
    return await httpClient.post<CrewMember>("/crew-members", { name });
  }

  async updateCrewMember(
    id: string,
    name: string,
  ): Promise<ApiResponse<CrewMember>> {
    return await httpClient.put<CrewMember>(`/crew-members/${id}`, { name });
  }

  async deleteCrewMember(id: string): Promise<ApiResponse<void>> {
    return await httpClient.delete<void>(`/crew-members/${id}`);
  }
}
