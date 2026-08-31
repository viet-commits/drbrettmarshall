import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { PageHeader } from "../components/ui";
import { PhoneIcon, ChevronDownIcon } from "../components/icons";

interface QA { question: string; answer: string[]; }

const faqs: QA[] = [
  { question: "What should I bring to my first appointment?", answer: [
    "A referral from your General Practitioner or family doctor",
    "Your Medicare and your insurance information",
    "A list of any medications you are currently taking (or bring the actual medication packaging)",
    "Any relevant X-rays, scans, or test results",
    "Your appointment diary or mobile phone with calendar to schedule any follow-up procedures",
    "If applicable, any private health insurance details",
  ]},
  { question: "Should I still come to my appointment if I have my period?", answer: ["It depends what procedure you are having done. Call the practice before your appointment to find out more."] },
  { question: "What if I need to go to hospital?", answer: ["If you need to have surgery, you can book your surgical appointment with Marion after your consultation. Bring your appointment diary (or mobile phone with calendar) so you can schedule your surgery in."] },
  { question: "Will my medical records be kept private and confidential?", answer: [
    "The contents of your medical file will not be released without your signed consent.",
    "Your medical records are handled with the utmost respect for your privacy.",
    "We uphold strict confidentiality requirements regarding your medical records.",
  ]},
  { question: "Can my partner/support person come with me to my appointment?", answer: ["Yes, your partner / support person is welcome to come with you."] },
  { question: "How long after surgery may I have intercourse, wear tampons, go swimming?", answer: [
    "It depends on your operation.",
    "D & C, hysteroscopy, laser laparoscopy — 2 weeks",
    "Laser to cervix, LLETZ procedures — 2 weeks",
    "Major surgery such as hysterectomy — 4 to 6 weeks",
  ]},
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <Head>
        <title>Frequently Asked Questions — Dr Brett Marshall</title>
        <meta name="description" content="Answers to common questions about appointments, surgery, and gynaecological care at Dr Brett Marshall's practice." />
      </Head>

      <PageHeader title="Frequently Asked Questions" crumb="FAQs" />

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-line rounded-sm overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    aria-expanded={openIndex === i}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-surface-muted transition-colors"
                  >
                    <span className="font-serif text-lg font-medium text-brand">{faq.question}</span>
                    <ChevronDownIcon className={`w-5 h-5 text-brand/50 flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
                  </button>
                  {openIndex === i && (
                    <div className="px-6 pb-6 border-t border-line">
                      <div className="text-[17px] leading-relaxed text-ink/85 space-y-2 pt-4">
                        {faq.answer.map((line, j) => <p key={j}>{line}</p>)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-brand text-white p-6 rounded-sm">
                <h3 className="font-serif text-lg font-semibold mb-2">Still Have Questions?</h3>
                <p className="text-sm text-white/75 mb-5">Contact our practice directly — our staff are happy to help.</p>
                <a href="tel:+61397766411" className="flex items-center justify-center gap-2 bg-white text-brand px-4 py-3 rounded-sm text-sm font-semibold hover:bg-accent/20 hover:text-white transition-colors">
                  <PhoneIcon className="w-4 h-4" /> 03 9776 6411
                </a>
              </div>
              <div className="bg-surface-muted border border-line rounded-sm p-6">
                <h3 className="font-serif text-lg font-semibold text-brand mb-4">Quick Links</h3>
                <ul className="space-y-2 text-[15px]">
                  <li><Link href="/about-your-visit" className="text-ink/75 hover:text-brand">About Your Visit</Link></li>
                  <li><Link href="/request-an-appointment" className="text-ink/75 hover:text-brand">Request Appointment</Link></li>
                  <li><Link href="/patient-forms" className="text-ink/75 hover:text-brand">Patient Forms</Link></li>
                  <li><Link href="/contact" className="text-ink/75 hover:text-brand">Contact</Link></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
