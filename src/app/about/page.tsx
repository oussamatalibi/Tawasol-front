"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Language, SiteFooter, SiteHeader } from "../site-chrome";

const pageText = {
  fr: {
    home: "Accueil",
    about: "Le club",
    heroTitle: "Le club",
    heroDescription:
      "Une communauté pour les échecs à Tanger. Jouer, apprendre, progresser et partager notre passion.",
    join: "Rejoindre le club",
    activities: "Découvrir nos activités",
    notice:
      "Contenu de la maquette à valider avant publication : les dates, chiffres, équipes, réalisations, citations et visuels ci-dessous ne sont pas encore confirmés par l’association.",
    whoTitle: "Qui sommes-nous ?",
    whoDescription:
      "L’Association Tawassol des Échecs Tanger est présentée ici comme une association sportive et éducative réunissant des passionnés d’échecs de tous âges et de tous niveaux. Cette présentation reste à valider par l’association avant publication.",
    quote:
      "Les échecs sont plus qu’un jeu, c’est un outil pour construire un esprit plus fort et une communauté plus unie.",
    valuesTitle: "Nos valeurs",
    statsTitle: "Chiffres du club",
    statsNotice: "Chiffres illustratifs du mockup — à confirmer avant publication.",
    historyTitle: "Notre histoire",
    storyQuote: "Vers une communauté plus forte à travers les échecs",
    teamTitle: "Notre équipe et nos pôles",
    teamLink: "Voir tous les membres",
    teamUnavailable: "Les profils des membres seront ajoutés après confirmation des informations.",
    achievementsTitle: "Nos réalisations",
    achievementsLink: "Voir toutes les réalisations",
    achievementsUnavailable: "Les réalisations confirmées seront publiées ici ultérieurement.",
    provisionalImage: "Visuel provisoire de la maquette",
    learnMore: "En savoir plus",
  },
  ar: {
    home: "الرئيسية",
    about: "النادي",
    heroTitle: "النادي",
    heroDescription:
      "مجتمع للشطرنج في طنجة. نلعب ونتعلم ونتطور ونتشارك شغفنا.",
    join: "انضم إلى النادي",
    activities: "اكتشف أنشطتنا",
    notice:
      "محتوى التصميم بحاجة إلى التأكيد قبل النشر: لم تؤكد الجمعية بعد التواريخ والأرقام والفرق والإنجازات والاقتباسات والصور أدناه.",
    whoTitle: "من نحن؟",
    whoDescription:
      "يقدم هذا القسم جمعية التواصل للشطرنج بطنجة كجمعية رياضية وتربوية تجمع محبي الشطرنج من مختلف الأعمار والمستويات. يجب على الجمعية مراجعة هذه المعلومات قبل نشرها.",
    quote:
      "الشطرنج أكثر من مجرد لعبة، فهو أداة لبناء فكر أقوى ومجتمع أكثر ترابطًا.",
    valuesTitle: "قيمنا",
    statsTitle: "أرقام النادي",
    statsNotice: "أرقام توضيحية من التصميم — يجب تأكيدها قبل النشر.",
    historyTitle: "تاريخنا",
    storyQuote: "نحو مجتمع أقوى من خلال الشطرنج",
    teamTitle: "فريقنا وأقسامنا",
    teamLink: "عرض جميع الأعضاء",
    teamUnavailable: "ستتم إضافة ملفات الأعضاء بعد تأكيد المعلومات.",
    achievementsTitle: "إنجازاتنا",
    achievementsLink: "عرض جميع الإنجازات",
    achievementsUnavailable: "سيتم نشر الإنجازات المؤكدة هنا لاحقًا.",
    provisionalImage: "صورة مؤقتة من التصميم",
    learnMore: "اكتشف المزيد",
  },
} satisfies Record<Language, Record<string, string>>;

