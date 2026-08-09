/**
 * Single source of truth for every piece of copy and data on the site.
 * Components read from here; nothing hardcodes a title, a link or an award.
 */

export type AwardResult = 'Winner' | 'Nominee' | 'Finalist' | 'Placed';

export interface Award {
  festival: string;
  category: string;
  result: AwardResult;
  /** Shown instead of the result word when a placing needs spelling out. */
  note?: string;
}

export interface WatchLink {
  name: string;
  href: string;
  /** Short qualifier, e.g. "Rent or buy". Every link carries one. */
  note: string;
  /** Free-to-watch options are pulled to the front and marked. */
  free?: boolean;
}

export interface WatchGroup {
  label: string;
  links: WatchLink[];
  /** Providers we can name but not link. Rendered as plain text. */
  footnote?: string;
}

/**
 * Each film gets its own world on the page. The hues are not invented —
 * they were sampled from the films' own posters:
 *
 *   Orders from Above  no saturated pixels at all. A true black-and-white
 *                      film, and the winner of Cannes World's Best Black
 *                      & White Film.
 *   The Proselyte      candle amber (hue 30-40°) against a blue-black
 *                      ground (hue 240-250°).
 *   Gradient Descent   red (hue 0°) and nothing else.
 *
 * `register` picks the composition: how the plate is laid out and which
 * typographic voice it speaks in.
 *
 * Every colour on a plate is themed, not just an accent — ground, figure
 * and rules all flip, so the three worlds are genuinely different rooms
 * rather than three shades of the same black:
 *
 *   Orders from Above  THE RECORDING. Brown-black and warm tan, typed in
 *                      Courier over a scanlined frame — a tape dub of a
 *                      1961 interrogation.
 *   The Proselyte      THE CONFESSION. Near-black with blood running down
 *                      from the top edge and liturgical gold for anything
 *                      that speaks. Cormorant, set as an inscription.
 *   Gradient Descent   THE WHITE ROOM. Every frame of this film is a
 *                      bright fluorescent office full of people in white
 *                      shirts being processed, so the page inverts: near
 *                      white, gridded, enormous condensed caps, terminal
 *                      green. Scrolling into it is a hard cut out of the
 *                      dark.
 *
 * All contrast pairs are measured; see the table in globals.css.
 */
export type Register = 'documentary' | 'liturgical' | 'systemic';

export interface Identity {
  register: Register;
  /** Drives --accent while this film holds the viewport. */
  accent: string;
  /** Legible on an --accent fill. */
  onAccent: string;
  /** The ground the plate sits on. */
  ground: string;
  /** Primary type on that ground. Flips to near-black on a light plate. */
  figure: string;
  /** Secondary type — body copy, loglines. */
  figureMuted: string;
  /** Field labels and small print. Still has to clear AA. */
  figureFaint: string;
}

export interface Film {
  slug: string;
  identity: Identity;
  title: string;
  /** Rendered as two lines in the index when present. */
  titleLines: string[];
  year: string;
  format: string;
  runtime: string;
  genres: string[];
  /** One sentence. The film's own logline — never a description of Vir. */
  logline: string;
  synopsis: string;
  roles: string[];
  poster: string;
  /** 1200x630 share card, cut from the film's own frames. */
  ogImage: string;
  /** Muted, looping clip run behind this film's plate. */
  preview?: string;
  /**
   * First frame for `preview`. The one-sheet cannot serve here — a 2:3
   * portrait behind a landscape <video> crops badly, and a `poster`
   * attribute is fetched raw rather than through the image optimiser, so
   * it has to be a small landscape frame.
   */
  previewPoster?: string;
  imdb?: string;
  /** The complete film, where it can actually be watched. */
  watch?: { label: string; href: string };
  /** The trailer, always labelled as a trailer. */
  trailer?: { label: string; href: string };
  watchGroups?: WatchGroup[];
  awards: Award[];
  /** Overrides the computed accolade line on the film page. */
  accolade?: string;
}

