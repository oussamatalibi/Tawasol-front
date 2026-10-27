"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Icon } from "../icons";
import { Language, SiteFooter, SiteHeader } from "../site-chrome";

type CategoryKey = "analysis" | "tournament" | "training" | "players" | "club";

type Article = {
  id: number;
  category: CategoryKey;
  date: { fr: string; ar: string };
  title: { fr: string; ar: string };
  excerpt: { fr: string; ar: string };
  author: { fr: string; ar: string };
  avatar: string;
  minutes: number;
};

const articles: Article[] = [
  {
    id: 1,
    category: "analysis",
    date: { fr: "12 janv. 2026", ar: "12 يناير 2026" },
    title: { fr: "Une finale instructive au Tournoi de Tanger", ar: "نهاية مفيدة في بطولة طنجة" },
    excerpt: {
      fr: "Analyse d’une partie décisive avec commentaires et idées clés pour progresser.",
      ar: "تحليل لمباراة حاسمة مع تعليقات وأفكار أساسية للتطور.",
    },
    author: { fr: "Oussama Talibi", ar: "أسامة طالبي" },
    avatar: "/players/avatar-1.jpg",
    minutes: 12,
  },
  {
    id: 2,
    category: "tournament",
    date: { fr: "5 janv. 2026", ar: "5 يناير 2026" },
    title: { fr: "Retour sur le Championnat du club 2025", ar: "نظرة على بطولة النادي 2025" },
    excerpt: {
      fr: "Les moments forts, les résultats et les meilleures parties du championnat.",
      ar: "أبرز اللحظات والنتائج وأفضل مباريات البطولة.",
    },
    author: { fr: "Équipe ATET", ar: "فريق ATET" },
    avatar: "/club-logo.jpg",
    minutes: 8,
  },
  {
    id: 3,
    category: "training",
    date: { fr: "28 déc. 2025", ar: "28 دجنبر 2025" },
    title: { fr: "Comment améliorer votre jeu de milieu de partie", ar: "كيف تطوّر لعبك في وسط المباراة" },
    excerpt: {
      fr: "Principes essentiels et exemples pratiques pour mieux comprendre les plans stratégiques.",
      ar: "مبادئ أساسية وأمثلة عملية لفهم الخطط الاستراتيجية بشكل أفضل.",
    },
    author: { fr: "Hajar Marbou", ar: "هاجر مربو" },
    avatar: "/players/avatar-2.jpg",
    minutes: 10,
  },
  {
    id: 4,
    category: "club",
    date: { fr: "15 déc. 2025", ar: "15 دجنبر 2025" },
    title: { fr: "Nos ateliers pour les jeunes", ar: "ورشاتنا للشباب" },
    excerpt: {
      fr: "Retour sur nos dernières sessions et l’engagement de nos jeunes talents.",
      ar: "نظرة على آخر حصصنا وعلى التزام مواهبنا الشابة.",
    },
    author: { fr: "Derazz El Kabir", ar: "دراز الكبير" },
    avatar: "/players/avatar-4.jpg",
    minutes: 6,
  },
  {
    id: 5,
    category: "players",
    date: { fr: "10 déc. 2025", ar: "10 دجنبر 2025" },
    title: { fr: "Portrait de joueur : un parcours inspirant", ar: "بورتريه لاعب: مسار ملهم" },
    excerpt: {
      fr: "Découvrez le parcours d’un membre du club, ses réussites et ses conseils pour les jeunes joueurs.",
      ar: "اكتشفوا مسار أحد أعضاء النادي ونجاحاته ونصائحه للاعبين الشباب.",
    },
    author: { fr: "Youssef Jdidou", ar: "يوسف جديدو" },
    avatar: "/players/avatar-3.jpg",
    minutes: 8,
  },
  {
    id: 6,
    category: "analysis",
    date: { fr: "1 déc. 2025", ar: "1 دجنبر 2025" },
    title: { fr: "Comprendre les sacrifices positionnels", ar: "فهم التضحيات الموضعية" },
    excerpt: {
      fr: "Quand et pourquoi sacrifier du matériel pour un avantage durable dans la position.",
      ar: "متى ولماذا نضحّي بالمادة من أجل أفضلية دائمة في الوضعية.",
    },
    author: { fr: "Oussama Talibi", ar: "أسامة طالبي" },
    avatar: "/players/avatar-1.jpg",
    minutes: 15,
  },
];

