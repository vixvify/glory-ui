import { ApiResponse } from "../interface/response";
import { FavoriteRepository } from "@/core/ports/favorite.repository";
import { Movie } from "@/core/domain/movie";
import httpClient from "@/lib/http";

export class FavoriteRepositoryImpl implements FavoriteRepository {
  async getFavorites(): Promise<ApiResponse<Movie[]>> {
    return await httpClient.get<Movie[]>("/movie/favorites");
  }

  async addFavorite(movieId: string): Promise<ApiResponse<void>> {
    return await httpClient.post<void>("/movie/favorites", {
      movieId,
    });
  }

  async removeFavorite(movieId: string): Promise<ApiResponse<void>> {
    return await httpClient.delete<void>(`/movie/favorites/${movieId}`);
  }
}
