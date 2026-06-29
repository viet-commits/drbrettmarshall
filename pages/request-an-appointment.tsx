import Head from "next/head";

export default function RequestAppointment() {
  return (
    <>
      <Head>
        <title>Request an Appointment — Dr Brett Marshall</title>
        <meta name="description" content="Request an appointment with Dr Brett Marshall — specialist gynaecologist on the Mornington Peninsula. Phone 03 9776 6411." />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-light text-[#1a3a4a]">Request an Appointment</h1>
          <div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#1a3a4a]">Home</a> / Request an Appointment</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-sm p-8 md:p-12">
              <h2 className="text-xl font-light text-[#1a3a4a] mb-8">Contact Information</h2>

              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#1a3a4a]/5 flex items-center justify-center flex-shrink-0"><span className="text-xl">📍</span></div>
                  <div>
                    <h3 className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wide mb-2">Address</h3>
                    <p className="text-sm text-gray-600">Suite 3, 7 Foot Street<br />Frankston VIC 3199</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#1a3a4a]/5 flex items-center justify-center flex-shrink-0"><span className="text-xl">📞</span></div>
                  <div>
                    <h3 className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wide mb-2">Phone</h3>
                    <a href="tel:+613****6411" className="text-lg text-[#1a3a4a] hover:underline font-medium">03 9776 6411</a>
                    <p className="text-sm text-gray-500 mt-1">For all appointments and enquiries</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#1a3a4a]/5 flex items-center justify-center flex-shrink-0"><span className="text-xl">📠</span></div>
                  <div>
                    <h3 className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wide mb-2">Fax</h3>
                    <p className="text-sm text-gray-600">03 9776 6498</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#1a3a4a]/5 flex items-center justify-center flex-shrink-0"><span className="text-xl">ℹ️</span></div>
                  <div>
                    <h3 className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wide mb-2">Referral Required</h3>
                    <p className="text-sm text-gray-600">A referral from your GP or specialist is required prior to making an appointment. Patients may phone to book with Marion, who has worked with Dr Marshall for over 20 years and has a nursing background.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-[#1a3a4a]/5 rounded-sm border border-[#1a3a4a]/10">
                <p className="text-sm text-gray-600">
                  Before your first appointment, we will send you an information pack which includes a new patient form. You can also{" "}
                  <a href="/patient-forms/new-patient-form" className="text-[#1a3a4a] font-semibold hover:underline">complete the new patient form online here</a>.
                </p>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#1a3a4a] text-white p-6 rounded-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Operating At</h3>
                <ul className="text-sm text-white/80 space-y-2">
                  <li>• Peninsula Private Hospital, Langwarrin</li>
                  <li>• Beleura Private Hospital, Mornington</li>
                  <li>• Royal Women&apos;s Hospital, Melbourne</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-sm p-6">
                <h3 className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wider mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about-your-visit" className="text-gray-600 hover:text-[#1a3a4a]">About Your Visit</a></li>
                  <li><a href="/patient-forms" className="text-gray-600 hover:text-[#1a3a4a]">Patient Forms</a></li>
                  <li><a href="/frequently-asked-questions-faq" className="text-gray-600 hover:text-[#1a3a4a]">FAQs</a></li>
                  <li><a href="/contact" className="text-gray-600 hover:text-[#1a3a4a]">Contact & Map</a></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
