import Head from "next/head";
import Link from "next/link";
import { PageHeader, SectionHeading } from "../components/ui";
import { CalendarIcon, FileTextIcon, InfoIcon, ArrowRightIcon } from "../components/icons";

const ctaCards = [
  { icon: <CalendarIcon className="w-6 h-6" />, title: "Request an Appointment", href: "/request-an-appointment", desc: "Phone 03 9776 6411 to book your consultation with Dr Marshall." },
  { icon: <FileTextIcon className="w-6 h-6" />, title: "Patient Forms", href: "/patient-forms", desc: "Download and complete patient forms before your visit." },
  { icon: <InfoIcon className="w-6 h-6" />, title: "About Your Visit", href: "/about-your-visit", desc: "What to expect at your first appointment and how to prepare." },
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

      <PageHeader title="Patient Information" />

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {ctaCards.map((card) => (
            <Link key={card.href} href={card.href} className="group bg-white border border-line rounded-sm p-8 text-center hover:shadow-lg hover:border-brand/20 hover:-translate-y-0.5 transition-all">
              <div className="w-14 h-14 mx-auto mb-5 rounded-sm bg-brand/5 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                {card.icon}
              </div>
              <h2 className="font-serif text-xl font-semibold text-brand mb-3">{card.title}</h2>
              <p className="text-[15px] text-muted leading-relaxed">{card.desc}</p>
            </Link>
          ))}
        </div>

        <section>
          <SectionHeading eyebrow="Memberships" title="Professional Associations" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {associations.map((a) => (
              <div key={a.name} className="flex items-center gap-4 p-5 bg-surface-muted rounded-sm border border-line">
                <img src={a.logo} alt={a.name} className="h-10 w-auto object-contain flex-shrink-0 grayscale opacity-80" />
                <span className="text-xs text-muted leading-tight">{a.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
