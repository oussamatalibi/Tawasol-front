"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "../icons";
import { Language, SiteFooter, SiteHeader } from "../site-chrome";

type L = { fr: string; ar: string };
type Kind = "tournament" | "training" | "activity";
type Group = "official" | "youth" | "rapid" | "club" | "workshop";
type Status = "open" | "soon" | "later";
type Tag = { label: L; tone?: "green" };

type EventItem = {
  id: string;
  start: string;
  end: string;
  dateLabel: L;
  status: Status;
  image: string;
  position: string;
  icon: string;
  title: L;
  place: L;
  meta: L;
  kind: Kind;
  group: Group;
  category: string;
  tags: Tag[];
  footerIcon: string;
  footer: L;
};

const events: EventItem[] = [
  {
    id: "open-tanger",
    start: "2026-12-12",
    end: "2026-12-14",
    dateLabel: { fr: "12 - 14 déc. 2026", ar: "12 - 14 دجنبر 2026" },
    status: "open",
    image: "/hero-section-image.png",
    position: "20% 50%",
    icon: "trophy",
    title: { fr: "Open de Tanger 2026", ar: "بطولة طنجة المفتوحة 2026" },
    place: { fr: "Maison des Associations, Tanger", ar: "دار الجمعيات، طنجة" },
    meta: { fr: "9 rondes · 90 min + 30 sec", ar: "9 جولات · 90 دقيقة + 30 ثانية" },
    kind: "tournament",
    group: "official",
    category: "classic",
    tags: [
      { label: { fr: "Classique", ar: "كلاسيكي" } },
      { label: { fr: "Ouvert à tous", ar: "مفتوح للجميع" } },
      { label: { fr: "Homologué FIDE", ar: "معتمد من الفيدي" } },
    ],
    footerIcon: "users",
    footer: { fr: "120 participants attendus", ar: "120 مشاركاً متوقعاً" },
  },
  {
    id: "nord-jeunes",
    start: "2026-11-05",
    end: "2026-11-06",
    dateLabel: { fr: "5 - 6 nov. 2026", ar: "5 - 6 نونبر 2026" },
    status: "open",
    image: "/formation/hero.jpg",
    position: "50% 30%",
    icon: "trophy",
    title: { fr: "Championnat du Nord Jeunes 2026", ar: "بطولة الشمال للشباب 2026" },
    place: { fr: "Centre Culturel Ahmed Boukmakh", ar: "المركز الثقافي أحمد بوكماخ" },
    meta: { fr: "7 rondes · 60 min + 30 sec", ar: "7 جولات · 60 دقيقة + 30 ثانية" },
    kind: "tournament",
    group: "youth",
    category: "youth",
    tags: [
      { label: { fr: "Jeunes", ar: "الشباب" } },
      { label: { fr: "U8 - U20", ar: "U8 - U20" }, tone: "green" },
      { label: { fr: "Homologué FIDE", ar: "معتمد من الفيدي" } },
    ],
    footerIcon: "users",
    footer: { fr: "80 participants attendus", ar: "80 مشاركاً متوقعاً" },
  },
  {
    id: "rapide-automne",
    start: "2026-10-22",
    end: "2026-10-22",
    dateLabel: { fr: "22 oct. 2026", ar: "22 أكتوبر 2026" },
    status: "soon",
    image: "/photo.png",
    position: "60% 40%",
    icon: "bolt",
    title: { fr: "Tournoi Rapide d’Automne", ar: "بطولة الخريف السريعة" },
    place: { fr: "Siège du club - Tanger", ar: "مقر النادي - طنجة" },
    meta: { fr: "7 rondes · 15 min + 10 sec", ar: "7 جولات · 15 دقيقة + 10 ثوانٍ" },
    kind: "tournament",
    group: "rapid",
    category: "rapid",
    tags: [
      { label: { fr: "Rapide", ar: "سريع" } },
      { label: { fr: "Ouvert à tous", ar: "مفتوح للجميع" } },
      { label: { fr: "Non homologué", ar: "غير معتمد" } },
    ],
    footerIcon: "users",
    footer: { fr: "64 participants attendus", ar: "64 مشاركاً متوقعاً" },
  },
  {
    id: "blitz-nouvel-an",
    start: "2027-01-18",
    end: "2027-01-18",
    dateLabel: { fr: "18 janv. 2027", ar: "18 يناير 2027" },
    status: "soon",
    image: "/articles/article-1.jpg",
    position: "50% 40%",
    icon: "bolt",
    title: { fr: "Tournoi Blitz du Nouvel An", ar: "بطولة البليتز للعام الجديد" },
    place: { fr: "Maison des Associations, Tanger", ar: "دار الجمعيات، طنجة" },
    meta: { fr: "11 rondes · 3 min + 2 sec", ar: "11 جولة · 3 دقائق + ثانيتان" },
    kind: "tournament",
    group: "rapid",
    category: "blitz",
    tags: [
      { label: { fr: "Blitz", ar: "بليتز" } },
      { label: { fr: "Ouvert à tous", ar: "مفتوح للجميع" } },
      { label: { fr: "Non homologué", ar: "غير معتمد" } },
    ],
    footerIcon: "users",
    footer: { fr: "50 participants attendus", ar: "50 مشاركاً متوقعاً" },
  },
  {
    id: "stage-preparation",
    start: "2027-02-10",
    end: "2027-02-12",
    dateLabel: { fr: "10 - 12 févr. 2027", ar: "10 - 12 فبراير 2027" },
    status: "open",
    image: "/articles/article-3.jpg",
    position: "50% 50%",
    icon: "book",
    title: { fr: "Stage de préparation", ar: "دورة تحضيرية" },
    place: { fr: "Siège du club - Tanger", ar: "مقر النادي - طنجة" },
    meta: { fr: "3 jours · 12h de formation", ar: "3 أيام · 12 ساعة تكوين" },
    kind: "training",
    group: "workshop",
    category: "training",
    tags: [
      { label: { fr: "Formation", ar: "تكوين" } },
      { label: { fr: "Tous niveaux", ar: "كل المستويات" } },
      { label: { fr: "Avec entraîneurs", ar: "مع مدربين" } },
    ],
    footerIcon: "user",
    footer: { fr: "30 places disponibles", ar: "30 مقعداً متاحاً" },
  },
  {
    id: "interclubs",
    start: "2027-03-25",
    end: "2027-03-26",
    dateLabel: { fr: "25 - 26 mars 2027", ar: "25 - 26 مارس 2027" },
    status: "later",
    image: "/articles/article-4.jpg",
    position: "50% 55%",
    icon: "users",
    title: { fr: "Interclubs de Tanger 2027", ar: "بطولة الأندية بطنجة 2027" },
    place: { fr: "Club Tawassol - Tanger", ar: "نادي التواصل - طنجة" },
    meta: { fr: "5 rondes · 60 min + 30 sec", ar: "5 جولات · 60 دقيقة + 30 ثانية" },
    kind: "activity",
    group: "club",
    category: "team",
    tags: [
      { label: { fr: "Par équipes", ar: "بالفرق" } },
      { label: { fr: "Clubs invités", ar: "أندية مدعوة" } },
      { label: { fr: "Homologué FIDE", ar: "معتمد من الفيدي" } },
    ],
    footerIcon: "users",
    footer: { fr: "8 équipes attendues", ar: "8 فرق متوقعة" },
  },
];

