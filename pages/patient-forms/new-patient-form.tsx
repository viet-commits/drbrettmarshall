import Head from "next/head";
import { PageHeader } from "../../components/ui";

const inputCls = "w-full border border-line rounded-sm px-3.5 py-2.5 text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand/25 focus:border-brand transition";

export default function NewPatientForm() {
  return (
    <>
      <Head>
        <title>New Patient Form — Dr Brett Marshall</title>
        <meta name="description" content="Complete the new patient form before your first appointment with Dr Brett Marshall." />
      </Head>

      <PageHeader title="New Patient Form" crumb="Patient Forms / New Patient Form" />

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-muted mb-8 leading-relaxed">Please complete this form before your first appointment. All information is kept strictly confidential.</p>

          <form className="space-y-10 bg-white border border-line rounded-sm p-8 md:p-12" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend className="font-serif text-xl font-semibold text-brand pb-3 border-b border-line w-full mb-6">Personal Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {["First Name", "Last Name", "Date of Birth", "Medicare Number", "Phone", "Email"].map((label) => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-muted mb-1.5">{label} *</label>
                    <input type={label === "Email" ? "email" : "text"} className={inputCls} />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-muted mb-1.5">Address</label>
                  <input type="text" className={inputCls} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-muted mb-1.5">Referring Doctor *</label>
                  <input type="text" className={inputCls} />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-serif text-xl font-semibold text-brand pb-3 border-b border-line w-full mb-6">Medical History</legend>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Reason for Visit *</label>
                  <textarea rows={3} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Current Medications</label>
                  <textarea rows={2} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Allergies</label>
                  <input type="text" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Past Surgeries</label>
                  <textarea rows={2} className={inputCls} />
                </div>
              </div>
            </fieldset>

            <button type="submit" className="bg-brand text-white px-8 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-wider hover:bg-brand-light transition-colors">
              Submit Form
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
