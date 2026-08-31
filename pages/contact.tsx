import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { PageHeader, ContactRow } from "../components/ui";
import { PhoneIcon, MailIcon, FaxIcon, MapPinIcon, HospitalIcon, ArrowRightIcon } from "../components/icons";

const hospitals = [
  "Peninsula Private Hospital, Frankston",
  "Beleura Private Hospital, Mornington",
  "Royal Women's Hospital, Melbourne",
  "Cabrini Hospital, Melbourne",
];

export default function ContactPage() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <>
      <Head>
        <title>Contact — Dr Brett Marshall</title>
        <meta name="description" content="Contact Dr Brett Marshall's practice — Suite 3, 7 Foot Street, Frankston VIC 3199. Phone 03 9776 6411." />
      </Head>

      <PageHeader title="Contact" />

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact details */}
          <div>
            <h2 className="font-serif text-2xl font-semibold text-brand mb-8">Get In Touch</h2>
            <div className="space-y-7">
              <ContactRow icon={<MapPinIcon className="w-5 h-5" />} label="Address">
                Suite 3, 7 Foot Street<br />Frankston VIC 3199
              </ContactRow>
              <ContactRow icon={<PhoneIcon className="w-5 h-5" />} label="Phone">
                <a href="tel:+61397766411" className="text-brand font-medium hover:underline">03 9776 6411</a>
              </ContactRow>
              <ContactRow icon={<MailIcon className="w-5 h-5" />} label="Email">
                <a href="mailto:admin@pengyn.com.au" className="text-brand font-medium hover:underline">admin@pengyn.com.au</a>
              </ContactRow>
              <ContactRow icon={<FaxIcon className="w-5 h-5" />} label="Fax">
                03 9039 5060
              </ContactRow>
              <ContactRow icon={<HospitalIcon className="w-5 h-5" />} label="Operating At">
                <ul className="space-y-1">
                  {hospitals.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </ContactRow>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/request-an-appointment" className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-sm font-semibold text-sm uppercase tracking-wide hover:bg-brand-light transition-colors">
                Request an Appointment <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Map — click to load (privacy) */}
          <div className="rounded-sm overflow-hidden border border-line bg-surface-muted flex items-center justify-center min-h-[400px]">
            {mapLoaded ? (
              <iframe
                title="Dr Brett Marshall practice location"
                src="https://www.google.com/maps?q=Suite+3,+7+Foot+Street,+Frankston+VIC+3199&output=embed"
                className="w-full h-[400px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="text-center p-10">
                <MapPinIcon className="w-10 h-10 text-brand/40 mx-auto mb-4" />
                <p className="font-medium text-brand">Suite 3, 7 Foot Street</p>
                <p className="text-sm text-muted mt-1">Frankston VIC 3199</p>
                <button
                  onClick={() => setMapLoaded(true)}
                  className="mt-6 inline-flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-sm text-sm font-semibold hover:bg-brand-light transition-colors"
                >
                  Load map
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
