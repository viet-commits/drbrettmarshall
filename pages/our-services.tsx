import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { PageHeader } from "../components/ui";
import { ArrowRightIcon } from "../components/icons";
import { services, CONDITION_SLUGS, PROCEDURE_SLUGS, excerpt, type ServiceData } from "../lib/services";

type Tab = "conditions" | "procedures";

export default function OurServices() {
  const [tab, setTab] = useState<Tab>("conditions");

  // Support the "Procedures and Treatments" nav link (/#treatments).
  useEffect(() => {
    if (window.location.hash === "#treatments") setTab("procedures");
  }, []);

  const conditions = CONDITION_SLUGS
    .filter((s) => services[s])
    .map((s) => ({ slug: s, ...services[s] }))
    .sort((a, b) => a.title.localeCompare(b.title));

  const procedures = PROCEDURE_SLUGS
    .filter((s) => services[s])
    .map((s) => ({ slug: s, ...services[s] }))
    .sort((a, b) => a.title.localeCompare(b.title));

  const display = tab === "conditions" ? conditions : procedures;

  return (
    <>
      <Head>
        <title>Our Services — Dr Brett Marshall</title>
        <meta name="description" content="Procedures and treatments available at Dr Brett Marshall's practice. Specialist gynaecological care on the Mornington Peninsula." />
      </Head>

      <PageHeader title="Our Services" />

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="max-w-3xl text-lg leading-relaxed text-ink/85 space-y-5 mb-12">
          <p>Please find below patient information on many of the procedures and surgeries that Dr Marshall commonly performs. Please remember that these are general notes and your particular procedure or surgery will be individualised according to your particular problems and circumstances. At your consultation he will discuss your procedure in detail and give you adequate time for questions. Dr Marshall will also supply you with detailed information sheets and recommended Royal Australian and New Zealand College of Obstetricians &amp; Gynaecologists treatment information pamphlets, so that you are fully informed.</p>
          <p>When Dr Marshall&apos;s secretary, Marion, books you for any surgery, she will also go through some important checklists. Marion has worked with Brett for more than 20 years and has considerable experience in managing patient enquiries. She has a nursing background and understands the range of issues that may present. Marion will help you with any concerns or questions along the way.</p>
        </div>

        <div className="flex gap-1 border-b border-line mb-10" role="tablist" id="treatments">
          <TabButton active={tab === "conditions"} onClick={() => setTab("conditions")}>By Condition</TabButton>
          <TabButton active={tab === "procedures"} onClick={() => setTab("procedures")}>By Procedure or Treatment</TabButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((svc) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              className="group bg-white border border-line rounded-sm p-7 hover:shadow-lg hover:border-brand/20 hover:-translate-y-0.5 transition-all flex flex-col"
            >
              <h3 className="font-serif text-xl font-semibold text-brand mb-3 group-hover:text-brand-light transition-colors">{svc.title}</h3>
              <p className="text-[15px] text-muted leading-relaxed flex-1">{excerpt(svc.content, svc.title)}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand mt-5">
                Read more <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={active}
      className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 ${
        active ? "text-brand border-brand" : "text-muted border-transparent hover:text-brand"
      }`}
    >
      {children}
    </button>
  );
}
