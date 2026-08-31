import Head from "next/head";
import Link from "next/link";
import { PageHeader } from "../components/ui";
import { PhoneIcon } from "../components/icons";

const sections = [
  { heading: "1. General Provisions", body: ["These Terms of Use constitute an agreement made by and between Dr Brett Marshall and you. This agreement contains the terms and conditions that govern your use of this website.", "By accessing, visiting, browsing, using or attempting to interact with any part of this website, you agree that you have read, understand and agree to be bound by these terms and conditions."] },
  { heading: "2. Medical Disclaimer", body: ["All information contained on this website is intended for informational and educational purposes only. The information is not intended nor suited to be a replacement or substitute for professional medical treatment or for professional medical advice relative to a specific medical question or condition.", "We urge you to always seek the advice of your physician or medical professional with respect to your medical condition or questions."] },
  { heading: "3. Privacy", body: ["We take our obligations under the Victorian Health Records Act 2001 and the Commonwealth Privacy Act 1988 seriously. See our Privacy Policy."] },
  { heading: "4. Intellectual Property", body: ["All content on this site is the property of Dr Brett Marshall and is protected by Australian and international copyright laws."] },
  { heading: "5. Limitation of Liability", body: ["Dr Brett Marshall shall not be liable for any damages whatsoever arising out of the use of, or inability to use, this website."] },
];

export default function TermsConditions() {
  return (
    <>
      <Head><title>Terms &amp; Conditions — Dr Brett Marshall</title></Head>
      <PageHeader title="Terms & Conditions" />
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {sections.map((s) => (
              <section key={s.heading} className="mb-8">
                <h2 className="font-serif text-2xl font-semibold text-brand mb-3">{s.heading}</h2>
                {s.body.map((p, i) => <p key={i} className="text-lg leading-relaxed text-ink/85 mb-4">{p}{s.heading === "3. Privacy" && i === 0 ? <> See our <Link href="/privacy-policy" className="text-brand font-medium hover:underline">Privacy Policy</Link>.</> : null}</p>)}
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