const values = {
  fr: [
    { title: "Communauté", description: "Un espace ouvert à tous les passionnés, du débutant au joueur confirmé.", icon: "users" },
    { title: "Formation", description: "Transmettre les connaissances et développer les talents de demain.", icon: "cap" },
    { title: "Compétition", description: "Organiser des tournois de qualité et promouvoir l’excellence sportive.", icon: "trophy" },
    { title: "Partage", description: "Échanger, collaborer et renforcer les liens entre les membres.", icon: "handshake" },
  ],
  ar: [
    { title: "مجتمع", description: "فضاء مفتوح لجميع محبي الشطرنج من المبتدئين إلى اللاعبين المتمرسين.", icon: "users" },
    { title: "التدريب", description: "نقل المعرفة وتنمية مواهب الجيل القادم.", icon: "cap" },
    { title: "المنافسة", description: "تنظيم بطولات جيدة وتعزيز التميز الرياضي.", icon: "trophy" },
    { title: "التشارك", description: "التواصل والتعاون وتعزيز الروابط بين الأعضاء.", icon: "handshake" },
  ],
} satisfies Record<Language, { title: string; description: string; icon: string }[]>;

const statistics = {
  fr: [
    { value: "100+", label: "Membres actifs", icon: "users" },
    { value: "15+", label: "Tournois organisés", icon: "trophy" },
    { value: "500+", label: "Parties analysées", icon: "chart" },
    { value: "50+", label: "Jeunes formés", icon: "cap" },
    { value: "10+", label: "Partenaires institutionnels", icon: "handshake" },
  ],
  ar: [
    { value: "100+", label: "أعضاء نشطون", icon: "users" },
    { value: "15+", label: "بطولات منظمة", icon: "trophy" },
    { value: "500+", label: "مباريات محللة", icon: "chart" },
    { value: "50+", label: "يافعون تلقوا التدريب", icon: "cap" },
    { value: "10+", label: "شركاء مؤسساتيون", icon: "handshake" },
  ],
} satisfies Record<Language, { value: string; label: string; icon: string }[]>;

const milestones = {
  fr: [
    { year: "2020", title: "Création du club", description: "Lancement de l’association avec un groupe de passionnés." },
    { year: "2021", title: "Premières activités", description: "Organisation de tournois et d’ateliers de formation." },
    { year: "2022", title: "Développement", description: "Élargissement de la communauté et nouveaux partenariats locaux." },
    { year: "2023", title: "Reconnaissance", description: "Participation aux compétitions régionales et initiatives éducatives." },
    { year: "2024", title: "Vers l’avenir", description: "Renforcement des activités et lancement de nouveaux projets." },
  ],
  ar: [
    { year: "2020", title: "تأسيس النادي", description: "انطلاق الجمعية بمشاركة مجموعة من محبي الشطرنج." },
    { year: "2021", title: "الأنشطة الأولى", description: "تنظيم البطولات وورشات التدريب." },
    { year: "2022", title: "التطور", description: "توسيع المجتمع وإطلاق شراكات محلية جديدة." },
    { year: "2023", title: "الاعتراف", description: "المشاركة في المنافسات الجهوية والمبادرات التربوية." },
    { year: "2024", title: "نحو المستقبل", description: "تعزيز الأنشطة وإطلاق مشاريع جديدة." },
  ],
} satisfies Record<Language, { year: string; title: string; description: string }[]>;

const teams = {
  fr: [
    { title: "Direction", description: "Vision, stratégie et coordination générale", icon: "crown" },
    { title: "Technique et analyse", description: "Analyses de parties, entraînements et tournois", icon: "chart" },
    { title: "Événements et logistique", description: "Organisation des tournois et gestion sur site", icon: "calendar" },
    { title: "Communication et médias", description: "Image du club, réseaux sociaux et contenus", icon: "megaphone" },
    { title: "Formation", description: "Cours, ateliers et développement des jeunes", icon: "cap" },
    { title: "Partenariats", description: "Relations institutionnelles et sponsors", icon: "handshake" },
  ],
  ar: [
    { title: "الإدارة", description: "الرؤية والاستراتيجية والتنسيق العام", icon: "crown" },
    { title: "التقنية والتحليل", description: "تحليل المباريات والتدريب والبطولات", icon: "chart" },
    { title: "الفعاليات واللوجستيك", description: "تنظيم البطولات والتنسيق الميداني", icon: "calendar" },
    { title: "التواصل والإعلام", description: "صورة النادي والشبكات والمحتوى", icon: "megaphone" },
    { title: "التدريب", description: "الدروس والورشات وتنمية قدرات الشباب", icon: "cap" },
    { title: "الشراكات", description: "العلاقات المؤسساتية والرعاة", icon: "handshake" },
  ],
} satisfies Record<Language, { title: string; description: string; icon: string }[]>;

