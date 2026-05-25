"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/ui/Navbar";
import MovieHero from "@/components/movie/MovieHero";
import MovieGrid from "@/components/movie/MovieGrid";
import MovieCard from "@/components/movie/MovieCard";
import MovieDetailsModal from "@/components/movie/MovieDetailsModal";
import TrailerModal from "@/components/modal/TrailerModal";
import AuthModal from "@/components/modal/AuthModal";
import { Movie } from "@/core/domain/movie";
import { User } from "@/core/domain/user";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { movieService, authService } from "@/infra/container";
import { useAppStore } from "@/store/useStore";
import Loading from "./loading";
import { Toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { categoryTitleMapping } from "@/core/constants/categories";

export default function HomePage() {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showMyListOnly, setShowMyListOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const { currentUser, setCurrentUser, showToast } = useAppStore();

  useEffect(() => {
    const fetchMoviesAndCategories = async () => {
      try {
        const favoritesPromise = currentUser
          ? movieService.getFavorites()
          : Promise.resolve([]);

        const [moviesList, cats, favMovies] = await Promise.all([
          movieService.getAllMovies(),
          movieService.getCategories(),
          favoritesPromise,
        ]);

        setAllMovies(moviesList);
        setCategories(cats);
        setFavorites(favMovies);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesAndCategories();
  }, [currentUser]);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
  };

  const handleSignOut = async () => {
    try {
      await authService.logout();
      showToast("ออกจากระบบสำเร็จ", "info");
    } catch (err) {
      console.error(err);
    }
    setCurrentUser(null);
  };

  const handleToggleFavorite = async (movieId: string) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }
    const isCurrentlyFavorite = favorites.includes(movieId);

    try {
      if (isCurrentlyFavorite) {
        setFavorites((prev) => prev.filter((id) => id !== movieId));
        await movieService.removeFavorite(movieId);
        showToast("นำออกจากรายการโปรดแล้ว", "info");
      } else {
        setFavorites((prev) => [...prev, movieId]);
        await movieService.addFavorite(movieId);
        showToast("เพิ่มลงในรายการโปรดแล้ว", "success");
      }

    } catch (error) {
      console.error("Error in handleToggleFavorite:", error);
    }
  };

  const handleAddRating = async (
    movieId: string,
    user: User,
    stars: number
  ) => {
    try {
      await movieService.addRating({ userId: user.id, movieId, stars });
      showToast("เพิ่มคะแนนแล้ว", "success");
    } catch (error) {
      showToast("เกิดข้อผิดพลาด", "error");
    }
  };

  const handleUpdateRating = async (
    movieId: string,
    user: User,
    stars: number
  ) => {
    try {
      await movieService.updateRating({ userId: user.id, movieId, stars });
      showToast("แก้ไขคะแนนแล้ว", "success");
    } catch (error) {
      showToast("เกิดข้อผิดพลาด", "error");
    }
  };

  const handleDeleteRating = async (
    movieId: string,
    user: User
  ) => {
    try {
      await movieService.deleteRating({ userId: user.id, movieId });
      showToast("ลบคะแนนแล้ว", "success");
    } catch (error) {
      showToast("เกิดข้อผิดพลาด", "error");
    }
  };

  const handlePlayTrailer = (movie: Movie) => {
    setTrailerMovie(movie);
    setIsPlayingTrailer(true);
  };

  const activeMovieForModal = selectedMovie
    ? allMovies.find((m) => m.id === selectedMovie.id) || selectedMovie
    : null;

  const getFilteredMovies = () => {
    let list = allMovies;

    if (showMyListOnly) {
      list = list.filter((m) => favorites.includes(m.id));
    } else if (selectedCategory) {
      list = list.filter((m) => m.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
      );
    }

    return list;
  };

  const filteredMovies = getFilteredMovies();
  const isBrowsingRowView = !searchQuery && !selectedCategory && !showMyListOnly;

  const recommendedMovies = () => {
    return allMovies.sort((a, b) => b.matchRate - a.matchRate).slice(0, 5)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-background text-white flex flex-col font-sans select-none pb-16 transition-colors duration-450">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        showMyListOnly={showMyListOnly}
        onMyListOnlyChange={setShowMyListOnly}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onSignInClick={() => setIsAuthOpen(true)}
        categories={categories}
      />

      {isBrowsingRowView ? (
        <main className="flex-1 flex flex-col">
          <MovieHero
            movies={recommendedMovies()}
            onPlayClick={handlePlayTrailer}
            onInfoClick={setSelectedMovie}
          />

          <div className="relative z-20 px-6 md:px-16 space-y-12 -mt-6 md:-mt-10">
            <MovieRow
              title="ยอดนิยม"
              movies={allMovies}
              onMovieClick={setSelectedMovie}
              onPlayClick={handlePlayTrailer}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />

            {categories.map((category) => {
              const categoryMovies = allMovies.filter((m) => m.category === category);
              if (categoryMovies.length === 0) return null;

              const displayTitle = categoryTitleMapping[category] || category;

              return (
                <MovieRow
                  key={category}
                  title={displayTitle}
                  movies={categoryMovies}
                  onMovieClick={setSelectedMovie}
                  onPlayClick={handlePlayTrailer}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              );
            })}

            {allMovies.filter((m) => favorites.includes(m.id)).length > 0 && (
              <MovieRow
                title="รายการของฉัน"
                movies={allMovies.filter((m) => favorites.includes(m.id))}
                onMovieClick={setSelectedMovie}
                onPlayClick={handlePlayTrailer}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            )}
          </div>
        </main>
      ) : (
        <main className="flex-1 px-6 md:px-16 pt-28 space-y-8 animate-fade-in">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide">
              {searchQuery
                ? `ผลลัพธ์การค้นหา "${searchQuery}"`
                : showMyListOnly
                  ? "รายการของฉัน"
                  : `${selectedCategory} หนัง`}
            </h2>
            <span className="text-sm text-zinc-400">
              {filteredMovies.length} {filteredMovies.length === 1 ? "เรื่อง" : "เรื่อง"} ที่พบ
            </span>
          </div>

          {filteredMovies.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <p className="text-lg text-zinc-400 font-light">
                ไม่พบผลลัพธ์ที่ตรงกัน
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                  setShowMyListOnly(false);
                }}
              >
                ล้างตัวกรอง
              </Button>
            </div>
          ) : (
            <MovieGrid
              movies={filteredMovies}
              onMovieClick={setSelectedMovie}
              onPlayClick={handlePlayTrailer}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </main>
      )}

      {activeMovieForModal && (
        <MovieDetailsModal
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
          movie={activeMovieForModal}
          isFavorite={favorites.includes(activeMovieForModal.id)}
          onToggleFavorite={handleToggleFavorite}
          onPlayTrailer={() => handlePlayTrailer(activeMovieForModal)}
          onAddRating={handleAddRating}
          currentUser={currentUser}
          onSignInClick={() => setIsAuthOpen(true)}
        />
      )}

      {trailerMovie && (
        <TrailerModal
          isOpen={isPlayingTrailer}
          onClose={() => setIsPlayingTrailer(false)}
          youtubeUrl={trailerMovie.youtubeUrl}
          movieTitle={trailerMovie.title}
        />
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <Toast />
    </div>
  );
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onPlayClick: (movie: Movie) => void;
  favorites: string[];
  onToggleFavorite: (movieId: string) => void;
}

function MovieRow({
  title,
  movies,
  onMovieClick,
  onPlayClick,
  favorites,
  onToggleFavorite,
}: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollArrows = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const el = rowRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollArrows);
      setTimeout(checkScrollArrows, 200);
    }
    return () => el?.removeEventListener("scroll", checkScrollArrows);
  }, [movies]);

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (movies.length === 0) return null;

  return (
    <div className="space-y-2 group/row relative">
      <h3 className="text-base md:text-xl font-bold text-zinc-100 tracking-wide hover:text-white cursor-pointer transition-colors duration-200 pl-1 inline-block">
        {title}
      </h3>

      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-0 bottom-0 w-10 md:w-12 bg-black/60 hover:bg-black/85 text-white z-30 flex items-center justify-center rounded-r-lg transition-all duration-300 opacity-0 group-hover/row:opacity-100 border-r border-zinc-800/20 cursor-pointer shadow-lg"
          >
            <ChevronLeftIcon className="text-3xl hover:scale-125 transition-transform" />
          </button>
        )}

        <div
          ref={rowRef}
          className="flex overflow-x-auto gap-4 py-4 px-1.5 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-none w-[200px] sm:w-[240px] md:w-[280px] snap-start"
            >
              <MovieCard
                movie={movie}
                onClick={() => onMovieClick(movie)}
                onPlayClick={() => onPlayClick(movie)}
                isFavorite={favorites.includes(movie.id)}
                onToggleFavorite={() => onToggleFavorite(movie.id)}
              />
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-0 bottom-0 w-10 md:w-12 bg-black/60 hover:bg-black/85 text-white z-30 flex items-center justify-center rounded-l-lg transition-all duration-300 opacity-0 group-hover/row:opacity-100 border-l border-zinc-800/20 cursor-pointer shadow-lg"
          >
            <ChevronRightIcon className="text-3xl hover:scale-125 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
