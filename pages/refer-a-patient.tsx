import Head from "next/head";
import { PageHeader } from "../components/ui";
import { FaxIcon } from "../components/icons";

const inputCls = "w-full border border-line rounded-sm px-3.5 py-2.5 text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand/25 focus:border-brand transition";
const labelCls = "block text-xs font-medium text-muted mb-1.5";

const specialInterests = [
  "Advanced laparoscopic surgery",
  "Endometriosis excision",
  "Hysteroscopic surgery",
  "Pelvic floor reconstruction",
  "Urinary incontinence surgery",
  "Colposcopy & CO₂ laser",
];

export default function ReferAPatient() {
  return (
    <>
      <Head>
        <title>Refer a Patient — Dr Brett Marshall</title>
        <meta name="description" content="Refer a patient to Dr Brett Marshall — specialist gynaecologist and laparoscopic surgeon on the Mornington Peninsula." />
      </Head>

      <PageHeader title="Refer a Patient" />

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white border border-line rounded-sm p-8 md:p-12">
              <h2 className="font-serif text-2xl font-semibold text-brand mb-8">Refer a patient online</h2>

              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                <fieldset>
                  <legend className="font-serif text-lg font-semibold text-brand pb-3 border-b border-line w-full mb-6">Referring Doctor</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Title *</label>
                      <select className={inputCls} defaultValue="DR">
                        <option>DR</option><option>MR</option><option>MRS</option><option>MS</option><option>PROF</option>
                      </select>
                    </div>
                    <div><label className={labelCls}>First Name *</label><input type="text" className={inputCls} /></div>
                    <div><label className={labelCls}>Last Name *</label><input type="text" className={inputCls} /></div>
                    <div><label className={labelCls}>Provider Number</label><input type="text" className={inputCls} /></div>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="font-serif text-lg font-semibold text-brand pb-3 border-b border-line w-full mb-6">Your Practice</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2"><label className={labelCls}>Practice Name *</label><input type="text" className={inputCls} /></div>
                    <div className="md:col-span-2"><label className={labelCls}>Address</label><input type="text" className={inputCls} /></div>
                    <div><label className={labelCls}>Phone</label><input type="text" className={inputCls} /></div>
                    <div><label className={labelCls}>Fax</label><input type="text" className={inputCls} /></div>
                    <div className="md:col-span-2"><label className={labelCls}>Email *</label><input type="email" className={inputCls} /></div>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="font-serif text-lg font-semibold text-brand pb-3 border-b border-line w-full mb-6">Patient Details</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div><label className={labelCls}>First Name *</label><input type="text" className={inputCls} /></div>
                    <div><label className={labelCls}>Last Name *</label><input type="text" className={inputCls} /></div>
                    <div><label className={labelCls}>Date of Birth</label><input type="date" className={inputCls} /></div>
                    <div><label className={labelCls}>Medicare Number</label><input type="text" className={inputCls} /></div>
                    <div className="md:col-span-2">
                      <label className={labelCls}>Clinical Notes / Reason for Referral *</label>
                      <textarea rows={4} className={inputCls} />
                    </div>
                  </div>
                </fieldset>

                <button type="submit" className="bg-brand text-white px-8 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-wider hover:bg-brand-light transition-colors">
                  Submit Referral
                </button>
              </form>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-brand text-white p-6 rounded-sm">
                <h3 className="font-serif text-lg font-semibold mb-3 flex items-center gap-2"><FaxIcon className="w-5 h-5 text-accent" /> Fax Referral</h3>
                <p className="text-sm text-white/75 mb-2">Alternatively, fax your referral to:</p>
                <p className="font-serif text-2xl font-semibold">03 9039 5060</p>
              </div>
              <div className="bg-surface-muted border border-line rounded-sm p-6">
                <h3 className="font-serif text-lg font-semibold text-brand mb-4">Special Interests</h3>
                <ul className="space-y-2 text-[15px] text-ink/80">
                  {specialInterests.map((item) => (
                    <li key={item} className="flex items-start gap-2"><span className="text-accent">—</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