export const NAME = 'Vir Srinivas';
export const EMAIL = 'virsrinivasfilmmaker@gmail.com';
export const IMDB_PROFILE = 'https://www.imdb.com/name/nm12504238/';
export const ROLES = ['Writer', 'Director', 'Producer'];

/**
 * The introduction, carried over verbatim from virsrinivas.com.
 * Vir asked for this text specifically — do not paraphrase it.
 */
export const INTRO: string[] = [
  'Vir is an award-winning writer, producer and director.',
  'His credits include “Orders from Above” (feature), “The Proselyte” (short), and “Gradient Descent” (short), which have screened and achieved awards at numerous film festivals worldwide. Orders from Above was distributed by Gravitas Ventures in 2022 and released internationally on Amazon Prime, Apple TV, Vudu, and more.',
  'Vir’s screenplays have also garnered acclaim and won prestigious screenwriting competitions with top prizes at the Fade In Awards and the Final Draft Big Break® Screenwriting Contest.',
];

const ORDERS_FROM_ABOVE_AWARDS: Award[] = [
  {
    festival: 'Cannes World Film Festival',
    category: 'Best Historical Film',
    result: 'Winner',
  },
  {
    festival: 'Cannes World Film Festival',
    category: 'Best Black & White Film',
    result: 'Winner',
  },
  {
    festival: 'Cannes World Film Festival',
    category: 'Best Jewish Film',
    result: 'Winner',
  },
  {
    festival: 'Melbourne Underground Film Festival',
    category: 'Best Feature Film',
    result: 'Winner',
  },
  {
    festival: 'Mannheim Arts and Film Festival',
    category: 'Best History Film',
    result: 'Winner',
  },
  {
    festival: 'International Symbolic Art Film Festival',
    category: 'Best Feature War Film',
    result: 'Winner',
  },
  {
    festival: 'Las Vegas International Film & Screenwriting Festival',
    category: 'Best Historical — Period Piece',
    result: 'Winner',
  },
  {
    festival: 'Istanbul Film Awards',
    category: 'Best First Time Director',
    result: 'Winner',
  },
  {
    festival: 'Istanbul Film Awards',
    category: 'Best Jewish',
    result: 'Winner',
  },
  {
    festival: 'Kiez Berlin Film Festival',
    category: 'Best History Film',
    result: 'Winner',
  },
  {
    festival: 'Brussels Capital Film Festival',
    category: 'Best Historical',
    result: 'Winner',
  },
  {
    festival: 'Berlin Indie Film Festival',
    category: 'Best Historical',
    result: 'Winner',
  },
  {
    festival: 'Accolade Global Film Competition',
    category: 'Jewish',
    result: 'Winner',
  },
  {
    festival: 'HALO International Film Festival',
    category: 'Best War Film',
    result: 'Winner',
  },
  {
    festival: 'HALO International Film Festival',
    category: 'Best Director Debut',
    result: 'Winner',
  },
  {
    festival: 'Los Angeles Film Awards',
    category: 'Best Docudrama',
    result: 'Winner',
  },
  {
    festival: 'Los Angeles Film Awards',
    category: 'Best First Time Director',
    result: 'Nominee',
  },
  {
    festival: 'Cannes World Film Festival',
    category: 'Best Biographical Feature Film',
    result: 'Nominee',
  },
  {
    festival: 'Cannes World Film Festival',
    category: 'Best First Time Filmmaker',
    result: 'Nominee',
  },
  {
    festival: 'Madrid International Film Festival',
    category: 'Best Cinematography in a Docudrama',
    result: 'Nominee',
  },
  {
    festival: 'Madrid International Film Festival',
    category: 'Talented New Director',
    result: 'Nominee',
  },
  {
    festival: 'Madrid International Film Festival',
    category: 'Jury Award',
    result: 'Nominee',
  },
];

