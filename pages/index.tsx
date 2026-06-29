import Head from "next/head";
import { pages } from "../data/content";

export default function HomePage() {
  const page = pages["index"];
  if (!page) return null;

  // Extract text-only version of the content for the welcome section
  const textContent = page.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  return (
    <>
      <Head>
        <title>Dr Brett Marshall — Specialist Obstetrician & Gynaecologist</title>
        <meta name="description" content="Dr Brett Marshall provides expert gynaecological care on the Mornington Peninsula. Consulting in Frankston, operating at Peninsula Private and Beleura Private Hospitals." />
      </Head>

      {/* Hero Section */}
      <section className="bg-[#1a3a4a] text-white">
        <div className="max-w-6xl mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-widest mb-4 text-gray-300">Specialist Obstetrician & Gynaecologist</p>
            <h1 className="text-4xl md:text-5xl font-light leading-tight mb-8">
              Using the latest technology, expert knowledge, and a caring manner to deliver the best results for patients
            </h1>
            <div className="flex flex-wrap gap-4">
              <a href="/our-services" className="inline-block bg-white text-[#1a3a4a] px-8 py-3 rounded font-medium hover:bg-gray-100 transition-colors">
                Our Services
              </a>
              <a href="/request-an-appointment" className="inline-block border-2 border-white text-white px-8 py-3 rounded font-medium hover:bg-white hover:text-[#1a3a4a] transition-colors">
                Request Appointment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-[#1a3a4a]">Welcome</h2>
          <div className="w-12 h-[2px] bg-[#1a3a4a] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-600 leading-relaxed">
          <div>
            <p>Dr Brett Marshall is a specialist obstetrician / gynaecologist based on the Mornington Peninsula, Victoria. He consults at his practice in Frankston, and operates at Peninsula Private Hospital and Beleura Private Hospital. Brett also works as a senior consultant gynaecologist at the Royal Women&apos;s Hospital, Melbourne.</p>
            <p className="mt-4">Brett has been in private practice since 1990 and has extensive experience in treating women&apos;s health issues. His knowledge, coupled with his warm and caring manner, and interest in complex cases, ensures that his patients get the best possible results. Brett&apos;s communication style is clear and concise, using plain language.</p>
          </div>
          <div>
            <p>He was one of the first surgeons to perform <a href="/services/endometrial-ablation" className="text-[#1a3a4a] hover:underline">endometrial ablation</a> in Australia and is a specialist in hysteroscopic surgery. Brett also has special interests in <a href="/services/endometriosis" className="text-[#1a3a4a] hover:underline">endometriosis</a> and <a href="/services/laparoscopic-surgery" className="text-[#1a3a4a] hover:underline">laparoscopic surgery</a>, having performed over 5000 operative laparoscopies.</p>
            <p className="mt-4">Brett also has wide experience in general gynaecology and performs pelvic floor and incontinence surgery. <a href="/services/pelvic-organ-prolapse" className="text-[#1a3a4a] hover:underline">Pelvic floor dysfunction</a>, including prolapse and <a href="/services/urinary-incontinence" className="text-[#1a3a4a] hover:underline">urinary incontinence</a>, is managed holistically in conjunction with our on-site <a href="/services/pelvic-floor-physiotherapist" className="text-[#1a3a4a] hover:underline">Physiotherapist</a>.</p>
          </div>
        </div>
      </section>

      {/* CTA Cards */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CtaCard
              icon="📋"
              title="Patient Information"
              description="Important information about conditions and operations"
              href="/patient-information"
            />
            <CtaCard
              icon="❓"
              title="FAQs"
              description="Answers to our most frequently asked questions"
              href="/frequently-asked-questions-faq"
            />
            <CtaCard
              icon="🩺"
              title="Services"
              description="Procedures and treatments available at our practice"
              href="/our-services"
            />
            <CtaCard
              icon="📅"
              title="Request an Appointment"
              description="Contact our rooms to request an appointment with Dr Marshall"
              href="/request-an-appointment"
            />
          </div>
        </div>
      </section>

      {/* Hospitals */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-light text-[#1a3a4a] mb-8">Operating At</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6">
            <div className="text-3xl font-bold text-[#1a3a4a]">Peninsula Private</div>
            <p className="text-sm text-gray-500 mt-2">Langwarrin</p>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-[#1a3a4a]">Beleura Private</div>
            <p className="text-sm text-gray-500 mt-2">Mornington</p>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-[#1a3a4a]">Royal Women&apos;s</div>
            <p className="text-sm text-gray-500 mt-2">Melbourne</p>
          </div>
        </div>
      </section>
    </>
  );
}

function CtaCard({ icon, title, description, href }: { icon: string; title: string; description: string; href: string }) {
  return (
    <a href={href} className="block bg-white p-8 rounded-lg shadow-sm border hover:shadow-md hover:border-[#1a3a4a] transition-all group text-center">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-semibold text-[#1a3a4a] text-lg mb-2 group-hover:underline">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </a>
  );
}
