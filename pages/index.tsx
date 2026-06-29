import Head from "next/head";
import { useState, useEffect, useCallback } from "react";

const slides = [
  { image: "/images/surgery-banner-e1547269060618.jpg", text: "Dr Brett Marshall has extensive experience in advanced laparoscopic and hysteroscopic surgery" },
  { image: "/images/incontinence-banner-e1547269083934.jpg", text: "Offering holistic and surgical treatment options for prolapse and urinary incontinence" },
  { image: "/images/best-results-banner-e1547269101397.jpg", text: "Using the latest technology, expert knowledge, and a caring manner to deliver the best results for patients" },
  { image: "/images/welcome-banner-e1547269304504.jpg", text: "Providing considerable experience with professional, friendly care for a range of women's health issues" },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const next = useCallback(() => { if (isTransitioning) return; setIsTransitioning(true); setCurrent((c) => (c + 1) % slides.length); setTimeout(() => setIsTransitioning(false), 700); }, [isTransitioning]);
  const prev = useCallback(() => { if (isTransitioning) return; setIsTransitioning(true); setCurrent((c) => (c - 1 + slides.length) % slides.length); setTimeout(() => setIsTransitioning(false), 700); }, [isTransitioning]);
  useEffect(() => { const t = setInterval(next, 5000); return () => clearInterval(t); }, [next]);

  return (
    <>
      <Head>
        <title>Dr Brett Marshall — Specialist Obstetrician &amp; Gynaecologist | Frankston</title>
        <meta name="description" content="Dr Brett Marshall is a specialist obstetrician / gynaecologist based on the Mornington Peninsula, Victoria. He consults at his practice in Frankston, and operates at Peninsula Private Hospital and Beleura Private Hospital." />
      </Head>

      {/* Hero Slider */}
      <section className="relative bg-[#253d47] overflow-hidden" style={{ minHeight: "320px" }}>
        {slides.map((slide, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === current ? 0.35 : 0, backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        ))}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(139, 178, 196, 0.4)" }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 flex items-center" style={{ minHeight: "320px" }}>
          <div className="max-w-xl py-12">
            {slides.map((slide, i) => (
              <div key={i} className="transition-all duration-500" style={{ opacity: i === current ? 1 : 0, position: i === current ? "relative" : "absolute", top: 0, left: 0, pointerEvents: i === current ? "auto" : "none" }}>
                {i === current && (
                  <>
                    <h2 className="text-[29px] font-semibold text-white leading-snug mb-5">{slide.text}</h2>
                    <a href="/our-services" className="inline-block bg-[#253d47] text-white px-[31px] py-[13px] text-xs font-semibold uppercase tracking-[1.2px] hover:bg-[#2d4d57] transition-colors" style={{ border: "1px solid #253d47" }}>READ MORE ABOUT OUR SERVICES</a>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-3xl px-3 py-8 transition-opacity z-20" aria-label="Previous">‹</button>
        <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-3xl px-3 py-8 transition-opacity z-20" aria-label="Next">›</button>
      </section>

      {/* Welcome */}
      <section className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="w-16 h-px bg-[#253d47] mx-auto mb-4" />
          <h2 className="text-[29px] font-semibold text-[#253d47]">Welcome</h2>
          <div className="w-10 h-px bg-[#253d47] mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="text-lg leading-relaxed text-gray-800 space-y-4">
            <p>Dr Brett Marshall is a specialist obstetrician / gynaecologist based on the Mornington Peninsula, Victoria. He consults at his practice in Frankston, and operates at Peninsula Private Hospital and Beleura Private Hospital. Brett also works as a senior consultant gynaecologist at the Royal Women&apos;s Hospital, Melbourne.</p>
            <p>Brett has been in private practice since 1990 and has extensive experience in treating women&apos;s health issues. His knowledge, coupled with his warm and caring manner, and interest in complex cases, ensures that his patients get the best possible results. Brett&apos;s communication style is clear and concise, using plain language.</p>
          </div>
          <div className="text-lg leading-relaxed text-gray-800 space-y-4">
            <p>He was one of the first surgeons to perform <a href="/services/endometrial-ablation" className="text-[#253d47] hover:underline">endometrial ablation</a> in Australia and is a specialist in hysteroscopic surgery. Brett also has special interests in <a href="/services/endometriosis" className="text-[#253d47] hover:underline">endometriosis</a> and <a href="/services/laparoscopic-surgery" className="text-[#253d47] hover:underline">laparoscopic surgery</a>, having performed over 5000 operative laparoscopies.</p>
            <p>Brett also has wide experience in general gynaecology and performs pelvic floor and incontinence surgery. <a href="/services/pelvic-organ-prolapse" className="text-[#253d47] hover:underline">Pelvic floor dysfunction</a>, including prolapse and <a href="/services/urinary-incontinence" className="text-[#253d47] hover:underline">urinary incontinence</a>, is managed holistically in conjunction with our on-site Physiotherapist, as well as the <a href="/services/neotonus-pelvic-floor-chair" className="text-[#253d47] hover:underline">Neotonus Pelvic Floor Chair</a>.</p>
          </div>
        </div>
      </section>

      {/* CTA Cards — 2×2 grid matching Uncode */}
      <section className="bg-white py-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CtaCard icon="📋" title="Patient Information & Literature" desc="Important information about conditions and operations" href="/patient-information" />
            <CtaCard icon="❓" title="FAQs" desc="Answers to our most frequently asked questions" href="/frequently-asked-questions-faq" />
            <CtaCard icon="🔬" title="Services" desc="Procedures and treatments available at our practice" href="/our-services" />
            <CtaCard icon="📅" title="Request an Appointment" desc="Contact our rooms to request an appointment with Dr Marshall" href="/request-an-appointment" />
          </div>
        </div>
      </section>

      {/* Professional Associations — bg #f2f2f2 */}
      <section className="bg-[#f2f2f2] py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-[29px] font-semibold text-[#253d47] mb-2">Professional Associations and Memberships</h2>
          <div className="w-10 h-px bg-[#253d47] mb-10" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { logo: "/images/ranzcog-uai-258x103.png", name: "RANZCOG" },
              { logo: "/images/ASCCP-textlogo-.jpg-uai-258x103.png", name: "ASCCP" },
              { logo: "/images/ISGE_logo_blauw_440x164-300x112-300x112-uai-258x103.png", name: "ISGE" },
              { logo: "/images/ages-logo-content-uai-258x103.png", name: "AGES" },
              { logo: "/images/eshrelogo-uai-258x103.png", name: "ESHRE" },
              { logo: "/images/ama_logo250-uai-258x103.png", name: "AMA" },
            ].map((assoc) => (
              <div key={assoc.name} className="flex items-center justify-center p-4">
                <img src={assoc.logo} alt={assoc.name} className="h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CtaCard({ icon, title, desc, href }: { icon: string; title: string; desc: string; href: string }) {
  return (
    <a href={href} className="block bg-white border border-gray-200 rounded-sm p-6 hover:shadow-md hover:border-[#253d47]/30 transition-all group flex items-start gap-5">
      <div className="w-14 h-14 rounded-full bg-[#253d47]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#253d47]/10 transition-colors">
        <span className="text-2xl">{icon}</span>
      </div>
      <div>
        <h3 className="font-semibold text-[#253d47] text-base mb-1">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </a>
  );
}
