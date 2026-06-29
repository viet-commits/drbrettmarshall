import Head from "next/head";

const ctaCards = [
  { title: "Request an Appointment", href: "/request-an-appointment", desc: "Phone 03 9776 6411 to book your consultation with Dr Marshall." },
  { title: "Patient Forms", href: "/patient-forms", desc: "Download and complete patient forms before your visit." },
  { title: "About Your Visit", href: "/about-your-visit", desc: "What to expect at your first appointment and how to prepare." },
];

const associations = [
  { logo: "/images/ranzcog-uai-258x103.png", name: "Royal Australian & New Zealand College of Obstetricians & Gynaecologists" },
  { logo: "/images/ASCCP-textlogo-.jpg-uai-258x103.png", name: "Australian Society for Colposcopy and Cervical Pathology" },
  { logo: "/images/ISGE_logo_blauw_440x164-300x112-300x112-uai-258x103.png", name: "International Society for Gynaecological Endoscopy" },
  { logo: "/images/ages-logo-content-uai-258x103.png", name: "Australian Gynaecological Endoscopy Society" },
  { logo: "/images/eshrelogo-uai-258x103.png", name: "European Society of Human Reproduction & Embryology" },
  { logo: "/images/ama_logo250-uai-258x103.png", name: "Australian Medical Association" },
];

export default function PatientInformation() {
  return (
    <>
      <Head>
        <title>Patient Information — Dr Brett Marshall</title>
        <meta name="description" content="Patient information, forms, and resources for Dr Brett Marshall's gynaecological practice on the Mornington Peninsula." />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-light text-[#1a3a4a]">Patient Information</h1>
          <div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#1a3a4a]">Home</a> / Patient Information</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {ctaCards.map((card) => (
            <a key={card.href} href={card.href} className="block bg-white border border-gray-200 rounded-sm p-8 text-center hover:shadow-lg hover:border-[#1a3a4a]/30 transition-all group">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#1a3a4a]/5 flex items-center justify-center group-hover:bg-[#1a3a4a]/10 transition-colors">
                <span className="text-[#1a3a4a] text-2xl font-light">+</span>
              </div>
              <h2 className="font-semibold text-[#1a3a4a] text-lg mb-3">{card.title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
            </a>
          ))}
        </div>

        <section>
          <h2 className="text-2xl font-light text-[#1a3a4a] mb-2">Professional Associations and Memberships</h2>
          <div className="w-10 h-px bg-[#1a3a4a] mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {associations.map((assoc) => (
              <div key={assoc.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-sm border border-gray-100">
                <img src={assoc.logo} alt={assoc.name} className="h-10 w-auto object-contain flex-shrink-0" />
                <span className="text-xs text-gray-600 leading-tight">{assoc.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
