import { ApiResponse } from "../interface/response";
import { MovieRepository } from "@/core/ports/movie.repository";
import { Movie, CreateMovie, UpdateMovie } from "@/core/domain/movie";
import httpClient from "@/lib/http";
import { parseSchema } from "@/lib/validation";
import { updateMovieSchema, createMovieSchema } from "@/core/schema/movie";

export class MovieRepositoryImpl implements MovieRepository {
    async getAllMovies(): Promise<ApiResponse<Movie[]>> {
        const response = await httpClient.get<ApiResponse<Movie[]>>("/movie/all");
        return response.data
    }
    async getMovieById(id: string): Promise<ApiResponse<Movie>> {
        const response = await httpClient.get<ApiResponse<Movie>>(`/movie/${id}`);
        return response.data
    }
    async searchMovies(query: string): Promise<ApiResponse<Movie[]>> {
        const response = await httpClient.get<ApiResponse<Movie[]>>(`/movie/search?q=${query}`);
        return response.data
    }
    async getMoviesByCategory(category: string): Promise<ApiResponse<Movie[]>> {
        const response = await httpClient.get<ApiResponse<Movie[]>>(`/movie/category/${category}`);
        return response.data
    }
    async createMovie(movie: CreateMovie): Promise<ApiResponse<Movie>> {
        const validated = parseSchema(createMovieSchema, movie);
        const formData = new FormData();
        formData.append("title", validated.title);
        formData.append("description", validated.description);
        formData.append("category", validated.category);
        formData.append("youtubeUrl", validated.youtubeUrl);
        formData.append("year", String(validated.year));
        formData.append("matchRate", String(validated.matchRate));
        formData.append("ageRating", validated.ageRating);
        formData.append("duration", validated.duration.toString());

        if (validated.thumbnail instanceof File) {
            formData.append("image", validated.thumbnail);
        } else if (validated.thumbnail && (validated.thumbnail as any).length > 0) {
            formData.append("image", (validated.thumbnail as any)[0]);
        }

        const response = await httpClient.post<ApiResponse<Movie>>("/movie", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data
    }
    async updateMovie(id: string, movie: UpdateMovie): Promise<ApiResponse<Movie>> {
        const validated = parseSchema(updateMovieSchema, movie);
        const formData = new FormData();
        formData.append("title", validated.title);
        formData.append("description", validated.description);
        formData.append("category", validated.category);
        formData.append("youtubeUrl", validated.youtubeUrl);
        formData.append("year", String(validated.year));
        formData.append("matchRate", String(validated.matchRate));
        formData.append("ageRating", validated.ageRating);
        formData.append("duration", validated.duration.toString());

        if (validated.thumbnail instanceof File) {
            formData.append("image", validated.thumbnail);
        } else if (validated.thumbnail && (validated.thumbnail as any).length > 0 && typeof validated.thumbnail !== "string") {
            formData.append("image", (validated.thumbnail as any)[0]);
        } else if (typeof validated.thumbnail === "string") {
            formData.append("imageUrl", validated.thumbnail);
        }

        const response = await httpClient.put<ApiResponse<Movie>>(`/movie/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data
    }
    async deleteMovie(id: string): Promise<ApiResponse<void>> {
        const response = await httpClient.delete<ApiResponse<void>>(`/movie/${id}`);
        return response.data
    }
    async getFavorites(): Promise<ApiResponse<string[]>> {
        const response = await httpClient.get<ApiResponse<string[]>>("/movie/favorites");
        return response.data
    }
    async addFavorite(movieId: string): Promise<ApiResponse<void>> {
        const response = await httpClient.post<ApiResponse<void>>("/movie/favorites", { movieId });
        return response.data
    }
    async removeFavorite(movieId: string): Promise<ApiResponse<void>> {
        const response = await httpClient.delete<ApiResponse<void>>(`/movie/favorites/${movieId}`);
        return response.data
    }
}