'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import styles from "./photography.module.css";
import { bodyFont } from "@/components/fonts";
import { email } from "@/content/contact";
import type { BrowserPhoto, Filter } from "@/content/photo-browser";

type Props = {
  /** Every photo, in all-photos order. */
  photos: BrowserPhoto[];
  /** The visible filters: the places, then the filters that aren't places. */
  filterGroups: Filter[][];
};

// Matches the column widths in photography.module.css: full width under 768px; beside a 160px
// (768–1023px) or 220px sidebar, with a 10px right gutter and an 8px gap; 691px at most.
const gridSizes =
  "(max-width: 767px) 100vw, (max-width: 1023px) calc(50vw - 89px), (max-width: 1620px) calc(50vw - 119px), 691px";

// Fade out, swap the photos, fade in: 2 × 120ms.
const FADE_MS = 120;

// The 16px between frames, as a fraction of a ~600px column, for the column balancing.
const FRAME_GAP = 16 / 600;

// How many of the last photos are placed by trying every split, rather than one at a time.
const TAIL = 10;
// Cost of putting a tail photo in a different column from the one-at-a-time choice (~30px), so
// the most even split also stays close to reading order.
const MOVE_COST = 0.05;

/**
 * Split photos into two columns of near-equal height, using each photo's shape (no measuring,
 * so the server and the browser agree). Each photo goes to whichever column is shorter so far;
 * that can still leave one tall frame of difference, so the last few try every split and keep
 * the most even.
 */
function balance(photos: BrowserPhoto[]) {
  const heights = photos.map((p) => p.image.height / p.image.width + FRAME_GAP);
  const column: number[] = [];
  const sums = [0, 0];
  heights.forEach((h, i) => {
    column[i] = sums[1] < sums[0] ? 1 : 0;
    sums[column[i]] += h;
  });

  const start = Math.max(0, photos.length - TAIL);
  const before = [0, 0];
  for (let i = 0; i < start; i++) before[column[i]] += heights[i];
  let best = { cost: Infinity, split: [] as number[] };
  for (let mask = 0; mask < 1 << (photos.length - start); mask++) {
    const split: number[] = [];
    const s = [...before];
    let moved = 0;
    for (let i = start; i < photos.length; i++) {
      const c = (mask >> (i - start)) & 1;
      split.push(c);
      s[c] += heights[i];
      if (c !== column[i]) moved++;
    }
    const cost = Math.abs(s[0] - s[1]) + moved * MOVE_COST;
    if (cost < best.cost) best = { cost, split };
  }
  best.split.forEach((c, j) => (column[start + j] = c));

  const columns: { photo: BrowserPhoto; order: number }[][] = [[], []];
  photos.forEach((photo, order) => columns[column[order]].push({ photo, order }));
  return columns;
}

const linkText = "text-[14px] lg:text-[16px] tracking-[0.05em] transition-colors";

