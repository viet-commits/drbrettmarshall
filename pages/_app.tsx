import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Fraunces, Inter } from "next/font/google";
import cleanContent from "../data/clean_content.json";
import {
  PhoneIcon, MailIcon, FaxIcon, MapPinIcon, ChevronDownIcon,
  MenuIcon, XIcon, ArrowRightIcon,
} from "../components/icons";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });

const CONDITION_SLUGS = [
  "abnormal-pap-smears-vulval-disorders", "adhesions", "endometriosis",
  "fibroids", "infertility", "menorrhagia-heavy-periods", "pcos",
  "pelvic-organ-prolapse", "pelvic-pain", "urinary-incontinence",
];

const PHONE = "03 9776 6411";
const FAX = "03 9039 5060";
const EMAIL = "admin@pengyn.com.au";
const ADDRESS = "Suite 3, 7 Foot Street, Frankston VIC 3199";

type NavItem = { label: string; href?: string; children?: { label: string; href: string; note?: string }[] };

const NAV: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Patient Information",
    children: [
      { label: "About Your Visit", href: "/about-your-visit" },
      { label: "Request an Appointment", href: "/request-an-appointment" },
      { label: "Operations & Conditions", href: "/our-services" },
      { label: "Patient Forms", href: "/patient-forms" },
      { label: "New Patient Form", href: "/patient-forms/new-patient-form" },
      { label: "Pelvic Floor Questionnaire", href: "/download/73416/?tmstv=1689550320", note: "PDF" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Conditions Treated", href: "/our-services" },
      { label: "Procedures & Treatments", href: "/our-services#treatments" },
      { label: "Frequently Asked Questions", href: "/frequently-asked-questions-faq" },
      { label: "TeleHealth", href: "#", note: "Coming soon" },
    ],
  },
  { label: "FAQs", href: "/frequently-asked-questions-faq" },
  {
    label: "For Doctors",
    children: [
      { label: "Refer a Patient", href: "/refer-a-patient" },
      { label: "Photo Gallery", href: "/for-doctors", note: "Private" },
    ],
  },
];

