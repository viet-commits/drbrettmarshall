import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import cleanContent from "../data/clean_content.json";

const CONDITION_SLUGS = [
  "abnormal-pap-smears-vulval-disorders","adhesions","endometriosis",
  "fibroids","infertility","menorrhagia-heavy-periods","pcos",
  "pelvic-organ-prolapse","pelvic-pain","urinary-incontinence"
];

function FooterLinks() {
  const services = cleanContent.services as Record<string, { title: string }>;
  const procedureSlugs = Object.keys(services).filter(s => !CONDITION_SLUGS.includes(s));
  
  const cols = [
    { heading: "Site Links", links: [
      ["About Dr Marshall","/about"],["Patient Information","/patient-information"],["Services","/our-services"],
      ["Frequently Asked Questions","/frequently-asked-questions-faq"],["Contact Us","/contact"],
      ["Disclaimer","/disclaimer"],["Privacy Policy","/privacy-policy"],
    ]},
    { heading: "For Patients", links: [
      ["Patient Information & Forms","/patient-information"],["Operations and Conditions","/our-services"],
      ["About your visit","/about-your-visit"],["New Patient Registration","/patient-forms/new-patient-form"],
      ["Photo Gallery","/for-doctors"],
    ]},
    { heading: "For Doctors", links: [
      ["Refer a Patient","/refer-a-patient"],["Photo Gallery","/for-doctors"],
    ]},
    { heading: "Conditions Treated", links: CONDITION_SLUGS.slice(0,8).map(s => [services[s]?.title || s, `/services/${s}`]) },
    { heading: "Procedures", links: procedureSlugs.slice(0,8).map(s => [services[s]?.title || s, `/services/${s}`]) },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {cols.map(col => (
          <div key={col.heading}>
            <h4 className="text-[#8bb2c4] text-lg font-semibold mb-4">{col.heading}</h4>
            <ul className="space-y-1.5">
              {col.links.map(([label, href]) => (
                <li key={label}><a href={href} className="text-base text-white/90 hover:text-white hover:underline transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Dr Brett Marshall — Specialist Obstetrician & Gynaecologist</title>
        <meta name="description" content="Dr Brett Marshall provides expert gynaecological care on the Mornington Peninsula. Consulting in Frankston, operating at Peninsula Private and Beleura Private Hospitals." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ fontFamily: "'Open Sans', sans-serif" }} className="bg-white text-gray-700 antialiased min-h-screen flex flex-col">
        
        {/* Top Bar — light bg, dark text, 12px */}
        <div className="bg-white text-[#253d47] text-xs hidden md:block border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto flex items-center px-4 py-1.5 gap-3">
            <a href="/request-an-appointment" className="hover:opacity-70 transition-opacity">
              <span>Appointments</span>
              <span className="ml-0.5 opacity-40">›</span>
            </a>
            <a href="tel:+613****6411" className="hover:opacity-70 transition-opacity">
              <span>03 9776 6411</span>
              <span className="ml-0.5 opacity-40">›</span>
            </a>
            <a href="/contact" className="hover:opacity-70 transition-opacity text-right ml-auto">
              <span>Suite 3, 7 Foot Street, Frankston, VIC 3199</span>
              <span className="ml-0.5 opacity-40">›</span>
            </a>
          </div>
        </div>

        {/* Header — nav: 18px, 400w, sentence case, no uppercase */}
        <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4">
            <a href="/" className="flex-shrink-0 py-3">
              <img src="/images/DBM_Logo.png" alt="Dr Brett Marshall" className="h-14 w-auto" />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center text-lg font-normal">
              <a href="/about" className="px-3 py-5 hover:text-[#253d47] transition-colors">About</a>
              
              <NavDropdown label="Patient Information">
                <DropdownLink href="/about-your-visit">About Your Visit</DropdownLink>
                <DropdownLink href="/request-an-appointment">Request an Appointment</DropdownLink>
                <DropdownLink href="/our-services">Operations and Conditions</DropdownLink>
                <div className="border-t border-gray-100 my-1" />
                <div className="px-4 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Patient Forms</div>
                <DropdownLink href="/patient-forms/new-patient-form">New Patient Form</DropdownLink>
                <DropdownLink href="/download/73416/?tmstv=1689550320" external>Pelvic Floor Questionnaire</DropdownLink>
              </NavDropdown>

              <NavDropdown label="Services">
                <DropdownLink href="/our-services">Conditions Treated</DropdownLink>
                <DropdownLink href="/our-services#treatments">Procedures and Treatments</DropdownLink>
                <span className="block px-4 py-2 text-gray-400 italic text-sm">TeleHealth — Coming Soon</span>
                <div className="border-t border-gray-100 my-1" />
                <DropdownLink href="/frequently-asked-questions-faq">FAQs</DropdownLink>
              </NavDropdown>

              <a href="/frequently-asked-questions-faq" className="px-3 py-5 hover:text-[#253d47] transition-colors">FAQs</a>

              <NavDropdown label="For Doctors">
                <DropdownLink href="/for-doctors">Photo Gallery</DropdownLink>
                <DropdownLink href="/refer-a-patient">Refer a Patient</DropdownLink>
              </NavDropdown>

              <a href="/contact" className="ml-3 bg-[#253d47] text-white px-4 py-1.5 text-sm font-semibold hover:bg-[#2d4d57] transition-colors">CONTACT</a>
              <a href="#" className="ml-2 px-2 py-5 text-base hover:text-[#253d47] transition-colors" title="Search">🔍</a>
            </nav>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-[#253d47] text-2xl px-2">
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div className="lg:hidden bg-white border-t px-4 py-4 space-y-1 text-sm font-medium">
              <a href="/about" className="block py-2">About</a>
              <a href="/patient-information" className="block py-2">Patient Information</a>
              <a href="/our-services" className="block py-2">Services</a>
              <a href="/frequently-asked-questions-faq" className="block py-2">FAQs</a>
              <a href="/for-doctors" className="block py-2">For Doctors</a>
              <a href="/contact" className="block py-2 text-[#253d47] font-bold">CONTACT</a>
            </div>
          )}
        </header>

        <main className="flex-1">
          <Component {...pageProps} />
        </main>

        {/* Footer — 5-column links on brand color bg */}
        <footer className="bg-[#253d47] text-white mt-16">
          <FooterLinks />
          <div className="border-t border-white/10 text-center text-sm text-gray-400 py-4">
            &copy; {new Date().getFullYear()} Dr Brett Marshall. All rights reserved
          </div>
        </footer>
      </div>
    </>
  );
}

function NavDropdown({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      <span className="px-3 py-5 cursor-default group-hover:text-[#253d47] transition-colors inline-flex items-center gap-0.5">
        {label} <span className="text-[9px] opacity-50">▼</span>
      </span>
      <div className="absolute top-full left-0 mt-0 bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 min-w-[240px] z-50 py-1">
        {children}
      </div>
    </div>
  );
}

function DropdownLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a href={href} {...props} className="block px-4 py-2 text-gray-600 hover:text-[#253d47] hover:bg-gray-50 text-sm font-normal">
      {children}
    </a>
  );
}
