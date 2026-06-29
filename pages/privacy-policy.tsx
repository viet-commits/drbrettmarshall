import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head><title>Privacy Policy — Dr Brett Marshall</title></Head>
      <div className="bg-gray-50 border-b"><div className="max-w-[1200px] mx-auto px-4 py-8"><h1 className="text-[29px] font-semibold text-[#253d47]">Privacy Policy</h1><div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#253d47]">Home</a> / Privacy Policy</div></div></div>
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2"><div className="text-lg leading-relaxed text-gray-800 space-y-4">
            <p>Peninsula Obstetrics &amp; Gynaecology takes its obligations under the Victorian Health Records Act 2001 and the Commonwealth Privacy Act 1988 seriously. This policy sets out how we protect the privacy of the personal information we hold.</p>
            <h2 className="text-lg font-semibold text-[#253d47] !mt-8">Collection of Information</h2>
            <p>We collect personal information from patients and other individuals for the purpose of providing healthcare services. This information may include your name, address, date of birth, contact details, medical history, and other health information. We collect this information directly from you, from your referring doctor, or from other healthcare providers involved in your care.</p>
            <h2 className="text-lg font-semibold text-[#253d47] !mt-8">Use and Disclosure</h2>
            <p>Your personal information is used for the purpose of providing healthcare services to you, including diagnosis, treatment, and ongoing care. We may also use your information for billing, administrative purposes, and quality assurance activities. We will not disclose your personal information to third parties without your consent, except where required by law.</p>
            <h2 className="text-lg font-semibold text-[#253d47] !mt-8">Data Security</h2>
            <p>We take reasonable steps to protect the personal information we hold from misuse, loss, unauthorised access, modification, or disclosure.</p>
            <h2 className="text-lg font-semibold text-[#253d47] !mt-8">Access and Correction</h2>
            <p>You have the right to access your personal information held by us and to request corrections. Please contact our practice to make such a request.</p>
            <h2 className="text-lg font-semibold text-[#253d47] !mt-8">Contact</h2>
            <p>For questions about this privacy policy, contact us at Suite 3, 7 Foot Street, Frankston VIC 3199 or call 03 9776 6411.</p>
          </div></div>
          <aside className="lg:col-span-1"><div className="sticky top-24"><div className="bg-[#253d47] text-white p-6 rounded-sm"><h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Contact Us</h3><p className="text-sm text-white/80 mb-4">Suite 3, 7 Foot Street, Frankston VIC 3199</p><a href="tel:+613****6411" className="block text-center bg-white text-[#253d47] px-4 py-2.5 rounded-sm text-sm font-semibold hover:bg-gray-100 transition-colors">03 9776 6411</a></div></div></aside>
        </div>
      </div>
    </>
  );
}
