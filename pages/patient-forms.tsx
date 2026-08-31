import Head from "next/head";
import Link from "next/link";
import { PageHeader } from "../components/ui";
import { DownloadIcon, FileTextIcon, PhoneIcon } from "../components/icons";

const downloads = [
  { title: "Pre-operative Advice and Checklist", href: "/downloads/pre-operative-advice-checklist.pdf" },
  { title: "New Patient Form (online)", href: "/patient-forms/new-patient-form", online: true },
  { title: "Pelvic Floor Questionnaire", href: "/downloads/pelvic-floor-questionnaire.pdf" },
  { title: "Endometrial Ablation Post Operative Care", href: "/downloads/endometrial-ablation-post-operative.pdf" },
  { title: "Endometrial Resection (Ablation) Information", href: "/downloads/endometrial-ablation-information.pdf" },
  { title: "Hysterectomy Post Operative Information", href: "/downloads/hysterectomy-post-operative.pdf" },
  { title: "Laser Laparoscopy Post Operative Information", href: "/downloads/laser-laparoscopy-post-operative.pdf" },
  { title: "Sling Post Operative Information", href: "/downloads/sling-post-operative.pdf" },
  { title: "Prolapse Repair Surgery Post Operative Information", href: "/downloads/prolapse-repair-post-operative.pdf" },
  { title: "Incontinence Therapy Brochure", href: "/downloads/incontinence-therapy-brochure.pdf" },
  { title: "Request for Medical Information", href: "/downloads/request-for-medical-information.pdf" },
  { title: "Patient Privacy Policy", href: "/downloads/patient-privacy-policy.pdf" },
];

export default function PatientForms() {
  return (
    <>
      <Head>
        <title>Patient Forms — Dr Brett Marshall</title>
        <meta name="description" content="Download patient forms and information sheets from Dr Brett Marshall's gynaecological practice." />
      </Head>

      <PageHeader title="Patient Forms" />

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-semibold text-brand mb-2">Patient information and forms</h2>
            <p className="text-muted mb-10">Downloadable forms and post-operative care information for gynaecological patients.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {downloads.map((d) => (
                d.online ? (
                  <Link key={d.title} href={d.href} className="group flex items-start gap-4 bg-brand/5 border border-brand/20 rounded-sm p-5 hover:border-brand/40 transition-colors">
                    <div className="w-10 h-10 rounded-sm bg-brand/10 flex items-center justify-center text-brand flex-shrink-0"><FileTextIcon className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-medium text-brand text-[15px] group-hover:underline">{d.title}</h3>
                      <span className="text-xs text-muted mt-1 inline-block">Complete online</span>
                    </div>
                  </Link>
                ) : (
                  <a key={d.title} href={d.href} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 bg-white border border-line rounded-sm p-5 hover:shadow-md hover:border-brand/25 transition-all">
                    <div className="w-10 h-10 rounded-sm bg-brand/5 flex items-center justify-center text-brand flex-shrink-0 group-hover:bg-brand group-hover:text-white transition-colors"><DownloadIcon className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-medium text-brand text-[15px] group-hover:underline">{d.title}</h3>
                      <span className="text-xs text-muted mt-1 inline-block">Download PDF</span>
                    </div>
                  </a>
                )
              ))}
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-brand text-white p-6 rounded-sm">
                <h3 className="font-serif text-lg font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-white/75 mb-5">Contact Marion for assistance with forms.</p>
                <a href="tel:+61397766411" className="flex items-center justify-center gap-2 bg-white text-brand px-4 py-3 rounded-sm text-sm font-semibold hover:bg-accent/20 hover:text-white transition-colors">
                  <PhoneIcon className="w-4 h-4" /> 03 9776 6411
                </a>
              </div>
              <div className="bg-surface-muted border border-line rounded-sm p-6">
                <h3 className="font-serif text-lg font-semibold text-brand mb-4">Quick Links</h3>
                <ul className="space-y-2 text-[15px]">
                  <li><Link href="/about-your-visit" className="text-ink/75 hover:text-brand">About Your Visit</Link></li>
                  <li><Link href="/request-an-appointment" className="text-ink/75 hover:text-brand">Request Appointment</Link></li>
                  <li><Link href="/frequently-asked-questions-faq" className="text-ink/75 hover:text-brand">FAQs</Link></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
