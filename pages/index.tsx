import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { StethoscopeIcon, FileTextIcon, CalendarIcon, InfoIcon, ArrowRightIcon } from "../components/icons";

const slides = [
  { image: "/images/surgery-banner-e1547269060618.jpg", text: "Dr Brett Marshall has extensive experience in advanced laparoscopic and hysteroscopic surgery" },
  { image: "/images/incontinence-banner-e1547269083934.jpg", text: "Offering holistic and surgical treatment options for prolapse and urinary incontinence" },
  { image: "/images/best-results-banner-e1547269101397.jpg", text: "Using the latest technology, expert knowledge, and a caring manner to deliver the best results for patients" },
  { image: "/images/welcome-banner-e1547269304504.jpg", text: "Providing considerable experience with professional, friendly care for a range of women's health issues" },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, paused]);

  return (
    <>
      <Head>
        <title>Dr Brett Marshall — Specialist Obstetrician &amp; Gynaecologist | Frankston</title>
        <meta name="description" content="Dr Brett Marshall is a specialist obstetrician / gynaecologist based on the Mornington Peninsula, Victoria. He consults at his practice in Frankston, and operates at Peninsula Private Hospital and Beleura Private Hospital." />
      </Head>

      {/* Hero slider */}
      <section
        className="relative bg-brand overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === current ? 1 : 0, backgroundImage: `url(${s.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
            aria-hidden={i !== current}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-brand/95 via-brand/75 to-brand/30" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 md:py-28 min-h-[440px] flex items-center">
          <div className="max-w-2xl">
            {slides.map((s, i) => (
              <div key={i} className={i === current ? "block" : "hidden"}>
                <h1 className="font-serif text-white text-3xl md:text-[40px] font-semibold leading-[1.2] mb-8">
                  {s.text}
                </h1>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-4">
              <a href="/our-services" className="inline-flex items-center gap-2 bg-white text-brand px-7 py-3.5 rounded-sm font-semibold text-xs uppercase tracking-[1.2px] hover:bg-accent/20 hover:text-white transition-colors">
                Read More about our Services <ArrowRightIcon className="w-4 h-4" />
              </a>
              <a href="/request-an-appointment" className="inline-flex items-center gap-2 border border-white/40 text-white px-7 py-3.5 rounded-sm font-semibold text-xs uppercase tracking-[1.2px] hover:bg-white/10 transition-colors">
                Request Appointment
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === current ? "w-8 bg-accent" : "w-3 bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </section>

      {/* Welcome */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 md:py-24">
        <div className="text-center mb-12">
          <div className="w-16 h-px bg-brand mx-auto mb-4" />
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand">Welcome</h2>
          <div className="w-10 h-px bg-brand mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="text-lg leading-relaxed text-ink/90 space-y-5">
            <p>Dr Brett Marshall is a specialist obstetrician / gynaecologist based on the Mornington Peninsula, Victoria. He consults at his practice in Frankston, and operates at Peninsula Private Hospital and Beleura Private Hospital. Brett also works as a senior consultant gynaecologist at the Royal Women&apos;s Hospital, Melbourne.</p>
            <p>Brett has been in private practice since 1990 and has extensive experience in treating women&apos;s health issues. His knowledge, coupled with his warm and caring manner, and interest in complex cases, ensures that his patients get the best possible results. Brett&apos;s communication style is clear and concise, using plain language.</p>
          </div>
          <div className="text-lg leading-relaxed text-ink/90 space-y-5">
            <p>He was one of the first surgeons to perform <a href="/services/endometrial-ablation" className="text-brand font-medium hover:underline">endometrial ablation</a> in Australia and is a specialist in hysteroscopic surgery. Brett also has special interests in <a href="/services/endometriosis" className="text-brand font-medium hover:underline">endometriosis</a> and <a href="/services/laparoscopic-surgery" className="text-brand font-medium hover:underline">laparoscopic surgery</a>, having performed over 5000 operative laparoscopies.</p>
            <p>Brett also has wide experience in general gynaecology and performs pelvic floor and incontinence surgery. <a href="/services/pelvic-organ-prolapse" className="text-brand font-medium hover:underline">Pelvic floor dysfunction</a>, including prolapse and <a href="/services/urinary-incontinence" className="text-brand font-medium hover:underline">urinary incontinence</a>, is managed holistically in conjunction with our on-site Physiotherapist, as well as the <a href="/services/neotonus-pelvic-floor-chair" className="text-brand font-medium hover:underline">Neotonus Pelvic Floor Chair</a>.</p>
          </div>
        </div>
      </section>

      {/* CTA cards */}
      <section className="bg-surface-muted py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CtaCard icon={<FileTextIcon className="w-6 h-6" />} title="Patient Information & Literature" desc="Important information about conditions and operations" href="/patient-information" />
            <CtaCard icon={<InfoIcon className="w-6 h-6" />} title="FAQs" desc="Answers to our most frequently asked questions" href="/frequently-asked-questions-faq" />
            <CtaCard icon={<StethoscopeIcon className="w-6 h-6" />} title="Services" desc="Procedures and treatments available at our practice" href="/our-services" />
            <CtaCard icon={<CalendarIcon className="w-6 h-6" />} title="Request an Appointment" desc="Contact our rooms to request an appointment with Dr Marshall" href="/request-an-appointment" />
          </div>
        </div>
      </section>

      {/* Professional associations */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand text-center mb-2">Professional Associations and Memberships</h2>
          <div className="w-10 h-px bg-brand mx-auto mb-12" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {[
              { logo: "/images/ranzcog-uai-258x103.png", name: "RANZCOG" },
              { logo: "/images/ASCCP-textlogo-.jpg-uai-258x103.png", name: "ASCCP" },
              { logo: "/images/ISGE_logo_blauw_440x164-300x112-300x112-uai-258x103.png", name: "ISGE" },
              { logo: "/images/ages-logo-content-uai-258x103.png", name: "AGES" },
              { logo: "/images/eshrelogo-uai-258x103.png", name: "ESHRE" },
              { logo: "/images/ama_logo250-uai-258x103.png", name: "AMA" },
            ].map((a) => (
              <img key={a.name} src={a.logo} alt={a.name} title={a.name} className="h-14 w-auto object-contain mx-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CtaCard({ icon, title, desc, href }: { icon: React.ReactNode; title: string; desc: string; href: string }) {
  return (
    <a href={href} className="group flex items-start gap-5 bg-white border border-line rounded-sm p-7 hover:shadow-lg hover:border-brand/20 hover:-translate-y-0.5 transition-all">
      <div className="w-14 h-14 rounded-sm bg-brand/5 flex items-center justify-center flex-shrink-0 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="font-serif text-xl font-semibold text-brand mb-1.5">{title}</h3>
        <p className="text-[15px] text-muted leading-relaxed">{desc}</p>
      </div>
    </a>
  );
}
