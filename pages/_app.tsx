import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Dr Brett Marshall — Specialist Obstetrician & Gynaecologist</title>
        <meta name="description" content="Dr Brett Marshall provides expert gynaecological care on the Mornington Peninsula. Consulting in Frankston." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white text-gray-800 antialiased min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="bg-[#1a3a4a] text-white text-sm">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center px-4 py-2 gap-2">
            <a href="/request-an-appointment" className="hover:underline">📅 Appointments</a>
            <a href="tel:+61397766411" className="hover:underline">📞 03 9776 6411</a>
            <span>📍 Suite 3, 7 Foot Street, Frankston VIC 3199</span>
          </div>
        </div>

        {/* Header */}
        <header className="border-b bg-white sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
            <a href="/" className="flex-shrink-0">
              <img src="/images/logo.png" alt="Dr Brett Marshall" className="h-14 w-auto" />
            </a>
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              <NavLink href="/about">About</NavLink>
              <NavLink href="/patient-information">Patient Information</NavLink>
              <NavLink href="/our-services">Services</NavLink>
              <NavLink href="/frequently-asked-questions-faq">FAQs</NavLink>
              <NavLink href="/for-doctors">For Doctors</NavLink>
              <NavLink href="/contact" className="bg-[#1a3a4a] text-white px-4 py-2 rounded hover:bg-[#2a4a5a]">CONTACT</NavLink>
            </nav>
            <a href="/contact" className="md:hidden bg-[#1a3a4a] text-white px-3 py-2 rounded text-sm">Menu ☰</a>
          </div>
        </header>

        <main className="flex-1"><Component {...pageProps} /></main>

        {/* Footer */}
        <footer className="bg-[#1a3a4a] text-white mt-16">
          <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Dr Brett Marshall</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Specialist Obstetrician & Gynaecologist providing expert care on the Mornington Peninsula.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact</h3>
              <p className="text-sm text-gray-300">
                Suite 3, 7 Foot Street<br />Frankston VIC 3199<br />
                <a href="tel:+61397766411" className="hover:underline">03 9776 6411</a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li><a href="/about" className="hover:underline">About</a></li>
                <li><a href="/our-services" className="hover:underline">Services</a></li>
                <li><a href="/request-an-appointment" className="hover:underline">Request Appointment</a></li>
                <li><a href="/contact" className="hover:underline">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#2a4a5a] text-center text-xs text-gray-400 py-4">
            &copy; {new Date().getFullYear()} Dr Brett Marshall. All rights reserved.{" "}
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a> &middot;{" "}
            <a href="/disclaimer" className="hover:underline">Disclaimer</a>
          </div>
        </footer>
      </div>
    </>
  );
}

function NavLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} className={className || "px-3 py-2 rounded hover:bg-gray-100 transition-colors"}>
      {children}
    </a>
  );
}
