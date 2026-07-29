import { useState, useEffect, useRef } from "react";
import { Plus, X, Menu, ChevronRight, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import headshotImg from "@/imports/shalini_madan_headshot.jpg";
import cvPdfUrl from "@/imports/sm_cv.pdf";

type Page = "home" | "about" | "research" | "resume" | "diary";

const PAGE_TITLES: Record<Page, string> = {
  home: "Shalini Madan",
  about: "About — Shalini Madan",
  research: "Research — Shalini Madan",
  resume: "Resume — Shalini Madan",
  diary: "Diary — Shalini Madan",
};

// Screen-reader-only text
function SR({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

// ─── Decorative doodles (aria-hidden, pointer-events-none) ───────────────────

function DoodleSparkle({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg aria-hidden="true" focusable="false" className={`pointer-events-none ${className}`} width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10 1 L11.5 8.5 L19 10 L11.5 11.5 L10 19 L8.5 11.5 L1 10 L8.5 8.5 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function DoodleLightning({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" className={`pointer-events-none ${className}`} width="28" height="44" viewBox="0 0 28 44" fill="none">
      <path d="M18 2 L6 22 L14 22 L10 42 L24 18 L15 18 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function DoodleWave({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" className={`pointer-events-none ${className}`} width="120" height="28" viewBox="0 0 120 28" fill="none">
      <path d="M0 14 C15 4, 30 24, 45 14 C60 4, 75 24, 90 14 C105 4, 114 24, 120 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M0 21 C15 11, 30 31, 45 21 C60 11, 75 31, 90 21 C105 11, 114 31, 120 21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
    </svg>
  );
}

function DoodleScribble({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" className={`pointer-events-none ${className}`} width="90" height="50" viewBox="0 0 90 50" fill="none">
      <path d="M5 40 C10 20, 25 5, 45 18 C60 28, 55 48, 40 42 C27 37, 24 22, 36 16 C48 10, 62 24, 58 36 C54 46, 68 30, 80 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.55"/>
    </svg>
  );
}

function DoodleDots({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" className={`pointer-events-none ${className}`} width="110" height="100" viewBox="0 0 110 100" fill="none">
      <circle cx="8"  cy="8"  r="2.5" fill="currentColor" opacity="0.5"/>
      <circle cx="26" cy="3"  r="1.5" fill="currentColor" opacity="0.35"/>
      <circle cx="44" cy="11" r="2"   fill="currentColor" opacity="0.4"/>
      <circle cx="62" cy="4"  r="1.5" fill="currentColor" opacity="0.3"/>
      <circle cx="80" cy="14" r="2"   fill="currentColor" opacity="0.4"/>
      <circle cx="4"  cy="28" r="1.5" fill="currentColor" opacity="0.3"/>
      <circle cx="18" cy="42" r="2.5" fill="currentColor" opacity="0.45"/>
      <circle cx="36" cy="34" r="1"   fill="currentColor" opacity="0.25"/>
      <circle cx="52" cy="26" r="1.5" fill="currentColor" opacity="0.35"/>
      <circle cx="70" cy="36" r="2"   fill="currentColor" opacity="0.4"/>
      <circle cx="90" cy="28" r="1.5" fill="currentColor" opacity="0.3"/>
    </svg>
  );
}

function DoodleCornerLines({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" className={`pointer-events-none ${className}`} width="70" height="70" viewBox="0 0 70 70" fill="none">
      <path d="M2 68 C8 50, 20 30, 40 15 C55 4, 68 2, 68 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4"/>
      <path d="M2 52 C12 38, 28 22, 48 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.25"/>
    </svg>
  );
}

// Accessible emoji with label
function Emoji({ symbol, label }: { symbol: string; label: string }) {
  return <span role="img" aria-label={label}>{symbol}</span>;
}

// Visually hidden notice for external links
function NewTabSR() {
  return <SR>, opens in new tab</SR>;
}

// ─── Diary data ───────────────────────────────────────────────────────────────

const MOODS = [
  { id: "calm", label: "calm" },
  { id: "inspired", label: "inspired" },
  { id: "reflective", label: "reflective" },
  { id: "grateful", label: "grateful" },
  { id: "energized", label: "energized" },
  { id: "melancholy", label: "melancholy" },
];

interface DiaryEntry {
  id: number;
  date: string;
  mood: string;
  tags: string[];
  text: string;
}

interface DiaryDraft {
  text: string;
  mood: string;
  tags: string[];
  tagInput: string;
}

const INITIAL_ENTRIES: DiaryEntry[] = [
  {
    id: 1,
    date: "2026-07-15",
    mood: "inspired",
    tags: ["research", "assets"],
    text: "Our ASSETS 2026 paper got accepted! Can not believe we are heading to Porto in October. Feeling so grateful for this team.",
  },
  {
    id: 2,
    date: "2026-06-01",
    mood: "grateful",
    tags: ["award", "web4all"],
    text: "Best Technical Paper Nominee at Web4All! This work on vibe coding accessibility means a lot — glad it is resonating.",
  },
  {
    id: 3,
    date: "2026-04-30",
    mood: "energized",
    tags: ["graduation", "milestone"],
    text: "Graduated with my M.S. today. Two years of late nights, revisions, and coffee — it was all worth it.",
  },
  {
    id: 4,
    date: "2026-04-08",
    mood: "calm",
    tags: ["thesis", "defense"],
    text: "Successfully defended my master's thesis this morning. The committee had great questions. Walked out feeling lighter than I have in months.",
  },
];

function getMood(id: string) {
  return MOODS.find((m) => m.id === id) ?? MOODS[0];
}

function fmtLong(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function fmtShort(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav({
  page,
  navigate,
  open,
  setOpen,
}: {
  page: Page;
  navigate: (p: Page) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const menuId = "mobile-nav-menu";
  const links: { id: Page; label: string }[] = [
    { id: "about", label: "About" },
    { id: "research", label: "Research" },
    { id: "resume", label: "Resume" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between" aria-label="Main">
        <button
          onClick={() => navigate("about")}
          className="text-sm font-medium hover:opacity-50 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm"
          aria-label="Shalini Madan — go to home page"
        >
          Shalini Madan
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7" role="list">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => navigate(l.id)}
                className={`text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm ${
                  page === l.id
                    ? "text-black font-medium underline underline-offset-4 decoration-2"
                    : "text-muted-foreground hover:text-black"
                }`}
                aria-current={page === l.id ? "page" : undefined}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 -mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls={menuId}
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id={menuId}
        className={`md:hidden border-t border-border bg-white px-4 sm:px-6 pb-4 ${open ? "" : "hidden"}`}
        aria-hidden={!open}
      >
        <ul role="list" className="flex flex-col pt-2">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => navigate(l.id)}
                tabIndex={open ? 0 : -1}
                className={`w-full text-left py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm ${
                  page === l.id ? "font-medium text-black" : "text-muted-foreground"
                }`}
                aria-current={page === l.id ? "page" : undefined}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────

const UPDATES: { date: string; dateTime: string; text: React.ReactNode }[] = [
  {
    date: "Jul 15, 2026",
    dateTime: "2026-07-15",
    text: <>Our short paper "Reflections and Recommendations on AI Adoption Practice from a Mixed-Ability Research Group" was accepted at ASSETS 2026! See you in Porto this October! <Emoji symbol="😃" label="grinning face with big eyes" /></>,
  },
  {
    date: "Jun 01, 2026",
    dateTime: "2026-06-01",
    text: <>Our paper "Vibe Check: Accessibility Heuristics for Vibe Coding Interfaces" has been nominated for the best technical paper award at Web4All! <Emoji symbol="😃" label="grinning face with big eyes" /></>,
  },
  {
    date: "May 26, 2026",
    dateTime: "2026-05-26",
    text: <>Back to work at the IDEA Lab this summer! <Emoji symbol="😃" label="grinning face with big eyes" /></>,
  },
  { date: "Apr 30, 2026", dateTime: "2026-04-30", text: "Graduated with my M.S. in Information (Human-Computer Interaction)." },
  { date: "Apr 08, 2026", dateTime: "2026-04-08", text: "Successfully defended my master's thesis!" },
  {
    date: "Feb 2026",
    dateTime: "2026-02",
    text: <>I will be returning as a PhD student at UMSI this Fall! <Emoji symbol="😃" label="grinning face with big eyes" /></>,
  },
  { date: "Feb 2026", dateTime: "2026-02", text: "Our paper was accepted at Web4All!" },
  { date: "Jan 2026", dateTime: "2026-01", text: "Submitted one paper to Web4All." },
  { date: "Jul 30, 2025", dateTime: "2025-07-30", text: "My first poster was accepted at ASSETS 2025! I will be presenting in Denver this October." },
  { date: "May 27, 2025", dateTime: "2025-05-27", text: "I recently joined Harvard University as a UX Research Intern at the Harvard Library, where I'm working on accessibility-focused projects in the digital library space." },
  { date: "May 02, 2025", dateTime: "2025-05-02", text: "I received a scholarship to attend the 2025 Neurodiversity at Work Research Conference at Carnegie Mellon University, held from May 20–21." },
];

function HomePage({
  navigate,
  h1Ref,
}: {
  navigate: (p: Page) => void;
  h1Ref: React.RefObject<HTMLHeadingElement>;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? UPDATES : UPDATES.slice(0, 5);
  const hiddenCount = UPDATES.length - 5;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <section className="pt-12 sm:pt-14 pb-12 md:grid md:grid-cols-[1fr_200px] md:gap-10 md:items-start" aria-labelledby="home-h1">
        <div>
          {/* Mobile: name + small headshot side by side */}
          <div className="flex items-start gap-4 mb-4 md:block md:mb-0">
            <div className="flex-1">
              <h1
                id="home-h1"
                ref={h1Ref}
                tabIndex={-1}
                className="text-2xl font-semibold mb-2 focus-visible:outline-none"
              >
                Shalini Madan
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed mb-0">
                PhD Student · UMSI · IDEA Lab
              </p>
            </div>
            {/* Mobile-only small headshot — aria-hidden since desktop figure has the alt text */}
            <figure className="md:hidden shrink-0 w-20 mt-1" aria-hidden="true">
              <ImageWithFallback
                src={headshotImg}
                alt=""
                className="w-full aspect-square object-cover object-top rounded-sm"
              />
            </figure>
          </div>

          <div className="space-y-4 text-sm leading-relaxed mt-4 md:mt-0 mb-8 max-w-xl">
            <p>
              I am a PhD student at the{" "}
              <a href="https://si.umich.edu" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm">
                University of Michigan's School of Information<NewTabSR />
              </a>
              , where I am fortunate to be advised by{" "}
              <a href="https://venkateshpotluri.me" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm">
                Dr. Venkatesh Potluri<NewTabSR />
              </a>
              . I am also a part of the{" "}
              <a href="https://idea11y.dev/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm">
                IDEA Lab<NewTabSR />
              </a>
              .
            </p>
            <p>I hold a Master of Science in Information Science (Human-Computer Interaction) and a Bachelor's in Design (Interaction Design).</p>
            <p>My master's thesis focused on developing empirical guidelines for evaluating the accessibility of conversational programming tools.</p>
            <p>A core strand of my research focuses on evaluating conversational AI for accessibility, the representation of people with disabilities, and how AI could perpetuate or mitigate disability bias in everyday interactions.</p>
            <p>I am currently working on evaluating disability representation in LLMs and assessing AI systems for accessibility, representation, trust, and disclosure.</p>
            <p>
              I'm always open to collaborations. If a project comes to mind that aligns with my background, please{" "}
              <a href="mailto:shalinii@umich.edu" className="underline underline-offset-2 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm">
                email me
              </a>
              ! I would love to chat <Emoji symbol="🙂" label="slightly smiling face" />
            </p>
          </div>
          <nav aria-label="Contact" className="flex flex-wrap gap-x-3 gap-y-1.5 text-sm">
            <a
              href="mailto:shalinii@umich.edu"
              className="underline underline-offset-2 text-muted-foreground hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm"
            >
              shalinii@umich.edu
            </a>
            <span aria-hidden className="hidden sm:inline text-muted-foreground">|</span>
            <a
              href="https://scholar.google.com/citations?hl=en&user=zvhN85sAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 text-muted-foreground hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm"
            >
              Google Scholar<NewTabSR />
            </a>
            <span aria-hidden className="hidden sm:inline text-muted-foreground">|</span>
            <a
              href="https://linkedin.com/in/shalinimadan"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 text-muted-foreground hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm"
            >
              LinkedIn<NewTabSR />
            </a>
          </nav>
        </div>

        {/* Desktop-only full headshot */}
        <figure className="hidden md:block">
          <ImageWithFallback
            src={headshotImg}
            alt="Shalini Madan smiling warmly at her graduation ceremony. She is wearing a white textured blazer and a University of Michigan yellow and navy blue graduation sash draped around her neck."
            className="w-full aspect-square object-cover object-top rounded-sm"
          />
        </figure>
      </section>

      {/* Updates */}
      <section className="border-t border-border py-10" aria-labelledby="updates-h2">
        <h2 id="updates-h2" className="text-base font-semibold mb-6">Updates</h2>
        <ul id="updates-list" className="divide-y divide-border" role="list">
          {visible.map((u, i) => (
            <li key={i} className="py-3.5 flex gap-5 items-start">
              <time dateTime={u.dateTime} className="text-xs text-muted-foreground w-20 sm:w-28 shrink-0 pt-0.5 leading-relaxed">
                {u.date}
              </time>
              <p className="text-sm leading-relaxed">{u.text}</p>
            </li>
          ))}
        </ul>
        {UPDATES.length > 5 && (
          <button
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            aria-controls="updates-list"
            className="mt-5 text-sm text-muted-foreground underline underline-offset-2 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm"
          >
            {showAll
              ? "Show fewer updates"
              : `Show ${hiddenCount} older update${hiddenCount !== 1 ? "s" : ""}`}
          </button>
        )}
      </section>

      <footer className="border-t border-border py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>Copyright 2026 Shalini Madan</p>
        <nav aria-label="Footer">
          <ul className="flex gap-5 list-none" role="list">
            <li><a href="mailto:shalinii@umich.edu" className="hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm">Email Shalini</a></li>
            <li>
              <a href="https://linkedin.com/in/shalinimadan" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm">
                LinkedIn<NewTabSR />
              </a>
            </li>
            <li>
              <a href={cvPdfUrl} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm">
                CV (PDF)<NewTabSR />
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutPage({ h1Ref }: { h1Ref: React.RefObject<HTMLHeadingElement> }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? UPDATES : UPDATES.slice(0, 5);
  const hiddenCount = UPDATES.length - 5;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative overflow-hidden">
      {/* Corner sparkles */}
      <DoodleSparkle className="absolute top-10 right-6 text-black opacity-20 hidden md:block" size={18} />
      <DoodleSparkle className="absolute top-24 right-16 text-black opacity-10 hidden md:block" size={12} />
      <DoodleLightning className="absolute bottom-40 left-2 text-black opacity-10 hidden md:block" />
      <DoodleSparkle className="absolute bottom-48 left-10 text-black opacity-15 hidden md:block" size={14} />

      <section className="pt-12 sm:pt-14 pb-12 md:grid md:grid-cols-[1fr_200px] md:gap-12 md:items-start" aria-labelledby="about-h1">
        <div>
          {/* Pill label */}
          <div className="inline-flex items-center gap-2 border border-black rounded-full px-4 py-1.5 text-sm font-semibold mb-6" aria-hidden="true">
            <span>·</span> About
          </div>

          {/* Mobile: name + small headshot side by side */}
          <div className="flex items-start gap-4 mb-4 md:block md:mb-0">
            <div className="flex-1">
              <h1
                id="about-h1"
                ref={h1Ref}
                tabIndex={-1}
                className="text-2xl font-semibold mb-2 focus-visible:outline-none"
              >
                Shalini Madan
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed mb-0">
                PhD Student · UMSI · IDEA Lab
              </p>
            </div>
            <figure className="md:hidden shrink-0 w-20 mt-1" aria-hidden="true">
              <ImageWithFallback src={headshotImg} alt="" className="w-full aspect-square object-cover object-top rounded-full" />
            </figure>
          </div>

          <div className="space-y-4 text-sm leading-relaxed mt-5 mb-8 max-w-xl">
            <p>
              I am a PhD student at the{" "}
              <a href="https://si.umich.edu" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm">
                University of Michigan's School of Information<NewTabSR />
              </a>
              , where I am fortunate to be advised by{" "}
              <a href="https://venkateshpotluri.me" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm">
                Dr. Venkatesh Potluri<NewTabSR />
              </a>
              . I am also a part of the{" "}
              <a href="https://idea11y.dev/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm">
                IDEA Lab<NewTabSR />
              </a>
              .
            </p>
            <p>I hold a Master of Science in Information Science (Human-Computer Interaction) and a Bachelor's in Design (Interaction Design).</p>
            <p>My master's thesis focused on developing empirical guidelines for <strong>evaluating the accessibility of conversational programming tools</strong>.</p>
            <p>A core strand of my research focuses on <strong>evaluating conversational AI for accessibility</strong>, the representation of people with disabilities, and how AI could perpetuate or mitigate disability bias in everyday interactions.</p>
            <p>I am currently working on evaluating disability representation in LLMs and assessing AI systems for accessibility, representation, trust, and disclosure.</p>
            <p>
              I'm always open to collaborations. If a project comes to mind that aligns with my background, please{" "}
              <a href="mailto:shalinii@umich.edu" className="underline underline-offset-2 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm">
                email me
              </a>
              ! I would love to chat <Emoji symbol="🙂" label="slightly smiling face" />
            </p>
          </div>

          <nav aria-label="Contact" className="flex flex-wrap gap-x-3 gap-y-1.5 text-sm">
            <a href="mailto:shalinii@umich.edu" className="underline underline-offset-2 text-muted-foreground hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm">
              shalinii@umich.edu
            </a>
            <span aria-hidden className="hidden sm:inline text-muted-foreground">|</span>
            <a href="https://scholar.google.com/citations?hl=en&user=zvhN85sAAAAJ" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-muted-foreground hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm">
              Google Scholar<NewTabSR />
            </a>
            <span aria-hidden className="hidden sm:inline text-muted-foreground">|</span>
            <a href="https://linkedin.com/in/shalinimadan" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-muted-foreground hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm">
              LinkedIn<NewTabSR />
            </a>
          </nav>
        </div>

        {/* Desktop circular headshot with wave doodle */}
        <div className="hidden md:flex flex-col items-center gap-3 pt-14">
          <figure className="relative">
            <ImageWithFallback
              src={headshotImg}
              alt="Shalini Madan smiling warmly at her graduation ceremony. She is wearing a white textured blazer and a University of Michigan yellow and navy blue graduation sash draped around her neck."
              className="w-48 h-48 object-cover object-top rounded-full"
            />
            <DoodleWave className="absolute -bottom-5 -right-8 text-black opacity-20" />
          </figure>
        </div>
      </section>

      <section className="border-t border-border py-10" aria-labelledby="updates-h2">
        <div className="flex items-center gap-4 mb-6">
          <div className="inline-flex items-center gap-2 border border-black rounded-full px-4 py-1.5 text-sm font-semibold" aria-hidden="true">
            <span>·</span> Updates
          </div>
        </div>
        <h2 id="updates-h2" className="sr-only">Updates</h2>
        <ul id="updates-list" className="divide-y divide-border" role="list">
          {visible.map((u, i) => (
            <li key={i} className="py-3.5 flex gap-5 items-start">
              <time dateTime={u.dateTime} className="text-xs text-muted-foreground w-20 sm:w-28 shrink-0 pt-0.5 leading-relaxed">
                {u.date}
              </time>
              <p className="text-sm leading-relaxed">{u.text}</p>
            </li>
          ))}
        </ul>
        {UPDATES.length > 5 && (
          <button
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            aria-controls="updates-list"
            className="mt-5 text-sm text-muted-foreground underline underline-offset-2 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm"
          >
            {showAll ? "Show fewer updates" : `Show ${hiddenCount} older update${hiddenCount !== 1 ? "s" : ""}`}
          </button>
        )}
      </section>

      <footer className="border-t border-border py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>Copyright 2026 Shalini Madan</p>
        <nav aria-label="Footer">
          <ul className="flex gap-5 list-none" role="list">
            <li><a href="mailto:shalinii@umich.edu" className="hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm">Email Shalini</a></li>
            <li>
              <a href="https://linkedin.com/in/shalinimadan" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm">
                LinkedIn<NewTabSR />
              </a>
            </li>
            <li>
              <a href={cvPdfUrl} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm">
                CV (PDF)<NewTabSR />
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}

// ─── Research ─────────────────────────────────────────────────────────────────

const PAPERS = [
  {
    num: "3",
    year: "2026",
    title: "Reflections and Recommendations on AI Adoption Practice from a Mixed-Ability Research Group",
    venue: "ASSETS '26 — 28th International ACM SIGACCESS Conference on Computers and Accessibility",
    location: "Porto, Portugal · October 2026",
    authors: "Madan, S., Surabiyil Bindu, S., Pimenova, V., Seehorn, E., & Potluri, V.",
    type: "Short Paper",
    award: null,
    url: "https://arxiv.org/abs/2607.22886",
  },
  {
    num: "2",
    year: "2026",
    title: "Vibe Check: Accessibility Heuristics for Vibe Coding Interfaces",
    venue: "W4A '26 — 23rd International Web for All Conference (pp. 229–241)",
    location: "April 2026",
    authors: "Madan, S., Surabiyil Bindu, S., & Potluri, V.",
    type: "Full Paper",
    award: "Best Technical Paper Nominee",
    url: "https://dl.acm.org/doi/10.1145/3800424.38004",
  },
  {
    num: "1",
    year: "2025",
    title: "Accessibility Heuristics for Vibe Coding Interfaces",
    venue: "ASSETS '25 — 27th International ACM SIGACCESS Conference on Computers and Accessibility (pp. 1–5)",
    location: "Denver, CO · October 2025",
    authors: "Madan, S., Surabiyil Bindu, S., & Potluri, V.",
    type: "Poster",
    award: null,
    url: "https://dl.acm.org/doi/10.1145/3663547.3759729",
  },
];

function ResearchPage({ h1Ref }: { h1Ref: React.RefObject<HTMLHeadingElement> }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-14 relative overflow-hidden">
      <DoodleScribble className="absolute top-8 right-2 text-black opacity-[0.07] hidden md:block" />
      <h1 ref={h1Ref} tabIndex={-1} className="text-2xl font-semibold mb-3 focus-visible:outline-none">
        Research
      </h1>
      <p className="text-sm text-muted-foreground mb-10 max-w-2xl leading-relaxed">
        My research evaluates conversational AI and large language models for accessibility and disability representation, and examines how AI systems could perpetuate or mitigate disability bias. Broadly, my areas of interests are Human-AI interaction and accessibility.
      </p>

      <section aria-labelledby="pubs-h2">
        <h2 id="pubs-h2" className="text-sm font-semibold mb-5">Publications</h2>
        <ol reversed className="list-none" aria-label="Publications, newest first">
          {PAPERS.map((paper) => {
            const isOpen = expanded === paper.num;
            const btnId = `paper-btn-${paper.num}`;
            const panelId = `paper-panel-${paper.num}`;
            return (
              <li key={paper.num} className="border-t border-border">
                <h3>
                  <button
                    id={btnId}
                    className="w-full text-left py-5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm"
                    onClick={() => setExpanded(isOpen ? null : paper.num)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <div className="flex items-start gap-5">
                      <span className="text-xs text-muted-foreground w-5 shrink-0 pt-0.5" aria-hidden>[{paper.num}]</span>
                      <div className="flex-1 min-w-0 pr-4">
                        <p className="text-sm leading-snug mb-1 group-hover:underline group-hover:underline-offset-2">
                          {paper.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{paper.venue}</p>
                        {paper.award && (
                          <p className="text-xs font-medium mt-1">
                            <span aria-hidden>★ </span>{paper.award}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-muted-foreground border border-border px-1.5 py-0.5 rounded-sm">
                          {paper.type}
                        </span>
                        <ChevronRight
                          size={14}
                          className={`text-muted-foreground transition-transform duration-150 ${isOpen ? "rotate-90" : ""}`}
                          aria-hidden
                        />
                      </div>
                    </div>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  hidden={!isOpen}
                  className="pb-5 pl-10 text-sm"
                >
                  <p className="text-muted-foreground mb-1">{paper.authors}</p>
                  <p className="text-muted-foreground text-xs">{paper.location}</p>
                  {paper.url && (
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs underline underline-offset-2 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm"
                    >
                      {paper.url?.includes("arxiv") ? "View preprint on arXiv" : "View on ACM Digital Library"}<NewTabSR />
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        <div className="border-t border-border" aria-hidden />
      </section>

      <section className="mt-12" aria-labelledby="projects-h2">
        <h2 id="projects-h2" className="text-base font-semibold mb-5">Current Projects</h2>
        <ul className="space-y-4 text-sm list-none" role="list">
          <li className="border-t border-border pt-4">
            <p className="text-xs text-muted-foreground mb-1">Summer 2026</p>
            <h3 className="font-medium mb-1">Disability Representation in LLMs</h3>
            <p className="text-muted-foreground leading-relaxed">Evaluating how large language models represent people with disabilities across a range of prompts and contexts.</p>
          </li>
        </ul>
      </section>
    </div>
  );
}

// ─── Resume ───────────────────────────────────────────────────────────────────

function ResumePage({ h1Ref }: { h1Ref: React.RefObject<HTMLHeadingElement> }) {
  const education = [
    { period: "Aug 2026 – May 2031", label: "PhD in Information Science", org: "University of Michigan, School of Information · Ann Arbor, MI", bullets: ["Advisor: Dr. Venkatesh Potluri · IDEA Lab"] },
    { period: "May 2026", label: "M.S. in Information Science (Human-Computer Interaction)", org: "University of Michigan, School of Information · Ann Arbor, MI", bullets: ["Thesis: Accessibility Heuristics for Vibe Coding Interfaces", "Committee: Dr. Venkatesh Potluri, Dr. Steve Oney"] },
    { period: "2020 – 2024", label: "B.Des. in Interaction Design", org: "PES University · Bangalore, India", bullets: ["Honors: Prof. MRD Scholarship, Distinction Award Certificates"] },
  ];

  const research = [
    { period: "Aug 2026 – Present", label: "Doctoral Researcher", org: "IDEA Lab, School of Information, University of Michigan", bullets: [] },
    { period: "May 2025 – Present", label: "Master's Thesis Researcher & Graduate Researcher", org: "IDEA Lab, School of Information, University of Michigan", bullets: ["Developed empirical heuristic-based evaluation methods for the accessibility of vibe and agentic coding tools for BLV users.", "Conducted 18 qualitative interviews with assistive technology users and accessibility professionals.", "Led qualitative coding, statistical analysis, study protocol design, and IRB documentation."] },
    { period: "Dec 2024 – Mar 2025", label: "Independent Study Researcher", org: "University of Michigan · Advisor: Dr. Venkatesh Potluri", bullets: ["Synthesized literature on how BLV communities interact with GenAI platforms, IDEs, and programming tools.", "Designed and executed an autoethnographic study on screen-reader users building conversational AI agents."] },
  ];

  const teaching = [
    { period: "Jan – Apr 2026", label: "Graduate Student Instructor — SI 552: Introduction to Accessibility", org: "School of Information, University of Michigan", bullets: ["Supported core lectures for 40 students; led grading, office hours, and final project mentorship.", "Contributed to competency-based assessment framework and syllabus redesign."] },
    { period: "Aug – Dec 2025", label: "Graduate Student Instructor — SI 539: Responsive Web Design & Accessibility", org: "School of Information, University of Michigan", bullets: ["Led weekly discussion sections for 12 students; assisted main lectures for 80 students.", "Authored revision sheets reinforcing accessible HTML, CSS, and JS concepts."] },
    { period: "Jan – Apr 2025", label: "Graduate Instructional Aide — SI 552: Introduction to Accessibility", org: "School of Information, University of Michigan", bullets: ["Designed accessible lecture materials and coordinated student progress tracking."] },
  ];

  const professional = [
    { period: "May – Aug 2025", label: "UX & Accessibility Research Intern", org: "Harvard University – Harvard Library · Cambridge, MA", bullets: ["Conducted accessibility-centered usability evaluations of the Mirador image-viewing platform.", "Evaluated library-wide accessibility auditing practices via contextual inquiries.", "Migrated and standardized 100+ repository records; audited 100 LLM-generated summaries."] },
    { period: "May 2023 – May 2024", label: "UX Designer (Internship)", org: "UST Evolve – Moonraft Innovation Labs · Bangalore, India", bullets: ["Architected a service blueprint for an ESG consulting platform.", "Executed mixed-method UX research resulting in 100% client conversion from pilot to long-term."] },
    { period: "Jan – May 2023", label: "Product Design Intern", org: "Hurray Tech Ventures Pvt Ltd · Bangalore, India", bullets: ["Led field research with 20+ educators to prototype an inclusive AI learning platform."] },
    { period: "Jun – Aug 2022", label: "Product Design Intern", org: "Aknamed Pvt Ltd (A PharmEasy Company) · Bangalore, India", bullets: ["Redesigned B2B procurement dashboard and established a design system, boosting engagement by 30%."] },
  ];

  const awards = [
    { item: "Best Technical Paper Nominee", context: "23rd Web for All Conference (W4A)", year: "Apr 2026" },
    { item: "UMSI Graduate Teaching Assistantship ($85,000)", context: "University of Michigan", year: "2025–2026" },
    { item: "UMSI Student Travel Grant ($1,000)", context: "University of Michigan", year: "2025–2026" },
    { item: "UMSI Student Travel Grant ($1,000)", context: "University of Michigan", year: "2024–2025" },
    { item: "Conference Attendance Scholarship ($750)", context: "Neurodiversity at Work Conference, CMU", year: "May 2025" },
    { item: "Rising Fledgling (Nominee)", context: "UST Evolve – Moonraft Innovation Labs", year: "Dec 2023" },
    { item: "Designer of the Month", context: "UST Evolve – Moonraft Innovation Labs", year: "Jul 2023" },
    { item: "Distinction Award Certificates", context: "PES University", year: "2020–2024" },
    { item: "Prof. MRD Tuition Fee Waiver (50%)", context: "PES University", year: "Jan 2023" },
  ];

  type Section = "education" | "research" | "teaching" | "professional" | "awards";
  const [active, setActive] = useState<Section>("education");

  const tabs: { id: Section; label: string }[] = [
    { id: "education", label: "Education" },
    { id: "research", label: "Research" },
    { id: "teaching", label: "Teaching" },
    { id: "professional", label: "Professional" },
    { id: "awards", label: "Awards & Funding" },
  ];

  function EntryList({ items }: { items: { period: string; label: string; org: string; bullets: string[] }[] }) {
    return (
      <ol className="list-none" role="list">
        {items.map((e, i) => (
          <li key={i} className="border-t border-border pt-5 pb-5 grid sm:grid-cols-[160px_1fr] gap-2 sm:gap-6">
            <time className="text-xs text-muted-foreground leading-relaxed pt-0.5">{e.period}</time>
            <div>
              <p className="text-sm font-medium">{e.label}</p>
              <p className="text-xs text-muted-foreground mb-2">{e.org}</p>
              <ul className="list-none space-y-1" role="list">
                {e.bullets.map((b, j) => (
                  <li key={j} className="text-xs text-muted-foreground flex gap-1.5 items-start">
                    <span aria-hidden className="shrink-0 mt-0.5">·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-14 relative overflow-hidden">
      <DoodleDots className="absolute bottom-10 right-0 text-black opacity-[0.06] hidden md:block" />
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8 sm:mb-10">
        <h1 ref={h1Ref} tabIndex={-1} className="text-2xl font-semibold focus-visible:outline-none">
          Resume
        </h1>
        <a
          href={cvPdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm border border-black/50 px-3 py-1.5 hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm"
        >
          Download full CV (PDF)
          <ExternalLink size={12} aria-hidden />
          <NewTabSR />
        </a>
      </div>

      <div role="tablist" aria-label="Resume sections" className="flex overflow-x-auto gap-x-1 mb-8 border-b border-border scrollbar-none [-webkit-overflow-scrolling:touch]">
        {tabs.map((t) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={`shrink-0 text-sm px-3 py-2 -mb-px border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-t-sm ${
              active === t.id ? "border-black text-black font-medium" : "border-transparent text-muted-foreground hover:text-black"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tabs.map((t) => (
        <div
          key={t.id}
          id={`panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${t.id}`}
          hidden={active !== t.id}
        >
          {t.id === "education" && <EntryList items={education} />}
          {t.id === "research" && <EntryList items={research} />}
          {t.id === "teaching" && <EntryList items={teaching} />}
          {t.id === "professional" && <EntryList items={professional} />}
          {t.id === "awards" && (
            <ol className="list-none" role="list">
              {awards.map((a, i) => (
                <li key={i} className="border-t border-border py-4 grid sm:grid-cols-[160px_1fr] gap-2 sm:gap-6 items-baseline">
                  <time className="text-xs text-muted-foreground">{a.year}</time>
                  <div>
                    <p className="text-sm font-medium">{a.item}</p>
                    <p className="text-xs text-muted-foreground">{a.context}</p>
                  </div>
                </li>
              ))}
              <li className="border-t border-border" aria-hidden />
            </ol>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Diary ────────────────────────────────────────────────────────────────────

function DiaryPage({
  entries, setEntries, draft, setDraft, filterMood, setFilterMood, h1Ref,
}: {
  entries: DiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  draft: DiaryDraft;
  setDraft: React.Dispatch<React.SetStateAction<DiaryDraft>>;
  filterMood: string | null;
  setFilterMood: (m: string | null) => void;
  h1Ref: React.RefObject<HTMLHeadingElement>;
}) {
  const [view, setView] = useState<"timeline" | "grid">("timeline");
  const tagHintId = "tag-hint";

  const saveEntry = () => {
    if (!draft.text.trim() || !draft.mood) return;
    setEntries((prev) => [{
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      mood: draft.mood,
      tags: draft.tags,
      text: draft.text.trim(),
    }, ...prev]);
    setDraft({ text: "", mood: "", tags: [], tagInput: "" });
  };

  const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && draft.tagInput.trim()) {
      e.preventDefault();
      const tag = draft.tagInput.trim().toLowerCase().replace(/\s+/g, "-");
      if (!draft.tags.includes(tag)) {
        setDraft((p) => ({ ...p, tags: [...p.tags, tag], tagInput: "" }));
      } else {
        setDraft((p) => ({ ...p, tagInput: "" }));
      }
    }
  };

  const removeTag = (tag: string) => setDraft((p) => ({ ...p, tags: p.tags.filter((t) => t !== tag) }));
  const filtered = filterMood ? entries.filter((e) => e.mood === filterMood) : entries;
  const canSave = draft.text.trim().length > 0 && draft.mood.length > 0;

  const todayLabel = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <h1 ref={h1Ref} tabIndex={-1} className="text-2xl font-semibold mb-10 focus-visible:outline-none">
        Diary
      </h1>

      {/* Live region announces filter results to screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {filterMood
          ? `Showing ${filtered.length} ${filtered.length === 1 ? "entry" : "entries"} for mood: ${filterMood}`
          : `Showing all ${filtered.length} ${filtered.length === 1 ? "entry" : "entries"}`}
      </div>

      {/* New entry composer */}
      <section aria-labelledby="composer-h2" className="border border-border p-5 rounded-sm mb-10">
        <h2 id="composer-h2" className="text-sm font-semibold mb-1">New entry</h2>
        <p className="text-xs text-muted-foreground mb-4" aria-hidden>{todayLabel}</p>

        <fieldset className="mb-4 border-none p-0">
          <legend className="text-xs text-muted-foreground mb-2">
            Mood <span className="text-black font-medium">(required)</span>
          </legend>
          <div className="flex flex-wrap gap-1.5">
            {MOODS.map((m) => (
              <button
                key={m.id}
                onClick={() => setDraft((p) => ({ ...p, mood: p.mood === m.id ? "" : m.id }))}
                className={`px-2.5 py-1 text-xs rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 border ${
                  draft.mood === m.id ? "bg-black text-white border-black" : "border-border text-muted-foreground hover:border-black hover:text-black"
                }`}
                aria-pressed={draft.mood === m.id}
              >
                {m.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mb-3">
          <label htmlFor="diary-text" className="text-xs text-muted-foreground block mb-1.5">
            Entry <span className="text-black font-medium">(required)</span>
          </label>
          <textarea
            id="diary-text"
            value={draft.text}
            onChange={(e) => setDraft((p) => ({ ...p, text: e.target.value }))}
            placeholder="What are you thinking about?"
            className="w-full min-h-[6rem] border border-border px-3 py-2.5 text-sm leading-relaxed resize-none rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black placeholder:text-muted-foreground"
          />
        </div>

        <div className="mb-4">
          {draft.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2 mb-2 list-none" aria-label="Tags added to this entry" role="list">
              {draft.tags.map((tag) => (
                <li key={tag} className="inline-flex items-center gap-1 bg-muted px-2 py-0.5 text-xs rounded-sm">
                  <span aria-hidden>#</span>{tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm ml-0.5"
                    aria-label={`Remove tag: ${tag}`}
                  >
                    <X size={9} aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <label htmlFor="tag-input" className="text-xs text-muted-foreground block mb-1.5">Tags</label>
          <input
            id="tag-input"
            type="text"
            value={draft.tagInput}
            onChange={(e) => setDraft((p) => ({ ...p, tagInput: e.target.value }))}
            onKeyDown={handleTagKey}
            placeholder="Type a tag and press Enter"
            aria-describedby={tagHintId}
            className="border border-border px-3 py-1.5 text-xs w-full sm:w-56 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black placeholder:text-muted-foreground"
          />
          <p id={tagHintId} className="text-xs text-muted-foreground mt-1">Press Enter to add each tag.</p>
        </div>

        <button
          onClick={saveEntry}
          disabled={!canSave}
          aria-disabled={!canSave}
          className="inline-flex items-center gap-1.5 bg-black text-white px-4 py-2 text-xs rounded-sm disabled:opacity-40 hover:opacity-75 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
          <Plus size={12} aria-hidden />
          Save entry
          {!canSave && <SR> — please select a mood and write some text first</SR>}
        </button>
      </section>

      {/* Filters + view toggle */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <fieldset className="border-none p-0">
          <legend className="text-xs text-muted-foreground mb-2">Filter by mood</legend>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setFilterMood(null)}
              className={`px-2.5 py-1 text-xs rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 ${filterMood === null ? "bg-black text-white border-black" : "border-border text-muted-foreground hover:border-black hover:text-black"}`}
              aria-pressed={filterMood === null}
            >
              All moods
            </button>
            {MOODS.map((m) => (
              <button
                key={m.id}
                onClick={() => setFilterMood(filterMood === m.id ? null : m.id)}
                className={`px-2.5 py-1 text-xs rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 ${filterMood === m.id ? "bg-black text-white border-black" : "border-border text-muted-foreground hover:border-black hover:text-black"}`}
                aria-pressed={filterMood === m.id}
              >
                {m.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div role="group" aria-label="Entry view mode" className="flex gap-1">
          {(["timeline", "grid"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 text-xs rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black capitalize ${view === v ? "bg-black text-white border-black" : "border-border text-muted-foreground hover:border-black hover:text-black"}`}
              aria-pressed={view === v}
            >
              {v} view
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12 text-center" role="status">
          No entries for this mood yet.
        </p>
      ) : view === "timeline" ? (
        <TimelineView entries={filtered} />
      ) : (
        <GridView entries={filtered} />
      )}
    </div>
  );
}

function TimelineView({ entries }: { entries: DiaryEntry[] }) {
  return (
    <ol
      className="list-none border-t border-border"
      aria-label={`${entries.length} diary ${entries.length === 1 ? "entry" : "entries"}`}
    >
      {entries.map((entry) => {
        const mood = getMood(entry.mood);
        return (
          <li key={entry.id} className="border-b border-border py-5 grid sm:grid-cols-[120px_1fr] gap-3 sm:gap-6">
            <div>
              <time className="text-xs text-muted-foreground block mb-1" dateTime={entry.date} aria-label={fmtLong(entry.date)}>
                {fmtShort(entry.date)}
              </time>
              <span className="inline-block text-[10px] px-2 py-0.5 rounded-sm bg-black text-white">
                <SR>Mood: </SR>{mood.label}
              </span>
            </div>
            <article aria-label={`Diary entry from ${fmtLong(entry.date)}, mood: ${entry.mood}`}>
              <p className="text-sm leading-relaxed mb-2">{entry.text}</p>
              {entry.tags.length > 0 && (
                <ul className="flex flex-wrap gap-x-2 list-none" aria-label="Tags" role="list">
                  {entry.tags.map((tag) => (
                    <li key={tag} className="text-xs text-muted-foreground">
                      <span aria-hidden>#</span>{tag}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        );
      })}
    </ol>
  );
}

function GridView({ entries }: { entries: DiaryEntry[] }) {
  return (
    <ol
      className="list-none grid sm:grid-cols-2 gap-4"
      aria-label={`${entries.length} diary ${entries.length === 1 ? "entry" : "entries"}`}
    >
      {entries.map((entry) => {
        const mood = getMood(entry.mood);
        return (
          <li key={entry.id}>
            <article
              className="border border-border rounded-sm p-4 h-full"
              aria-label={`Diary entry from ${fmtLong(entry.date)}, mood: ${entry.mood}`}
            >
              <div className="flex items-center justify-between mb-3">
                <time className="text-xs text-muted-foreground" dateTime={entry.date} aria-label={fmtLong(entry.date)}>
                  {fmtShort(entry.date)}
                </time>
                <span className="text-[10px] px-2 py-0.5 rounded-sm bg-black text-white">
                  <SR>Mood: </SR>{mood.label}
                </span>
              </div>
              <p className="text-sm leading-relaxed line-clamp-5 mb-2">{entry.text}</p>
              {entry.tags.length > 0 && (
                <ul className="flex flex-wrap gap-x-2 list-none" aria-label="Tags" role="list">
                  {entry.tags.map((tag) => (
                    <li key={tag} className="text-xs text-muted-foreground">
                      <span aria-hidden>#</span>{tag}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        );
      })}
    </ol>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [entries, setEntries] = useState<DiaryEntry[]>(INITIAL_ENTRIES);
  const [draft, setDraft] = useState<DiaryDraft>({ text: "", mood: "", tags: [], tagInput: "" });
  const [filterMood, setFilterMood] = useState<string | null>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    document.documentElement.lang = "en";
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[page];
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    h1Ref.current?.focus();
  }, [page]);

  const navigate = (p: Page) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-black" lang="en">
      {/* Skip navigation link — first focusable element */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:border-2 focus:border-black focus:rounded-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <Nav page={page} navigate={navigate} open={menuOpen} setOpen={setMenuOpen} />

      <main id="main-content" tabIndex={-1} className="focus-visible:outline-none">
        {page === "home" && <HomePage navigate={navigate} h1Ref={h1Ref} />}
        {page === "about" && <AboutPage h1Ref={h1Ref} />}
        {page === "research" && <ResearchPage h1Ref={h1Ref} />}
        {page === "resume" && <ResumePage h1Ref={h1Ref} />}
        {page === "diary" && (
          <DiaryPage
            entries={entries}
            setEntries={setEntries}
            draft={draft}
            setDraft={setDraft}
            filterMood={filterMood}
            setFilterMood={setFilterMood}
            h1Ref={h1Ref}
          />
        )}
      </main>
    </div>
  );
}