const achievements = {
  fr: [
    { title: "Tournois organisés", description: "Open de Tanger, tournois jeunes et compétitions locales.", image: "/photo.png" },
    { title: "Formation des jeunes", description: "Ateliers dans les écoles et stages de formation.", image: "/membership-players.png" },
    { title: "Participation régionale", description: "Représentation du club dans les compétitions régionales.", image: "/membership-players.png" },
    { title: "Analyses et publications", description: "Jeux analysés et articles éducatifs.", image: "/photo.png" },
    { title: "Partenariats", description: "Collaboration avec des écoles, associations et institutions.", image: "/hero-section-image.png" },
  ],
  ar: [
    { title: "تنظيم البطولات", description: "بطولة طنجة المفتوحة وبطولات الشباب والمنافسات المحلية.", image: "/photo.png" },
    { title: "تدريب الشباب", description: "ورشات في المدارس ودورات تدريبية.", image: "/membership-players.png" },
    { title: "المشاركة الجهوية", description: "تمثيل النادي في المنافسات الجهوية.", image: "/membership-players.png" },
    { title: "التحليل والمنشورات", description: "تحليل المباريات وإعداد مقالات تعليمية.", image: "/photo.png" },
    { title: "الشراكات", description: "التعاون مع المدارس والجمعيات والمؤسسات.", image: "/hero-section-image.png" },
  ],
} satisfies Record<Language, { title: string; description: string; image: string }[]>;

function Icon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    users: <><path d="M16 20v-1.6a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20" /><circle cx="9" cy="7" r="4" /><path d="M22 20v-1.6a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    cap: <><path d="m2 10 10-5 10 5-10 5-10-5Z" /><path d="M6 12v5c3 2 9 2 12 0v-5M22 10v6" /></>,
    trophy: <><path d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 7H3v2a4 4 0 0 0 4 4m10-6h4v2a4 4 0 0 1-4 4" /></>,
    handshake: <><path d="m3 12 4-4 4 1 2-1 4 1 4 4-3 3-4-2-3 2-5-3" /><path d="m7 8 3-3 5 1 3 3M5 14l3 3m0-2 3 3m1-2 2 2" /></>,
    chart: <><path d="M4 20V10m6 10V4m6 16v-7m6 7H2" /></>,
    crown: <><path d="m3 8 5 4 4-7 4 7 5-4-2 11H5L3 8Z" /><path d="M5 22h14" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h2m4 0h2m-8 4h2m4 0h2" /></>,
    megaphone: <><path d="m3 11 18-6v14L3 13v-2Z" /><path d="m7 14 2 7h4l-2-6m7-8v13" /></>,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name] ?? paths.users}
    </svg>
  );
}

