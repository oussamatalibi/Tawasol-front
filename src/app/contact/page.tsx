"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { Icon } from "../icons";
import { Language, SiteFooter, SiteHeader } from "../site-chrome";

type L = { fr: string; ar: string };

const MESSAGE_LIMIT = 500;

const subjects: { value: string; label: L }[] = [
  { value: "info", label: { fr: "Information générale", ar: "معلومات عامة" } },
  { value: "membership", label: { fr: "Adhésion au club", ar: "الانخراط في النادي" } },
  { value: "tournaments", label: { fr: "Tournois et événements", ar: "البطولات والفعاليات" } },
  { value: "training", label: { fr: "Formation et académie", ar: "التكوين والأكاديمية" } },
  { value: "other", label: { fr: "Autre demande", ar: "طلب آخر" } },
];

const infoCards: { icon: string; title: L; lines: L[]; note?: L }[] = [
  {
    icon: "pin",
    title: { fr: "Notre adresse", ar: "عنواننا" },
    lines: [
      { fr: "Maison des Associations", ar: "دار الجمعيات" },
      { fr: "Quartier Administratif, Tanger", ar: "الحي الإداري، طنجة" },
      { fr: "Maroc", ar: "المغرب" },
    ],
  },
  {
    icon: "phone",
    title: { fr: "Téléphone", ar: "الهاتف" },
    lines: [{ fr: "+212 6 12 34 56 78", ar: "+212 6 12 34 56 78" }],
    note: { fr: "Lun - Sam : 10h00 - 18h00", ar: "الاثنين - السبت : 10:00 - 18:00" },
  },
  {
    icon: "mail",
    title: { fr: "Email", ar: "البريد الإلكتروني" },
    lines: [{ fr: "contact@tawassol-echecs.ma", ar: "contact@tawassol-echecs.ma" }],
    note: { fr: "Réponse sous 24h", ar: "الرد خلال 24 ساعة" },
  },
  {
    icon: "clock",
    title: { fr: "Horaires", ar: "أوقات العمل" },
    lines: [{ fr: "Du lundi au samedi", ar: "من الاثنين إلى السبت" }],
    note: { fr: "10h00 - 18h00", ar: "10:00 - 18:00" },
  },
];

const socials = [
  { icon: "facebook", label: "Facebook", tone: "facebook" },
  { icon: "instagram", label: "Instagram", tone: "instagram" },
  { icon: "youtube", label: "YouTube", tone: "youtube" },
  { icon: "linkedin", label: "LinkedIn", tone: "linkedin" },
];

const benefits: { icon: string; title: L; text: L }[] = [
  {
    icon: "users",
    title: { fr: "Pour tous les âges", ar: "لجميع الأعمار" },
    text: { fr: "Enfants, jeunes et adultes, tous les niveaux sont les bienvenus.", ar: "أطفال وشباب وكبار، كل المستويات مرحب بها." },
  },
  {
    icon: "cap",
    title: { fr: "Entraînement régulier", ar: "تدريب منتظم" },
    text: { fr: "Cours, ateliers et suivi personnalisé par des entraîneurs qualifiés.", ar: "دروس وورشات ومتابعة شخصية مع مدربين مؤهلين." },
  },
  {
    icon: "trophy",
    title: { fr: "Participation aux tournois", ar: "المشاركة في البطولات" },
    text: { fr: "Représentez le club dans les compétitions régionales et nationales.", ar: "مثّلوا النادي في المنافسات الجهوية والوطنية." },
  },
  {
    icon: "users",
    title: { fr: "Une vraie communauté", ar: "مجتمع حقيقي" },
    text: { fr: "Progressez dans un cadre motivant, convivial et bienveillant.", ar: "تطوروا في جو محفز وودي ومشجع." },
  },
];

