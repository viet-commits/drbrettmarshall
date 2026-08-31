import Head from "next/head";
import Link from "next/link";
import { PageHeader } from "../components/ui";
import { PhoneIcon, ArrowRightIcon } from "../components/icons";

const sections = [
  {
    heading: "Appointments",
    content: [
      "A referral from your GP or specialist is required prior to making an appointment. Before your first appointment, we will send you an information pack which includes a new patient form to be filled in prior to your appointment. Alternatively, you can choose to fill out and submit the new patient form online here (secure page).",
      "If you have previously seen another doctor for the same issues or condition, please bring any investigation results (e.g. CT scans, MRI scans, ultrasounds, blood tests) and any relevant reports. It is also helpful to know your medical history, including any previous surgeries.",
    ],
  },
  {
    heading: "What to Bring",
    content: [
      "A valid referral from your GP or specialist",
      "Medicare card and any private health insurance details",
      "A list of current medications (or bring the actual medication packaging)",
      "Any relevant test results, X-rays, scans, or reports",
      "Your appointment diary or mobile phone to schedule follow-ups",
    ],
  },
  {
    heading: "Payment and Fees",
    content: [
      "Payment is required on the day of your consultation. We accept EFTPOS, Visa and Mastercard. We do not accept American Express or Diners Club.",
      "A Medicare rebate is available for consultations with a current referral. Your rebate can be processed electronically into your nominated bank account at the time of payment.",
      "If you hold private health insurance, please check with your fund regarding your level of cover for outpatient consultations.",
    ],
  },
  {
    heading: "Cancellation Policy",
    content: [
      "If you are unable to attend your appointment, please notify us at least 24 hours in advance so that we can offer your appointment time to another patient. A cancellation fee may apply for late cancellations or missed appointments.",
    ],
  },
  {
    heading: "Parking",
    content: [
      "Free parking is available at the rear of the building. Enter via Foot Street and follow the driveway to the rear car park. Disabled parking is also available.",
    ],
  },
  {
    heading: "Hospital Affiliations",
    content: [
      "Dr Marshall operates at Peninsula Private Hospital (Frankston), Beleura Private Hospital (Mornington), Cabrini Hospital (Melbourne), and is a senior consultant at the Royal Women's Hospital (Melbourne).",
      "If surgery is required, Marion (Dr Marshall's secretary) will provide you with all the necessary information regarding hospital admission, fasting instructions, and what to expect on the day of your procedure.",
    ],
  },
];

export default function AboutYourVisit() {
  return (
    <>
      <Head>
        <title>About Your Visit — Dr Brett Marshall</title>
        <meta name="description" content="What to expect at your appointment with Dr Brett Marshall — referrals, parking, fees, and preparation." />
      </Head>

      <PageHeader title="About Your Visit" />

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-serif text-2xl font-semibold text-brand mb-1">{section.heading}</h2>
                <div className="w-10 h-px bg-accent mb-5" />
                <div className="text-lg leading-relaxed text-ink/90 space-y-3">
                  {section.content.map((p, j) => (
                    <p key={j} className={section.heading === "What to Bring" ? "flex items-start gap-3" : ""}>
                      {section.heading === "What to Bring" && <span className="text-accent mt-2">—</span>}
                      <span>{p}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-brand text-white p-6 rounded-sm">
                <h3 className="font-serif text-lg font-semibold mb-2">Ready to Book?</h3>
                <p className="text-sm text-white/75 mb-5">Contact our practice to schedule your appointment.</p>
                <a href="tel:+61397766411" className="flex items-center justify-center gap-2 bg-white text-brand px-4 py-3 rounded-sm text-sm font-semibold hover:bg-accent/20 hover:text-white transition-colors">
                  <PhoneIcon className="w-4 h-4" /> 03 9776 6411
                </a>
              </div>
              <div className="bg-surface-muted border border-line rounded-sm p-6">
                <h3 className="font-serif text-lg font-semibold text-brand mb-4">Quick Links</h3>
                <ul className="space-y-2 text-[15px]">
                  <li><Link href="/patient-forms" className="text-ink/75 hover:text-brand">Patient Forms</Link></li>
                  <li><Link href="/frequently-asked-questions-faq" className="text-ink/75 hover:text-brand">FAQs</Link></li>
                  <li><Link href="/contact" className="text-ink/75 hover:text-brand">Contact & Location</Link></li>
                  <li><Link href="/our-services" className="text-ink/75 hover:text-brand">Our Services</Link></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
