import Head from "next/head";

export default function NewPatientForm() {
  return (
    <>
      <Head>
        <title>New Patient Form — Dr Brett Marshall</title>
        <meta name="description" content="Complete the new patient form before your first appointment with Dr Brett Marshall." />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-light text-[#1a3a4a]">New Patient Form</h1>
          <div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#1a3a4a]">Home</a> / <a href="/patient-forms" className="hover:text-[#1a3a4a]">Patient Forms</a> / New Patient Form</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm text-gray-600 mb-8 leading-relaxed">Please complete this form before your first appointment. All information is kept strictly confidential.</p>

          <form className="space-y-8 bg-white border border-gray-200 rounded-sm p-8 md:p-12" onSubmit={(e) => e.preventDefault()}>
            <fieldset className="space-y-4">
              <legend className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wide mb-4 pb-2 border-b w-full">Personal Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["First Name", "Last Name", "Date of Birth", "Medicare Number", "Phone", "Email"].map((label) => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-gray-500 mb-1">{label} *</label>
                    <input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
                  <input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Referring Doctor *</label>
                  <input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" />
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wide mb-4 pb-2 border-b w-full">Medical History</legend>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Reason for Visit *</label>
                <textarea rows={3} className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Current Medications</label>
                <textarea rows={2} className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Allergies</label>
                <input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Past Surgeries</label>
                <textarea rows={2} className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" />
              </div>
            </fieldset>

            <button type="submit" className="bg-[#1a3a4a] text-white px-8 py-3 rounded-sm font-semibold text-sm uppercase tracking-wider hover:bg-[#2a4a5a] transition-colors">
              Submit Form
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
