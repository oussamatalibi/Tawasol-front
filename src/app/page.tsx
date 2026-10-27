"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Language = "fr" | "ar";

type DemoEvent = {
  id: string;
  day: string;
  month: string;
  year: string;
  title: string;
  subtitle: string;
  venue: string;
  rounds: string;
  timeControl: string;
};

type DemoArticle = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
};

type ClubStatistic = {
  id: string;
  value: string;
  label: string;
};

const content = {
  fr: {
    association: "Association Tawassol des Échecs Tanger",
    associationArabic: "جمعية التواصل الطنجي للشطرنج",
    location: "Tanger · Maroc",
    navLabel: "Navigation principale",
    home: "Accueil",
    about: "Le club",
    events: "Tournois",
    articles: "Articles",
    articlesTitle: "Derniers articles",
    articlesAll: "Voir tous les articles",
    articlesDemoNotice:
      "Exemples de maquette : contenus et dates à confirmer avant publication.",
    articleDatePending: "À confirmer",
    articleRead: "Lire l’article",
    academy: "Formation",
    contact: "Contact",
    contactPlaceholder: "Les coordonnées de l’association seront publiées ici.",
    footerNavigation: "Navigation",
    footerUsefulLinks: "Liens utiles",
    footerFollow: "Suivez-nous",
    footerNewsletter: "Newsletter",
    newsletterDescription: "Recevez nos actualités et événements.",
    newsletterPlaceholder: "Votre email",
    newsletterUnavailable: "Inscription bientôt disponible",
    footerRules: "Règlement intérieur",
    footerMembership: "Adhésion",
    footerCalendar: "Calendrier",
    footerGallery: "Galerie photos",
    footerResources: "Ressources",
    footerFaq: "FAQ",
    footerPrivacy: "Politique de confidentialité",
    footerTerms: "Conditions d’utilisation",
    footerCopyright: "Tous droits réservés.",
    members: "Espace membre",
    membersUnavailable: "L'accès membres sera précisé ultérieurement.",
    searchLabel: "Recherche bientôt disponible",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    heroEyebrow: "STRATÉGIE · COMPÉTITION · DÉVELOPPEMENT",
    heroTitleFirst: "Association",
    heroTitleSecond: "Tawassol des Échecs",
    heroLocation: "Tanger",
    heroArabicName: "جمعية التواصل الطنجي للشطرنج",
    heroDescription:
      "Une communauté pour jouer, apprendre et progresser ensemble à Tanger.",
    discoverEvents: "Découvrir nos tournois",
    joinClub: "Rejoindre le club",
    locationBadge: "Tanger, Maroc",
    locationTagline: "Une ville, une passion",
    highlightsLabel: "Les points forts du club",
    highlightCommunityTitle: "Une communauté active",
    highlightCommunityDescription: "Joueurs de tous niveaux",
    highlightEventsTitle: "Tournois et compétitions",
    highlightEventsDescription: "Locaux et régionaux",
    highlightTrainingTitle: "Formation et analyse",
    highlightTrainingDescription: "Pour progresser ensemble",
    highlightPartnershipTitle: "Ouverture et partage",
    highlightPartnershipDescription: "Avec les écoles et partenaires",
    aboutEyebrow: "Bienvenue au club",
    aboutTitle: "Le club à Tanger",
    aboutDescription:
      "L’Association Tawassol fait vivre les échecs à Tanger et encourage leur découverte dans un esprit de partage.",
    aboutLink: "En savoir plus sur le club",
    aboutMapLabel: "Illustration de Tanger",
    aboutMapCity: "TANGER",
    communityTitle: "Une communauté",
    communityDescription: "Des joueurs de tous horizons réunis autour de l’échiquier.",
    learningTitle: "Apprendre et progresser",
    learningDescription: "La pratique et la transmission au cœur de notre passion.",
    competitionTitle: "Jouer ensemble",
    competitionDescription: "Des occasions de se rencontrer et de vivre le jeu.",
    eventsEyebrow: "Au programme",
    eventsTitle: "Événements à venir",
    eventsDemoNotice:
      "Exemples fictifs pour la maquette : dates, lieux et formats à confirmer avant publication.",
    eventRoundsLabel: "Rondes",
    eventContact: "Demander des informations",
    statisticsLabel: "Chiffres du club",
    statisticsNotice:
      "Chiffres illustratifs du mockup — à confirmer avant publication.",
    memberBannerImage: "Jeunes joueurs réunis autour d’un échiquier",
    memberBannerTitle: "Rejoignez notre communauté",
    memberBannerDescription:
      "Que vous soyez débutant, joueur confirmé ou simplement passionné, vous êtes le bienvenu au club.",
    memberBannerButton: "Devenir membre",
    footerTagline: "Les échecs à Tanger, dans un esprit de partage.",
    language: "العربية",
    switchLanguage: "Afficher le site en arabe",
  },
  ar: {
    association: "Association Tawassol des Échecs Tanger",
    associationArabic: "جمعية التواصل الطنجي للشطرنج",
    location: "طنجة · المغرب",
    navLabel: "التنقل الرئيسي",
    home: "الرئيسية",
    about: "النادي",
    events: "البطولات",
    articles: "المقالات",
    articlesTitle: "آخر المقالات",
    articlesAll: "عرض جميع المقالات",
    articlesDemoNotice:
      "أمثلة للتصميم: يجب تأكيد المحتوى والتواريخ قبل النشر.",
    articleDatePending: "قيد التأكيد",
    articleRead: "اقرأ المقال",
    academy: "التدريب",
    contact: "اتصل بنا",
    contactPlaceholder: "سيتم نشر معلومات التواصل مع الجمعية هنا.",
    footerNavigation: "التنقل",
    footerUsefulLinks: "روابط مفيدة",
    footerFollow: "تابعونا",
    footerNewsletter: "النشرة الإخبارية",
    newsletterDescription: "تابعوا أخبارنا وفعالياتنا.",
    newsletterPlaceholder: "بريدك الإلكتروني",
    newsletterUnavailable: "سيتم تفعيل الاشتراك قريبًا",
    footerRules: "النظام الداخلي",
    footerMembership: "الانخراط",
    footerCalendar: "الجدول",
    footerGallery: "معرض الصور",
    footerResources: "الموارد",
    footerFaq: "الأسئلة الشائعة",
    footerPrivacy: "سياسة الخصوصية",
    footerTerms: "شروط الاستخدام",
    footerCopyright: "جميع الحقوق محفوظة.",
    members: "فضاء الأعضاء",
    membersUnavailable: "سيتم توضيح طريقة الدخول لاحقًا.",
    searchLabel: "البحث غير متاح حاليًا",
    menuOpen: "فتح القائمة",
    menuClose: "إغلاق القائمة",
    heroEyebrow: "استراتيجية · منافسة · تنمية",
    heroTitleFirst: "جمعية التواصل الطنجي للشطرنج",
    heroTitleSecond: "",
    heroLocation: "",
    heroArabicName: "",
    heroDescription: "مجتمع للعب والتعلم والتطور معًا في طنجة.",
    discoverEvents: "اكتشف بطولاتنا",
    joinClub: "انضم إلى النادي",
    locationBadge: "طنجة، المغرب",
    locationTagline: "مدينة، شغف",
    highlightsLabel: "أبرز أنشطة النادي",
    highlightCommunityTitle: "مجتمع نشط",
    highlightCommunityDescription: "لاعبون من جميع المستويات",
    highlightEventsTitle: "البطولات والمسابقات",
    highlightEventsDescription: "محلية وجهوية",
    highlightTrainingTitle: "التدريب والتحليل",
    highlightTrainingDescription: "لنتطور معًا",
    highlightPartnershipTitle: "الانفتاح والتشارك",
    highlightPartnershipDescription: "مع المدارس والشركاء",
    aboutEyebrow: "مرحبًا بكم في النادي",
    aboutTitle: "النادي في طنجة",
    aboutDescription:
      "تعمل جمعية التواصل على تنشيط الشطرنج بطنجة وتشجيع اكتشافه بروح من المشاركة.",
    aboutLink: "اكتشف المزيد عن النادي",
    aboutMapLabel: "رسم توضيحي لمدينة طنجة",
    aboutMapCity: "طنجة",
    communityTitle: "مجتمع يجمعنا",
    communityDescription: "لاعبون من آفاق مختلفة يلتقون حول رقعة الشطرنج.",
    learningTitle: "نتعلم ونتطور",
    learningDescription: "الممارسة ونقل المعرفة في صميم شغفنا.",
    competitionTitle: "نلعب معًا",
    competitionDescription: "فرص للقاء والاستمتاع بلعبة الشطرنج.",
    eventsEyebrow: "في البرنامج",
    eventsTitle: "الفعاليات القادمة",
    eventsDemoNotice:
      "أمثلة افتراضية للتصميم: يجب تأكيد التواريخ والأماكن والصيغ قبل النشر.",
    eventRoundsLabel: "جولات",
    eventContact: "طلب المعلومات",
    statisticsLabel: "إحصائيات النادي",
    statisticsNotice:
      "أرقام توضيحية من التصميم — يجب تأكيدها قبل النشر.",
    memberBannerImage: "يافعون يلعبون الشطرنج حول الرقعة",
    memberBannerTitle: "انضموا إلى مجتمعنا",
    memberBannerDescription:
      "سواء كنتم مبتدئين أو لاعبين متمرسين أو من محبي الشطرنج، فمرحبًا بكم في النادي.",
    memberBannerButton: "انضم إلى النادي",
    footerTagline: "الشطرنج في طنجة بروح من المشاركة.",
    language: "Français",
    switchLanguage: "Afficher le site en français",
  },
} satisfies Record<Language, Record<string, string>>;