const PROSELYTE_AWARDS: Award[] = [
  {
    festival: 'Perth Independent Film Festival',
    category: 'Best Drama',
    result: 'Winner',
  },
  {
    festival: 'Sanctuary International Film Festival',
    category: 'Best Australian Short',
    result: 'Nominee',
  },
  {
    festival: 'GoldBlink Short Film Awards',
    category: 'Best Indie Short',
    result: 'Nominee',
  },
];

export const films: Film[] = [
  {
    slug: 'orders-from-above',
    identity: {
      register: 'documentary',
      accent: '#D4C5A9',
      onAccent: '#0C0A07',
      ground: '#0C0A07',
      figure: '#E4D8BE',
      figureMuted: '#AC9E80',
      figureFaint: '#8D8168',
    },
    title: 'Orders from Above',
    titleLines: ['Orders', 'from Above'],
    year: '2021',
    format: 'Feature film',
    runtime: '1h 27m',
    genres: ['Biography', 'Drama', 'History'],
    logline:
      'Adolf Eichmann is finally captured and brought to Israel to stand trial.',
    synopsis:
      'Adolf Eichmann is finally captured and brought to Israel to stand trial. Without enough evidence to prosecute him, Police Captain Avner Less must extract a confession from the mastermind of the Holocaust.',
    roles: ['Writer', 'Director', 'Producer'],
    poster: '/ofa-poster.jpeg',
    ogImage: '/og-orders-from-above.jpg',
    preview: '/ofa-loop.mp4',
    previewPoster: '/stills/ofa-1.jpg',
    imdb: 'https://www.imdb.com/title/tt14858134/',
    watch: {
      label: 'Watch the full film',
      href: 'https://tubitv.com/movies/695064/orders-from-above',
    },
    trailer: {
      label: 'Watch the trailer',
      href: 'https://www.youtube.com/watch?v=J65m0Y2dNd4',
    },
    accolade: 'Winner of 16 international awards',
    awards: ORDERS_FROM_ABOVE_AWARDS,
    watchGroups: [
      {
        label: 'Watch free',
        links: [
          {
            name: 'Tubi',
            href: 'https://tubitv.com/movies/695064/orders-from-above',
            note: 'Free, with ads',
            free: true,
          },
          {
            name: 'YouTube',
            href: 'https://www.youtube.com/watch?v=J65m0Y2dNd4',
            note: 'Full film',
            free: true,
          },
        ],
        footnote:
          'Also free with ads on The Roku Channel and Plex, and free through participating libraries on Kanopy and Hoopla.',
      },
      {
        label: 'Rent or buy',
        links: [
          {
            name: 'Apple TV',
            href: 'https://tv.apple.com/us/movie/orders-from-above/umc.cmc.54ydf8kguuaguqr2umzvhv0ho',
            note: 'Rent or buy',
          },
          {
            name: 'Prime Video',
            href: 'https://www.amazon.com/Orders-Above-Richard-Cotter/dp/B09VLHQCCP',
            note: 'Rent or buy',
          },
          {
            name: 'Fandango at Home',
            href: 'https://athome.fandango.com/content/movies/details/Orders-From-Above/2045644',
            note: 'Formerly Vudu',
          },
          {
            name: 'Vimeo On Demand',
            href: 'https://vimeo.com/ondemand/ordersfromabove',
            note: 'Rent or buy',
          },
        ],
      },
      {
        label: 'On disc',
        links: [
          {
            name: 'Blu-ray',
            href: 'https://www.amazon.com/Orders-Above-Richard-Cotter/dp/B09YKFVXRL',
            note: 'Amazon',
          },
          {
            name: 'DVD',
            href: 'https://www.amazon.com/Orders-Above-Richard-Cotter/dp/B09YKQZRYD',
            note: 'Amazon',
          },
        ],
        footnote:
          'Distributed by Gravitas Ventures. Also stocked by Baker & Taylor, Alliance, Midwest Tape and Library Bound for public library collections, and available on demand through participating US cable providers.',
      },
    ],
  },
  {
    slug: 'the-proselyte',
    identity: {
      register: 'liturgical',
      accent: '#D9AE3A',
      onAccent: '#0A0605',
      ground: '#0A0605',
      figure: '#E8E2D5',
      figureMuted: '#A8A199',
      figureFaint: '#807A72',
    },
    title: 'The Proselyte',
    titleLines: ['The', 'Proselyte'],
    year: '2022',
    format: 'Short film',
    runtime: '20 min',
    genres: ['Drama', 'Thriller'],
    logline:
      'A Catholic priest with a dark past wrestles with his faith after he hears a confession from an active serial killer.',
    synopsis:
      'A Catholic priest with a dark past wrestles with his faith after he hears a confession from an active serial killer. Bound by the seal of confession, he must choose between the law he serves and the law he swore to.',
    roles: ['Writer', 'Director', 'Producer'],
    poster: '/proselyte-poster.jpeg',
    ogImage: '/og-the-proselyte.jpg',
    imdb: 'https://www.imdb.com/title/tt14755002/',
    watch: {
      label: 'Watch the film',
      href: 'https://www.youtube.com/watch?v=GG48DnCQrEk',
    },
    awards: PROSELYTE_AWARDS,
  },
  {
    slug: 'gradient-descent',
    identity: {
      register: 'systemic',
      accent: '#00753A',
      onAccent: '#FAFAFA',
      ground: '#FAFAFA',
      figure: '#0A0A0A',
      figureMuted: '#494949',
      figureFaint: '#5C5C5C',
    },
    title: 'Gradient Descent',
    titleLines: ['Gradient', 'Descent'],
    year: '2024',
    format: 'Short film',
    runtime: '20 min',
    genres: ['Drama', 'Science fiction'],
    logline:
      'A homeless man is recruited by an artificial intelligence company and forced to do horrifying work.',
    synopsis:
      'A homeless man is recruited by an artificial intelligence company and forced to do horrifying work.',
    roles: ['Writer', 'Director', 'Producer'],
    poster: '/gd-poster.jpg',
    ogImage: '/og-gradient-descent.jpg',
    imdb: 'https://www.imdb.com/title/tt31491453/',
    watch: {
      label: 'Watch the film',
      href: 'https://www.youtube.com/watch?v=Igo_pGU08HA',
    },
    awards: [],
  },
];

