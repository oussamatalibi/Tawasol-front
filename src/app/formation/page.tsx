"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "../icons";
import { Language, SiteFooter, SiteHeader } from "../site-chrome";

type L = { fr: string; ar: string };

const features: { icon: string; title: L; text: L }[] = [
  { icon: "pawn", title: { fr: "Cours réguliers", ar: "دروس منتظمة" }, text: { fr: "En présentiel et en ligne", ar: "حضورياً وعن بُعد" } },
  { icon: "cap", title: { fr: "Tous niveaux", ar: "كل المستويات" }, text: { fr: "Débutant à avancé", ar: "من المبتدئ إلى المتقدم" } },
  { icon: "users", title: { fr: "Entraîneurs qualifiés", ar: "مدربون مؤهلون" }, text: { fr: "Membres du club", ar: "أعضاء النادي" } },
  { icon: "chart", title: { fr: "Méthode structurée", ar: "منهجية منظمة" }, text: { fr: "Progression claire et suivie", ar: "تدرّج واضح ومتابَع" } },
];

const paths: { title: L; text: L; items: L[]; footer: L[] }[] = [
  {
    title: { fr: "Débutant", ar: "مبتدئ" },
    text: { fr: "Apprendre les bases, les règles et les premières stratégies.", ar: "تعلّم الأساسيات والقواعد وأولى الاستراتيجيات." },
    items: [
      { fr: "Règles et déplacement des pièces", ar: "القواعد وحركة القطع" },
      { fr: "Échecs et mat", ar: "الكش والمات" },
      { fr: "Notions tactiques simples", ar: "مفاهيم تكتيكية بسيطة" },
      { fr: "Exercices interactifs", ar: "تمارين تفاعلية" },
    ],
    footer: [{ fr: "8–12 ans", ar: "8–12 سنة" }, { fr: "12+ ans", ar: "+12 سنة" }],
  },
  {
    title: { fr: "Intermédiaire", ar: "متوسط" },
    text: { fr: "Renforcer votre jeu et développer vos compétences.", ar: "تقوية لعبك وتطوير مهاراتك." },
    items: [
      { fr: "Tactiques et combinaisons", ar: "التكتيكات والتركيبات" },
      { fr: "Plans de jeu", ar: "خطط اللعب" },
      { fr: "Milieux de partie", ar: "وسط المباراة" },
      { fr: "Finales essentielles", ar: "نهايات أساسية" },
    ],
    footer: [{ fr: "12+ ans", ar: "+12 سنة" }],
  },
  {
    title: { fr: "Avancé", ar: "متقدم" },
    text: { fr: "Approfondir votre compréhension et affiner votre style.", ar: "تعميق فهمك وصقل أسلوبك." },
    items: [
      { fr: "Analyse de parties", ar: "تحليل المباريات" },
      { fr: "Préparation d’ouverture", ar: "التحضير للافتتاحيات" },
      { fr: "Techniques de calcul", ar: "تقنيات الحساب" },
      { fr: "Finales avancées", ar: "نهايات متقدمة" },
    ],
    footer: [{ fr: "Joueurs de compétition", ar: "لاعبو المنافسة" }],
  },
  {
    title: { fr: "Compétition", ar: "المنافسة" },
    text: { fr: "Préparation aux tournois et coaching personnalisé.", ar: "التحضير للبطولات وتدريب مخصص." },
    items: [
      { fr: "Répertoire d’ouvertures", ar: "مخزون الافتتاحيات" },
      { fr: "Analyse de votre jeu", ar: "تحليل أسلوب لعبك" },
      { fr: "Gestion du temps et psychologie", ar: "تدبير الوقت وعلم النفس" },
      { fr: "Entraînement intensif", ar: "تدريب مكثف" },
    ],
    footer: [{ fr: "Sur sélection", ar: "بالانتقاء" }],
  },
];

