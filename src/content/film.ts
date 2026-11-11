// Film content: the reel and individual pieces. Empty until Evan provides a reel;
// /film stays out of the nav until then.

export type Video = {
  slug: string;
  title: string;
  year?: string;
  client?: string;
  blurb?: string;
  /** Vimeo or YouTube embed URL; lazy-loaded behind the poster. */
  embedUrl: string;
  /** Poster image path in public/assets/images/optimized/. */
  poster: string;
  posterAlt: string;
};

export const reel: Video | null = null;

export const films: Video[] = [];
