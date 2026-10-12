"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ALL_PHOTOS, type Photo } from "@/data/photos";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Subtle alternating organic tilts for polaroid prints
const tilts = [
  "-rotate-1 sm:-rotate-1",
  "rotate-1 sm:rotate-1.5",
  "-rotate-1.5 sm:-rotate-2",
  "rotate-1 sm:rotate-1",
  "-rotate-1 sm:-rotate-1",
  "rotate-1 sm:rotate-1",
];

export default function PhotosSection() {
  // Ordered gallery of all 27 photos
  const allGalleryPhotos = [...ALL_PHOTOS].sort((a, b) => {
    if (a.favorite && !b.favorite) return -1;
    if (!a.favorite && b.favorite) return 1;
    const customA =
      a.caption &&
      !a.caption.startsWith("IMG_") &&
      !a.caption.startsWith("8028")
        ? 1
        : 0;
    const customB =
      b.caption &&
      !b.caption.startsWith("IMG_") &&
      !b.caption.startsWith("8028")
        ? 1
        : 0;
    return customB - customA;
  });

  // Top 6 photos on the homepage
  const homepagePhotos = allGalleryPhotos.slice(0, 6);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const isOpen = lightboxIndex !== null;
  const currentPhoto = isOpen ? allGalleryPhotos[lightboxIndex] : null;

  const nextPhoto = () => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % allGalleryPhotos.length,
    );
  };

  const prevPhoto = () => {
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + allGalleryPhotos.length) % allGalleryPhotos.length,
    );
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  // Keyboard navigation & lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % allGalleryPhotos.length,
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + allGalleryPhotos.length) % allGalleryPhotos.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, allGalleryPhotos.length]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextPhoto();
      else prevPhoto();
    }
    touchStartX.current = null;
  };

  return (
    <div id="photos" className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="text-[28px] leading-none font-semibold tracking-[-0.03em] sm:text-[34px]">
            Photos
          </h2>
          <p className="text-muted-foreground mt-3 max-w-[48ch] text-[15px] leading-relaxed">
            I like to go places. And when I do, sometimes I take pictures of
            things.
          </p>
        </div>
      </div>

      {/* 6 Polaroid Photos Grid */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5">
        {homepagePhotos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => {
              const galleryIdx = allGalleryPhotos.findIndex(
                (p) => p.src === photo.src,
              );
              setLightboxIndex(galleryIdx !== -1 ? galleryIdx : i);
            }}
            className={cn(
              "group relative flex cursor-pointer flex-col overflow-hidden rounded-[14px] bg-[#FAF8F5] p-2 pb-3.5 text-left shadow-[0_8px_20px_-4px_rgba(0,0,0,0.35)] transition-all duration-300 select-none hover:z-20 hover:scale-[1.05] hover:rotate-0 hover:shadow-[0_20px_35px_-5px_rgba(0,0,0,0.55)] dark:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.7)]",
              tilts[i % tilts.length],
            )}
            aria-label={`View photo: ${photo.caption}`}
          >
            {/* Photo frame */}
            <div className="relative aspect-square w-full overflow-hidden rounded-[8px] bg-zinc-200 ring-1 ring-black/10">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 210px, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>

            {/* Polaroid bottom chin */}
            <div className="mt-2.5 flex items-baseline justify-between px-1">
              <span className="truncate text-[13px] font-semibold tracking-tight text-zinc-900 lowercase">
                {photo.caption}
              </span>
              <span className="ml-1 shrink-0 font-mono text-[11px] font-medium text-zinc-500">
                {photo.year}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal (Option C) */}
      {isOpen && currentPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          className="fixed inset-0 z-[150] flex flex-col items-center justify-between bg-black/95 p-4 backdrop-blur-md transition-opacity duration-200 sm:p-6"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Hide the fixed bottom dock while the gallery lightbox is open */}
          <style>
            {
              "body:has([role='dialog']) .pointer-events-none.fixed.bottom-4 { display: none !important; }"
            }
          </style>
          {/* Top Bar: Counter & Close */}
          <div
            className="flex w-full max-w-4xl items-center justify-between text-white/80"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-mono text-[13px] tracking-wide text-white/60">
              {lightboxIndex + 1} / {allGalleryPhotos.length}
            </span>
            <button
              type="button"
              onClick={closeLightbox}
              className="group flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close gallery"
            >
              <X className="size-5 transition-transform group-hover:scale-110" />
            </button>
          </div>

          {/* Main Photo View Area */}
          <div
            className="relative my-3 flex w-full max-w-4xl flex-1 items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev arrow */}
            <button
              type="button"
              onClick={prevPhoto}
              className="absolute left-1 z-10 flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/90 transition-all hover:scale-110 hover:bg-white/20 sm:-left-12"
              aria-label="Previous photo"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Polaroid frame inside lightbox - hugs image aspect ratio directly */}
            <div className="relative flex flex-col rounded-[16px] bg-[#FAF8F5] p-2.5 pb-3.5 text-zinc-950 shadow-2xl sm:p-3 sm:pb-4">
              <div
                className="relative overflow-hidden rounded-[10px]"
                style={{
                  aspectRatio: `${currentPhoto.width || 4} / ${currentPhoto.height || 3}`,
                  maxHeight: "72vh",
                  maxWidth: "min(82vw, 760px)",
                  height: "auto",
                  width: "auto",
                }}
              >
                <Image
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  width={currentPhoto.width || 1200}
                  height={currentPhoto.height || 900}
                  sizes="(min-width: 1024px) 800px, 85vw"
                  className="block h-auto max-h-[72vh] w-auto max-w-[min(82vw,760px)] object-contain"
                  priority
                />
              </div>
              {/* Caption chin */}
              <div className="mt-3 flex items-baseline justify-between px-1.5">
                <span className="text-[15px] font-semibold tracking-tight text-zinc-900 lowercase sm:text-[16px]">
                  {currentPhoto.caption}
                </span>
                <span className="ml-2 font-mono text-[12px] font-medium text-zinc-500">
                  {currentPhoto.year}
                </span>
              </div>
            </div>

            {/* Next arrow */}
            <button
              type="button"
              onClick={nextPhoto}
              className="absolute right-1 z-10 flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/90 transition-all hover:scale-110 hover:bg-white/20 sm:-right-12"
              aria-label="Next photo"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          {/* Bottom Bar: Instructions */}
          <div
            className="flex items-center gap-4 text-center font-mono text-[11px] text-white/50"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="hidden sm:inline">
              Use ← and → arrow keys to navigate · Esc to close
            </span>
            <span className="sm:hidden">Swipe left or right to browse</span>
          </div>
        </div>
      )}
    </div>
  );
}