const faqs: L[] = [
  { fr: "Comment puis-je m’inscrire au club ?", ar: "كيف يمكنني التسجيل في النادي؟" },
  { fr: "Y a-t-il un niveau minimum pour rejoindre ?", ar: "هل هناك مستوى أدنى للانضمام؟" },
  { fr: "Quels sont les horaires des cours ?", ar: "ما هي مواعيد الدروس؟" },
  { fr: "Le club organise-t-il des tournois ?", ar: "هل ينظم النادي بطولات؟" },
  { fr: "Combien coûte l’adhésion ?", ar: "كم تبلغ تكلفة الانخراط؟" },
  { fr: "Puis-je assister à une séance d’essai ?", ar: "هل يمكنني حضور حصة تجريبية؟" },
];

const pageText = {
  fr: {
    home: "Accueil",
    contact: "Contact",
    title: "Contact & Adhésion",
    arabicTitle: "تواصل معنا والانضمام",
    tagline: "Tanger, ville de culture et d’échecs",
    intro: "Une communauté ouverte à tous les passionnés d’échecs à Tanger. Que vous souhaitiez poser une question, rejoindre le club ou participer à nos activités, nous serons ravis de vous écouter.",
    notice: "Les coordonnées, horaires, adresse et réponses affichés sont des exemples issus de la maquette et restent à confirmer avant publication.",
    social: "Réseaux sociaux",
    formTitle: "Envoyez-nous un message",
    formArabic: "أرسل لنا رسالة",
    name: "Nom complet",
    email: "Email",
    subject: "Sujet",
    subjectPlaceholder: "Choisir un sujet",
    phone: "Numéro de téléphone",
    message: "Votre message",
    send: "Envoyer le message",
    required: "Champ obligatoire",
    invalidEmail: "Veuillez saisir une adresse email valide.",
    fixErrors: "Veuillez corriger les champs signalés.",
    soon: "L’envoi de messages sera bientôt disponible. Votre message n’a pas été envoyé ; contactez-nous directement en attendant.",
    mapTitle: "Notre localisation",
    mapArabic: "موقعنا",
    mapAlt: "Illustration de la carte de localisation (exemple)",
    howTitle: "Comment nous rejoindre ?",
    how: ["Proche de la gare de Tanger (10 min en voiture)", "Bus : Lignes 2, 5, 8 (Arrêt Maison des Associations)", "Parking disponible à proximité"],
    quick: "Nos coordonnées rapides",
    call: "Appeler",
    mailAction: "Email",
    route: "Itinéraire",
    meetTitle: "Venez nous rencontrer",
    meetText: "Notre club organise régulièrement des séances ouvertes et des événements pour tous les niveaux.",
    agenda: "Voir notre agenda",
    joinTitle: "Adhésion au club",
    joinArabic: "الانضمام إلى النادي",
    joinText: "Rejoignez l’Association Tawassol des Échecs Tanger et faites partie d’une communauté dynamique qui partage la passion des échecs.",
    download: "Télécharger le formulaire",
    downloadNote: "Formulaire d’adhésion (PDF)",
    faqTitle: "Questions fréquentes",
    faqArabic: "الأسئلة الشائعة",
    faqAnswer: "La réponse officielle sera communiquée prochainement par l’association.",
    ctaTitle: "Rejoignez l’Association Tawassol des Échecs Tanger",
    ctaText: "Développez votre passion, progressez avec des entraîneurs expérimentés et participez à une communauté active à Tanger.",
    ctaButton: "Devenir membre",
  },
  ar: {
    home: "الرئيسية",
    contact: "اتصل بنا",
    title: "تواصل معنا والانضمام",
    arabicTitle: "",
    tagline: "طنجة، مدينة الثقافة والشطرنج",
    intro: "مجتمع مفتوح لكل عشاق الشطرنج بطنجة. سواء أردتم طرح سؤال أو الانضمام إلى النادي أو المشاركة في أنشطتنا، يسعدنا الاستماع إليكم.",
    notice: "بيانات الاتصال والمواعيد والعنوان والأجوبة المعروضة أمثلة مستوحاة من التصميم وتبقى في انتظار التأكيد قبل النشر.",
    social: "مواقع التواصل",
    formTitle: "أرسلوا لنا رسالة",
    formArabic: "",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    subject: "الموضوع",
    subjectPlaceholder: "اختر موضوعاً",
    phone: "رقم الهاتف",
    message: "رسالتكم",
    send: "إرسال الرسالة",
    required: "حقل إجباري",
    invalidEmail: "يرجى إدخال بريد إلكتروني صالح.",
    fixErrors: "يرجى تصحيح الحقول المشار إليها.",
    soon: "خدمة إرسال الرسائل ستتوفر قريباً. لم يتم إرسال رسالتكم؛ تواصلوا معنا مباشرة في الوقت الحالي.",
    mapTitle: "موقعنا",
    mapArabic: "",
    mapAlt: "صورة توضيحية لخريطة الموقع (مثال)",
    howTitle: "كيف تصلون إلينا؟",
    how: ["قريب من محطة طنجة (10 دقائق بالسيارة)", "الحافلات: الخطوط 2 و5 و8 (محطة دار الجمعيات)", "موقف سيارات متاح بالقرب"],
    quick: "اتصال سريع",
    call: "اتصال",
    mailAction: "بريد",
    route: "المسار",
    meetTitle: "تعالوا للقائنا",
    meetText: "ينظم نادينا بانتظام حصصاً مفتوحة وفعاليات لكل المستويات.",
    agenda: "عرض البرنامج",
    joinTitle: "الانخراط في النادي",
    joinArabic: "",
    joinText: "انضموا إلى جمعية التواصل الطنجي للشطرنج وكونوا جزءاً من مجتمع نشيط يتقاسم شغف الشطرنج.",
    download: "تحميل الاستمارة",
    downloadNote: "استمارة الانخراط (PDF)",
    faqTitle: "الأسئلة الشائعة",
    faqArabic: "",
    faqAnswer: "ستقوم الجمعية بنشر الجواب الرسمي قريباً.",
    ctaTitle: "انضموا إلى جمعية التواصل الطنجي للشطرنج",
    ctaText: "طوّروا شغفكم وتقدموا مع مدربين ذوي خبرة وشاركوا في مجتمع نشيط بطنجة.",
    ctaButton: "كن عضواً",
  },
} as const;

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export default function ContactPage() {
  const [language, setLanguage] = useState<Language>("fr");
  const [form, setForm] = useState({ name: "", email: "", subject: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [feedback, setFeedback] = useState<{ kind: "error" | "info"; text: string } | null>(null);
  const text = pageText[language];
  const isArabic = language === "ar";
  const arrow = isArabic ? "←" : "→";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, language]);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFeedback(null);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = text.required;
    if (!form.email.trim()) next.email = text.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = text.invalidEmail;
    if (!form.subject) next.subject = text.required;
    if (!form.message.trim()) next.message = text.required;
    setErrors(next);

    if (Object.keys(next).length > 0) {
      setFeedback({ kind: "error", text: text.fixErrors });
      return;
    }
    setFeedback({ kind: "info", text: text.soon });
  }

  return (
    <div className={`site-shell${isArabic ? " site-shell--rtl" : ""}`}>
      <SiteHeader language={language} currentPage="contact" onLanguageChange={setLanguage} />

      <main className="about-page contact-page">
        <section className="about-hero contact-hero" aria-labelledby="contact-title">
          <Image src="/hero-section-image.png" alt="" fill priority sizes="100vw" className="events-hero__image" />
          <div className="about-hero__content contact-hero__content">
            <nav className="about-breadcrumbs" aria-label={isArabic ? "مسار التنقل" : "Fil d’Ariane"}>
              <Link href="/">{text.home}</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{text.contact}</span>
            </nav>
            <h1 id="contact-title">{text.title}</h1>
            {!isArabic && <p className="about-hero__association" lang="ar">{text.arabicTitle}</p>}
            <p className="about-hero__description">{text.intro}</p>
          </div>
          <p className="events-hero__slogan contact-hero__tagline" aria-hidden="true">{text.tagline}</p>
        </section>

        <p className="about-content-notice" role="note">{text.notice}</p>

        <section className="contact-info about-container" aria-label={text.title}>
          {infoCards.map((card) => (
            <article key={card.icon} className="contact-info__card">
              <span className="contact-info__icon"><Icon name={card.icon} /></span>
              <div>
                <h2>{card.title[language]}</h2>
                {card.lines.map((line) => <p key={line.fr} dir={card.icon === "phone" || card.icon === "mail" ? "ltr" : undefined}>{line[language]}</p>)}
                {card.note && <small>{card.note[language]}</small>}
              </div>
            </article>
          ))}
          <article className="contact-info__card">
            <span className="contact-info__icon"><Icon name="globe" /></span>
            <div>
              <h2>{text.social}</h2>
              <ul className="contact-social">
                {socials.map((item) => (
                  <li key={item.tone}>
                    <span className={`contact-social__item contact-social__item--${item.tone}`} role="img" aria-label={item.label}><Icon name={item.icon} /></span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </section>

        <div className="contact-grid about-container">
          <section className="contact-panel contact-form-panel" aria-labelledby="contact-form-title">
            <header className="contact-panel__head">
              <span className="contact-panel__icon"><Icon name="file" /></span>
              <div>
                <h2 id="contact-form-title">{text.formTitle}</h2>
                {!isArabic && <p lang="ar">{text.formArabic}</p>}
              </div>
            </header>
            <form className="contact-form" onSubmit={submit} noValidate>
              <div className="contact-field">
                <label htmlFor="contact-name">{text.name} *</label>
                <div className={`contact-input${errors.name ? " has-error" : ""}`}>
                  <Icon name="user" />
                  <input id="contact-name" value={form.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
                </div>
                {errors.name && <small id="contact-name-error" className="contact-error">{errors.name}</small>}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">{text.email} *</label>
                <div className={`contact-input${errors.email ? " has-error" : ""}`}>
                  <Icon name="mail" />
                  <input id="contact-email" type="email" dir="ltr" value={form.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />
                </div>
                {errors.email && <small id="contact-email-error" className="contact-error">{errors.email}</small>}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-subject">{text.subject} *</label>
                <div className={`contact-input${errors.subject ? " has-error" : ""}`}>
                  <Icon name="check" />
                  <select id="contact-subject" value={form.subject} onChange={(event) => update("subject", event.target.value)} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "contact-subject-error" : undefined}>
                    <option value="">{text.subjectPlaceholder}</option>
                    {subjects.map((subject) => <option key={subject.value} value={subject.value}>{subject.label[language]}</option>)}
                  </select>
                </div>
                {errors.subject && <small id="contact-subject-error" className="contact-error">{errors.subject}</small>}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-phone">{text.phone}</label>
                <div className="contact-input contact-input--phone" dir="ltr">
                  <span className="contact-input__prefix">+212</span>
                  <input id="contact-phone" type="tel" inputMode="tel" value={form.phone} onChange={(event) => update("phone", event.target.value.replace(/[^\d\s]/g, ""))} autoComplete="tel-national" />
                </div>
              </div>
              <div className="contact-field contact-field--wide">
                <label htmlFor="contact-message">{text.message} *</label>
                <div className={`contact-input contact-input--area${errors.message ? " has-error" : ""}`}>
                  <textarea id="contact-message" rows={5} maxLength={MESSAGE_LIMIT} value={form.message} onChange={(event) => update("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />
                  <span className="contact-counter" dir="ltr">{form.message.length}/{MESSAGE_LIMIT}</span>
                </div>
                {errors.message && <small id="contact-message-error" className="contact-error">{errors.message}</small>}
              </div>
              <button type="submit" className="contact-submit">
                <Icon name="send" />{text.send}
              </button>
              {feedback && <p className={`contact-feedback contact-feedback--${feedback.kind}`} role={feedback.kind === "error" ? "alert" : "status"}>{feedback.text}</p>}
            </form>
          </section>

          <section className="contact-panel contact-map-panel" aria-labelledby="contact-map-title">
            <header className="contact-panel__head">
              <span className="contact-panel__icon"><Icon name="pin" /></span>
              <div>
                <h2 id="contact-map-title">{text.mapTitle}{!isArabic && <span lang="ar" className="contact-inline-ar">{text.mapArabic}</span>}</h2>
              </div>
            </header>
            <div className="contact-map">
              <Image src="/contact/map.jpg" alt={text.mapAlt} fill sizes="(max-width: 900px) 100vw, 30vw" />
            </div>
            <div className="contact-how">
              <h3><Icon name="bus" />{text.howTitle}</h3>
              <ul>{text.how.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </section>

          <aside className="contact-side" aria-label={text.quick}>
            <section className="contact-panel contact-quick" aria-labelledby="contact-quick-title">
              <h2 id="contact-quick-title">{text.quick}</h2>
              <div>
                {[["phone", text.call], ["mail", text.mailAction], ["pin", text.route]].map(([icon, label]) => (
                  <span key={icon} className="contact-quick__item events-disabled" aria-disabled="true"><Icon name={icon} />{label}</span>
                ))}
              </div>
            </section>
            <section className="contact-meet" aria-labelledby="contact-meet-title">
              <Image src="/articles/article-5.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 24vw" />
              <div className="contact-meet__copy">
                <h2 id="contact-meet-title">{text.meetTitle}</h2>
                <p>{text.meetText}</p>
                <Link className="contact-meet__button" href="/events">{text.agenda}<b aria-hidden="true">{arrow}</b></Link>
              </div>
            </section>
          </aside>
        </div>

        <div className="contact-grid contact-grid--lower about-container" id="membership">
          <section className="contact-panel contact-join" aria-labelledby="contact-join-title">
            <header className="contact-join__head">
              <div>
                <div className="contact-panel__head">
                  <span className="contact-panel__icon"><Icon name="file" /></span>
                  <div>
                    <h2 id="contact-join-title">{text.joinTitle}{!isArabic && <span lang="ar" className="contact-inline-ar">{text.joinArabic}</span>}</h2>
                  </div>
                </div>
                <p>{text.joinText}</p>
              </div>
              <div className="contact-join__download">
                <span className="contact-download events-disabled" aria-disabled="true"><Icon name="download" />{text.download}</span>
                <small>{text.downloadNote}</small>
              </div>
            </header>
            <ul className="contact-benefits">
              {benefits.map((benefit) => (
                <li key={benefit.title.fr}>
                  <span className="contact-benefits__icon"><Icon name={benefit.icon} /></span>
                  <h3>{benefit.title[language]}</h3>
                  <p>{benefit.text[language]}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="contact-panel contact-faq" aria-labelledby="contact-faq-title">
            <header className="contact-panel__head">
              <span className="contact-panel__icon"><Icon name="pin" /></span>
              <div>
                <h2 id="contact-faq-title">{text.faqTitle}</h2>
                {!isArabic && <p lang="ar">{text.faqArabic}</p>}
              </div>
            </header>
            {faqs.map((faq) => (
              <details key={faq.fr}>
                <summary>
                  <span>{faq[language]}</span>
                  <Icon name="plus" />
                </summary>
                <p>{text.faqAnswer}</p>
              </details>
            ))}
          </section>
        </div>

        <section className="contact-cta about-container" aria-labelledby="contact-cta-title">
          <Image src="/formation/banner.jpg" alt="" fill sizes="100vw" className="contact-cta__image" />
          <span className="contact-cta__icon"><Icon name="users" /></span>
          <div className="contact-cta__copy">
            <h2 id="contact-cta-title">{text.ctaTitle}</h2>
            <p>{text.ctaText}</p>
          </div>
          <a className="contact-cta__button" href="#membership">{text.ctaButton}<b aria-hidden="true">{arrow}</b></a>
        </section>
      </main>

      <SiteFooter language={language} />
    </div>
  );
}