function Footer() {
  const services = cleanContent.services as Record<string, { title: string }>;
  const procedureSlugs = Object.keys(services).filter((s) => !CONDITION_SLUGS.includes(s));

  return (
    <footer className="bg-brand text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-1">
          <img src="/images/DBM_Logo.png" alt="Dr Brett Marshall" className="h-12 w-auto mb-4" />
          <p className="text-sm text-white/70 leading-relaxed mb-5">
            Specialist obstetrician &amp; gynaecologist on the Mornington Peninsula — advanced laparoscopic and hysteroscopic surgery.
          </p>
          <div className="space-y-2 text-sm text-white/80">
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-white"><PhoneIcon className="w-4 h-4 text-accent" />{PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-white"><MailIcon className="w-4 h-4 text-accent" />{EMAIL}</a>
            <span className="flex items-center gap-2"><FaxIcon className="w-4 h-4 text-accent" />{FAX}</span>
            <span className="flex items-start gap-2"><MapPinIcon className="w-4 h-4 text-accent mt-0.5" />{ADDRESS}</span>
          </div>
        </div>

        {[
          { heading: "Site Links", links: [
            ["About Dr Marshall", "/about"], ["Patient Information", "/patient-information"],
            ["Services", "/our-services"], ["FAQs", "/frequently-asked-questions-faq"],
            ["Contact Us", "/contact"], ["Privacy Policy", "/privacy-policy"], ["Disclaimer", "/disclaimer"],
          ]},
          { heading: "For Patients", links: [
            ["Patient Information & Forms", "/patient-information"], ["About your visit", "/about-your-visit"],
            ["Request an Appointment", "/request-an-appointment"], ["New Patient Form", "/patient-forms/new-patient-form"],
          ]},
          { heading: "For Doctors", links: [
            ["Refer a Patient", "/refer-a-patient"], ["Photo Gallery", "/for-doctors"],
          ]},
          { heading: "Conditions", links: CONDITION_SLUGS.slice(0, 8).map((s) => [services[s]?.title || s, `/services/${s}`]) },
        ].map((col) => (
          <div key={col.heading}>
            <h4 className="font-sans text-accent text-sm font-semibold uppercase tracking-wider mb-4">{col.heading}</h4>
            <ul className="space-y-2.5">
              {col.links.map(([label, href]) => (
                <li key={label}><a href={href} className="text-sm text-white/80 hover:text-white transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Dr Brett Marshall · MBBS FRANZCOG · AHPRA registered specialist</p>
          <div className="flex items-center gap-4">
            <a href="/privacy-policy" className="hover:text-white">Privacy</a>
            <a href="/disclaimer" className="hover:text-white">Disclaimer</a>
            <a href="/terms-conditions" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Dr Brett Marshall — Specialist Obstetrician &amp; Gynaecologist</title>
        <meta name="description" content="Dr Brett Marshall provides expert gynaecological care on the Mornington Peninsula. Consulting in Frankston, operating at Peninsula Private and Beleura Private Hospitals." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${fraunces.variable} ${inter.variable} bg-white text-ink antialiased min-h-screen flex flex-col`}>
        {/* Top bar — contact strip */}
        <div className="bg-brand text-white/90 text-xs hidden md:block">
          <div className="max-w-[1200px] mx-auto flex items-center px-6 py-2 gap-6">
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-white transition-colors"><PhoneIcon className="w-3.5 h-3.5 text-accent" />{PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-1.5 hover:text-white transition-colors"><MailIcon className="w-3.5 h-3.5 text-accent" />{EMAIL}</a>
            <span className="ml-auto flex items-center gap-1.5"><MapPinIcon className="w-3.5 h-3.5 text-accent" />{ADDRESS}</span>
          </div>
        </div>

        {/* Header */}
        <header className={`bg-white sticky top-0 z-50 transition-shadow ${scrolled ? "shadow-md" : "border-b border-line"}`}>
          <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-3 py-3 flex-shrink-0">
              <img src="/images/DBM_Logo.png" alt="Dr Brett Marshall" className="h-12 w-auto" />
              <span className="leading-tight">
                <span className="block font-serif text-lg font-semibold text-brand">Dr Brett Marshall</span>
                <span className="block text-[11px] uppercase tracking-widest text-muted">MBBS FRANZCOG</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center">
              {NAV.map((item) => item.children ? (
                <div key={item.label} className="relative group">
                  <button className="flex items-center gap-1 px-3.5 py-6 text-[15px] text-ink hover:text-brand transition-colors">
                    {item.label}
                    <ChevronDownIcon className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-all" />
                  </button>
                  <div className="absolute top-full left-0 min-w-[260px] bg-white border border-line shadow-lg rounded-sm py-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 focus-within:opacity-100 focus-within:visible focus-within:translate-y-0 transition-all duration-150 z-50">
                    {item.children.map((c) => (
                      <Link key={c.label} href={c.href} className="flex items-center justify-between px-5 py-2.5 text-sm text-ink/80 hover:text-brand hover:bg-surface-muted transition-colors">
                        {c.label}
                        {c.note && <span className="text-[10px] uppercase tracking-wider text-muted">{c.note}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.label} href={item.href!} className="px-3.5 py-6 text-[15px] text-ink hover:text-brand transition-colors">
                  {item.label}
                </Link>
              ))}

              <Link href="/request-an-appointment" className="ml-4 bg-brand text-white px-5 py-2.5 text-sm font-semibold rounded-sm hover:bg-brand-light transition-colors inline-flex items-center gap-2">
                Request Appointment <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </nav>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-brand p-2" aria-label="Menu">
              {mobileOpen ? <XIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
            </button>
          </div>

          {mobileOpen && (
            <div className="lg:hidden bg-white border-t border-line max-h-[80vh] overflow-y-auto">
              <nav className="px-6 py-4">
                {NAV.map((item) => (
                  <div key={item.label} className="border-b border-line last:border-0">
                    {item.children ? (
                      <MobileAccordion item={item} />
                    ) : (
                      <Link href={item.href!} onClick={() => setMobileOpen(false)} className="block py-3.5 text-base text-ink hover:text-brand">{item.label}</Link>
                    )}
                  </div>
                ))}
                <Link href="/request-an-appointment" onClick={() => setMobileOpen(false)} className="mt-4 bg-brand text-white px-5 py-3 rounded-sm font-semibold text-center block">
                  Request Appointment
                </Link>
              </nav>
            </div>
          )}
        </header>

        <main className="flex-1">
          <Component {...pageProps} />
        </main>

        <Footer />
      </div>
    </>
  );
}

function MobileAccordion({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-3.5 text-base text-ink">
        {item.label}
        <ChevronDownIcon className={`w-4 h-4 text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-3 space-y-1">
          {item.children!.map((c) => (
            <Link key={c.label} href={c.href} className="block pl-4 py-2 text-[15px] text-ink/80 hover:text-brand">
              {c.label}
              {c.note && <span className="ml-2 text-[10px] uppercase tracking-wider text-muted">{c.note}</span>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
