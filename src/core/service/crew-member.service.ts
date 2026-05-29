import { CrewMember } from "../domain/movie";
import { CrewMemberRepository } from "../ports/crew-member.repository";

export class CrewMemberService {
  constructor(private readonly crewMemberRepository: CrewMemberRepository) {}

  async getAllCrewMembers(): Promise<CrewMember[]> {
    try {
      const response = await this.crewMemberRepository.getAllCrewMembers();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    } catch (error) {
      console.error("Error in getAllCrewMembers:", error);
      throw error;
    }
  }

  async searchCrewMembers(query: string): Promise<CrewMember[]> {
    try {
      const response = await this.crewMemberRepository.searchCrewMembers(query);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    } catch (error) {
      console.error(`Error in searchCrewMembers (query: ${query}):`, error);
      throw error;
    }
  }

  async getCrewMemberById(id: string): Promise<CrewMember> {
    try {
      const response = await this.crewMemberRepository.getCrewMemberById(id);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    } catch (error) {
      console.error(`Error in getCrewMemberById (id: ${id}):`, error);
      throw error;
    }
  }

  async createCrewMember(name: string): Promise<CrewMember> {
    try {
      const response = await this.crewMemberRepository.createCrewMember(name);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    } catch (error) {
      console.error("Error in createCrewMember:", error);
      throw error;
    }
  }

  async updateCrewMember(id: string, name: string): Promise<CrewMember> {
    try {
      const response = await this.crewMemberRepository.updateCrewMember(
        id,
        name,
      );
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    } catch (error) {
      console.error(`Error in updateCrewMember (id: ${id}):`, error);
      throw error;
    }
  }

  async deleteCrewMember(id: string): Promise<void> {
    try {
      const response = await this.crewMemberRepository.deleteCrewMember(id);
      if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error(`Error in deleteCrewMember (id: ${id}):`, error);
      throw error;
    }
  }
}