export default function AboutPage() {
  const [language, setLanguage] = useState<Language>("fr");
  const text = pageText[language];
  const isArabic = language === "ar";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, language]);

  return (
    <div className={`site-shell${isArabic ? " site-shell--rtl" : ""}`}>
      <SiteHeader language={language} currentPage="about" onLanguageChange={setLanguage} />

      <main className="about-page">
        <section className="about-hero" aria-labelledby="about-hero-title">
          <Image
            src="/hero-section-image.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="about-hero__image"
          />
          <div className="about-hero__content">
            <nav className="about-breadcrumbs" aria-label={isArabic ? "مسار التنقل" : "Fil d’Ariane"}>
              <Link href="/">{text.home}</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{text.about}</span>
            </nav>
            <h1 id="about-hero-title">{text.heroTitle}</h1>
            <p className="about-hero__association" lang="ar" dir="rtl">
              جمعية التواصل الطنجي للشطرنج
            </p>
            <p className="about-hero__description">{text.heroDescription}</p>
            <div className="about-hero__actions">
              <Link className="button button--primary" href="/#membership">
                {text.join}<span aria-hidden="true">{isArabic ? "←" : "→"}</span>
              </Link>
              <Link className="button button--light" href="/#events">
                <Icon name="users" />{text.activities}
              </Link>
            </div>
          </div>
        </section>

        <p className="about-content-notice" role="note">{text.notice}</p>

        <section className="about-intro about-container" aria-labelledby="about-who-title">
          <div className="about-intro__copy">
            <h2 className="about-section-title" id="about-who-title">{text.whoTitle}</h2>
            <p>{text.whoDescription}</p>
            <blockquote className="about-quote about-quote--light">
              <span aria-hidden="true">“</span>
              <p>{text.quote}</p>
            </blockquote>
          </div>
          <div className="about-intro__image">
            <Image
              src="/membership-players.png"
              alt={text.provisionalImage}
              fill
              sizes="(max-width: 760px) 100vw, 52vw"
            />
          </div>
        </section>

        <section className="about-values about-container" aria-labelledby="about-values-title">
          <h2 className="about-section-title" id="about-values-title">{text.valuesTitle}</h2>
          <div className="about-values__grid">
            {values[language].map((value) => (
              <article className="about-value-card" key={value.title}>
                <span className="about-icon"><Icon name={value.icon} /></span>
                <div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-statistics" aria-labelledby="about-statistics-title">
          <h2 className="visually-hidden" id="about-statistics-title">{text.statsTitle}</h2>
          <div className="about-statistics__grid">
            {statistics[language].map((statistic) => (
              <article className="about-statistic" key={statistic.label}>
                <span className="about-icon"><Icon name={statistic.icon} /></span>
                <div>
                  <strong>{statistic.value}</strong>
                  <span>{statistic.label}</span>
                </div>
              </article>
            ))}
          </div>
          <p>{text.statsNotice}</p>
        </section>

        <section className="about-history about-container" aria-labelledby="about-history-title">
          <div className="about-history__timeline">
            <h2 className="about-section-title" id="about-history-title">{text.historyTitle}</h2>
            <ol>
              {milestones[language].map((milestone) => (
                <li key={milestone.year}>
                  <span className="about-history__year">{milestone.year}</span>
                  <div>
                    <h3>{milestone.title}</h3>
                    <p>{milestone.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <figure className="about-history__image">
            <Image
              src="/hero-section-image.png"
              alt={text.provisionalImage}
              fill
              sizes="(max-width: 760px) 100vw, 42vw"
              className="about-history__photo"
            />
            <figcaption className="about-quote about-quote--dark">
              <span aria-hidden="true">“</span>
              <p lang={isArabic ? "ar" : "fr"}>{text.storyQuote}</p>
            </figcaption>
          </figure>
        </section>

        <section className="about-team about-container" aria-labelledby="about-team-title" id="team">
          <div className="about-section-heading">
            <h2 className="about-section-title" id="about-team-title">{text.teamTitle}</h2>
            <span className="about-section-link about-section-link--unavailable" aria-disabled="true" title={text.teamUnavailable}>
              {text.teamLink}<span aria-hidden="true">{isArabic ? "←" : "→"}</span>
            </span>
          </div>
          <div className="about-team__grid">
            {teams[language].map((team) => (
              <article className="about-team-card" key={team.title}>
                <span className="about-icon"><Icon name={team.icon} /></span>
                <h3>{team.title}</h3>
                <p>{team.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-achievements about-container" aria-labelledby="about-achievements-title" id="achievements">
          <div className="about-section-heading">
            <h2 className="about-section-title" id="about-achievements-title">{text.achievementsTitle}</h2>
            <span className="about-section-link about-section-link--unavailable" aria-disabled="true" title={text.achievementsUnavailable}>
              {text.achievementsLink}<span aria-hidden="true">{isArabic ? "←" : "→"}</span>
            </span>
          </div>
          <div className="about-achievements__grid">
            {achievements[language].map((achievement) => (
              <article className="about-achievement-card" key={achievement.title}>
                <div className="about-achievement-card__image">
                  <Image
                    src={achievement.image}
                    alt={text.provisionalImage}
                    fill
                    sizes="(max-width: 760px) 80vw, 20vw"
                  />
                </div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter language={language} />
    </div>
  );
}
