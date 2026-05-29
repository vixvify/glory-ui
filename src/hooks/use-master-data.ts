import { useQuery } from "@tanstack/react-query";
import { masterDataService } from "@/infra/container";
import { Category, University, AgeRating, CrewMember } from "@/core/domain/movie";

export function useCategoriesQuery() {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: () => masterDataService.getCategories(),
  });
}

export function useUniversitiesQuery() {
  return useQuery<University[], Error>({
    queryKey: ["universities"],
    queryFn: () => masterDataService.getUniversities(),
  });
}

export function useAgeRatingsQuery() {
  return useQuery<AgeRating[], Error>({
    queryKey: ["ageRatings"],
    queryFn: () => masterDataService.getAgeRatings(),
  });
}

export function useCrewMembersQuery() {
  return useQuery<CrewMember[], Error>({
    queryKey: ["crewMembers"],
    queryFn: () => masterDataService.getCrewMembers(),
  });
}
