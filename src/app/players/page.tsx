"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "../icons";
import { Language, SiteFooter, SiteHeader } from "../site-chrome";

type Category = "senior" | "junior" | "cadet" | "minime";

type Player = {
  id: number;
  name: { fr: string; ar: string };
  rating: number;
  born: number;
  category: Category;
  role: { fr: string; ar: string };
  tournaments: number;
  podiums: number;
  games: number;
  trend: number;
};

const players: Player[] = [
  { id: 1, name: { fr: "Oussama Talibi", ar: "أسامة طالبي" }, rating: 2350, born: 2002, category: "senior", role: { fr: "Membre actif · Équipe technique", ar: "عضو نشط · الفريق التقني" }, tournaments: 12, podiums: 3, games: 48, trend: 12 },
  { id: 2, name: { fr: "Hajar Marbou", ar: "هاجر مربو" }, rating: 2180, born: 2004, category: "senior", role: { fr: "Joueuse · Encadrement jeunes", ar: "لاعبة · تأطير الشباب" }, tournaments: 10, podiums: 2, games: 26, trend: 8 },
  { id: 3, name: { fr: "Derazz El Kabir", ar: "دراز الكبير" }, rating: 1980, born: 2008, category: "junior", role: { fr: "Catégorie U18 · Joueur actif", ar: "فئة أقل من 18 · لاعب نشط" }, tournaments: 8, podiums: 4, games: 32, trend: 25 },
  { id: 4, name: { fr: "Mohamed Soussi", ar: "محمد السوسي" }, rating: 1920, born: 2009, category: "junior", role: { fr: "Catégorie U16 · Joueur actif", ar: "فئة أقل من 16 · لاعب نشط" }, tournaments: 7, podiums: 2, games: 18, trend: 18 },
  { id: 5, name: { fr: "Youssef Jdidou", ar: "يوسف جديدو" }, rating: 2100, born: 2001, category: "senior", role: { fr: "Joueur · Analyse et formation", ar: "لاعب · التحليل والتدريب" }, tournaments: 9, podiums: 1, games: 40, trend: 0 },
  { id: 6, name: { fr: "Ayoub Benali", ar: "أيوب بنعلي" }, rating: 1850, born: 2010, category: "junior", role: { fr: "Catégorie U14 · Joueur actif", ar: "فئة أقل من 14 · لاعب نشط" }, tournaments: 6, podiums: 2, games: 12, trend: 0 },
  { id: 7, name: { fr: "Salma El Amrani", ar: "سلمى العمراني" }, rating: 1760, born: 2011, category: "cadet", role: { fr: "Catégorie U14 · Joueuse active", ar: "فئة أقل من 14 · لاعبة نشطة" }, tournaments: 5, podiums: 2, games: 12, trend: 0 },
  { id: 8, name: { fr: "Yassine Chraibi", ar: "ياسين الشرايبي" }, rating: 1680, born: 2013, category: "minime", role: { fr: "Catégorie U12 · Joueur actif", ar: "فئة أقل من 12 · لاعب نشط" }, tournaments: 4, podiums: 1, games: 10, trend: 0 },
];

const top5 = [1, 2, 5, 3, 4];

const categoryLabels = {
  fr: { senior: "Senior", junior: "Junior", cadet: "Cadet", minime: "Minime" },
  ar: { senior: "الكبار", junior: "الشباب", cadet: "الفتيان", minime: "الصغار" },
} satisfies Record<Language, Record<Category, string>>;

