import Head from "next/head";

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
      "Dr Marshall operates at Peninsula Private Hospital (Langwarrin), Beleura Private Hospital (Mornington), and is a senior consultant at the Royal Women's Hospital (Melbourne).",
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

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-[29px] font-semibold text-[#253d47]">About Your Visit</h1>
          <div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#253d47]">Home</a> / About Your Visit</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-10">
              {sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-lg font-semibold text-[#253d47] mb-1">{section.heading}</h2>
                  <div className="w-8 h-px bg-[#253d47]/30 mb-4" />
                  <div className="text-lg leading-relaxed text-gray-800 space-y-3">
                    {section.content.map((p, j) => <p key={j}>{p}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#253d47] text-white p-6 rounded-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Ready to Book?</h3>
                <p className="text-sm text-white/80 mb-4">Contact our practice to schedule your appointment.</p>
                <a href="tel:+613****6411" className="block text-center bg-white text-[#253d47] px-4 py-2.5 rounded-sm text-sm font-semibold hover:bg-gray-100 transition-colors">Call 03 9776 6411</a>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-sm p-6">
                <h3 className="font-semibold text-[#253d47] text-sm uppercase tracking-wider mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/patient-forms" className="text-gray-600 hover:text-[#253d47]">Patient Forms</a></li>
                  <li><a href="/frequently-asked-questions-faq" className="text-gray-600 hover:text-[#253d47]">FAQs</a></li>
                  <li><a href="/contact" className="text-gray-600 hover:text-[#253d47]">Contact & Location</a></li>
                  <li><a href="/our-services" className="text-gray-600 hover:text-[#253d47]">Our Services</a></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
