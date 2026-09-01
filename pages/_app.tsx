import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Spectral, Inter } from "next/font/google";
import cleanContent from "../data/clean_content.json";
import { PhoneIcon, MapPinIcon, ChevronDownIcon, MenuIcon, XIcon, ArrowRightIcon } from "../components/icons";

const spectral = Spectral({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });

const CONDITION_SLUGS = [
  "abnormal-pap-smears-vulval-disorders", "adhesions", "endometriosis",
  "fibroids", "infertility", "menorrhagia-heavy-periods", "pcos",
  "pelvic-organ-prolapse", "pelvic-pain", "urinary-incontinence",
];

type NavItem = { label: string; href?: string; children?: { label: string; href: string; note?: string }[] };

const NAV: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Patient Information",
    children: [
      { label: "About Your Visit", href: "/about-your-visit" },
      { label: "Request an Appointment", href: "/request-an-appointment" },
      { label: "Operations and Conditions", href: "/our-services" },
      { label: "Patient Forms", href: "/patient-forms", note: "header" },
      { label: "New Patient Form", href: "/patient-forms/new-patient-form" },
      { label: "Pelvic Floor Questionnaire", href: "/downloads/pelvic-floor-questionnaire.pdf", note: "PDF" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Conditions Treated", href: "/our-services" },
      { label: "Procedures and Treatments", href: "/our-services#treatments" },
      { label: "TeleHealth", href: "#", note: "Coming soon" },
      { label: "FAQs", href: "/frequently-asked-questions-faq", note: "divider" },
    ],
  },
  { label: "FAQs", href: "/frequently-asked-questions-faq" },
  {
    label: "For Doctors",
    children: [
      { label: "Photo Gallery", href: "/for-doctors", note: "Private" },
      { label: "Refer a Patient", href: "/refer-a-patient" },
    ],
  },
];

function Footer() {
  const services = cleanContent.services as Record<string, { title: string }>;
  const procedureSlugs = Object.keys(services).filter((s) => !CONDITION_SLUGS.includes(s));

  const cols = [
    { heading: "Site Links", links: [
      ["About Dr Marshall", "/about"], ["Patient Information", "/patient-information"],
      ["Services", "/our-services"], ["Frequently Asked Questions", "/frequently-asked-questions-faq"],
      ["Contact Us", "/contact"], ["Disclaimer", "/disclaimer"], ["Privacy Policy", "/privacy-policy"],
    ]},
    { heading: "For Patients", links: [
      ["Patient Information & Forms", "/patient-information"], ["Operations and Conditions", "/our-services"],
      ["About your visit", "/about-your-visit"], ["New Patient Registration", "/patient-forms/new-patient-form"],
      ["Photo Gallery", "/for-doctors"],
    ]},
    { heading: "For Doctors", links: [
      ["Refer a Patient", "/refer-a-patient"], ["Photo Gallery", "/for-doctors"],
    ]},
    { heading: "Conditions Treated", links: CONDITION_SLUGS.slice(0, 8).map((s) => [services[s]?.title || s, `/services/${s}`]) },
    { heading: "Procedures", links: procedureSlugs.slice(0, 8).map((s) => [services[s]?.title || s, `/services/${s}`]) },
  ];

  return (
    <footer className="bg-brand text-white mt-16">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="text-accent text-sm font-semibold mb-4">{col.heading}</h4>
              <ul className="space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={label}><a href={href} className="text-sm text-white/85 hover:text-white hover:underline transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-sm text-white/60 py-4">
        &copy; {new Date().getFullYear()} Dr Brett Marshall. All rights reserved
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

      <div className={`${spectral.variable} ${inter.variable} bg-white text-ink antialiased min-h-screen flex flex-col`}>
        {/* Top bar */}
        <div className="bg-brand text-white/90 text-xs hidden md:block">
          <div className="max-w-[1200px] mx-auto flex items-center px-6 py-2 gap-6">
            <a href="/request-an-appointment" className="hover:text-white transition-colors">Appointments</a>
            <a href="tel:+61397766411" className="flex items-center gap-1.5 hover:text-white transition-colors"><PhoneIcon className="w-3.5 h-3.5 text-accent" />03 9776 6411</a>
            <a href="/contact" className="ml-auto flex items-center gap-1.5 hover:text-white transition-colors"><MapPinIcon className="w-3.5 h-3.5 text-accent" />Suite 3, 7 Foot Street, Frankston, VIC 3199</a>
          </div>
        </div>

        {/* Header */}
        <header className={`bg-white sticky top-0 z-50 transition-shadow ${scrolled ? "shadow-md" : "border-b border-line"}`}>
          <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6">
            <Link href="/" className="py-2.5 flex-shrink-0" aria-label="Dr Brett Marshall — home">
              <img src="/images/DBM_Logo.png" alt="Dr Brett Marshall — Specialist Obstetrician & Gynaecologist" className="h-14 w-auto" />
            </Link>

            <nav className="hidden lg:flex items-center">
              {NAV.map((item) => item.children ? (
                <div key={item.label} className="relative group">
                  <button className="flex items-center gap-1 px-3.5 py-6 text-[15px] text-ink hover:text-brand transition-colors">
                    {item.label}
                    <ChevronDownIcon className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-all" />
                  </button>
                  <div className="absolute top-full left-0 min-w-[260px] bg-white border border-line shadow-lg rounded-sm py-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 focus-within:opacity-100 focus-within:visible focus-within:translate-y-0 transition-all duration-150 z-50">
                    {item.children.map((c) => c.note === "header" ? (
                      <div key={c.label} className="px-4 py-1.5 text-[11px] font-semibold text-muted uppercase tracking-wider">{c.label}</div>
                    ) : c.note === "divider" ? (
                      <div key={c.label} className="border-t border-line my-1"><Link href={c.href} className="block px-4 py-2 text-sm text-ink/80 hover:text-brand hover:bg-surface-muted">{c.label}</Link></div>
                    ) : (
                      <Link key={c.label} href={c.href} className="flex items-center justify-between px-4 py-2 text-sm text-ink/80 hover:text-brand hover:bg-surface-muted transition-colors">
                        {c.label}
                        {c.note === "PDF" && <span className="text-[10px] uppercase tracking-wider text-muted">PDF</span>}
                        {c.note === "Coming soon" && <span className="text-[10px] italic text-muted">Coming soon</span>}
                        {c.note === "Private" && <span className="text-[10px] uppercase tracking-wider text-muted">Private</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.label} href={item.href!} className="px-3.5 py-6 text-[15px] text-ink hover:text-brand transition-colors">
                  {item.label}
                </Link>
              ))}

              <Link href="/contact" className="ml-4 bg-brand text-white px-5 py-2.5 text-sm font-semibold rounded-sm hover:bg-brand-light transition-colors inline-flex items-center gap-2">
                CONTACT <ArrowRightIcon className="w-4 h-4" />
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
