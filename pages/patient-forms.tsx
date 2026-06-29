import Head from "next/head";

const forms = [
  "Endometrial Ablation Post Operative Care",
  "Hysterectomy Post Operative Information",
  "Laser Laparoscopy Post Operative Information",
  "Sling Post Operative Information",
  "Pre-operative Advice and Checklist",
  "Prolapse Repair Surgery Post Operative Information",
  "Request for Medical Information",
  "Pelvic Floor Questionnaire",
];

export default function PatientForms() {
  return (
    <>
      <Head>
        <title>Patient Forms — Dr Brett Marshall</title>
        <meta name="description" content="Download patient forms and information sheets from Dr Brett Marshall's gynaecological practice." />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-[29px] font-semibold text-[#253d47]">Patient Forms</h1>
          <div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#253d47]">Home</a> / Patient Forms</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-light text-[#253d47] mb-2">Patient Information and Forms</h2>
            <p className="text-sm text-gray-500 mb-10">Resources for gynaecological patients — downloadable forms and post-operative care information.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {forms.map((form) => (
                <a key={form} href="#" className="block bg-white border border-gray-200 rounded-sm p-5 hover:shadow-md hover:border-[#253d47]/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-[#253d47]/5 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#253d47] text-lg">📄</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#253d47] text-sm group-hover:underline">{form}</h3>
                      <span className="text-xs text-gray-400 mt-1 inline-block">Download PDF →</span>
                    </div>
                  </div>
                </a>
              ))}

              <a href="/patient-forms/new-patient-form" className="block bg-[#253d47]/5 border border-[#253d47]/20 rounded-sm p-5 hover:shadow-md hover:border-[#253d47]/40 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#253d47]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#253d47] text-lg">✏️</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#253d47] text-sm group-hover:underline">New Patient Form</h3>
                    <span className="text-xs text-gray-500 mt-1 inline-block">Complete online →</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#253d47] text-white p-6 rounded-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Need Help?</h3>
                <p className="text-sm text-white/80 mb-4">Contact Marion for assistance with forms.</p>
                <a href="tel:+613****6411" className="block text-center bg-white text-[#253d47] px-4 py-2.5 rounded-sm text-sm font-semibold hover:bg-gray-100 transition-colors">03 9776 6411</a>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-sm p-6">
                <h3 className="font-semibold text-[#253d47] text-sm uppercase tracking-wider mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about-your-visit" className="text-gray-600 hover:text-[#253d47]">About Your Visit</a></li>
                  <li><a href="/request-an-appointment" className="text-gray-600 hover:text-[#253d47]">Request Appointment</a></li>
                  <li><a href="/frequently-asked-questions-faq" className="text-gray-600 hover:text-[#253d47]">FAQs</a></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