export default function PhotoBrowser({ photos, filterGroups }: Props) {
  const filters = useMemo(() => filterGroups.flat(), [filterGroups]);
  // `selected` drives the sidebar at once; `shown` swaps the grid while it's faded out.
  const [selected, setSelected] = useState<string | null>(null);
  const [shown, setShown] = useState<string | null>(null);
  const [fading, setFading] = useState(false);
  const [status, setStatus] = useState("");
  const timer = useRef<number | undefined>(undefined);
  const browser = useRef<HTMLDivElement>(null);

  // Open on the filter in the URL (?place=utah), if it's one we show.
  useEffect(() => {
    const place = new URLSearchParams(window.location.search).get("place");
    if (place && filters.some((f) => f.slug === place)) {
      setSelected(place);
      setShown(place);
    }
    return () => window.clearTimeout(timer.current);
  }, [filters]);

  const columns = useMemo(
    () => balance(shown ? photos.filter((p) => p.filter === shown) : photos),
    [photos, shown],
  );

  function choose(slug: string | null) {
    // Clicking the active filter again shows everything.
    const next = slug === selected ? null : slug;
    if (next === selected) return;
    setSelected(next);

    const url = new URL(window.location.href);
    if (next) url.searchParams.set("place", next);
    else url.searchParams.delete("place");
    window.history.replaceState(null, "", url);

    const filter = filters.find((f) => f.slug === next);
    const swap = () => {
      setShown(next);
      setFading(false);
      setStatus(filter ? `${filter.count} photographs: ${filter.name}` : `All ${photos.length} photographs`);
      // If the grid's top has scrolled away, bring it back so the new set starts in view.
      const top = browser.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) window.scrollTo({ top: window.scrollY + top });
    };

    window.clearTimeout(timer.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      swap();
    } else {
      setFading(true);
      timer.current = window.setTimeout(swap, FADE_MS);
    }
  }

  // Real links, so a filtered view can be opened in a new tab or copied; plain clicks filter in place.
  const onFilterClick = (slug: string | null) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    choose(slug);
  };

  const filterLink = (label: string, slug: string | null) => {
    const active = selected === slug;
    return (
      <a
        href={slug ? `/photography?place=${slug}` : "/photography"}
        onClick={onFilterClick(slug)}
        aria-current={active ? "true" : undefined}
        className={`inline-block py-[4px] md:py-[2px] ${linkText} ${
          active
            ? "text-[#424242] underline underline-offset-[5px] decoration-1"
            : "text-[#666666] hover:text-[#424242]"
        }`}
        style={bodyFont}
      >
        {label}
      </a>
    );
  };

  return (
    <>
      <div ref={browser} className={styles.browser}>
        <aside className="sticky top-0 z-20 bg-white border-b border-[#E4E4E1] px-[10px] py-[6px] md:top-[60px] md:self-start md:bg-transparent md:border-0 md:py-0 md:pl-[24px] md:pr-[16px] lg:pl-[40px]">
          <p className="hidden md:block text-[#424242] text-[14px] lg:text-[16px] font-bold tracking-[0.05em]" style={bodyFont}>
            Evan Sanchez
          </p>

          <nav aria-label="Filter photographs" className="md:mt-[24px]">
            <ul className={`${styles.tabs} flex md:flex-col gap-x-[20px] md:gap-y-[4px] overflow-x-auto md:overflow-visible whitespace-nowrap`}>
              <li>{filterLink("All", null)}</li>
              {filterGroups.map((group, g) =>
                group.map((filter, i) => (
                  <li key={filter.slug} className={g > 0 && i === 0 ? "ml-[12px] md:ml-0 md:mt-[16px]" : undefined}>
                    {filterLink(filter.name, filter.slug)}
                  </li>
                )),
              )}
            </ul>
          </nav>

          <div className="hidden md:block mt-[48px]">
            <AboutAndSocials />
          </div>
        </aside>

        <div className={styles.photographyGridContainer}>
          <p className="sr-only" aria-live="polite">
            {status}
          </p>
          <div className={`${styles.photographyGrid} ${fading ? styles.fading : ""}`}>
            {columns.map((column, c) => (
              <div key={c} className={styles.column}>
                {column.map(({ photo, order }) => (
                  <div key={photo.id} className={styles.photoItem} style={{ order }}>
                    <Image
                      src={photo.image}
                      alt={photo.alt}
                      sizes={gridSizes}
                      placeholder="blur"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Under 768px, About and the socials sit below the grid. */}
      <div className="md:hidden px-[10px] pt-[30px]">
        <AboutAndSocials />
      </div>
    </>
  );
}

const iconClass = "w-[14px] h-[14px]";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/carto.ev/",
    icon: (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:${email}`,
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
      </svg>
    ),
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@carto.ev",
    // Threads glyph from Simple Icons (CC0).
    icon: (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
      </svg>
    ),
  },
];

function AboutAndSocials() {
  return (
    <>
      <Link href="/contact" className={`${linkText} text-[#666666] hover:text-[#424242]`} style={bodyFont}>
        About
      </Link>
      <ul className="mt-[16px] flex gap-[10px]">
        {socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              aria-label={social.label}
              {...(social.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-center justify-center w-[28px] h-[28px] rounded-full bg-[#424242] text-white hover:bg-[#333333] transition-colors"
            >
              {social.icon}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
