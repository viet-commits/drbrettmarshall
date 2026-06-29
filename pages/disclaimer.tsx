import Head from "next/head";

export default function Disclaimer() {
  return (
    <>
      <Head><title>Disclaimer — Dr Brett Marshall</title></Head>
      <div className="bg-gray-50 border-b"><div className="max-w-[1200px] mx-auto px-4 py-8"><h1 className="text-[29px] font-semibold text-[#253d47]">Disclaimer</h1><div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#253d47]">Home</a> / Disclaimer</div></div></div>
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2"><div className="text-lg leading-relaxed text-gray-800 space-y-4">
            <p className="font-semibold text-[#253d47]">drbrettmarshall.com.au</p>
            <p>All information contained on this website is intended for informational and educational purposes. The information is not intended nor suited to be a replacement or substitute for professional medical treatment or for professional medical advice relative to a specific medical question or condition.</p>
            <p>We urge you to always seek the advice of your physician or medical professional with respect to your medical condition or questions. As a recipient of information from this website, you are not establishing a doctor/patient relationship with any physician.</p>
            <p>Whilst we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, Dr Brett Marshall is not responsible for any errors or omissions, or for the results obtained from the use of this information.</p>
            <p>All information in this site is provided &quot;as is&quot;, with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied.</p>
          </div></div>
          <aside className="lg:col-span-1"><div className="sticky top-24"><div className="bg-[#253d47] text-white p-6 rounded-sm"><h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Contact Us</h3><p className="text-sm text-white/80 mb-4">Suite 3, 7 Foot Street, Frankston VIC 3199</p><a href="tel:+613****6411" className="block text-center bg-white text-[#253d47] px-4 py-2.5 rounded-sm text-sm font-semibold hover:bg-gray-100 transition-colors">03 9776 6411</a></div></div></aside>
        </div>
      </div>
    </>
  );
}