const categories: { title: L; text: L; count: L }[] = [
  { title: { fr: "Ouvertures", ar: "الافتتاحيات" }, text: { fr: "Principes, idées et répertoires d’ouverture.", ar: "مبادئ وأفكار ومخزون الافتتاحيات." }, count: { fr: "24 leçons", ar: "24 درساً" } },
  { title: { fr: "Milieu de partie", ar: "وسط المباراة" }, text: { fr: "Plans, tactiques et stratégie.", ar: "خطط وتكتيكات واستراتيجية." }, count: { fr: "32 leçons", ar: "32 درساً" } },
  { title: { fr: "Finales", ar: "النهايات" }, text: { fr: "Techniques essentielles de finale.", ar: "تقنيات أساسية في النهايات." }, count: { fr: "18 leçons", ar: "18 درساً" } },
  { title: { fr: "Tactiques", ar: "التكتيكات" }, text: { fr: "Exercices pour améliorer votre calcul.", ar: "تمارين لتحسين الحساب." }, count: { fr: "40 exercices", ar: "40 تمريناً" } },
  { title: { fr: "Analyse de parties", ar: "تحليل المباريات" }, text: { fr: "Étudier les parties des maîtres et des joueurs du club.", ar: "دراسة مباريات الأساتذة ولاعبي النادي." }, count: { fr: "28 analyses", ar: "28 تحليلاً" } },
  { title: { fr: "Préparation de tournois", ar: "التحضير للبطولات" }, text: { fr: "Méthodes et conseils pratiques pour la compétition.", ar: "طرق ونصائح عملية للمنافسة." }, count: { fr: "15 leçons", ar: "15 درساً" } },
];

const lessons: { tag: L; title: L; text: L; author: L; time: string; avatar: string }[] = [
  { tag: { fr: "Ouvertures", ar: "الافتتاحيات" }, title: { fr: "Les principes de l’ouverture", ar: "مبادئ الافتتاح" }, text: { fr: "Comprendre les idées principales pour bien commencer la partie.", ar: "فهم الأفكار الرئيسية لبداية جيدة للمباراة." }, author: { fr: "Youssef Jdidou", ar: "يوسف جديدو" }, time: "18:24", avatar: "/players/avatar-3.jpg" },
  { tag: { fr: "Milieu de partie", ar: "وسط المباراة" }, title: { fr: "Comment créer un plan ?", ar: "كيف تضع خطة؟" }, text: { fr: "Apprendre à identifier les faiblesses et construire un plan efficace.", ar: "تعلّم اكتشاف نقاط الضعف وبناء خطة فعّالة." }, author: { fr: "Oussama Talibi", ar: "أسامة طالبي" }, time: "22:10", avatar: "/players/avatar-1.jpg" },
  { tag: { fr: "Finales", ar: "النهايات" }, title: { fr: "Les finales de pions", ar: "نهايات البيادق" }, text: { fr: "Techniques clés et positions essentielles à connaître.", ar: "تقنيات أساسية ووضعيات يجب معرفتها." }, author: { fr: "Hajar Marbou", ar: "هاجر مربو" }, time: "16:35", avatar: "/players/avatar-2.jpg" },
];

const sessions: { day: string; month: L; title: L; time: string; place: L; online: boolean }[] = [
  { day: "15", month: { fr: "janv.", ar: "يناير" }, title: { fr: "Cours débutant (8–12 ans)", ar: "درس المبتدئين (8–12 سنة)" }, time: "17:00 – 18:30", place: { fr: "Siège du club", ar: "مقر النادي" }, online: false },
  { day: "16", month: { fr: "janv.", ar: "يناير" }, title: { fr: "Groupe intermédiaire", ar: "المجموعة المتوسطة" }, time: "18:00 – 19:30", place: { fr: "Siège du club", ar: "مقر النادي" }, online: false },
  { day: "18", month: { fr: "janv.", ar: "يناير" }, title: { fr: "Analyse de parties", ar: "تحليل المباريات" }, time: "19:00 – 20:30", place: { fr: "En ligne (Zoom)", ar: "عن بُعد (زووم)" }, online: true },
  { day: "20", month: { fr: "janv.", ar: "يناير" }, title: { fr: "Préparation tournoi", ar: "التحضير للبطولة" }, time: "18:00 – 19:30", place: { fr: "Siège du club", ar: "مقر النادي" }, online: false },
];