const demoArticles = {
  fr: [
    {
      id: "analysis",
      category: "Analyse",
      title: "Les idées clés d’une finale de pions",
      excerpt: "Quelques repères pour mieux évaluer et jouer les finales.",
    },
    {
      id: "tournament",
      category: "Compétition",
      title: "Bien préparer son prochain tournoi",
      excerpt: "Rythme de jeu, concentration et préparation avant la partie.",
    },
    {
      id: "learning",
      category: "Formation",
      title: "Progresser grâce à l’analyse de ses parties",
      excerpt: "Une méthode simple pour tirer des leçons de chaque partie.",
    },
  ],
  ar: [
    {
      id: "analysis",
      category: "تحليل",
      title: "أفكار أساسية في نهايات البيادق",
      excerpt: "إرشادات تساعد على فهم النهايات والتعامل معها.",
    },
    {
      id: "tournament",
      category: "منافسة",
      title: "كيف تستعد لبطولتك القادمة؟",
      excerpt: "تنظيم الوقت والتركيز والاستعداد قبل المباراة.",
    },
    {
      id: "learning",
      category: "تدريب",
      title: "تطور من خلال تحليل مبارياتك",
      excerpt: "خطوات بسيطة لاستخلاص الدروس من كل مباراة.",
    },
  ],
} satisfies Record<Language, DemoArticle[]>;