export interface Screenplay {
  title: string;
  awards: Award[];
}

export const screenplays: Screenplay[] = [
  {
    title: 'The Prosecution',
    awards: [
      {
        festival: 'Final Draft Big Break® Screenwriting Contest',
        category: 'Best Historical',
        result: 'Winner',
      },
      {
        festival: 'Fade In Awards',
        category: 'Best True Story / Biopic',
        result: 'Winner',
      },
    ],
  },
  {
    title: 'The Guns at Cowra',
    awards: [
      {
        festival: 'Discovery International Festival of Film & Story',
        category: 'Best Feature Screenplay',
        result: 'Winner',
      },
      {
        festival: 'Changing Face International Film Festival',
        category: 'Screenplay of the Month',
        result: 'Winner',
      },
      {
        festival: 'Fade In Awards',
        category: 'True Story / Biopic Competition',
        result: 'Placed',
        note: 'Second place',
      },
    ],
  },
];

export interface PressItem {
  outlet: string;
  headline: string;
  excerpt: string;
  href: string;
}

export const press: PressItem[] = [
  {
    outlet: 'FilmInk',
    headline:
      '20-year-old wins top prize at Melbourne Film Festival on a zero budget during pandemic',
    excerpt:
      'Vir Srinivas, a young Sydneysider, didn’t have any experience in filmmaking. He didn’t have a degree in filmmaking. And he certainly didn’t have any money to make a film.',
    href: 'http://www.filmink.com.au/public-notice/20-year-old-wins-top-prize-at-melbourne-film-festival-on-a-zero-budget-during-pandemic/',
  },
  {
    outlet: 'Indian Link',
    headline:
      'Vir Srinivas, 20, wins at Cannes with debut film Orders from Above',
    excerpt:
      'Vir settled on a story that was interesting, yet possible to be shot in one or two simple indoor locations: the true story of the interrogation of Nazi war criminal, Adolf Eichmann, by Israeli police.',
    href: 'https://www.indianlink.com.au/orders-from-above-film-vir-srinivas-cannes-debut-win/',
  },
  {
    outlet: 'Authority Magazine',
    headline:
      '5 things I wish someone told me when I first became a filmmaker',
    excerpt:
      'Making a good film is not enough: a film exists to be seen. In addition to being a filmmaker, one must be a marketer, manager and negotiator.',
    href: 'https://medium.com/authority-magazine/vir-srinivas-5-things-i-wish-someone-told-me-when-i-first-became-a-filmmaker-c3751e3924e4',
  },
  {
    outlet: 'Indian Link',
    headline: 'Vir Srinivas’ film on the hidden victims of AI',
    excerpt:
      'The Indian-origin filmmaker takes a bold take on the alleged exploitation of workers behind the artificial intelligence we use.',
    href: 'https://www.indianlink.com.au/vir-srinivas-film-on-the-hidden-victims-of-ai/',
  },
  {
    outlet: 'Fandomize',
    headline:
      'Vir Srinivas tackles human capability in his debut film, “Orders from Above”',
    excerpt:
      'Vir Srinivas has made quite a name for himself as a filmmaker with his debut historical drama, Orders from Above, which has racked up international awards.',
    href: 'https://www.fandomize.com/featured/vir-srinivas-tackles-human-capability-in-his-debut-film-orders-from-above/',
  },
  {
    outlet: 'To Tony Productions',
    headline: 'Orders from Above — film spotlight',
    excerpt:
      'Today’s film spotlight focuses on the feature film Orders from Above directed by Vir Srinivas.',
    href: 'https://totonyproductions.com/blog/2022/08/04/orders-from-above/',
  },
];

