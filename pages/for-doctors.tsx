import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { PageHeader } from "../components/ui";
import { ArrowRightIcon } from "../components/icons";

const tabs = [
  { id: "photo", label: "Photo Gallery" },
  { id: "video", label: "Video Gallery" },
] as const;

export default function ForDoctors() {
  const [tab, setTab] = useState<string>("photo");

  return (
    <>
      <Head>
        <title>For Doctors — Dr Brett Marshall</title>
        <meta name="description" content="Referral information and private surgical galleries for referring doctors. Dr Brett Marshall — specialist gynaecologist and laparoscopic surgeon." />
        <meta name="robots" content="noindex" />
      </Head>

      <PageHeader title="For Doctors" />

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="bg-accent/15 border border-accent/40 rounded-sm px-6 py-4 mb-10 flex items-start gap-3">
          <span className="text-accent font-serif text-xl leading-none mt-0.5">i</span>
          <p className="text-sm text-ink/85">This area is for referring medical practitioners. Access to the surgical galleries is restricted and requires authorisation.</p>
        </div>

        <div className="flex gap-1 border-b border-line mb-10" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              role="tab"
              aria-selected={tab === t.id}
              className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                tab === t.id ? "text-brand border-brand" : "text-muted border-transparent hover:text-brand"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "photo" ? (
          <div className="text-center py-16 max-w-xl mx-auto">
            <p className="font-serif text-2xl font-semibold text-brand mb-3">Surgical photo gallery</p>
            <p className="text-muted leading-relaxed">Photographic documentation of gynaecological procedures for professional reference. This gallery is restricted to referring doctors and is not publicly accessible.</p>
            <Link href="/refer-a-patient" className="inline-flex items-center gap-2 mt-8 bg-brand text-white px-6 py-3 rounded-sm font-semibold text-sm uppercase tracking-wide hover:bg-brand-light transition-colors">
              Refer a Patient <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="text-center py-16 max-w-xl mx-auto">
            <p className="font-serif text-2xl font-semibold text-brand mb-3">Surgical video gallery</p>
            <p className="text-muted leading-relaxed">Surgical procedure videos are available for referring doctors. Please contact the practice for access.</p>
            <Link href="/refer-a-patient" className="inline-flex items-center gap-2 mt-8 bg-brand text-white px-6 py-3 rounded-sm font-semibold text-sm uppercase tracking-wide hover:bg-brand-light transition-colors">
              Refer a Patient <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link href="/refer-a-patient" className="inline-flex items-center gap-2 bg-brand text-white px-8 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-wider hover:bg-brand-light transition-colors">
            Refer a Patient Online <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