const categoryIcons: Record<CategoryKey, string> = {
  analysis: "crown",
  tournament: "trophy",
  training: "cap",
  players: "users",
  club: "users",
};

const categoryOrder: CategoryKey[] = ["analysis", "tournament", "training", "players", "club"];
const categoryCounts: Record<CategoryKey | "all", number> = {
  all: 24,
  analysis: 7,
  tournament: 6,
  training: 5,
  players: 4,
  club: 3,
};

const popular = [
  { thumb: "/articles/thumb-1.jpg", title: { fr: "Comment améliorer votre jeu de milieu de partie", ar: "كيف تطوّر لعبك في وسط المباراة" }, date: { fr: "28 déc. 2025", ar: "28 دجنبر 2025" } },
  { thumb: "/articles/thumb-2.jpg", title: { fr: "Les 10 principes fondamentaux du jeu d’échecs", ar: "المبادئ العشرة الأساسية للعبة الشطرنج" }, date: { fr: "20 nov. 2025", ar: "20 نونبر 2025" } },
  { thumb: "/articles/thumb-3.jpg", title: { fr: "Retour sur le Championnat du club 2025", ar: "نظرة على بطولة النادي 2025" }, date: { fr: "5 janv. 2026", ar: "5 يناير 2026" } },
];

const pageText = {
  fr: {
    home: "Accueil",
    articles: "Articles",
    title: "Articles & Analyses",
    intro: "Actualités, analyses de parties, conseils, tournois et histoires de notre communauté échiquéenne à Tanger.",
    notice: "Les articles, auteurs, dates, images et compteurs affichés sont des exemples issus de la maquette et restent à confirmer par l’association.",
    all: "Tous",
    tabs: { analysis: "Analyses", tournament: "Tournois", training: "Formation", players: "Joueurs", club: "Vie du club" },
    sideCategories: { analysis: "Analyses de parties", tournament: "Tournois et compétitions", training: "Formation et conseils", players: "Portraits de joueurs", club: "Vie du club" },
    searchTitle: "Rechercher un article",
    searchPlaceholder: "Rechercher un article, un joueur, un sujet...",
    searchButton: "Rechercher",
    categories: "Catégories",
    allCategories: "Toutes les catégories",
    viewAll: "Voir toutes",
    featured: "Articles à la une",
    popularTitle: "Articles populaires",
    more: "Voir plus",
    min: "min",
    empty: "Aucun article ne correspond à votre recherche.",
    pagination: "Pagination",
    badge: { analysis: "Analyse", tournament: "Tournoi", training: "Formation", players: "Joueurs", club: "Vie du club" },
    stayTitle: "Restez informé",
    stayHeading: "Recevez nos derniers articles et actualités",
    stayText: "Inscrivez-vous à notre newsletter pour ne rien manquer de la vie du club.",
    email: "Votre adresse email",
    subscribe: "S’inscrire",
    invalidEmail: "Veuillez saisir une adresse email valide.",
    soon: "L’inscription à la newsletter sera bientôt disponible.",
    image: "Image d’illustration de l’article",
  },
  ar: {
    home: "الرئيسية",
    articles: "المقالات",
    title: "المقالات والتحليلات",
    intro: "أخبار وتحليلات مباريات ونصائح وبطولات وقصص من مجتمعنا الشطرنجي في طنجة.",
    notice: "المقالات والكتّاب والتواريخ والصور والأعداد المعروضة أمثلة مأخوذة من التصميم، وتنتظر تأكيد الجمعية.",
    all: "الكل",
    tabs: { analysis: "التحليلات", tournament: "البطولات", training: "التكوين", players: "اللاعبون", club: "حياة النادي" },
    sideCategories: { analysis: "تحليلات المباريات", tournament: "البطولات والمنافسات", training: "التكوين والنصائح", players: "بورتريهات اللاعبين", club: "حياة النادي" },
    searchTitle: "ابحث عن مقال",
    searchPlaceholder: "ابحث عن مقال أو لاعب أو موضوع...",
    searchButton: "بحث",
    categories: "الفئات",
    allCategories: "كل الفئات",
    viewAll: "عرض الكل",
    featured: "مقالات مميزة",
    popularTitle: "المقالات الأكثر قراءة",
    more: "المزيد",
    min: "د",
    empty: "لا يوجد مقال مطابق لبحثك.",
    pagination: "التنقل بين الصفحات",
    badge: { analysis: "تحليل", tournament: "بطولة", training: "تكوين", players: "لاعبون", club: "حياة النادي" },
    stayTitle: "ابقَ على اطلاع",
    stayHeading: "توصّل بآخر مقالاتنا وأخبارنا",
    stayText: "اشترك في نشرتنا البريدية حتى لا يفوتك شيء من حياة النادي.",
    email: "بريدك الإلكتروني",
    subscribe: "اشترك",
    invalidEmail: "يرجى إدخال بريد إلكتروني صحيح.",
    soon: "الاشتراك في النشرة البريدية سيكون متاحاً قريباً.",
    image: "صورة توضيحية للمقال",
  },
} as const;