/**
 * A film's theme as plain CSS custom properties, to be set directly on the
 * element that owns it.
 *
 * The alternative — writing these onto documentElement as each plate
 * scrolls past — meant the page had one background that JS mutated and CSS
 * cross-faded. That animates when it should not, cannot be correct on the
 * server's first paint, and leaves a global to clean up. Scoping the theme
 * to the element renders the right colour immediately and needs no effect
 * at all.
 */
export function themeVars(identity: Identity): Record<string, string> {
  return {
    backgroundColor: identity.ground,
    '--ground': identity.ground,
    '--figure': identity.figure,
    '--figure-muted': identity.figureMuted,
    '--figure-faint': identity.figureFaint,
    '--accent': identity.accent,
    '--on-accent': identity.onAccent,
    color: identity.figure,
  };
}

export interface Still {
  src: string;
  film: string;
  year: string;
}

/**
 * The homepage background: two frames from each film.
 *
 * A trailer for one film made the whole site look like it was about that
 * film. These are ordered so consecutive frames come from different
 * pictures — the point of the sequence is the range between them, not any
 * single image.
 */
export const stills: Still[] = [
  { src: '/stills/ofa-1.jpg', film: 'Orders from Above', year: '2021' },
  { src: '/stills/proselyte-1.jpg', film: 'The Proselyte', year: '2022' },
  { src: '/stills/gradient-1.jpg', film: 'Gradient Descent', year: '2024' },
  { src: '/stills/ofa-2.jpg', film: 'Orders from Above', year: '2021' },
  { src: '/stills/proselyte-2.jpg', film: 'The Proselyte', year: '2022' },
  { src: '/stills/gradient-2.jpg', film: 'Gradient Descent', year: '2024' },
];

export function getFilm(slug: string): Film | undefined {
  return films.find((film) => film.slug === slug);
}

export function countAwards(awards: Award[]) {
  return {
    wins: awards.filter((a) => a.result === 'Winner').length,
    nominations: awards.filter((a) => a.result === 'Nominee').length,
  };
}

export const totals = (() => {
  const all = [
    ...films.flatMap((f) => f.awards),
    ...screenplays.flatMap((s) => s.awards),
  ];
  return countAwards(all);
})();
