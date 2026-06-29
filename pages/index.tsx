import Head from "next/head";
import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    image: "/images/surgery-banner-e1547269060618.jpg",
    text: "Dr Brett Marshall has extensive experience in advanced laparoscopic and hysteroscopic surgery",
  },
  {
    image: "/images/incontinence-banner-e1547269083934.jpg",
    text: "Offering holistic and surgical treatment options for prolapse and urinary incontinence",
  },
  {
    image: "/images/best-results-banner-e1547269101397.jpg",
    text: "Using the latest technology, expert knowledge, and a caring manner to deliver the best results for patients",
  },
  {
    image: "/images/welcome-banner-e1547269304504.jpg",
    text: "Providing considerable experience with professional, friendly care for a range of women's health issues",
  },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <>
      <Head>
        <title>Dr Brett Marshall — Specialist Obstetrician & Gynaecologist | Frankston</title>
        <meta name="description" content="Dr Brett Marshall is a specialist obstetrician / gynaecologist based on the Mornington Peninsula, Victoria. He consults at his practice in Frankston, and operates at Peninsula Private Hospital and Beleura Private Hospital." />
      </Head>

      {/* Hero Slider */}
      <section className="relative bg-[#1a3a4a] overflow-hidden" style={{ minHeight: "500px" }}>
        {/* Background images */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: i === current ? 0.35 : 0,
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a4a]/80 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 flex items-center" style={{ minHeight: "500px" }}>
          <div className="max-w-xl py-20">
            <div className="relative">
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className="transition-all duration-500"
                  style={{
                    opacity: i === current ? 1 : 0,
                    position: i === current ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  {i === current && (
                    <>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-snug mb-6">
                        {slide.text}
                      </h2>
                      <a
                        href="/our-services"
                        className="inline-block border-2 border-white/60 text-white px-6 py-2.5 text-sm font-semibold tracking-wider hover:bg-white hover:text-[#1a3a4a] transition-colors"
                      >
                        READ MORE ABOUT OUR SERVICES
                      </a>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-3xl z-20 transition-colors">
          ‹
        </button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-3xl z-20 transition-colors">
          ›
        </button>
      </section>

      {/* Welcome Section */}
      <section className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="w-16 h-px bg-[#1a3a4a] mx-auto mb-4" />
          <h2 className="text-3xl font-light text-[#1a3a4a]">Welcome</h2>
          <div className="w-10 h-px bg-[#1a3a4a] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="text-sm leading-relaxed text-gray-600 space-y-3">
            <p>
              Dr Brett Marshall is a specialist obstetrician / gynaecologist based on the Mornington Peninsula, Victoria. He consults at his practice in Frankston, and operates at Peninsula Private Hospital and Beleura Private Hospital. Brett also works as a senior consultant gynaecologist at the Royal Women&apos;s Hospital, Melbourne.
            </p>
            <p>
              Brett has been in private practice since 1990 and has extensive experience in treating women&apos;s health issues. His knowledge, coupled with his warm and caring manner, and interest in complex cases, ensures that his patients get the best possible results. Brett&apos;s communication style is clear and concise, using plain language.
            </p>
          </div>
          <div className="text-sm leading-relaxed text-gray-600 space-y-3">
            <p>
              He was one of the first surgeons to perform{" "}
              <a href="/services/endometrial-ablation" className="text-[#1a3a4a] hover:underline">endometrial ablation</a>{" "}
              in Australia and is a specialist in hysteroscopic surgery. Brett also has special interests in{" "}
              <a href="/services/endometriosis" className="text-[#1a3a4a] hover:underline">endometriosis</a>{" "}
              and{" "}
              <a href="/services/laparoscopic-surgery" className="text-[#1a3a4a] hover:underline">laparoscopic surgery</a>
              , having performed over 5000 operative laparoscopies. His expertise in advanced laparoscopic surgery includes using{" "}
              <a href="/services/laser-laparoscopy" className="text-[#1a3a4a] hover:underline">CO₂ laser excisional surgery</a>{" "}
              as well as other modalities.
            </p>
            <p>
              Brett also has wide experience in general gynaecology and performs pelvic floor and incontinence surgery, utilising slings where appropriate.{" "}
              <a href="/services/pelvic-organ-prolapse" className="text-[#1a3a4a] hover:underline">Pelvic floor dysfunction</a>
              , including{" "}
              <a href="/services/pelvic-organ-prolapse" className="text-[#1a3a4a] hover:underline">prolapse</a>{" "}
              and{" "}
              <a href="/services/urinary-incontinence" className="text-[#1a3a4a] hover:underline">urinary incontinence</a>
              , is managed holistically in conjunction with our on-site{" "}
              <a href="/services/pelvic-floor-physiotherapist" className="text-[#1a3a4a] hover:underline">Physiotherapist</a>
              , as well as the{" "}
              <a href="/services/neotonus-pelvic-floor-chair" className="text-[#1a3a4a] hover:underline">Neotonus Pelvic Floor Chair</a>
              . Brett is also an experienced colposcopist, utilising CO₂ laser treatment for{" "}
              <a href="/services/abnormal-pap-smears-vulval-disorders" className="text-[#1a3a4a] hover:underline">abnormal pap smears</a>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Cards Section */}
      <section className="bg-[#f7f7f7] py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CtaCard
              title="Patient Information &amp; Literature"
              subtitle="Important information about conditions and operations"
              href="/patient-information"
            />
            <CtaCard
              title="FAQs"
              subtitle="Answers to our most frequently asked questions"
              href="/frequently-asked-questions-faq"
            />
            <CtaCard
              title="Services"
              subtitle="Procedures and treatments available at our practice"
              href="/our-services"
            />
            <CtaCard
              title="Request an Appointment"
              subtitle="Contact our rooms to request an appointment with Dr Marshall"
              href="/request-an-appointment"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function CtaCard({ title, subtitle, href }: { title: string; subtitle: string; href: string }) {
  return (
    <a href={href} className="block bg-white p-8 text-center rounded-sm shadow-sm border border-gray-100 hover:shadow-md hover:border-[#1a3a4a]/30 transition-all group">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#1a3a4a]/5 flex items-center justify-center group-hover:bg-[#1a3a4a]/10 transition-colors">
        <span className="text-[#1a3a4a] text-xl">+</span>
      </div>
      <h3 className="font-semibold text-[#1a3a4a] text-base mb-2">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{subtitle}</p>
    </a>
  );
}