const monthNames: Record<Language, string[]> = {
  fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
  ar: ["يناير", "فبراير", "مارس", "أبريل", "ماي", "يونيو", "يوليوز", "غشت", "شتنبر", "أكتوبر", "نونبر", "دجنبر"],
};

const weekdays: Record<Language, string[]> = {
  fr: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
  ar: ["إثن", "ثلا", "أرب", "خمي", "جمع", "سبت", "أحد"],
};

const pageText = {
  fr: {
    home: "Accueil",
    events: "Tournois",
    title: "Tournois & Événements",
    intro: "Découvrez nos tournois, événements et activités échiquéennes organisés à Tanger et dans la région.",
    slogan: "Plus qu’un jeu, une communauté à Tanger",
    notice: "Les événements, dates, lieux et participants affichés sont des exemples issus de la maquette et restent à confirmer avant publication.",
    tabs: ["Tous les événements", "Tournois officiels", "Tournois jeunes", "Tournois rapides", "Activités du club", "Ateliers & formations"],
    search: "Rechercher un tournoi ou un événement...",
    type: "Type",
    category: "Catégorie",
    city: "Ville",
    status: "Statut",
    all: "Tous",
    allF: "Toutes",
    reset: "Réinitialiser",
    types: { tournament: "Tournoi", training: "Formation", activity: "Activité" },
    categories: { classic: "Classique", rapid: "Rapide", blitz: "Blitz", youth: "Jeunes", training: "Formation", team: "Par équipes" },
    statuses: { open: "Inscriptions ouvertes", soon: "Prochainement", later: "Bientôt" },
    upcoming: "Événements à venir",
    past: "Événements passés",
    sort: "Trier par",
    sortOptions: ["Date (croissante)", "Date (décroissante)"],
    gridView: "Affichage en grille",
    listView: "Affichage en liste",
    details: "Voir les détails",
    noResults: "Aucun événement ne correspond à votre recherche.",
    noPast: "Les archives des événements passés seront publiées prochainement.",
    next: "Prochain événement",
    seeAll: "Voir tous",
    nextCta: "Voir les détails et s’inscrire",
    calendar: "Calendrier des événements",
    seeCalendar: "Voir le calendrier",
    prevMonth: "Mois précédent",
    nextMonth: "Mois suivant",
    legend: ["Tournoi", "Formation", "Autre événement"],
    organizeTitle: "Organiser un événement ?",
    organizeText: "Vous êtes un club, une école ou une institution ? Collaborons pour promouvoir les échecs à Tanger.",
    contact: "Nous contacter",
    imageAlt: "Illustration",
  },
  ar: {
    home: "الرئيسية",
    events: "البطولات",
    title: "البطولات والفعاليات",
    intro: "اكتشفوا بطولاتنا وفعالياتنا وأنشطتنا الشطرنجية المنظمة بطنجة والجهة.",
    slogan: "أكثر من لعبة، مجتمع في طنجة",
    notice: "الفعاليات والتواريخ والأماكن والمشاركون المعروضة أمثلة مستوحاة من التصميم وتبقى في انتظار التأكيد قبل النشر.",
    tabs: ["كل الفعاليات", "البطولات الرسمية", "بطولات الشباب", "البطولات السريعة", "أنشطة النادي", "ورشات وتكوينات"],
    search: "ابحث عن بطولة أو فعالية...",
    type: "النوع",
    category: "الفئة",
    city: "المدينة",
    status: "الحالة",
    all: "الكل",
    allF: "الكل",
    reset: "إعادة الضبط",
    types: { tournament: "بطولة", training: "تكوين", activity: "نشاط" },
    categories: { classic: "كلاسيكي", rapid: "سريع", blitz: "بليتز", youth: "الشباب", training: "تكوين", team: "بالفرق" },
    statuses: { open: "التسجيل مفتوح", soon: "قريباً", later: "لاحقاً" },
    upcoming: "الفعاليات القادمة",
    past: "الفعاليات السابقة",
    sort: "ترتيب حسب",
    sortOptions: ["التاريخ (تصاعدي)", "التاريخ (تنازلي)"],
    gridView: "عرض شبكي",
    listView: "عرض قائمة",
    details: "عرض التفاصيل",
    noResults: "لا توجد فعالية مطابقة لبحثك.",
    noPast: "سيتم نشر أرشيف الفعاليات السابقة قريباً.",
    next: "الفعالية القادمة",
    seeAll: "عرض الكل",
    nextCta: "عرض التفاصيل والتسجيل",
    calendar: "تقويم الفعاليات",
    seeCalendar: "عرض التقويم",
    prevMonth: "الشهر السابق",
    nextMonth: "الشهر التالي",
    legend: ["بطولة", "تكوين", "فعالية أخرى"],
    organizeTitle: "تنظيم فعالية؟",
    organizeText: "هل أنتم نادٍ أو مدرسة أو مؤسسة؟ لنتعاون معاً للنهوض بالشطرنج في طنجة.",
    contact: "تواصلوا معنا",
    imageAlt: "صورة توضيحية",
  },
} as const;