const demoStatistics = {
  fr: [
    { id: "members", value: "100+", label: "Membres actifs" },
    { id: "tournaments", value: "15+", label: "Tournois organisés" },
    { id: "games", value: "500+", label: "Parties analysées" },
    { id: "youth", value: "50+", label: "Jeunes formés" },
    { id: "partners", value: "10+", label: "Partenaires institutionnels" },
  ],
  ar: [
    { id: "members", value: "100+", label: "أعضاء نشطون" },
    { id: "tournaments", value: "15+", label: "بطولات منظمة" },
    { id: "games", value: "500+", label: "مباريات محللة" },
    { id: "youth", value: "50+", label: "يافعون تلقوا التدريب" },
    { id: "partners", value: "10+", label: "شركاء مؤسساتيون" },
  ],
} satisfies Record<Language, ClubStatistic[]>;

const demoEvents = {
  fr: [
    {
      id: "open",
      day: "15",
      month: "FÉV",
      year: "2027",
      title: "Tournoi Open de Tanger",
      subtitle: "Open — exemple",
      venue: "Maison des Associations, Tanger",
      rounds: "9",
      timeControl: "90+30",
    },
    {
      id: "club",
      day: "12",
      month: "MAR",
      year: "2027",
      title: "Championnat du club",
      subtitle: "Exemple réservé aux membres",
      venue: "Siège du club, Tanger",
      rounds: "7",
      timeControl: "60+30",
    },
    {
      id: "youth",
      day: "20",
      month: "AVR",
      year: "2027",
      title: "Tournoi Jeunes de Tanger",
      subtitle: "Catégories U-8 · U-10 · U-12 · U-14 · U-16",
      venue: "Centre culturel, Tanger",
      rounds: "7",
      timeControl: "30+30",
    },
  ],
  ar: [
    {
      id: "open",
      day: "15",
      month: "فبراير",
      year: "2027",
      title: "بطولة طنجة المفتوحة",
      subtitle: "بطولة مفتوحة — مثال",
      venue: "دار الجمعيات، طنجة",
      rounds: "9",
      timeControl: "90+30",
    },
    {
      id: "club",
      day: "12",
      month: "مارس",
      year: "2027",
      title: "بطولة النادي",
      subtitle: "مثال خاص بالأعضاء",
      venue: "مقر النادي، طنجة",
      rounds: "7",
      timeControl: "60+30",
    },
    {
      id: "youth",
      day: "20",
      month: "أبريل",
      year: "2027",
      title: "بطولة شباب طنجة",
      subtitle: "الفئات U-8 · U-10 · U-12 · U-14 · U-16",
      venue: "المركز الثقافي، طنجة",
      rounds: "7",
      timeControl: "30+30",
    },
  ],
} satisfies Record<Language, DemoEvent[]>;