export default function ArticlesPage() {
  const [language, setLanguage] = useState<Language>("fr");
  const [category, setCategory] = useState<CategoryKey | "all">("all");
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const text = pageText[language];
  const isArabic = language === "ar";
  const arrow = isArabic ? "←" : "→";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, language]);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return articles.filter((article) => {
      const haystack = `${article.title.fr} ${article.title.ar} ${article.excerpt.fr} ${article.excerpt.ar} ${article.author.fr}`.toLowerCase();
      return (category === "all" || article.category === category) && (!term || haystack.includes(term));
    });
  }, [category, query]);

  const submitNewsletter = (event: FormEvent) => {
    event.preventDefault();
    setNewsletterMessage(/^\S+@\S+\.\S+$/.test(email.trim()) ? text.soon : text.invalidEmail);
  };

  const featured = articles[0];

  return (
    <div className={`site-shell${isArabic ? " site-shell--rtl" : ""}`}>
      <SiteHeader language={language} currentPage="articles" onLanguageChange={setLanguage} />

      <main className="about-page articles-page">
        <section className="about-hero articles-hero" aria-labelledby="articles-title">
          <Image
            src="/hero-section-image.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="about-hero__image players-hero__image"
          />
          <div className="about-hero__content articles-hero__content">
            <nav className="about-breadcrumbs" aria-label={isArabic ? "مسار التنقل" : "Fil d’Ariane"}>
              <Link href="/">{text.home}</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{text.articles}</span>
            </nav>
            <h1 id="articles-title">{text.title}</h1>
            {!isArabic && <p className="about-hero__association" lang="ar">المقالات والتحليلات</p>}
            <p className="about-hero__description">{text.intro}</p>
          </div>
        </section>

        <p className="about-content-notice" role="note">{text.notice}</p>

        <div className="articles-layout about-container">
          <div className="articles-main">
            <div className="articles-tabs" role="tablist" aria-label={text.articles}>
              <button
                type="button"
                role="tab"
                aria-selected={category === "all"}
                className={category === "all" ? "is-active" : undefined}
                onClick={() => setCategory("all")}
              >
                <Icon name="grid" />
                <span><b>{text.all}</b><small>{categoryCounts.all}</small></span>
              </button>
              {categoryOrder.map((key) => (
                <button
                  type="button"
                  role="tab"
                  key={key}
                  aria-selected={category === key}
                  className={category === key ? "is-active" : undefined}
                  onClick={() => setCategory(key)}
                >
                  <Icon name={categoryIcons[key]} />
                  <span><b>{text.tabs[key]}</b><small>{categoryCounts[key]}</small></span>
                </button>
              ))}
            </div>

            {visible.length === 0 ? (
              <p className="players-empty" role="status">{text.empty}</p>
            ) : (
              <div className="articles-grid">
                {visible.map((article) => (
                  <article className="articles-card" key={article.id}>
                    <div className="articles-card__image">
                      <Image
                        src={`/articles/article-${article.id}.jpg`}
                        alt={`${text.image} : ${article.title[language]}`}
                        fill
                        sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 28vw"
                      />
                      <span className={`articles-badge articles-badge--${article.category}`}>
                        {text.badge[article.category]}
                      </span>
                      <span className="articles-date">{article.date[language]}</span>
                    </div>
                    <div className="articles-card__body">
                      <h2>{article.title[language]}</h2>
                      <p>{article.excerpt[language]}</p>
                      <footer>
                        <span className="articles-author">
                          <Image src={article.avatar} alt="" width={28} height={28} />
                          {article.author[language]}
                        </span>
                        <span className="articles-time">
                          <Icon name="clock" />{article.minutes} {text.min}
                        </span>
                      </footer>
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

          <aside className="articles-aside">
            <section className="articles-panel">
              <h2>{text.searchTitle}</h2>
              <form className="articles-search" role="search" onSubmit={(event) => event.preventDefault()}>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={text.searchPlaceholder}
                  aria-label={text.searchTitle}
                />
                <button type="submit" aria-label={text.searchButton}><Icon name="search" /></button>
              </form>
            </section>

            <section className="articles-panel">
              <header className="articles-panel__header">
                <h2>{text.categories}</h2>
                <span className="players-panel__link" aria-disabled="true">{text.viewAll} {arrow}</span>
              </header>
              <ul className="articles-categories">
                <li>
                  <button type="button" className={category === "all" ? "is-active" : undefined} onClick={() => setCategory("all")}>
                    <Icon name="grid" /><span>{text.allCategories}</span><b>{categoryCounts.all}</b>
                  </button>
                </li>
                {categoryOrder.map((key) => (
                  <li key={key}>
                    <button type="button" className={category === key ? "is-active" : undefined} onClick={() => setCategory(key)}>
                      <Icon name={categoryIcons[key]} /><span>{text.sideCategories[key]}</span><b>{categoryCounts[key]}</b>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <section className="articles-panel">
              <h2>{text.featured}</h2>
              <div className="articles-featured">
                <Image src="/articles/article-1.jpg" alt="" fill sizes="320px" />
                <div className="articles-featured__text">
                  <span className="articles-badge articles-badge--analysis">{text.badge.analysis}</span>
                  <small>{featured.date[language]}</small>
                  <strong>{featured.title[language]}</strong>
                </div>
                <span className="articles-featured__arrow" aria-hidden="true"><Icon name="chevron" /></span>
              </div>
            </section>

            <section className="articles-panel">
              <header className="articles-panel__header">
                <h2>{text.popularTitle}</h2>
                <span className="players-panel__link" aria-disabled="true">{text.more} {arrow}</span>
              </header>
              <ol className="articles-popular">
                {popular.map((item, index) => (
                  <li key={item.thumb}>
                    <span className="articles-popular__rank">{index + 1}</span>
                    <Image src={item.thumb} alt="" width={66} height={62} />
                    <div>
                      <strong>{item.title[language]}</strong>
                      <small>{item.date[language]}</small>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </aside>
        </div>

        <section className="articles-newsletter about-container" aria-labelledby="articles-newsletter-title">
          <div className="articles-newsletter__image" aria-hidden="true">
            <Image src="/hero-section-image.png" alt="" fill sizes="30vw" />
          </div>
          <div className="articles-newsletter__copy">
            <p><Icon name="bell" />{text.stayTitle}</p>
            <h2 id="articles-newsletter-title">{text.stayHeading}</h2>
            <span>{text.stayText}</span>
          </div>
          <form className="articles-newsletter__form" onSubmit={submitNewsletter} noValidate>
            <label>
              <Icon name="mail" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={text.email}
                aria-label={text.email}
              />
            </label>
            <button type="submit">{text.subscribe} <span aria-hidden="true">{arrow}</span></button>
            {newsletterMessage && <p role="status">{newsletterMessage}</p>}
          </form>
        </section>
      </main>

      <SiteFooter language={language} />
    </div>
  );
}
