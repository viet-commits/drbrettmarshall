import { useState } from "react";
import Head from "next/head";

interface QA { question: string; answer: string[]; }

const faqs: QA[] = [
  {
    question: "What should I bring to my first appointment?",
    answer: [
      "A referral from your General Practitioner or family doctor",
      "Your Medicare and your insurance information",
      "A list of any medications you are currently taking (or bring the actual medication packaging)",
      "Any relevant X-rays, scans, or test results",
      "Your appointment diary or mobile phone with calendar to schedule any follow-up procedures",
      "If applicable, any private health insurance details",
    ],
  },
  {
    question: "Should I still come to my appointment if I have my period?",
    answer: ["It depends what procedure you are having done. Call the practice before your appointment to find out more."],
  },
  {
    question: "What if I need to go to hospital?",
    answer: ["If you need to have surgery, you can book your surgical appointment with Marion after your consultation. Bring your appointment diary (or mobile phone with calendar) so you can schedule your surgery in."],
  },
  {
    question: "Will my medical records be kept private and confidential?",
    answer: [
      "The contents of your medical file will not be released without your signed consent.",
      "Your medical records are handled with the utmost respect for your privacy.",
      "We uphold strict confidentiality requirements regarding your medical records.",
    ],
  },
  {
    question: "Can my partner/support person come with me to my appointment?",
    answer: ["Yes, your partner / support person is welcome to come with you."],
  },
  {
    question: "How long after surgery may I have intercourse, wear tampons, go swimming?",
    answer: [
      "It depends on your operation.",
      "D & C, hysteroscopy, laser laparoscopy — 2 weeks",
      "Laser to cervix, LLETZ procedures — 2 weeks",
      "Major surgery such as hysterectomy — 4 to 6 weeks",
    ],
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>Frequently Asked Questions — Dr Brett Marshall</title>
        <meta name="description" content="Answers to common questions about appointments, surgery, and gynaecological care at Dr Brett Marshall's practice." />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-[29px] font-semibold text-[#253d47]">Frequently Asked Questions</h1>
          <div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#253d47]">Home</a> / FAQs</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-light text-[#253d47] mb-8">Answers to some of our most common questions</h2>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-sm overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full text-left px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#253d47] text-white flex items-center justify-center text-sm font-bold">A</span>
                    <span className="font-medium text-[#253d47] text-sm pt-1 flex-1">{faq.question}</span>
                    <span className="flex-shrink-0 text-gray-400 text-lg pt-0.5">{openIndex === i ? "−" : "+"}</span>
                  </button>
                  {openIndex === i && (
                    <div className="px-6 pb-5">
                      <div className="text-lg leading-relaxed text-gray-800 ml-12 space-y-2">
                        {faq.answer.map((line, j) => (
                          <p key={j}>{line}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#253d47] text-white p-6 rounded-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Still Have Questions?</h3>
                <p className="text-sm text-white/80 mb-4">Contact our practice directly — our staff are happy to help.</p>
                <a href="tel:+613****6411" className="block text-center bg-white text-[#253d47] px-4 py-2.5 rounded-sm text-sm font-semibold hover:bg-gray-100 transition-colors">Call 03 9776 6411</a>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-sm p-6">
                <h3 className="font-semibold text-[#253d47] text-sm uppercase tracking-wider mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about-your-visit" className="text-gray-600 hover:text-[#253d47]">About Your Visit</a></li>
                  <li><a href="/request-an-appointment" className="text-gray-600 hover:text-[#253d47]">Request Appointment</a></li>
                  <li><a href="/patient-forms" className="text-gray-600 hover:text-[#253d47]">Patient Forms</a></li>
                  <li><a href="/contact" className="text-gray-600 hover:text-[#253d47]">Contact</a></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
