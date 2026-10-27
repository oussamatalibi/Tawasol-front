"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type Language = "fr" | "ar";
type SitePage = "home" | "about" | "players" | "articles" | "formation" | "events";

const labels = {
  fr: {
    association: "Association Tawassol des Échecs Tanger",
    associationArabic: "جمعية التواصل الطنجي للشطرنج",
    navLabel: "Navigation principale",
    home: "Accueil",
    about: "Le club",
    events: "Tournois",
    articles: "Articles",
    players: "Joueurs",
    academy: "Formation",
    contact: "Contact",
    language: "العربية",
    switchLanguage: "Afficher le site en arabe",
    searchLabel: "Recherche bientôt disponible",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    members: "Espace membre",
    membersUnavailable: "L'accès membres sera précisé ultérieurement.",
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
    footerTagline: "Les échecs à Tanger, dans un esprit de partage.",
  },
  ar: {
    association: "Association Tawassol des Échecs Tanger",
    associationArabic: "جمعية التواصل الطنجي للشطرنج",
    navLabel: "التنقل الرئيسي",
    home: "الرئيسية",
    about: "النادي",
    events: "البطولات",
    articles: "المقالات",
    players: "اللاعبون",
    academy: "التدريب",
    contact: "اتصل بنا",
    language: "Français",
    switchLanguage: "Afficher le site en français",
    searchLabel: "البحث غير متاح حاليًا",
    menuOpen: "فتح القائمة",
    menuClose: "إغلاق القائمة",
    members: "فضاء الأعضاء",
    membersUnavailable: "سيتم توضيح طريقة الدخول لاحقًا.",
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
    footerTagline: "الشطرنج في طنجة بروح من المشاركة.",
  },
} satisfies Record<Language, Record<string, string>>;

function getNavigationLinks(currentPage: SitePage) {
  const homePage = currentPage === "home";

  return {
    home: homePage ? "#top" : "/#top",
    about: "/about",
    events: "/events",
    articles: "/articles",
    players: "/players",
    academy: "/formation",
    contact: homePage ? "#contact" : "/#contact",
  };
}

export function SiteHeader({
  language,
  currentPage,
  onLanguageChange,
}: {
  language: Language;
  currentPage: SitePage;
  onLanguageChange: (language: Language) => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const text = labels[language];
  const links = getNavigationLinks(currentPage);
  const isArabic = language === "ar";

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
    <header className="site-header">
      <Link className="brand" href={links.home} aria-label={text.associationArabic}>
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
      </Link>

      <nav
        className={`main-nav${mobileMenuOpen ? " main-nav--open" : ""}`}
        id="primary-navigation"
        aria-label={text.navLabel}
      >
        <Link
          href={links.home}
          aria-current={currentPage === "home" ? "page" : undefined}
          onClick={() => setMobileMenuOpen(false)}
        >
          {text.home}
        </Link>
        <Link
          href={links.about}
          aria-current={currentPage === "about" ? "page" : undefined}
          onClick={() => setMobileMenuOpen(false)}
        >
          {text.about}
        </Link>
        <Link
          href={links.events}
          aria-current={currentPage === "events" ? "page" : undefined}
          onClick={() => setMobileMenuOpen(false)}
        >
          {text.events}
        </Link>
        <Link
          href={links.articles}
          aria-current={currentPage === "articles" ? "page" : undefined}
          onClick={() => setMobileMenuOpen(false)}
        >
          {text.articles}
        </Link>
        <Link
          href={links.players}
          aria-current={currentPage === "players" ? "page" : undefined}
          onClick={() => setMobileMenuOpen(false)}
        >
          {text.players}
        </Link>
        <Link
          href={links.academy}
          aria-current={currentPage === "formation" ? "page" : undefined}
          onClick={() => setMobileMenuOpen(false)}
        >
          {text.academy}
        </Link>
        <Link href={links.contact} onClick={() => setMobileMenuOpen(false)}>{text.contact}</Link>
      </nav>

      <div className="header-actions">
        <div className="language-toggle" role="group" aria-label="Language">
          <button type="button" onClick={() => onLanguageChange("fr")} aria-pressed={!isArabic}>
            Fr
          </button>
          <span aria-hidden="true">|</span>
          <button
            type="button"
            onClick={() => onLanguageChange("ar")}
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
  );
}

export function SiteFooter({ language }: { language: Language }) {
  const text = labels[language];
  const links = getNavigationLinks("about");
  const isArabic = language === "ar";

  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__main">
        <div className="site-footer__brand">
          <Link className="brand brand--footer" href="/#top">
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
          </Link>
          <p>{text.footerTagline}</p>
        </div>

        <nav className="site-footer__column" aria-label={text.footerNavigation}>
          <h2>{text.footerNavigation}</h2>
          <Link href={links.home}>{text.home}</Link>
          <Link href={links.about}>{text.about}</Link>
          <Link href={links.events}>{text.events}</Link>
          <Link href={links.articles}>{text.articles}</Link>
          <Link href={links.players}>{text.players}</Link>
          <Link href={links.academy}>{text.academy}</Link>
          <Link href={links.contact}>{text.contact}</Link>
        </nav>

        <div className="site-footer__column">
          <h2>{text.footerUsefulLinks}</h2>
          <span>{text.footerRules}</span>
          <Link href="/#membership">{text.footerMembership}</Link>
          <Link href="/#events">{text.footerCalendar}</Link>
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
  );
}
