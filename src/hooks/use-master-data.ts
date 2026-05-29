import { useQuery } from "@tanstack/react-query";
import { masterDataService } from "@/infra/container";

export function useCategoriesQuery() {
  return useQuery<string[], Error>({
    queryKey: ["categories"],
    queryFn: () => masterDataService.getCategories(),
  });
}

export function useUniversitiesQuery() {
  return useQuery<string[], Error>({
    queryKey: ["universities"],
    queryFn: () => masterDataService.getUniversities(),
  });
}

export function useAgeRatingsQuery() {
  return useQuery<string[], Error>({
    queryKey: ["ageRatings"],
    queryFn: () => masterDataService.getAgeRatings(),
  });
}
