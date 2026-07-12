"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { CommunitySlide } from "@/content/comunidad";

interface CommunityCarouselProps {
  slides: CommunitySlide[];
  className?: string;
}

function ChevronLeftIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CloseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function CommunityCarousel({
  slides,
  className,
}: CommunityCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isOpen = activeIndex !== null;

  const showPrev = () =>
    setActiveIndex((i) =>
      i === null ? i : (i - 1 + slides.length) % slides.length,
    );
  const showNext = () =>
    setActiveIndex((i) => (i === null ? i : (i + 1) % slides.length));

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((i) =>
          i === null ? i : (i - 1 + slides.length) % slides.length,
        );
      } else if (e.key === "ArrowRight") {
        setActiveIndex((i) => (i === null ? i : (i + 1) % slides.length));
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const scrollByAmount = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.8 * direction;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  const activeSlide = activeIndex !== null ? slides[activeIndex] : null;

  return (
    <div className={cn("relative", className)}>
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => (
          <li
            key={`${slide.src}-${index}`}
            className="shrink-0 basis-[85%] snap-start sm:basis-[48%] lg:basis-[32%]"
          >
            <figure className="overflow-hidden rounded-md border border-border-soft bg-surface-card shadow-card">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Ampliar imagen: ${slide.caption ?? slide.alt}`}
                className="group relative block aspect-[4/3] w-full cursor-pointer bg-surface-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 85vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
              {slide.caption && (
                <figcaption className="border-l-2 border-brand-gold px-4 py-3 text-body-sm font-medium text-text-primary">
                  {slide.caption}
                </figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-4 hidden justify-end gap-2 sm:flex">
        <button
          type="button"
          onClick={() => scrollByAmount(-1)}
          aria-label="Ver imágenes anteriores"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-surface-card text-text-primary shadow-card transition-colors hover:bg-surface-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount(1)}
          aria-label="Ver más imágenes"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-surface-card text-text-primary shadow-card transition-colors hover:bg-surface-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
        >
          <ChevronRightIcon />
        </button>
      </div>

      {isOpen && activeSlide && (
        <div
          role="dialog"
          aria-modal
          aria-label={activeSlide.caption ?? activeSlide.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Cerrar imagen"
            className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-surface-card/90 text-text-primary shadow-card transition-colors hover:bg-surface-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
          >
            <CloseIcon />
          </button>

          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Imagen anterior"
                className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface-card/90 text-text-primary shadow-card transition-colors hover:bg-surface-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold sm:left-4"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Imagen siguiente"
                className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface-card/90 text-text-primary shadow-card transition-colors hover:bg-surface-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold sm:right-4"
              >
                <ChevronRightIcon />
              </button>
            </>
          )}

          <figure
            className="flex max-h-full max-w-4xl flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[70vh] w-[90vw] max-w-4xl">
              <Image
                src={activeSlide.src}
                alt={activeSlide.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            {activeSlide.caption && (
              <figcaption className="text-center text-body-md font-medium text-text-inverse">
                {activeSlide.caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </div>
  );
}
