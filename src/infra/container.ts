import { MovieRepositoryImpl } from "@/infra/repositories/movie.repository";
import { AuthRepositoryImpl } from "@/infra/repositories/auth.repository";
import { MasterDataRepositoryImpl } from "@/infra/repositories/master-data.repository";
import { MovieService } from "@/core/service/movie.service";
import { AuthService } from "@/core/service/auth.service";
import { MasterDataService } from "@/core/service/master-data.service";

const movieRepository = new MovieRepositoryImpl();
const authRepository = new AuthRepositoryImpl();
const masterDataRepository = new MasterDataRepositoryImpl();

export const movieService = new MovieService(movieRepository);
export const authService = new AuthService(authRepository);
export const masterDataService = new MasterDataService(masterDataRepository);
