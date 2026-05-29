import { Movie } from "../domain/movie";
import { FavoriteRepository } from "../ports/favorite.repository";

export class FavoriteService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async getFavorites(): Promise<Movie[]> {
    try {
      const response = await this.favoriteRepository.getFavorites();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    } catch (error) {
      console.error("Error in getFavorites:", error);
      throw error;
    }
  }

  async addFavorite(movieId: string): Promise<void> {
    try {
      const response = await this.favoriteRepository.addFavorite(movieId);
      if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error(`Error in addFavorite (movieId: ${movieId}):`, error);
      throw error;
    }
  }

  async removeFavorite(movieId: string): Promise<void> {
    try {
      const response = await this.favoriteRepository.removeFavorite(movieId);
      if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error(`Error in removeFavorite (movieId: ${movieId}):`, error);
      throw error;
    }
  }
}