const resources: { icon: string; title: L; text: L; link: L }[] = [
  { icon: "file", title: { fr: "PGN de référence", ar: "ملفات PGN مرجعية" }, text: { fr: "Téléchargez des parties annotées.", ar: "حمّل مباريات مشروحة." }, link: { fr: "Télécharger", ar: "تحميل" } },
  { icon: "book", title: { fr: "Livres recommandés", ar: "كتب مقترحة" }, text: { fr: "Notre sélection par niveau.", ar: "اختيارنا حسب المستوى." }, link: { fr: "Voir la liste", ar: "عرض القائمة" } },
  { icon: "monitor", title: { fr: "Outils en ligne", ar: "أدوات عبر الإنترنت" }, text: { fr: "Sites et applications utiles pour vous entraîner.", ar: "مواقع وتطبيقات مفيدة للتدرب." }, link: { fr: "Voir les outils", ar: "عرض الأدوات" } },
];

const pageText = {
  fr: {
    home: "Accueil",
    formation: "Formation",
    title: "Formation & Académie",
    intro: "Des cours, des exercices et un accompagnement pour tous les niveaux. Apprendre, progresser et développer sa passion des échecs à Tanger.",
    notice: "Les programmes, horaires, leçons, formateurs et chiffres affichés sont des exemples issus de la maquette et restent à confirmer par l’association.",
    discover: "Découvrir nos programmes",
    video: "Voir la vidéo",
    quoteAr: "كل خطوة صغيرة تقربك لاعب أفضل",
    quote: "Chaque petit effort vous rapproche d’un meilleur joueur.",
    pathsTitle: "Parcours d’apprentissage",
    pathsAll: "Voir tous les parcours",
    categoriesTitle: "Nos catégories de formation",
    categoriesAll: "Voir toutes les catégories",
    lessonsTitle: "Leçons en vedette",
    lessonsAll: "Voir toutes les leçons",
    by: "Par",
    exercisesTitle: "Exercices tactiques",
    more: "Voir plus",
    daily: "Exercice du jour",
    task: "Trait aux blancs",
    findMove: "Trouvez le meilleur coup.",
    solution: "Voir la solution",
    level: "Niveau",
    theme: "Thème",
    levelValue: "Intermédiaire",
    themeValue: "Combinaison",
    previous: "Précédent",
    next: "Suivant",
    sessionsTitle: "Prochaines sessions",
    planning: "Voir tout le planning",
    onsite: "Présentiel",
    online: "En ligne",
    resourcesTitle: "Ressources utiles",
    resourcesAll: "Voir toutes les ressources",
    ctaTitle: "Rejoignez notre académie",
    ctaText: "Des cours adaptés à tous les niveaux, pour progresser dans un cadre motivant et bienveillant.",
    ctaButton: "S’inscrire maintenant",
    soon: "Bientôt disponible",
    imageAlt: "Illustration d’exemple",
  },
  ar: {
    home: "الرئيسية",
    formation: "التكوين",
    title: "التكوين والأكاديمية",
    intro: "دروس وتمارين ومواكبة لجميع المستويات. تعلّم وتقدّم وطوّر شغفك بالشطرنج في طنجة.",
    notice: "البرامج والأوقات والدروس والمكوّنون والأرقام المعروضة أمثلة مأخوذة من التصميم، وتنتظر تأكيد الجمعية.",
    discover: "اكتشف برامجنا",
    video: "شاهد الفيديو",
    quoteAr: "",
    quote: "كل خطوة صغيرة تقرّبك من أن تصبح لاعباً أفضل.",
    pathsTitle: "مسارات التعلّم",
    pathsAll: "عرض كل المسارات",
    categoriesTitle: "فئات التكوين",
    categoriesAll: "عرض كل الفئات",
    lessonsTitle: "دروس مميزة",
    lessonsAll: "عرض كل الدروس",
    by: "من تقديم",
    exercisesTitle: "تمارين تكتيكية",
    more: "المزيد",
    daily: "تمرين اليوم",
    task: "الدور للأبيض",
    findMove: "جد أفضل نقلة.",
    solution: "عرض الحل",
    level: "المستوى",
    theme: "الموضوع",
    levelValue: "متوسط",
    themeValue: "تركيبة",
    previous: "السابق",
    next: "التالي",
    sessionsTitle: "الحصص القادمة",
    planning: "عرض كل البرنامج",
    onsite: "حضوري",
    online: "عن بُعد",
    resourcesTitle: "موارد مفيدة",
    resourcesAll: "عرض كل الموارد",
    ctaTitle: "انضموا إلى أكاديميتنا",
    ctaText: "دروس ملائمة لجميع المستويات للتقدّم في أجواء محفّزة وودّية.",
    ctaButton: "سجّل الآن",
    soon: "قريباً",
    imageAlt: "صورة توضيحية",
  },
} as const;

