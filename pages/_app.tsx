import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Dr Brett Marshall — Specialist Obstetrician & Gynaecologist</title>
        <meta name="description" content="Dr Brett Marshall provides expert gynaecological care on the Mornington Peninsula. Consulting in Frankston, operating at Peninsula Private and Beleura Private Hospitals." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ fontFamily: "'Open Sans', sans-serif" }} className="bg-white text-gray-700 antialiased min-h-screen flex flex-col">
        
        {/* Top Bar */}
        <div className="bg-[#1a3a4a] text-white text-sm hidden md:block">
          <div className="max-w-[1200px] mx-auto flex items-center px-4 py-2 gap-6">
            <a href="/request-an-appointment" className="hover:opacity-80 transition-opacity">
              <span className="font-medium">Appointments</span>
              <span className="ml-1 opacity-60">›</span>
            </a>
            <a href="tel:+613****6411" className="hover:opacity-80 transition-opacity">
              <span className="font-medium">03 9776 6411</span>
              <span className="ml-1 opacity-60">›</span>
            </a>
            <a href="/contact" className="hover:opacity-80 transition-opacity text-right ml-auto">
              <span className="font-medium">Suite 3, 7 Foot Street, Frankston, VIC 3199</span>
              <span className="ml-1 opacity-60">›</span>
            </a>
          </div>
        </div>

        {/* Header */}
        <header className="bg-white sticky top-0 z-50 shadow-sm">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4">
            <a href="/" className="flex-shrink-0 py-3">
              <img src="/images/DBM_Logo.png" alt="Dr Brett Marshall" className="h-16 w-auto" />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center text-sm font-semibold uppercase tracking-wide">
              <a href="/about" className="px-3 py-6 hover:text-[#1a3a4a] transition-colors">About</a>
              
              <Dropdown label="Patient Information">
                <a href="/about-your-visit" className="block px-4 py-2 text-gray-600 hover:text-[#1a3a4a] hover:bg-gray-50 normal-case font-normal text-sm">About Your Visit</a>
                <a href="/request-an-appointment" className="block px-4 py-2 text-gray-600 hover:text-[#1a3a4a] hover:bg-gray-50 normal-case font-normal text-sm">Request an Appointment</a>
                <a href="/our-services" className="block px-4 py-2 text-gray-600 hover:text-[#1a3a4a] hover:bg-gray-50 normal-case font-normal text-sm">Operations and Conditions</a>
                <div className="border-t my-1" />
                <div className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase">Patient Forms</div>
                <a href="/patient-forms/new-patient-form" className="block px-4 py-2 text-gray-600 hover:text-[#1a3a4a] hover:bg-gray-50 normal-case font-normal text-sm">New Patient Form</a>
                <a href="/download/73416/?tmstv=1689550320" target="_blank" className="block px-4 py-2 text-gray-600 hover:text-[#1a3a4a] hover:bg-gray-50 normal-case font-normal text-sm">Pelvic Floor Questionnaire</a>
              </Dropdown>

              <Dropdown label="Services">
                <a href="/our-services" className="block px-4 py-2 text-gray-600 hover:text-[#1a3a4a] hover:bg-gray-50 normal-case font-normal text-sm">Conditions Treated</a>
                <a href="/our-services#treatments" className="block px-4 py-2 text-gray-600 hover:text-[#1a3a4a] hover:bg-gray-50 normal-case font-normal text-sm">Procedures and Treatments</a>
                <a href="#" className="block px-4 py-2 text-gray-400 italic hover:bg-gray-50 normal-case font-normal text-sm">TeleHealth — Coming Soon</a>
                <div className="border-t my-1" />
                <a href="/frequently-asked-questions-faq" className="block px-4 py-2 text-gray-600 hover:text-[#1a3a4a] hover:bg-gray-50 normal-case font-normal text-sm">FAQs</a>
              </Dropdown>

              <a href="/frequently-asked-questions-faq" className="px-3 py-6 hover:text-[#1a3a4a] transition-colors">FAQs</a>

              <Dropdown label="For Doctors">
                <a href="/for-doctors" className="block px-4 py-2 text-gray-600 hover:text-[#1a3a4a] hover:bg-gray-50 normal-case font-normal text-sm">Photo Gallery</a>
                <a href="/refer-a-patient" className="block px-4 py-2 text-gray-600 hover:text-[#1a3a4a] hover:bg-gray-50 normal-case font-normal text-sm">Refer a Patient</a>
              </Dropdown>

              <a href="/contact" className="ml-3 bg-[#1a3a4a] text-white px-5 py-2 rounded-sm hover:bg-[#2a4a5a] transition-colors">CONTACT</a>
              <a href="/search" className="ml-2 px-2 py-6 text-lg hover:text-[#1a3a4a] transition-colors" title="Search">🔍</a>
            </nav>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-[#1a3a4a] text-2xl px-2">
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div className="lg:hidden bg-white border-t px-4 py-4 space-y-2 text-sm font-medium">
              <a href="/about" className="block py-2">About</a>
              <a href="/patient-information" className="block py-2">Patient Information</a>
              <a href="/our-services" className="block py-2">Services</a>
              <a href="/frequently-asked-questions-faq" className="block py-2">FAQs</a>
              <a href="/for-doctors" className="block py-2">For Doctors</a>
              <a href="/contact" className="block py-2 text-[#1a3a4a] font-bold">CONTACT</a>
            </div>
          )}
        </header>

        <main className="flex-1">
          <Component {...pageProps} />
        </main>

        {/* Footer */}
        <footer className="bg-[#101820] text-white mt-16">
          <div className="max-w-[1200px] mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
              <div>
                <img src="/images/DBM_Logo-uai-258x72.png" alt="Dr Brett Marshall" className="h-12 w-auto mb-4 brightness-0 invert opacity-80" />
                <p className="text-sm text-gray-400 leading-relaxed">
                  Specialist Obstetrician & Gynaecologist<br />
                  Suite 3, 7 Foot Street, Frankston VIC 3199<br />
                  <a href="tel:+613****6411" className="hover:text-white">03 9776 6411</a>
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-300">Quick Links</h4>
                <ul className="text-sm text-gray-400 space-y-1.5">
                  <li><a href="/about" className="hover:text-white transition-colors">About Dr Marshall</a></li>
                  <li><a href="/our-services" className="hover:text-white transition-colors">Our Services</a></li>
                  <li><a href="/patient-information" className="hover:text-white transition-colors">Patient Information</a></li>
                  <li><a href="/request-an-appointment" className="hover:text-white transition-colors">Request Appointment</a></li>
                  <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-300">Professional Associations</h4>
                <div className="grid grid-cols-3 gap-3">
                  <img src="/images/eshrelogo-uai-258x103.png" alt="ESHRE" className="h-12 w-auto object-contain" />
                  <img src="/images/ama_logo250-uai-258x103.png" alt="AMA" className="h-12 w-auto object-contain" />
                  <img src="/images/ranzcog-uai-258x103.png" alt="RANZCOG" className="h-12 w-auto object-contain" />
                  <img src="/images/ASCCP-textlogo-.jpg-uai-258x103.png" alt="ASCCP" className="h-12 w-auto object-contain" />
                  <img src="/images/ISGE_logo_blauw_440x164-300x112-300x112-uai-258x103.png" alt="ISGE" className="h-12 w-auto object-contain" />
                  <img src="/images/ages-logo-content-uai-258x103.png" alt="AGES" className="h-12 w-auto object-contain" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 text-center text-xs text-gray-500 py-4 space-x-4">
            <span>&copy; {new Date().getFullYear()} Dr Brett Marshall</span>
            <a href="/privacy-policy" className="hover:text-gray-300">Privacy Policy</a>
            <span>·</span>
            <a href="/disclaimer" className="hover:text-gray-300">Disclaimer</a>
            <span>·</span>
            <a href="/terms-conditions" className="hover:text-gray-300">Terms &amp; Conditions</a>
          </div>
        </footer>
      </div>
    </>
  );
}

function Dropdown({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      <span className="px-3 py-6 cursor-default group-hover:text-[#1a3a4a] transition-colors">
        {label} <span className="text-xs ml-0.5">▼</span>
      </span>
      <div className="absolute top-full left-0 mt-0 bg-white border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 min-w-[240px] z-50">
        {children}
      </div>
    </div>
  );
}
