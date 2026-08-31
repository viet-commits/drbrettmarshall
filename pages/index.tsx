import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import {
  StethoscopeIcon, HeartPulseIcon, FileTextIcon, CalendarIcon,
  InfoIcon, ArrowRightIcon, CheckIcon,
} from "../components/icons";

const slides = [
  { image: "/images/surgery-banner-e1547269060618.jpg", eyebrow: "Advanced surgery", text: "Extensive experience in advanced laparoscopic & hysteroscopic surgery" },
  { image: "/images/incontinence-banner-e1547269083934.jpg", eyebrow: "Pelvic floor care", text: "Holistic and surgical treatment for prolapse & urinary incontinence" },
  { image: "/images/best-results-banner-e1547269101397.jpg", eyebrow: "Patient-centred", text: "The latest technology, expert knowledge and a caring manner" },
  { image: "/images/welcome-banner-e1547269304504.jpg", eyebrow: "Women's health", text: "Considerable experience, professional and friendly care" },
];

const stats = [
  { value: "30+", label: "Years' experience" },
  { value: "7,000+", label: "Babies delivered" },
  { value: "5,000+", label: "Operative laparoscopies" },
  { value: "FRANZCOG", label: "Sub-specialist" },
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

      {/* Hero */}
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

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 md:py-32 min-h-[520px] flex items-center">
          <div className="max-w-2xl">
            {slides.map((s, i) => (
              <div key={i} className={i === current ? "block" : "hidden"}>
                <p className="text-accent text-sm font-semibold uppercase tracking-[0.2em] mb-4">{s.eyebrow}</p>
                <h1 className="font-serif text-white text-4xl md:text-5xl font-semibold leading-[1.15] mb-6 text-balance">
                  {s.text}
                </h1>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-4">
              <a href="/our-services" className="inline-flex items-center gap-2 bg-white text-brand px-7 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-wide hover:bg-accent/20 hover:text-white transition-colors">
                Our Services <ArrowRightIcon className="w-4 h-4" />
              </a>
              <a href="/request-an-appointment" className="inline-flex items-center gap-2 border border-white/40 text-white px-7 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-wide hover:bg-white/10 transition-colors">
                Request Appointment
              </a>
            </div>
          </div>
        </div>

        {/* Dots */}
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

      {/* Credibility strip */}
      <section className="border-b border-line bg-surface-muted">
        <div className="max-w-[1200px] mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-brand">{s.value}</div>
              <div className="text-xs uppercase tracking-wider text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Welcome */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 md:py-28">
        <div className="text-center mb-14">
          <p className="text-accent text-sm font-semibold uppercase tracking-[0.2em] mb-3">Welcome</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand">Specialist care, delivered with intent</h2>
          <div className="w-16 h-px bg-accent mx-auto mt-6" />
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

      {/* Quick access cards */}
      <section className="bg-surface-muted py-20">
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
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand">Professional Associations</h2>
            <div className="w-16 h-px bg-accent mx-auto mt-6" />
          </div>
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

      {/* Closing CTA */}
      <section className="bg-brand py-16">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-white">Ready to make an appointment?</h2>
            <p className="text-white/70 mt-1">A referral from your GP or specialist is required.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+61397766411" className="inline-flex items-center gap-2 bg-white text-brand px-6 py-3 rounded-sm font-semibold hover:bg-accent/20 hover:text-white transition-colors">03 9776 6411</a>
            <a href="/request-an-appointment" className="inline-flex items-center gap-2 border border-white/40 text-white px-6 py-3 rounded-sm font-semibold hover:bg-white/10 transition-colors">Request Appointment <ArrowRightIcon className="w-4 h-4" /></a>
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
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          Learn more <ArrowRightIcon className="w-4 h-4" />
        </span>
      </div>
    </a>
  );
}