const tabGroups: { group: Group | "all"; icon: string }[] = [
  { group: "all", icon: "users" },
  { group: "official", icon: "trophy" },
  { group: "youth", icon: "cap" },
  { group: "rapid", icon: "bolt" },
  { group: "club", icon: "handshake" },
  { group: "workshop", icon: "book" },
];

function daysInMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

function mondayOffset(year: number, month: number) {
  return (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
}

function Calendar({ language, text }: { language: Language; text: (typeof pageText)[Language] }) {
  const [cursor, setCursor] = useState({ year: 2026, month: 11 });
  const { year, month } = cursor;
  const isArabic = language === "ar";

  const marked = useMemo(() => {
    const map = new Map<number, Kind>();
    events.forEach((event) => {
      [event.start, event.end].forEach((iso) => {
        const [y, m, d] = iso.split("-").map(Number);
        if (y === year && m - 1 === month) map.set(d, event.kind);
      });
    });
    return map;
  }, [year, month]);

  function shift(delta: number) {
    const date = new Date(Date.UTC(year, month + delta, 1));
    setCursor({ year: date.getUTCFullYear(), month: date.getUTCMonth() });
  }

  const cells: (number | null)[] = [
    ...Array.from({ length: mondayOffset(year, month) }, () => null),
    ...Array.from({ length: daysInMonth(year, month) }, (_, index) => index + 1),
  ];

  return (
    <section className="events-panel events-calendar" aria-labelledby="events-calendar-title">
      <header className="events-panel__head">
        <span className="events-panel__icon"><Icon name="calendar" /></span>
        <h2 id="events-calendar-title">{text.calendar}</h2>
        <span className="events-panel__link events-disabled" aria-disabled="true">{text.seeCalendar} {isArabic ? "←" : "→"}</span>
      </header>
      <div className="events-calendar__bar">
        <strong>{monthNames[language][month]} {year}</strong>
        <div>
          <button type="button" aria-label={text.prevMonth} onClick={() => shift(-1)}>{isArabic ? "›" : "‹"}</button>
          <button type="button" aria-label={text.nextMonth} onClick={() => shift(1)}>{isArabic ? "‹" : "›"}</button>
        </div>
      </div>
      <div className="events-calendar__grid" role="grid">
        {weekdays[language].map((day) => <span key={day} className="events-calendar__weekday" role="columnheader">{day}</span>)}
        {cells.map((day, index) => (
          <span
            key={index}
            role="gridcell"
            className={`events-calendar__day${day && marked.has(day) ? ` events-calendar__day--${marked.get(day)}` : ""}`}
          >
            {day}
          </span>
        ))}
      </div>
      <ul className="events-calendar__legend">
        <li><i className="events-dot events-dot--tournament" />{text.legend[0]}</li>
        <li><i className="events-dot events-dot--training" />{text.legend[1]}</li>
        <li><i className="events-dot events-dot--activity" />{text.legend[2]}</li>
      </ul>
    </section>
  );
}

export default function EventsPage() {
  const [language, setLanguage] = useState<Language>("fr");
  const [group, setGroup] = useState<Group | "all">("all");
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");
  const [city, setCity] = useState("tanger");
  const [status, setStatus] = useState("all");
  const [period, setPeriod] = useState<"upcoming" | "past">("upcoming");
  const [sort, setSort] = useState("asc");
  const [view, setView] = useState<"grid" | "list">("grid");
  const text = pageText[language];
  const isArabic = language === "ar";
  const arrow = isArabic ? "←" : "→";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, language]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = events.filter((event) => {
      if (group !== "all" && event.group !== group) return false;
      if (type !== "all" && event.kind !== type) return false;
      if (category !== "all" && event.category !== category) return false;
      if (status !== "all" && event.status !== status) return false;
      if (city !== "tanger") return false;
      if (needle && !`${event.title.fr} ${event.title.ar} ${event.place.fr} ${event.place.ar}`.toLowerCase().includes(needle)) return false;
      return true;
    });
    return sort === "desc" ? [...filtered].reverse() : filtered;
  }, [group, type, category, status, city, query, sort]);

  const shown = period === "upcoming" ? visible : [];
  const featured = events[0];

  function reset() {
    setGroup("all");
    setQuery("");
    setType("all");
    setCategory("all");
    setCity("tanger");
    setStatus("all");
    setSort("asc");
  }

  return (
    <div className={`site-shell${isArabic ? " site-shell--rtl" : ""}`}>
      <SiteHeader language={language} currentPage="events" onLanguageChange={setLanguage} />

      <main className="about-page events-page">
        <section className="about-hero events-hero" aria-labelledby="events-title">
          <Image src="/hero-section-image.png" alt="" fill priority sizes="100vw" className="events-hero__image" />
          <div className="about-hero__content events-hero__content">
            <nav className="about-breadcrumbs" aria-label={isArabic ? "مسار التنقل" : "Fil d’Ariane"}>
              <Link href="/">{text.home}</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{text.events}</span>
            </nav>
            <h1 id="events-title">{text.title}</h1>
            {!isArabic && <p className="about-hero__association" lang="ar">البطولات والفعاليات</p>}
            <p className="about-hero__description">{text.intro}</p>
          </div>
          {!isArabic && <p className="events-hero__slogan" aria-hidden="true">{text.slogan}</p>}
        </section>

        <p className="about-content-notice" role="note">{text.notice}</p>

        <div className="events-layout about-container">
          <div className="events-main">
            <div className="events-tabs" role="tablist" aria-label={text.title}>
              {tabGroups.map((tab, index) => (
                <button
                  key={tab.group}
                  type="button"
                  role="tab"
                  aria-selected={group === tab.group}
                  className={group === tab.group ? "is-active" : undefined}
                  onClick={() => setGroup(tab.group)}
                >
                  <Icon name={tab.icon} />
                  {text.tabs[index]}
                </button>
              ))}
            </div>

            <form className="events-filters" onSubmit={(event) => event.preventDefault()} role="search">
              <label className="events-search">
                <Icon name="search" />
                <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.search} aria-label={text.search} />
              </label>
              <label>
                <span>{text.type}</span>
                <select value={type} onChange={(event) => setType(event.target.value)}>
                  <option value="all">{text.all}</option>
                  {Object.entries(text.types).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label>
                <span>{text.category}</span>
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  <option value="all">{text.allF}</option>
                  {Object.entries(text.categories).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label>
                <span>{text.city}</span>
                <select value={city} onChange={(event) => setCity(event.target.value)}>
                  <option value="tanger">{isArabic ? "طنجة" : "Tanger"}</option>
                  <option value="other">{isArabic ? "مدن أخرى" : "Autres villes"}</option>
                </select>
              </label>
              <label>
                <span>{text.status}</span>
                <select value={status} onChange={(event) => setStatus(event.target.value)}>
                  <option value="all">{text.all}</option>
                  {Object.entries(text.statuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <button type="button" className="events-reset" onClick={reset}>
                {text.reset}<Icon name="refresh" />
              </button>
            </form>

            <div className="events-toolbar">
              <div className="events-periods" role="tablist">
                <button type="button" role="tab" aria-selected={period === "upcoming"} className={period === "upcoming" ? "is-active" : undefined} onClick={() => setPeriod("upcoming")}>
                  {text.upcoming} ({visible.length})
                </button>
                <button type="button" role="tab" aria-selected={period === "past"} className={period === "past" ? "is-active" : undefined} onClick={() => setPeriod("past")}>
                  {text.past}
                </button>
              </div>
              <div className="events-sort">
                <label>
                  <span>{text.sort}</span>
                  <select value={sort} onChange={(event) => setSort(event.target.value)}>
                    <option value="asc">{text.sortOptions[0]}</option>
                    <option value="desc">{text.sortOptions[1]}</option>
                  </select>
                </label>
                <button type="button" aria-label={text.gridView} aria-pressed={view === "grid"} className={view === "grid" ? "is-active" : undefined} onClick={() => setView("grid")}><Icon name="grid" /></button>
                <button type="button" aria-label={text.listView} aria-pressed={view === "list"} className={view === "list" ? "is-active" : undefined} onClick={() => setView("list")}><Icon name="list" /></button>
              </div>
            </div>

            {shown.length === 0 ? (
              <p className="players-empty" role="status">{period === "past" ? text.noPast : text.noResults}</p>
            ) : (
              <div className={`events-grid${view === "list" ? " events-grid--list" : ""}`}>
                {shown.map((event) => (
                  <article key={event.id} className="events-card">
                    <div className="events-card__image">
                      <Image src={event.image} alt={`${text.imageAlt} : ${event.title[language]}`} fill sizes="(max-width: 700px) 100vw, 24vw" style={{ objectPosition: event.position }} />
                      <span className="events-card__date"><Icon name="calendar" />{event.dateLabel[language]}</span>
                      <span className={`events-card__status events-card__status--${event.status}`}>{text.statuses[event.status]}</span>
                    </div>
                    <div className="events-card__body">
                      <h3><span className={`events-card__icon events-card__icon--${event.kind}`}><Icon name={event.icon} /></span>{event.title[language]}</h3>
                      <p><Icon name="pin" />{event.place[language]}</p>
                      <p><Icon name="clock" />{event.meta[language]}</p>
                      <ul className="events-tags">
                        {event.tags.map((tag) => <li key={tag.label.fr} className={tag.tone ? `events-tags__${tag.tone}` : undefined}>{tag.label[language]}</li>)}
                      </ul>
                      <div className="events-card__footer">
                        <span><Icon name={event.footerIcon} />{event.footer[language]}</span>
                        <span className="events-card__button events-disabled" aria-disabled="true">{text.details}<b aria-hidden="true">{arrow}</b></span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="events-aside" aria-label={text.calendar}>
            <section className="events-panel events-next" aria-labelledby="events-next-title">
              <header className="events-panel__head">
                <span className="events-panel__icon"><Icon name="file" /></span>
                <h2 id="events-next-title">{text.next}</h2>
                <span className="events-panel__link events-disabled" aria-disabled="true">{text.seeAll} {arrow}</span>
              </header>
              <div className="events-next__body">
                <div className="events-next__image">
                  <Image src={featured.image} alt="" fill sizes="120px" style={{ objectPosition: "75% 50%" }} />
                </div>
                <div>
                  <h3>{featured.title[language]}</h3>
                  <p><Icon name="calendar" />{featured.dateLabel[language]}</p>
                  <p><Icon name="pin" />{featured.place[language]}</p>
                  <p><Icon name="clock" />{featured.meta[language]}</p>
                  <ul className="events-tags">
                    {featured.tags.filter((tag) => tag.label.fr !== "Ouvert à tous").map((tag) => <li key={tag.label.fr}>{tag.label[language]}</li>)}
                  </ul>
                </div>
              </div>
              <span className="button button--primary events-next__cta events-disabled" aria-disabled="true">{text.nextCta}<b aria-hidden="true">{arrow}</b></span>
            </section>

            <Calendar key={language} language={language} text={text} />

            <section className="events-organize" aria-labelledby="events-organize-title">
              <span className="events-organize__icon"><Icon name="users" /></span>
              <div>
                <h2 id="events-organize-title">{text.organizeTitle}</h2>
                <p>{text.organizeText}</p>
                <Link className="events-organize__button" href="/#contact">{text.contact}<b aria-hidden="true">{arrow}</b></Link>
              </div>
            </section>
          </aside>
        </div>
      </main>

      <SiteFooter language={language} />
    </div>
  );
}
