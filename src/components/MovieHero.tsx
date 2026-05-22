"use client";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Movie } from "@/core/domain/movie";

interface Props {
  movie: Movie;
  onPlayClick: () => void;
  onInfoClick: () => void;
}

export default function MovieHero({ movie, onPlayClick, onInfoClick }: Props) {
  return (
    <section
      className="relative h-[70vh] md:h-[85vh] w-full bg-cover bg-center flex items-center px-6 md:px-16 overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to top, #141414 0%, rgba(20, 20, 20, 0.4) 60%, rgba(20, 20, 20, 0.8) 100%),
          linear-gradient(to right, rgba(20, 20, 20, 0.9) 0%, rgba(20, 20, 20, 0.3) 40%, transparent 100%),
          url(${movie.thumbnail})
        `,
      }}
    >
      {/* Background vignette & layout bounds */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <div className="max-w-2xl relative z-10 space-y-4 md:space-y-6 mt-16 animate-fade-in">
        {/* N series branding label */}
        <div className="flex items-center gap-2">
          <span className="bg-[#e50914] text-white text-[10px] md:text-xs font-black px-1.5 py-0.5 rounded tracking-widest leading-none shadow-md">
            FILM
          </span>
          <span className="text-zinc-300 text-xs md:text-sm font-semibold tracking-widest uppercase">
            POPULAR ORIGINAL
          </span>
        </div>

        {/* Movie Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-wide leading-none select-none drop-shadow-xl font-sans">
          {movie.title}
        </h1>

        {/* Mini Metadata row */}
        <div className="flex items-center gap-3 text-xs md:text-sm">
          <span className="text-emerald-400 font-bold">{movie.matchRate}% Match</span>
          <span className="text-zinc-300">{movie.year}</span>
          <span className="px-1.5 py-0.5 text-[10px] md:text-xs font-bold border border-zinc-500 text-zinc-300 rounded leading-none">
            {movie.ageRating}
          </span>
          <span className="text-zinc-300">{movie.duration}</span>
          <span className="text-zinc-300 font-semibold bg-zinc-800/80 px-2 py-0.5 rounded-full text-xs">
            {movie.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-zinc-200 text-sm md:text-base lg:text-lg max-w-xl leading-relaxed font-light drop-shadow-md select-none">
          {movie.description}
        </p>

        {/* Hero Actions */}
        <div className="flex items-center gap-3.5 pt-2">
          {/* Play Button */}
          <button
            onClick={onPlayClick}
            className="flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3.5 rounded-lg bg-white text-black font-bold text-sm md:text-base hover:bg-white/85 active:scale-95 transition-all shadow-xl shadow-black/20 cursor-pointer"
          >
            <PlayArrowIcon className="text-xl md:text-2xl" />
            Play
          </button>

          {/* Info Button */}
          <button
            onClick={onInfoClick}
            className="flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3.5 rounded-lg bg-zinc-600/40 text-white font-bold text-sm md:text-base hover:bg-zinc-600/60 active:scale-95 border border-zinc-500/20 backdrop-blur-md transition-all cursor-pointer"
          >
            <InfoOutlinedIcon className="text-xl md:text-2xl" />
            More Info
          </button>
        </div>
      </div>
    </section>
  );
}