const pageText = {
  fr: {
    home: "Accueil",
    players: "Joueurs",
    title: "Nos joueurs",
    intro: "Découvrez les membres de notre club, leurs parcours, leurs réalisations et leurs performances.",
    notice: "Les noms, classements, photos et statistiques affichés sont des exemples issus de la maquette et restent à confirmer par l’association.",
    stats: [
      { icon: "users", value: "100+", label: "Membres actifs" },
      { icon: "cap", value: "50+", label: "Jeunes joueurs" },
      { icon: "trophy", value: "15+", label: "Tournois représentés" },
      { icon: "chart", value: "5", label: "Titres et distinctions" },
    ],
    search: "Rechercher un joueur (nom, FIDE, club...)",
    category: "Catégorie",
    level: "Niveau",
    birth: "Année de naissance",
    sort: "Tri par",
    all: "Toutes",
    allM: "Tous",
    reset: "Réinitialiser",
    levels: { advanced: "Avancé (2000+)", intermediate: "Intermédiaire (1800–1999)", progress: "En progression (<1800)" },
    sorts: { rating: "Classement FIDE", name: "Nom", birth: "Année de naissance" },
    born: "Né(e) en",
    tournaments: "Tournois",
    podiums: "Podiums",
    games: "Parties analysées",
    empty: "Aucun joueur ne correspond à votre recherche.",
    pagination: "Pagination",
    topTitle: "Classement FIDE (Top 5)",
    viewAll: "Voir tous",
    distTitle: "Répartition par catégorie",
    members: "membres",
    distLabels: ["Seniors", "Juniors (U18)", "Cadets (U14)", "Minimes (U12)", "Autres"],
    joinTitle: "Rejoignez notre club",
    joinText: "Passionné d’échecs ? Venez jouer, apprendre et progresser avec nous.",
    more: "En savoir plus",
    bannerTitle: "Un club pour tous les passionnés d’échecs",
    bannerText: "Que vous soyez débutant ou joueur confirmé, vous êtes le bienvenu !",
    join: "Devenir membre",
    photo: "Photo d’exemple de",
  },
  ar: {
    home: "الرئيسية",
    players: "اللاعبون",
    title: "لاعبونا",
    intro: "تعرّفوا على أعضاء نادينا ومساراتهم وإنجازاتهم وأدائهم.",
    notice: "الأسماء والتصنيفات والصور والإحصاءات المعروضة أمثلة مأخوذة من التصميم، وتنتظر تأكيد الجمعية.",
    stats: [
      { icon: "users", value: "+100", label: "عضو نشط" },
      { icon: "cap", value: "+50", label: "لاعب شاب" },
      { icon: "trophy", value: "+15", label: "بطولة تمّ تمثيلها" },
      { icon: "chart", value: "5", label: "ألقاب وتكريمات" },
    ],
    search: "ابحث عن لاعب (الاسم، فيد، النادي...)",
    category: "الفئة",
    level: "المستوى",
    birth: "سنة الميلاد",
    sort: "الترتيب حسب",
    all: "الكل",
    allM: "الكل",
    reset: "إعادة التعيين",
    levels: { advanced: "متقدم (2000+)", intermediate: "متوسط (1800–1999)", progress: "قيد التطور (أقل من 1800)" },
    sorts: { rating: "تصنيف فيد", name: "الاسم", birth: "سنة الميلاد" },
    born: "من مواليد",
    tournaments: "بطولات",
    podiums: "منصات",
    games: "مباريات محلّلة",
    empty: "لا يوجد لاعب مطابق لبحثك.",
    pagination: "التنقل بين الصفحات",
    topTitle: "تصنيف فيد (أفضل 5)",
    viewAll: "عرض الكل",
    distTitle: "التوزيع حسب الفئة",
    members: "عضو",
    distLabels: ["الكبار", "الشباب (أقل من 18)", "الفتيان (أقل من 14)", "الصغار (أقل من 12)", "أخرى"],
    joinTitle: "انضموا إلى نادينا",
    joinText: "شغوف بالشطرنج؟ تعالَ لتلعب وتتعلّم وتتطور معنا.",
    more: "اعرف المزيد",
    bannerTitle: "نادٍ لكل عشّاق الشطرنج",
    bannerText: "سواء كنت مبتدئاً أو لاعباً متمرّساً، أنت مرحّب بك!",
    join: "كن عضواً",
    photo: "صورة توضيحية لـ",
  },
} as const;

const distribution = [
  { share: 28, color: "#0b8de0" },
  { share: 24, color: "#22b35a" },
  { share: 20, color: "#f5b942" },
  { share: 18, color: "#a177e3" },
  { share: 10, color: "#d5dae0" },
];

const donut = (() => {
  let start = 0;
  return `conic-gradient(${distribution
    .map(({ share, color }) => {
      const part = `${color} ${start}% ${start + share}%`;
      start += share;
      return part;
    })
    .join(", ")})`;
})();

