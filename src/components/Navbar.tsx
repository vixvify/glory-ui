"use client";

import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (cat: string | null) => void;
  showMyListOnly: boolean;
  onMyListOnlyChange: (val: boolean) => void;
}

export default function Navbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  showMyListOnly,
  onMyListOnlyChange,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (category: string | null, myList: boolean = false) => {
    onCategoryChange(category);
    onMyListOnlyChange(myList);
    // clear search when navigating categories
    onSearchChange("");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 py-4 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-[#141414]/90 backdrop-blur-md border-b border-zinc-800/40 shadow-xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-8">
        {/* THAIFLIX BRAND LOGO */}
        <div
          onClick={() => handleNavClick(null, false)}
          className="text-3xl font-extrabold tracking-tighter text-[#e50914] cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
          style={{ textShadow: "0 0 10px rgba(229,9,20,0.3)" }}
        >
          THAIFLIX
        </div>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
          <button
            onClick={() => handleNavClick(null, false)}
            className={`cursor-pointer transition-colors duration-300 hover:text-white ${
              !selectedCategory && !showMyListOnly ? "text-white font-semibold" : ""
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("Action", false)}
            className={`cursor-pointer transition-colors duration-300 hover:text-white ${
              selectedCategory === "Action" ? "text-white font-semibold" : ""
            }`}
          >
            Action
          </button>
          <button
            onClick={() => handleNavClick("Sci-Fi", false)}
            className={`cursor-pointer transition-colors duration-300 hover:text-white ${
              selectedCategory === "Sci-Fi" ? "text-white font-semibold" : ""
            }`}
          >
            Sci-Fi
          </button>
          <button
            onClick={() => handleNavClick("Horror", false)}
            className={`cursor-pointer transition-colors duration-300 hover:text-white ${
              selectedCategory === "Horror" ? "text-white font-semibold" : ""
            }`}
          >
            Horror
          </button>
          <button
            onClick={() => handleNavClick(null, true)}
            className={`cursor-pointer transition-colors duration-300 hover:text-white ${
              showMyListOnly ? "text-white font-semibold" : ""
            }`}
          >
            My List
          </button>
        </div>
      </div>

      {/* SEARCH AND PROFILE UTILITIES */}
      <div className="flex items-center gap-6">
        {/* EXPANDABLE SEARCH */}
        <div
          className={`flex items-center gap-2 px-2 py-1 rounded border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isSearchExpanded
              ? "w-48 md:w-64 bg-black/60 border-zinc-600 scale-100 opacity-100"
              : "w-8 bg-transparent border-transparent"
          }`}
        >
          <button
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <SearchIcon className="text-xl" />
          </button>
          {isSearchExpanded && (
            <>
              <input
                type="text"
                placeholder="Titles, genres..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-zinc-500"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <CloseIcon className="text-sm" />
                </button>
              )}
            </>
          )}
        </div>

        {/* NOTIFICATIONS */}
        <button className="text-zinc-300 hover:text-white transition-colors relative cursor-pointer hidden sm:block">
          <NotificationsIcon className="text-xl" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#e50914] rounded-full" />
        </button>

        {/* USER PROFILE */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <AccountCircleIcon className="text-zinc-300 group-hover:text-white text-2xl transition-colors" />
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-t-zinc-400 border-l-transparent border-r-transparent group-hover:border-t-white transition-colors" />
        </div>
      </div>
    </nav>
  );
}

