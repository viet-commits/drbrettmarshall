import Head from "next/head";
import Link from "next/link";
import { PageHeader } from "../components/ui";
import { PhoneIcon } from "../components/icons";

function LegalSidebar() {
  return (
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
  );
}

export default function Disclaimer() {
  return (
    <>
      <Head><title>Disclaimer — Dr Brett Marshall</title></Head>
      <PageHeader title="Disclaimer" />
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 text-lg leading-relaxed text-ink/85 space-y-5">
            <p className="font-serif text-xl font-semibold text-brand">drbrettmarshall.com.au</p>
            <p>All information contained on this website is intended for informational and educational purposes. The information is not intended nor suited to be a replacement or substitute for professional medical treatment or for professional medical advice relative to a specific medical question or condition.</p>
            <p>We urge you to always seek the advice of your physician or medical professional with respect to your medical condition or questions. As a recipient of information from this website, you are not establishing a doctor/patient relationship with any physician.</p>
            <p>Whilst we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, Dr Brett Marshall is not responsible for any errors or omissions, or for the results obtained from the use of this information.</p>
            <p>All information in this site is provided &quot;as is&quot;, with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied.</p>
          </div>
          <LegalSidebar />
        </div>
      </div>
    </>
  );
}
