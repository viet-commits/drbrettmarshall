import Head from "next/head";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact — Dr Brett Marshall</title>
        <meta name="description" content="Contact Dr Brett Marshall's practice — Suite 3, 7 Foot Street, Frankston VIC 3199. Phone 03 9776 6411." />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-light text-[#1a3a4a]">Contact</h1>
          <div className="text-xs text-gray-400 mt-1">
            <a href="/" className="hover:text-[#1a3a4a]">Home</a> / Contact
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div>
            <h2 className="text-xl font-light text-[#1a3a4a] mb-6">Get In Touch</h2>

            <div className="space-y-6 text-sm text-gray-600">
              <div className="flex gap-4">
                <div className="text-[#1a3a4a] text-lg flex-shrink-0 mt-0.5">📍</div>
                <div>
                  <h3 className="font-semibold text-[#1a3a4a] mb-1">Address</h3>
                  <p>Suite 3, 7 Foot Street<br />Frankston VIC 3199</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-[#1a3a4a] text-lg flex-shrink-0 mt-0.5">📞</div>
                <div>
                  <h3 className="font-semibold text-[#1a3a4a] mb-1">Phone</h3>
                  <a href="tel:+613****6411" className="hover:underline">03 9776 6411</a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-[#1a3a4a] text-lg flex-shrink-0 mt-0.5">📠</div>
                <div>
                  <h3 className="font-semibold text-[#1a3a4a] mb-1">Fax</h3>
                  <p>03 9776 6498</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-[#1a3a4a] text-lg flex-shrink-0 mt-0.5">🏥</div>
                <div>
                  <h3 className="font-semibold text-[#1a3a4a] mb-1">Operating At</h3>
                  <ul className="space-y-1">
                    <li>Peninsula Private Hospital, Langwarrin</li>
                    <li>Beleura Private Hospital, Mornington</li>
                    <li>Royal Women&apos;s Hospital, Melbourne</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="/request-an-appointment"
                className="inline-block bg-[#1a3a4a] text-white px-8 py-3 rounded-sm font-semibold text-sm uppercase tracking-wider hover:bg-[#2a4a5a] transition-colors"
              >
                Request an Appointment
              </a>
            </div>
          </div>

          {/* Map placeholder — would embed Google Maps in production */}
          <div className="bg-gray-100 rounded-sm flex items-center justify-center" style={{ minHeight: "400px" }}>
            <div className="text-center text-gray-400 p-8">
              <p className="text-4xl mb-3">📍</p>
              <p className="font-medium text-gray-500">Suite 3, 7 Foot Street</p>
              <p className="text-sm">Frankston VIC 3199</p>
              <a
                href="https://maps.google.com/?q=Suite+3+7+Foot+Street+Frankston+VIC+3199"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-[#1a3a4a] text-sm hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
