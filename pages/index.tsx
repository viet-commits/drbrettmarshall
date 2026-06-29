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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const next = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((c) => (c + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);
  const prev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

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

      {/* Hero Slider — matches Uncode/Owl Carousel */}
      <section className="relative bg-[#253d47] overflow-hidden" style={{ minHeight: "320px" }}>
        {/* Background images with crossfade */}
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

        {/* Overlay — matches live site rgba(139,178,196,0.4) */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(139, 178, 196, 0.4)" }} />

        {/* Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 flex items-center" style={{ minHeight: "320px" }}>
          <div className="max-w-xl py-12">
            {slides.map((slide, i) => (
              <div
                key={i}
                className="transition-all duration-500"
                style={{
                  opacity: i === current ? 1 : 0,
                  position: i === current ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  pointerEvents: i === current ? "auto" : "none",
                }}
              >
                {i === current && (
                  <>
                    <h2 className="text-[29px] font-semibold text-white leading-snug mb-5" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                      {slide.text}
                    </h2>
                    <a
                      href="/our-services"
                      className="inline-block bg-[#253d47] text-white px-[31px] py-[13px] text-xs font-semibold uppercase tracking-[1.2px] hover:bg-[#2d4d57] transition-colors"
                      style={{ border: "1px solid #253d47" }}
                    >
                      READ MORE ABOUT OUR SERVICES
                    </a>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows — matches Owl Carousel */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-2xl px-3 py-8 hover:opacity-80 transition-opacity z-20"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-2xl px-3 py-8 hover:opacity-80 transition-opacity z-20"
          aria-label="Next slide"
        >
          ›
        </button>
      </section>

      {/* Welcome Section */}
      <section className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="w-16 h-px bg-[#253d47] mx-auto mb-4" />
          <h2 className="text-[29px] font-light text-[#253d47]" style={{ fontFamily: "'Open Sans', sans-serif" }}>Welcome</h2>
          <div className="w-10 h-px bg-[#253d47] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="text-lg leading-relaxed text-gray-800 space-y-3">
            <p>
              Dr Brett Marshall is a specialist obstetrician / gynaecologist based on the Mornington Peninsula, Victoria. He consults at his practice in Frankston, and operates at Peninsula Private Hospital and Beleura Private Hospital. Brett also works as a senior consultant gynaecologist at the Royal Women&apos;s Hospital, Melbourne.
            </p>
            <p>
              Brett has been in private practice since 1990 and has extensive experience in treating women&apos;s health issues. His knowledge, coupled with his warm and caring manner, and interest in complex cases, ensures that his patients get the best possible results. Brett&apos;s communication style is clear and concise, using plain language.
            </p>
          </div>
          <div className="text-lg leading-relaxed text-gray-800 space-y-3">
            <p>
              He was one of the first surgeons to perform{" "}
              <a href="/services/endometrial-ablation" className="text-[#253d47] hover:underline">endometrial ablation</a>{" "}
              in Australia and is a specialist in hysteroscopic surgery. Brett also has special interests in{" "}
              <a href="/services/endometriosis" className="text-[#253d47] hover:underline">endometriosis</a>{" "}
              and{" "}
              <a href="/services/laparoscopic-surgery" className="text-[#253d47] hover:underline">laparoscopic surgery</a>
              , having performed over 5000 operative laparoscopies. His expertise in advanced laparoscopic surgery includes using{" "}
              <a href="/services/laser-laparoscopy" className="text-[#253d47] hover:underline">CO₂ laser excisional surgery</a>{" "}
              as well as other modalities.
            </p>
            <p>
              Brett also has wide experience in general gynaecology and performs pelvic floor and incontinence surgery, utilising slings where appropriate.{" "}
              <a href="/services/pelvic-organ-prolapse" className="text-[#253d47] hover:underline">Pelvic floor dysfunction</a>
              , including{" "}
              <a href="/services/pelvic-organ-prolapse" className="text-[#253d47] hover:underline">prolapse</a>{" "}
              and{" "}
              <a href="/services/urinary-incontinence" className="text-[#253d47] hover:underline">urinary incontinence</a>
              , is managed holistically in conjunction with our on-site{" "}
              <a href="/services/pelvic-floor-physiotherapist" className="text-[#253d47] hover:underline">Physiotherapist</a>
              , as well as the{" "}
              <a href="/services/neotonus-pelvic-floor-chair" className="text-[#253d47] hover:underline">Neotonus Pelvic Floor Chair</a>
              . Brett is also an experienced colposcopist, utilising CO₂ laser treatment for{" "}
              <a href="/services/abnormal-pap-smears-vulval-disorders" className="text-[#253d47] hover:underline">abnormal pap smears</a>.
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
    <a href={href} className="block bg-white p-8 text-center rounded-sm shadow-sm border border-gray-100 hover:shadow-md hover:border-[#253d47]/30 transition-all group">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#253d47]/5 flex items-center justify-center group-hover:bg-[#253d47]/10 transition-colors">
        <span className="text-[#253d47] text-xl">+</span>
      </div>
      <h3 className="font-semibold text-[#253d47] text-base mb-2">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{subtitle}</p>
    </a>
  );
}