function Flag() {
  return (
    <svg className="players-flag" viewBox="0 0 24 16" aria-hidden="true">
      <rect width="24" height="16" rx="2" fill="#c1272d" />
      <path d="m12 3.4 1.5 4.6h4.8l-3.9 2.8 1.5 4.6-3.9-2.8-3.9 2.8 1.5-4.6-3.9-2.8h4.8z" fill="none" stroke="#006233" strokeWidth="1" />
    </svg>
  );
}

function levelOf(rating: number) {
  if (rating >= 2000) return "advanced";
  if (rating >= 1800) return "intermediate";
  return "progress";
}

export default function PlayersPage() {
  const [language, setLanguage] = useState<Language>("fr");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [birth, setBirth] = useState("");
  const [sort, setSort] = useState("rating");
  const text = pageText[language];
  const isArabic = language === "ar";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, language]);

  const birthYears = useMemo(
    () => [...new Set(players.map((player) => player.born))].sort((a, b) => b - a),
    [],
  );

  const visiblePlayers = useMemo(() => {
    const term = query.trim().toLowerCase();
    return players
      .filter((player) => {
        const haystack = `${player.name.fr} ${player.name.ar} ${player.rating}`.toLowerCase();
        return (
          (!term || haystack.includes(term)) &&
          (!category || player.category === category) &&
          (!level || levelOf(player.rating) === level) &&
          (!birth || player.born === Number(birth))
        );
      })
      .sort((a, b) => {
        if (sort === "name") return a.name.fr.localeCompare(b.name.fr);
        if (sort === "birth") return b.born - a.born;
        return b.rating - a.rating;
      });
  }, [birth, category, level, query, sort]);

  const resetFilters = () => {
    setQuery("");
    setCategory("");
    setLevel("");
    setBirth("");
    setSort("rating");
  };

  const arrow = isArabic ? "←" : "→";

  return (
    <div className={`site-shell${isArabic ? " site-shell--rtl" : ""}`}>
      <SiteHeader language={language} currentPage="players" onLanguageChange={setLanguage} />

      <main className="about-page players-page">
        <section className="about-hero players-hero" aria-labelledby="players-title">
          <Image
            src="/hero-section-image.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="about-hero__image players-hero__image"
          />
          <div className="about-hero__content">
            <nav className="about-breadcrumbs" aria-label={isArabic ? "مسار التنقل" : "Fil d’Ariane"}>
              <Link href="/">{text.home}</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{text.players}</span>
            </nav>
            <h1 id="players-title">{text.title}</h1>
            {!isArabic && (
              <p className="about-hero__association" lang="ar">لاعبونا</p>
            )}
            <p className="about-hero__description">{text.intro}</p>
          </div>
        </section>

        <p className="about-content-notice" role="note">{text.notice}</p>

        <section className="about-statistics players-stats" aria-label={text.title}>
          <div className="about-statistics__grid players-stats__grid">
            {text.stats.map((stat) => (
              <article className="about-statistic" key={stat.label}>
                <span className="about-icon"><Icon name={stat.icon} /></span>
                <div>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="players-layout about-container">
          <div className="players-main">
            <form className="players-filters" onSubmit={(event) => event.preventDefault()} role="search">
              <label className="players-search">
                <Icon name="search" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={text.search}
                  aria-label={text.search}
                />
              </label>
              <label className="players-select">
                <span>{text.category}</span>
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  <option value="">{text.all}</option>
                  {(Object.keys(categoryLabels.fr) as Category[]).map((key) => (
                    <option key={key} value={key}>{categoryLabels[language][key]}</option>
                  ))}
                </select>
              </label>
              <label className="players-select">
                <span>{text.level}</span>
                <select value={level} onChange={(event) => setLevel(event.target.value)}>
                  <option value="">{text.allM}</option>
                  <option value="advanced">{text.levels.advanced}</option>
                  <option value="intermediate">{text.levels.intermediate}</option>
                  <option value="progress">{text.levels.progress}</option>
                </select>
              </label>
              <label className="players-select">
                <span>{text.birth}</span>
                <select value={birth} onChange={(event) => setBirth(event.target.value)}>
                  <option value="">{text.all}</option>
                  {birthYears.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </label>
              <label className="players-select">
                <span>{text.sort}</span>
                <select value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="rating">{text.sorts.rating}</option>
                  <option value="name">{text.sorts.name}</option>
                  <option value="birth">{text.sorts.birth}</option>
                </select>
              </label>
              <button className="players-reset" type="button" onClick={resetFilters}>
                <Icon name="refresh" />{text.reset}
              </button>
            </form>

            {visiblePlayers.length === 0 ? (
              <p className="players-empty" role="status">{text.empty}</p>
            ) : (
              <div className="players-grid">
                {visiblePlayers.map((player) => (
                  <article className="players-card" key={player.id}>
                    <div className="players-card__photo">
                      <Image
                        src={`/players/player-${player.id}.jpg`}
                        alt={`${text.photo} ${player.name[language]}`}
                        fill
                        sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 20vw"
                      />
                      <span className={`players-badge players-badge--${player.category}`}>
                        {categoryLabels[language][player.category]}
                      </span>
                    </div>
                    <div className="players-card__body">
                      <p className="players-card__rating"><Flag />{player.rating}</p>
                      <h3>{player.name[language]}</h3>
                      <p className="players-card__born">{text.born} {player.born}</p>
                      <p className="players-card__role"><Icon name="user" />{player.role[language]}</p>
                      <dl className="players-card__stats">
                        <div><dd>{player.tournaments}</dd><dt>{text.tournaments}</dt></div>
                        <div><dd>{player.podiums}</dd><dt>{text.podiums}</dt></div>
                        <div><dd>{player.games}</dd><dt>{text.games}</dt></div>
                      </dl>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <nav className="players-pagination" aria-label={text.pagination}>
              <span aria-hidden="true">{isArabic ? "›" : "‹"}</span>
              <span aria-current="page" className="is-active">1</span>
              {[2, 3, 4, 5].map((page) => (
                <span key={page} aria-disabled="true">{page}</span>
              ))}
              <span aria-hidden="true">…</span>
              <span aria-hidden="true">{isArabic ? "‹" : "›"}</span>
            </nav>
          </div>

          <aside className="players-aside">
            <section className="players-panel">
              <header className="players-panel__header">
                <h2><Icon name="trophy" />{text.topTitle}</h2>
                <span className="players-panel__link" aria-disabled="true">{text.viewAll} {arrow}</span>
              </header>
              <ol className="players-top">
                {top5.map((id, index) => {
                  const player = players.find((item) => item.id === id)!;
                  return (
                    <li key={id}>
                      <span className="players-top__rank">{index + 1}</span>
                      <Image src={`/players/avatar-${index + 1}.jpg`} alt="" width={44} height={44} className="players-top__avatar" />
                      <span className="players-top__name">{player.name[language]}</span>
                      <Flag />
                      <strong>{player.rating}</strong>
                      <span className={`players-top__trend${player.trend > 0 ? " is-up" : ""}`}>
                        {player.trend > 0 ? `▲ ${player.trend}` : "—"}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section className="players-panel">
              <h2 className="players-panel__title">{text.distTitle}</h2>
              <div className="players-distribution">
                <div className="players-donut" style={{ background: donut }} role="img" aria-label={`100+ ${text.members}`}>
                  <span><strong>100+</strong>{text.members}</span>
                </div>
                <ul>
                  {distribution.map((item, index) => (
                    <li key={item.color}>
                      <i style={{ background: item.color }} />
                      <span>{text.distLabels[index]}</span>
                      <b>{item.share}%</b>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="players-panel players-join">
              <span className="about-icon"><Icon name="users" /></span>
              <div>
                <h2>{text.joinTitle}</h2>
                <p>{text.joinText}</p>
                <Link className="players-join__button" href="/#membership">
                  {text.more} <span aria-hidden="true">{arrow}</span>
                </Link>
              </div>
            </section>
          </aside>
        </div>

        <section className="players-banner about-container" aria-labelledby="players-banner-title">
          <span className="about-icon"><Icon name="king" /></span>
          <div>
            <h2 id="players-banner-title">{text.bannerTitle}</h2>
            <p>{text.bannerText}</p>
          </div>
          <Link className="players-banner__button" href="/#membership">
            {text.join} <span aria-hidden="true">{arrow}</span>
          </Link>
        </section>
      </main>

      <SiteFooter language={language} />
    </div>
  );
}