function SectionHeading({ id, title, link, arrow }: { id: string; title: string; link: string; arrow: string }) {
  return (
    <div className="formation-heading">
      <h2 className="about-section-title" id={id}>{title}</h2>
      <span className="formation-link" aria-disabled="true">{link} <span aria-hidden="true">{arrow}</span></span>
    </div>
  );
}

export default function FormationPage() {
  const [language, setLanguage] = useState<Language>("fr");
  const text = pageText[language];
  const isArabic = language === "ar";
  const arrow = isArabic ? "←" : "→";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, language]);

  return (
    <div className={`site-shell${isArabic ? " site-shell--rtl" : ""}`}>
      <SiteHeader language={language} currentPage="formation" onLanguageChange={setLanguage} />

      <main className="about-page formation-page">
        <section className="about-hero formation-hero" aria-labelledby="formation-title">
          <Image src="/formation/hero.jpg" alt="" fill priority sizes="100vw" className="formation-hero__image" />
          <div className="about-hero__content formation-hero__content">
            <nav className="about-breadcrumbs" aria-label={isArabic ? "مسار التنقل" : "Fil d’Ariane"}>
              <Link href="/">{text.home}</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{text.formation}</span>
            </nav>
            <h1 id="formation-title">{text.title}</h1>
            {!isArabic && <p className="about-hero__association" lang="ar">التكوين والأكاديمية</p>}
            <p className="about-hero__description">{text.intro}</p>
            <div className="about-hero__actions">
              <span className="button button--primary formation-soon" aria-disabled="true">
                {text.discover}<span aria-hidden="true">{arrow}</span>
              </span>
              <span className="button button--light formation-video" aria-disabled="true">
                <Icon name="play" />{text.video}
              </span>
            </div>
          </div>
          <blockquote className="formation-hero__quote">
            <span aria-hidden="true">“</span>
            {!isArabic && <strong lang="ar" dir="rtl">{text.quoteAr}</strong>}
            <p>{text.quote}</p>
          </blockquote>
        </section>

        <p className="about-content-notice" role="note">{text.notice}</p>

        <section className="formation-features about-container" aria-label={text.title}>
          {features.map((feature) => (
            <article key={feature.title.fr}>
              <span className="about-icon"><Icon name={feature.icon} /></span>
              <div>
                <h3>{feature.title[language]}</h3>
                <p>{feature.text[language]}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="about-container formation-section" aria-labelledby="formation-paths">
          <SectionHeading id="formation-paths" title={text.pathsTitle} link={text.pathsAll} arrow={arrow} />
          <div className="formation-paths">
            {paths.map((path, index) => (
              <article className="formation-path" key={path.title.fr}>
                <header>
                  <Image src={`/formation/path-${index + 1}.jpg`} alt="" width={64} height={64} />
                  <div>
                    <h3>{path.title[language]}</h3>
                    <p>{path.text[language]}</p>
                  </div>
                  <span aria-hidden="true">{arrow}</span>
                </header>
                <ul>
                  {path.items.map((item) => (
                    <li key={item.fr}><Icon name="check" />{item[language]}</li>
                  ))}
                </ul>
                <footer>
                  {path.footer.map((item) => <span key={item.fr}>{item[language]}</span>)}
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className="about-container formation-section" aria-labelledby="formation-categories">
          <SectionHeading id="formation-categories" title={text.categoriesTitle} link={text.categoriesAll} arrow={arrow} />
          <div className="formation-categories">
            {categories.map((category, index) => (
              <article key={category.title.fr}>
                <div className="formation-categories__image">
                  <Image src={`/formation/category-${index + 1}.jpg`} alt={`${text.imageAlt} : ${category.title[language]}`} fill sizes="(max-width: 700px) 50vw, 16vw" />
                </div>
                <h3>{category.title[language]}</h3>
                <p>{category.text[language]}</p>
                <small><Icon name="lesson" />{category.count[language]}</small>
              </article>
            ))}
          </div>
        </section>

        <div className="formation-duo about-container">
          <section className="formation-section" aria-labelledby="formation-lessons">
            <SectionHeading id="formation-lessons" title={text.lessonsTitle} link={text.lessonsAll} arrow={arrow} />
            <div className="formation-lessons">
              {lessons.map((lesson, index) => (
                <article key={lesson.title.fr}>
                  <div className="formation-lessons__image">
                    <Image src={`/formation/lesson-${index + 1}.jpg`} alt={`${text.imageAlt} : ${lesson.title[language]}`} fill sizes="(max-width: 700px) 100vw, 18vw" />
                    <span className="formation-duration"><Icon name="play" />{lesson.time}</span>
                  </div>
                  <div className="formation-lessons__body">
                    <span className="formation-tag">{lesson.tag[language]}</span>
                    <h3>{lesson.title[language]}</h3>
                    <p>{lesson.text[language]}</p>
                    <footer>
                      <Image src={lesson.avatar} alt="" width={28} height={28} />
                      {text.by} {lesson.author[language]}
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="formation-section" aria-labelledby="formation-exercises">
            <div className="formation-heading">
              <h2 className="about-section-title formation-title-icon" id="formation-exercises">
                <span className="about-icon"><Icon name="puzzle" /></span>{text.exercisesTitle}
              </h2>
              <span className="formation-link" aria-disabled="true">{text.more} <span aria-hidden="true">{arrow}</span></span>
            </div>
            <div className="formation-exercise">
              <Image src="/formation/board.jpg" alt={text.imageAlt} width={195} height={204} />
              <div>
                <h3><Icon name="chart" />{text.daily}</h3>
                <p>{text.task}</p>
                <p>{text.findMove}</p>
                <span className="formation-solution" aria-disabled="true"><Icon name="lesson" />{text.solution}</span>
                <dl>
                  <div><dt>{text.level}</dt><dd>{text.levelValue}</dd></div>
                  <div><dt>{text.theme}</dt><dd>{text.themeValue}</dd></div>
                </dl>
                <div className="formation-exercise__nav">
                  <span aria-label={text.previous}>{isArabic ? "›" : "‹"}</span>
                  <span aria-label={text.next}>{isArabic ? "‹" : "›"}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="formation-duo formation-duo--lower about-container">
          <section className="formation-section" aria-labelledby="formation-sessions">
            <SectionHeading id="formation-sessions" title={text.sessionsTitle} link={text.planning} arrow={arrow} />
            <ul className="formation-sessions">
              {sessions.map((session) => (
                <li key={session.day}>
                  <span className="formation-date"><b>{session.day}</b>{session.month[language]}</span>
                  <strong>{session.title[language]}</strong>
                  <span><Icon name="clock" />{session.time}</span>
                  <span><Icon name={session.online ? "monitor" : "pin"} />{session.place[language]}</span>
                  <em className={session.online ? "is-online" : undefined}>{session.online ? text.online : text.onsite}</em>
                </li>
              ))}
            </ul>
          </section>

          <section className="formation-section" aria-labelledby="formation-resources">
            <div className="formation-heading">
              <h2 className="about-section-title formation-title-icon" id="formation-resources">
                <span className="about-icon"><Icon name="book" /></span>{text.resourcesTitle}
              </h2>
              <span className="formation-link" aria-disabled="true">{text.resourcesAll} <span aria-hidden="true">{arrow}</span></span>
            </div>
            <div className="formation-resources">
              {resources.map((resource) => (
                <article key={resource.title.fr}>
                  <span className="about-icon"><Icon name={resource.icon} /></span>
                  <h3>{resource.title[language]}</h3>
                  <p>{resource.text[language]}</p>
                  <span className="formation-link" aria-disabled="true">{resource.link[language]} <span aria-hidden="true">{arrow}</span></span>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="formation-cta about-container" aria-labelledby="formation-cta-title">
          <div className="formation-cta__image" aria-hidden="true">
            <Image src="/formation/banner.jpg" alt="" fill sizes="30vw" />
          </div>
          <span className="formation-cta__icon"><Icon name="cap" /></span>
          <div className="formation-cta__copy">
            <h2 id="formation-cta-title">{text.ctaTitle}</h2>
            <p>{text.ctaText}</p>
          </div>
          <Link className="formation-cta__button" href="/#membership">
            {text.ctaButton} <span aria-hidden="true">{arrow}</span>
          </Link>
        </section>
      </main>

      <SiteFooter language={language} />
    </div>
  );
}
