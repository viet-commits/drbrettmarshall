import { useState } from "react";
import Head from "next/head";
import cleanContent from "../data/clean_content.json";

interface ServiceData {
  title: string;
  content: string;
  meta: string;
}

const CONDITION_SLUGS = [
  "abnormal-pap-smears-vulval-disorders", "adhesions", "endometriosis",
  "fibroids", "infertility", "menorrhagia-heavy-periods", "pcos",
  "pelvic-organ-prolapse", "pelvic-pain", "urinary-incontinence"
];

function excerpt(text: string, max = 150): string {
  if (!text) return "";
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : clean.slice(0, max).replace(/\s+\S*$/, "") + "...";
}

type Tab = "conditions" | "procedures";

export default function OurServices() {
  const [tab, setTab] = useState<Tab>("conditions");
  const services = cleanContent.services as Record<string, ServiceData>;

  const conditionServices = CONDITION_SLUGS
    .filter(s => services[s])
    .map(s => ({ slug: s, ...services[s] }))
    .sort((a, b) => a.title.localeCompare(b.title));

  const procedureServices = Object.entries(services)
    .filter(([slug]) => !CONDITION_SLUGS.includes(slug))
    .map(([slug, svc]) => ({ slug, ...svc }))
    .sort((a, b) => a.title.localeCompare(b.title));

  const display = tab === "conditions" ? conditionServices : procedureServices;

  return (
    <>
      <Head>
        <title>Our Services — Dr Brett Marshall</title>
        <meta name="description" content="Procedures and treatments available at Dr Brett Marshall's practice. Specialist gynaecological care on the Mornington Peninsula." />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-[29px] font-semibold text-[#253d47]">Our Services</h1>
          <div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#253d47]">Home</a> / Our Services</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="max-w-3xl text-lg leading-relaxed text-gray-800 space-y-4 mb-12">
          <p>Please find below patient information on many of the procedures and surgeries that Dr Marshall commonly performs. Please remember that these are general notes and your particular procedure or surgery will be individualised according to your particular problems and circumstances. At your consultation he will discuss your procedure in detail and give you adequate time for questions. Dr Marshall will also supply you with detailed information sheets and recommended Royal Australian and New Zealand College of Obstetricians & Gynaecologists treatment information pamphlets, so that you are fully informed.</p>
          <p>When Dr Marshall&apos;s secretary, Marion, books you for any surgery, she will also go through some important checklists. Marion has worked with Brett for more than 20 years and has considerable experience in managing patient enquiries. She has a nursing background and understands the range of issues that may present. Marion will help you with any concerns or questions along the way.</p>
        </div>

        <div className="flex border-b mb-10">
          <button
            onClick={() => setTab("conditions")}
            className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${tab === "conditions" ? "text-[#253d47] border-b-2 border-[#253d47]" : "text-gray-400 hover:text-gray-600"}`}
          >
            By Condition
          </button>
          <button
            onClick={() => setTab("procedures")}
            className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${tab === "procedures" ? "text-[#253d47] border-b-2 border-[#253d47]" : "text-gray-400 hover:text-gray-600"}`}
          >
            By Procedure or Treatment
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((svc) => (
            <a key={svc.slug} href={`/services/${svc.slug}`} className="block bg-white border border-gray-100 rounded-sm p-6 hover:shadow-md hover:border-[#253d47]/30 transition-all group">
              <h3 className="font-semibold text-[#253d47] text-base mb-3 group-hover:underline">{svc.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{excerpt(svc.content)}</p>
              <span className="text-xs font-semibold text-[#253d47] uppercase tracking-wider">Read More →</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