export default function Home() {
  const [language, setLanguage] = useState<Language>("fr");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const text = content[language];
  const events = demoEvents[language];
  const articles = demoArticles[language];
  const statistics = demoStatistics[language];
  const isArabic = language === "ar";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, language]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    function handleMenuKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleMenuKeyDown);
    return () => window.removeEventListener("keydown", handleMenuKeyDown);
  }, [mobileMenuOpen]);

  return (
    <div className={`site-shell${isArabic ? " site-shell--rtl" : ""}`}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={text.associationArabic}>
          <Image
            src="/club-logo.jpg"
            alt=""
            width={64}
            height={64}
            className="brand__logo"
            priority
          />
          <span className="brand__copy">
            <strong className="brand__arabic" lang="ar" dir="rtl">
              {text.associationArabic}
            </strong>
            <span lang="fr" dir="ltr">{text.association}</span>
          </span>
        </a>

        <nav
          className={`main-nav${mobileMenuOpen ? " main-nav--open" : ""}`}
          id="primary-navigation"
          aria-label={text.navLabel}
        >
          <a href="#top" aria-current="page" onClick={() => setMobileMenuOpen(false)}>{text.home}</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>{text.about}</a>
          <a href="#events" onClick={() => setMobileMenuOpen(false)}>{text.events}</a>
          <a href="#articles" onClick={() => setMobileMenuOpen(false)}>{text.articles}</a>
          <a href="#membership" onClick={() => setMobileMenuOpen(false)}>{text.academy}</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>{text.contact}</a>
        </nav>

        <div className="header-actions">
          <div className="language-toggle" role="group" aria-label="Language">
            <button type="button" onClick={() => setLanguage("fr")} aria-pressed={!isArabic}>
              Fr
            </button>
            <span aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => setLanguage("ar")}
              aria-label={isArabic ? text.switchLanguage : "عرض الموقع بالعربية"}
              aria-pressed={isArabic}
            >
              عربي
            </button>
          </div>
          <button className="search-button" type="button" disabled aria-label={text.searchLabel}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.3" />
              <path d="m15.4 15.4 4.1 4.1" />
            </svg>
          </button>
          <button
            className="menu-toggle"
            ref={menuToggleRef}
            type="button"
            aria-label={mobileMenuOpen ? text.menuClose : text.menuOpen}
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          >
            {mobileMenuOpen ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <button
            className="member-link"
            type="button"
            disabled
            title={text.membersUnavailable}
            aria-label={`${text.members}. ${text.membersUnavailable}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5.5 19c.5-3.1 2.8-4.8 6.5-4.8s6 1.7 6.5 4.8" />
            </svg>
            {text.members}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <Image
            src="/hero-section-image.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero__image"
          />
          <div className="hero__content">
            <p className="eyebrow">{text.heroEyebrow}</p>
            <h1 id="hero-title">
              <span className="hero__title-line">{text.heroTitleFirst}</span>
              {text.heroTitleSecond && " "}
              {text.heroTitleSecond && <span className="hero__title-line">{text.heroTitleSecond}</span>}
              {text.heroTitleSecond && text.heroLocation && " "}
              {text.heroLocation && <span className="hero__title-highlight">{text.heroLocation}</span>}
            </h1>
            {text.heroArabicName && (
              <p className="hero__arabic-name" lang="ar" dir="rtl">
                {text.heroArabicName}
              </p>
            )}
            <p className="hero__description">{text.heroDescription}</p>
            <div className="hero__actions">
              <a className="button button--primary" href="#events">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="4" y="6" width="16" height="14" rx="2" />
                  <path d="M8 3.8v4.1m8-4.1v4.1M4 10h16" />
                </svg>
                {text.discoverEvents}
                <svg className="button__arrow" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </a>
              <a className="button button--light" href="#membership">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="9" cy="8" r="3" />
                  <path d="M3.5 19c.4-3 2.3-4.6 5.5-4.6s5.1 1.6 5.5 4.6m1-8.5a3 3 0 0 0 0-5.8m1 9.8c2.4.5 3.7 2 4 4.5" />
                </svg>
                {text.joinClub}
              </a>
            </div>
          </div>
          <aside className="location-badge" aria-label={text.locationBadge}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 10.2c0 5-7 11-7 11s-7-6-7-11a7 7 0 1 1 14 0Z" />
              <circle cx="12" cy="10" r="2.3" />
            </svg>
            <span><strong>{text.locationBadge}</strong><small>{text.locationTagline}</small></span>
          </aside>
        </section>

        <section className="highlights-strip" aria-label={text.highlightsLabel}>
          <article className="highlight-item">
            <span className="highlight-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="9" cy="8" r="3" />
                <path d="M3.5 19c.4-3 2.3-4.6 5.5-4.6s5.1 1.6 5.5 4.6m1-8.5a3 3 0 0 0 0-5.8m1 9.8c2.4.5 3.7 2 4 4.5" />
              </svg>
            </span>
            <span className="highlight-item__copy">
              <strong>{text.highlightCommunityTitle}</strong>
              <span>{text.highlightCommunityDescription}</span>
            </span>
          </article>
          <article className="highlight-item">
            <span className="highlight-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M8 4h8v5a4 4 0 0 1-8 0V4Zm0 2H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4M9 21h6m-3-4v4m-3-7h6" />
              </svg>
            </span>
            <span className="highlight-item__copy">
              <strong>{text.highlightEventsTitle}</strong>
              <span>{text.highlightEventsDescription}</span>
            </span>
          </article>
          <article className="highlight-item">
            <span className="highlight-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="m2 8 10-5 10 5-10 5L2 8Zm4 2v5c3.5 3 8.5 3 12 0v-5m4-2v7" />
              </svg>
            </span>
            <span className="highlight-item__copy">
              <strong>{text.highlightTrainingTitle}</strong>
              <span>{text.highlightTrainingDescription}</span>
            </span>
          </article>
          <article className="highlight-item">
            <span className="highlight-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="m2 8 3-3h4l3 2 3-1h4l3 3-5 5m-8-4 3 3a2 2 0 0 0 2.8 0l1.2-1.2M2 8l5 5m15-4-4 4m-9-3 3 3a2 2 0 0 1-2.8 2.8L7 13m8-2 2 2a2 2 0 0 1-2.8 2.8l-1.2-1.2m-2 0 1 1a2 2 0 0 1-2.8 2.8l-2-2" />
              </svg>
            </span>
            <span className="highlight-item__copy">
              <strong>{text.highlightPartnershipTitle}</strong>
              <span>{text.highlightPartnershipDescription}</span>
            </span>
          </article>
        </section>

        <section className="home-events" id="events">
          <div className="home-events__list">
            <p className="eyebrow">{text.eventsEyebrow}</p>
            <h2>{text.eventsTitle}</h2>
            <p className="events-demo-notice">{text.eventsDemoNotice}</p>
            <div className="event-grid">
              {events.map((event) => (
                <article className="event-card" key={event.id}>
                  <div className={`event-card__art event-card__art--${event.id}`}>
                    <span className="event-card__date">
                      <strong>{event.day}</strong>
                      <span>{event.month}</span>
                      <span>{event.year}</span>
                    </span>
                    <svg viewBox="0 0 48 48" aria-hidden="true">
                      {event.id === "open" && (
                        <>
                          <path d="M8 8h32v32H8zM8 19h32M8 30h32M19 8v32M30 8v32" />
                          <circle cx="19" cy="19" r="3" />
                          <circle cx="30" cy="30" r="3" />
                        </>
                      )}
                      {event.id === "club" && (
                        <path d="M17 8h14v9a7 7 0 0 1-14 0V8Zm0 4H9v3a8 8 0 0 0 8 8m14-11h8v3a8 8 0 0 1-8 8M20 31h8m-4-7v7m-6 7h12" />
                      )}
                      {event.id === "youth" && (
                        <path d="M18 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm12 2a5 5 0 1 0 0-10m-25 28v-4a13 13 0 0 1 26 0v4H5Zm29-15a10 10 0 0 1 9 10v5h-7" />
                      )}
                    </svg>
                  </div>
                  <div className="event-card__body">
                    <span className="event-card__example">{language === "fr" ? "Exemple" : "مثال"}</span>
                    <h3>{event.title}</h3>
                    <p className="event-card__subtitle">{event.subtitle}</p>
                    <p className="event-card__venue">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
                        <circle cx="12" cy="10" r="2" />
                      </svg>
                      {event.venue}
                    </p>
                    <div className="event-card__meta">
                      <span>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <circle cx="9" cy="8" r="3" />
                          <path d="M3.5 19c.4-3 2.3-4.6 5.5-4.6s5.1 1.6 5.5 4.6m1-8.5a3 3 0 0 0 0-5.8m1 9.8c2.4.5 3.7 2 4 4.5" />
                        </svg>
                        {event.rounds} {text.eventRoundsLabel}
                      </span>
                      <span>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <circle cx="12" cy="12" r="8.5" />
                          <path d="M12 7v5l3 2M9 2h6" />
                        </svg>
                        {event.timeControl}
                      </span>
                    </div>
                    <a className="event-card__link" href="#contact">
                      {text.eventContact}
                      <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <aside className="home-events__about" id="about">
            <div className="club-map" role="img" aria-label={text.aboutMapLabel}>
              <svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <path
                  className="club-map__land"
                  d="M0 0h600v49l-33 11-27-5-26 20-30-8-20 18-31-8-20 21-31-7-21 22-27-5-20 24-29-7-20 24-28-3-24 23-26-8-24 20-27-8-20 18-27-4-21 17-28-8-27 12H0Z"
                />
                <path
                  className="club-map__coast"
                  d="M0 139c62 4 87-9 135-3s78-11 124-3 72-9 119-2 77-11 119-7 69-6 103-7"
                />
                <path className="club-map__road" d="M102 39c46 29 47 60 94 79s56 37 78 80m111-144c-18 37-6 56 24 72s37 36 42 74" />
                <path className="club-map__lighthouse" d="m504 151 7-42h12l7 42h-26Zm4-42h18l-9-13-9 13Zm-8 42h34v6h-34Zm4-34h18m-15-9 3 43m9-43-3 43" />
                <path className="club-map__water" d="M0 174c53-8 78 7 125 1s77 8 122 1 74 7 119 0 77 5 119-2 76 4 115-2m-600 35c53-8 78 7 125 1s77 8 122 1 74 7 119 0 77 5 119-2 76 4 115-2" />
              </svg>
              <span className="club-map__city">{text.aboutMapCity}</span>
              <span className="club-map__pin" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
                  <circle cx="12" cy="10" r="2" />
                </svg>
              </span>
            </div>
            <p className="eyebrow">{text.aboutEyebrow}</p>
            <h3>{text.aboutTitle}</h3>
            <p>{text.aboutDescription}</p>
            <a href="#contact">
              {text.aboutLink}
              <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
            </a>
          </aside>
        </section>

        <section className="section articles-section" id="articles">
          <div className="articles-section__header">
            <div>
              <p className="eyebrow">{text.articles}</p>
              <h2>{text.articlesTitle}</h2>
            </div>
            <a className="articles-section__all" href="#articles">
              {text.articlesAll}
              <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
            </a>
          </div>
          <p className="articles-section__notice">{text.articlesDemoNotice}</p>
          <div className="article-grid">
            {articles.map((article) => (
              <article className="article-card" key={article.id}>
                <div
                  className={`article-card__art article-card__art--${article.id}`}
                  role="img"
                  aria-label={article.category}
                >
                  <Image
                    className={`article-card__image article-card__image--${article.id}`}
                    src="/photo.png"
                    alt=""
                    fill
                    sizes="(max-width: 760px) 90px, 12vw"
                  />
                </div>
                <div className="article-card__body">
                  <div className="article-card__meta">
                    <span>{article.category}</span>
                    <span>{text.articleDatePending}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <a className="article-card__link" href="#articles">
                    {text.articleRead}
                    <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="statistics-section" aria-label={text.statisticsLabel}>
          <div className="statistics-grid">
            {statistics.map((statistic) => (
              <article className="statistic-item" key={statistic.id}>
                <span className="statistic-item__icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32">
                    {statistic.id === "members" && (
                      <>
                        <circle cx="12" cy="11" r="4" />
                        <circle cx="22" cy="12" r="3" />
                        <path d="M4 26v-2a8 8 0 0 1 16 0v2H4Zm17-9a6 6 0 0 1 7 6v3h-5" />
                      </>
                    )}
                    {statistic.id === "tournaments" && (
                      <path d="M10 5h12v8a6 6 0 0 1-12 0V5ZM10 8H5v3a7 7 0 0 0 7 7m10-10h5v3a7 7 0 0 1-7 7m-4 3v4m-5 0h10m-13 4h16" />
                    )}
                    {statistic.id === "games" && (
                      <path d="M5 26V17h6v9H5Zm8 0V11h6v15h-6Zm8 0V5h6v21h-6Z" />
                    )}
                    {statistic.id === "youth" && (
                      <path d="m3 11 13-7 13 7-13 7L3 11Zm5 4v7c4 4 12 4 16 0v-7m5-4v9" />
                    )}
                    {statistic.id === "partners" && (
                      <path d="m5 17 6-6 5 2 4-2 7 6-9 9-5-3-4 2-4-4 5-5m6 5 5-5m-8 2 4-4m-7 1-3-3-5 5 4 4m15-9 3-3 5 5-3 3" />
                    )}
                  </svg>
                </span>
                <div className="statistic-item__copy">
                  <strong>{statistic.value}</strong>
                  <span>{statistic.label}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="statistics-note">{text.statisticsNotice}</p>
        </section>

        <section className="membership-banner" id="membership">
          <div className="membership-banner__image">
            <Image
              src="/membership-players.png"
              alt={text.memberBannerImage}
              fill
              sizes="(max-width: 760px) 100vw, 36vw"
            />
          </div>
          <div className="membership-banner__content">
            <div className="membership-banner__copy">
              <h2>{text.memberBannerTitle}</h2>
              <p>{text.memberBannerDescription}</p>
            </div>
            <a className="membership-banner__button" href="#contact">
              {text.memberBannerButton}
              <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <a className="brand brand--footer" href="#top">
              <Image
                src="/club-logo.jpg"
                alt=""
                width={64}
                height={64}
                className="brand__logo"
              />
              <span className="brand__copy">
                <strong className="brand__arabic" lang="ar" dir="rtl">
                  {text.associationArabic}
                </strong>
                <span lang="fr" dir="ltr">{text.association}</span>
              </span>
            </a>
            <p>{text.footerTagline}</p>
          </div>

          <nav className="site-footer__column" aria-label={text.footerNavigation}>
            <h2>{text.footerNavigation}</h2>
            <a href="#top">{text.home}</a>
            <a href="#about">{text.about}</a>
            <a href="#events">{text.events}</a>
            <a href="#articles">{text.articles}</a>
            <a href="#membership">{text.academy}</a>
            <a href="#contact">{text.contact}</a>
          </nav>

          <div className="site-footer__column">
            <h2>{text.footerUsefulLinks}</h2>
            <span>{text.footerRules}</span>
            <a href="#membership">{text.footerMembership}</a>
            <a href="#events">{text.footerCalendar}</a>
            <span>{text.footerGallery}</span>
            <span>{text.footerResources}</span>
            <span>{text.footerFaq}</span>
          </div>

          <div className="site-footer__social-newsletter">
            <div className="site-footer__social">
              <h2>{text.footerFollow}</h2>
              <div className="social-icons" role="group" aria-label={text.footerFollow}>
                <span className="social-icons__item" role="img" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 21v-8h3l.5-3H14V8c0-.9.3-1.5 1.6-1.5h2V3.8c-.4-.1-1.4-.2-2.7-.2-2.7 0-4.5 1.6-4.5 4.7V10H7.5v3h2.9v8H14Z" />
                  </svg>
                </span>
                <span className="social-icons__item" role="img" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="4" />
                    <circle cx="12" cy="12" r="3.5" />
                    <circle className="social-icons__dot" cx="17.5" cy="6.8" r="1" />
                  </svg>
                </span>
                <span className="social-icons__item" role="img" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 8.2a2.5 2.5 0 0 0-1.8-1.8C17.6 6 12 6 12 6s-5.6 0-7.2.4A2.5 2.5 0 0 0 3 8.2 26 26 0 0 0 2.6 12a26 26 0 0 0 .4 3.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.2.4 7.2.4s5.6 0 7.2-.4a2.5 2.5 0 0 0 1.8-1.8 26 26 0 0 0 .4-3.8 26 26 0 0 0-.4-3.8Z" />
                    <path className="social-icons__play" d="m10 9 5 3-5 3V9Z" />
                  </svg>
                </span>
                <span className="social-icons__item" role="img" aria-label="Échecs">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 21h10M9 18h6l-1-5a4 4 0 1 0-4 0l-1 5Zm-2-8h10M5 21h14" />
                    <circle cx="12" cy="5" r="1" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="site-footer__newsletter">
              <h2>{text.footerNewsletter}</h2>
              <p>{text.newsletterDescription}</p>
              <div className="newsletter-form">
                <input
                  type="email"
                  placeholder={text.newsletterPlaceholder}
                  aria-label={text.newsletterPlaceholder}
                  disabled
                />
                <button type="button" aria-label={text.newsletterUnavailable} disabled>
                  <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
                </button>
              </div>
              <span className="newsletter-status">{text.newsletterUnavailable}</span>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© 2026 {text.association}. {text.footerCopyright}</span>
          <div>
            <span>{text.footerPrivacy}</span>
            <span aria-hidden="true">|</span>
            <span>{text.footerTerms}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
