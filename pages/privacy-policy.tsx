import Head from "next/head";
import { PageHeader } from "../components/ui";
import { PhoneIcon } from "../components/icons";

const sections = [
  { heading: "Collection of Information", body: "We collect personal information from patients and other individuals for the purpose of providing healthcare services. This information may include your name, address, date of birth, contact details, medical history, and other health information. We collect this information directly from you, from your referring doctor, or from other healthcare providers involved in your care." },
  { heading: "Use and Disclosure", body: "Your personal information is used for the purpose of providing healthcare services to you, including diagnosis, treatment, and ongoing care. We may also use your information for billing, administrative purposes, and quality assurance activities. We will not disclose your personal information to third parties without your consent, except where required by law." },
  { heading: "Data Security", body: "We take reasonable steps to protect the personal information we hold from misuse, loss, unauthorised access, modification, or disclosure." },
  { heading: "Access and Correction", body: "You have the right to access your personal information held by us and to request corrections. Please contact our practice to make such a request." },
  { heading: "Contact", body: "For questions about this privacy policy, contact us at Suite 3, 7 Foot Street, Frankston VIC 3199 or call 03 9776 6411." },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Head><title>Privacy Policy — Dr Brett Marshall</title></Head>
      <PageHeader title="Privacy Policy" />
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="text-lg leading-relaxed text-ink/85 mb-8">Peninsula Obstetrics &amp; Gynaecology takes its obligations under the Victorian Health Records Act 2001 and the Commonwealth Privacy Act 1988 seriously. This policy sets out how we protect the privacy of the personal information we hold.</p>
            {sections.map((s) => (
              <section key={s.heading} className="mb-8">
                <h2 className="font-serif text-2xl font-semibold text-brand mb-3">{s.heading}</h2>
                <p className="text-lg leading-relaxed text-ink/85">{s.body}</p>
              </section>
            ))}
          </div>
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-brand text-white p-6 rounded-sm">
                <h3 className="font-serif text-lg font-semibold mb-2">Contact Us</h3>
                <p className="text-sm text-white/75 mb-5">Suite 3, 7 Foot Street, Frankston VIC 3199</p>
                <a href="tel:+61397766411" className="flex items-center justify-center gap-2 bg-white text-brand px-4 py-3 rounded-sm text-sm font-semibold hover:bg-accent/20 hover:text-white transition-colors">
                  <PhoneIcon className="w-4 h-4" /> 03 9776 6411
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
