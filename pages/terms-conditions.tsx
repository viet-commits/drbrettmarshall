import Head from "next/head";

export default function TermsConditions() {
  return (
    <>
      <Head><title>Terms & Conditions — Dr Brett Marshall</title></Head>
      <div className="bg-gray-50 border-b"><div className="max-w-[1200px] mx-auto px-4 py-8"><h1 className="text-[29px] font-semibold text-[#253d47]">Terms & Conditions</h1><div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#253d47]">Home</a> / Terms & Conditions</div></div></div>
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2"><div className="text-lg leading-relaxed text-gray-800 space-y-4">
            <h2 className="text-lg font-semibold text-[#253d47]">1. General Provisions</h2>
            <p>These Terms of Use constitute an agreement made by and between Dr Brett Marshall and you. This agreement contains the terms and conditions that govern your use of this website.</p>
            <p>By accessing, visiting, browsing, using or attempting to interact with any part of this website, you agree that you have read, understand and agree to be bound by these terms and conditions.</p>
            <h2 className="text-lg font-semibold text-[#253d47] !mt-8">2. Medical Disclaimer</h2>
            <p>All information contained on this website is intended for informational and educational purposes only. The information is not intended nor suited to be a replacement or substitute for professional medical treatment or for professional medical advice relative to a specific medical question or condition.</p>
            <p>We urge you to always seek the advice of your physician or medical professional with respect to your medical condition or questions.</p>
            <h2 className="text-lg font-semibold text-[#253d47] !mt-8">3. Privacy</h2>
            <p>We take our obligations under the Victorian Health Records Act 2001 and the Commonwealth Privacy Act 1988 seriously. See our <a href="/privacy-policy" className="text-[#253d47] hover:underline">Privacy Policy</a>.</p>
            <h2 className="text-lg font-semibold text-[#253d47] !mt-8">4. Intellectual Property</h2>
            <p>All content on this site is the property of Dr Brett Marshall and is protected by Australian and international copyright laws.</p>
            <h2 className="text-lg font-semibold text-[#253d47] !mt-8">5. Limitation of Liability</h2>
            <p>Dr Brett Marshall shall not be liable for any damages whatsoever arising out of the use of, or inability to use, this website.</p>
          </div></div>
          <aside className="lg:col-span-1"><div className="sticky top-24"><div className="bg-[#253d47] text-white p-6 rounded-sm"><h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Contact Us</h3><p className="text-sm text-white/80 mb-4">Suite 3, 7 Foot Street, Frankston VIC 3199</p><a href="tel:+613****6411" className="block text-center bg-white text-[#253d47] px-4 py-2.5 rounded-sm text-sm font-semibold hover:bg-gray-100 transition-colors">03 9776 6411</a></div></div></aside>
        </div>
      </div>
    </>
  );
}
