import Head from "next/head";

export default function ReferAPatient() {
  return (
    <>
      <Head>
        <title>Refer a Patient — Dr Brett Marshall</title>
        <meta name="description" content="Refer a patient to Dr Brett Marshall — specialist gynaecologist and laparoscopic surgeon on the Mornington Peninsula." />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-light text-[#1a3a4a]">Refer a Patient</h1>
          <div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#1a3a4a]">Home</a> / Refer a Patient</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-sm p-8 md:p-12">
              <h2 className="text-xl font-light text-[#1a3a4a] mb-8">Refer a Patient Online</h2>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <fieldset>
                  <legend className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wide mb-4 pb-2 border-b w-full">Referring Doctor</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Title *</label>
                      <select className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" defaultValue="DR">
                        <option>DR</option><option>MR</option><option>MRS</option><option>MS</option><option>PROF</option>
                      </select>
                    </div>
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">First Name *</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">Last Name *</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">Provider Number</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wide mb-4 pb-2 border-b w-full">Your Practice</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-500 mb-1">Practice Name *</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-500 mb-1">Address</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">Phone</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">Fax</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-500 mb-1">Email *</label><input type="email" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wide mb-4 pb-2 border-b w-full">Patient Details</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">First Name *</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">Last Name *</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">Date of Birth</label><input type="date" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">Medicare Number</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Clinical Notes / Reason for Referral *</label>
                      <textarea rows={4} className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" />
                    </div>
                  </div>
                </fieldset>

                <button type="submit" className="bg-[#1a3a4a] text-white px-8 py-3 rounded-sm font-semibold text-sm uppercase tracking-wider hover:bg-[#2a4a5a] transition-colors">
                  Submit Referral
                </button>
              </form>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#1a3a4a] text-white p-6 rounded-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Fax Referral</h3>
                <p className="text-sm text-white/80 mb-1">Alternatively, fax your referral to:</p>
                <p className="text-lg font-medium">03 9776 6498</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-sm p-6">
                <h3 className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wider mb-4">Special Interests</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {["Advanced laparoscopic surgery", "Endometriosis excision", "Hysteroscopic surgery", "Pelvic floor reconstruction", "Urinary incontinence surgery", "Colposcopy & CO₂ laser"].map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
