import Head from "next/head";
import Link from "next/link";
import { PageHeader, ContactRow } from "../components/ui";
import { PhoneIcon, FaxIcon, MapPinIcon, InfoIcon, HospitalIcon, ArrowRightIcon } from "../components/icons";

const hospitals = [
  "Peninsula Private Hospital, Frankston",
  "Beleura Private Hospital, Mornington",
  "Royal Women's Hospital, Melbourne",
  "Cabrini Hospital, Melbourne",
];

export default function RequestAppointment() {
  return (
    <>
      <Head>
        <title>Request an Appointment — Dr Brett Marshall</title>
        <meta name="description" content="Request an appointment with Dr Brett Marshall — specialist gynaecologist on the Mornington Peninsula. Phone 03 9776 6411." />
      </Head>

      <PageHeader title="Request an Appointment" />

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white border border-line rounded-sm p-8 md:p-12">
              <h2 className="font-serif text-2xl font-semibold text-brand mb-8">Contact information</h2>
              <div className="space-y-7">
                <ContactRow icon={<MapPinIcon className="w-5 h-5" />} label="Address">
                  Suite 3, 7 Foot Street<br />Frankston VIC 3199
                </ContactRow>
                <ContactRow icon={<PhoneIcon className="w-5 h-5" />} label="Phone">
                  <a href="tel:+61397766411" className="text-brand font-medium hover:underline">03 9776 6411</a>
                  <p className="text-sm text-muted mt-0.5">For all appointments and enquiries</p>
                </ContactRow>
                <ContactRow icon={<FaxIcon className="w-5 h-5" />} label="Fax">
                  03 9039 5060
                </ContactRow>
                <ContactRow icon={<InfoIcon className="w-5 h-5" />} label="Referral Required">
                  A referral from your GP or specialist is required prior to making an appointment. Patients may phone to book with Marion, who has worked with Dr Marshall for over 20 years and has a nursing background.
                </ContactRow>
              </div>

              <div className="mt-10 p-6 bg-brand/5 rounded-sm border border-brand/10">
                <p className="text-[15px] text-ink/85 leading-relaxed">
                  Before your first appointment, we will send you an information pack which includes a new patient form. You can also{" "}
                  <Link href="/patient-forms/new-patient-form" className="text-brand font-semibold hover:underline">complete the new patient form online here</Link>.
                </p>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-brand text-white p-6 rounded-sm">
                <h3 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2"><HospitalIcon className="w-5 h-5 text-accent" /> Operating at</h3>
                <ul className="space-y-2.5 text-[15px] text-white/85">
                  {hospitals.map((h) => <li key={h} className="flex items-start gap-2"><span className="text-accent">—</span>{h}</li>)}
                </ul>
              </div>
              <div className="bg-surface-muted border border-line rounded-sm p-6">
                <h3 className="font-serif text-lg font-semibold text-brand mb-4">Quick Links</h3>
                <ul className="space-y-2 text-[15px]">
                  <li><Link href="/about-your-visit" className="text-ink/75 hover:text-brand">About Your Visit</Link></li>
                  <li><Link href="/patient-forms" className="text-ink/75 hover:text-brand">Patient Forms</Link></li>
                  <li><Link href="/frequently-asked-questions-faq" className="text-ink/75 hover:text-brand">FAQs</Link></li>
                  <li><Link href="/contact" className="text-ink/75 hover:text-brand">Contact & Map</Link></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
