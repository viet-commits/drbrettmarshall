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
        {/* Top Bar */}
        <div className="bg-[#1a3a4a] text-white text-sm hidden md:block">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2">
            <a href="tel:+613****6411" className="hover:text-gray-200 transition-colors">
              📞 03 9776 6411
            </a>
            <span>📍 Suite 3, 7 Foot Street, Frankston VIC 3199</span>
            <a href="/request-an-appointment" className="hover:text-gray-200 transition-colors">
              📅 Make an Appointment
            </a>
          </div>
        </div>

        {/* Header / Nav */}
        <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
            <a href="/" className="flex-shrink-0">
              <img src="/images/logo.png" alt="Dr Brett Marshall" className="h-14 w-auto" />
            </a>
            <nav className="hidden md:flex items-center gap-0 text-sm font-medium">
              <a href="/about" className="px-3 py-2 hover:text-[#1a3a4a] transition-colors">About</a>
              <a href="/patient-information" className="px-3 py-2 hover:text-[#1a3a4a] transition-colors">Patient Information</a>
              <a href="/our-services" className="px-3 py-2 hover:text-[#1a3a4a] transition-colors">Services</a>
              <a href="/frequently-asked-questions-faq" className="px-3 py-2 hover:text-[#1a3a4a] transition-colors">FAQs</a>
              <a href="/for-doctors" className="px-3 py-2 hover:text-[#1a3a4a] transition-colors">For Doctors</a>
              <a href="/contact" className="ml-2 bg-[#1a3a4a] text-white px-5 py-2 rounded hover:bg-[#2a4a5a] transition-colors">CONTACT</a>
            </nav>
            <a href="/contact" className="md:hidden bg-[#1a3a4a] text-white px-3 py-2 rounded text-sm">Menu ☰</a>
          </div>
        </header>

        <main className="flex-1">
          <Component {...pageProps} />
        </main>

        {/* Footer */}
        <footer className="bg-[#1a3a4a] text-white mt-16">
          <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Dr Brett Marshall</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Specialist Obstetrician & Gynaecologist providing expert care on the Mornington Peninsula since 1990.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Suite 3, 7 Foot Street<br />
                Frankston VIC 3199<br />
                <a href="tel:+613****6411" className="hover:underline">03 9776 6411</a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li><a href="/about" className="hover:underline">About Dr Marshall</a></li>
                <li><a href="/our-services" className="hover:underline">Our Services</a></li>
                <li><a href="/patient-information" className="hover:underline">Patient Information</a></li>
                <li><a href="/request-an-appointment" className="hover:underline">Request Appointment</a></li>
                <li><a href="/contact" className="hover:underline">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#2a4a5a] text-center text-xs text-gray-400 py-4 space-x-4">
            <span>&copy; {new Date().getFullYear()} Dr Brett Marshall. All rights reserved.</span>
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
            <span>·</span>
            <a href="/disclaimer" className="hover:underline">Disclaimer</a>
            <span>·</span>
            <a href="/terms-conditions" className="hover:underline">Terms & Conditions</a>
          </div>
        </footer>
      </div>
    </>
  );
}
