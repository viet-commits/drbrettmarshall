import Head from "next/head";
import { pages } from "../data/content";

export default function PatientForms() {
  const page = (pages as Record<string, any>)["patient-forms"];
  if (!page) return null;

  return (
    <>
      <Head>
        <title>Patient Forms — Dr Brett Marshall</title>
        <meta name="description" content={page.meta} />
      </Head>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-light text-[#1a3a4a]">{page.title}</h1>
          <div className="w-12 h-[2px] bg-[#1a3a4a] mt-3" />
        </header>
        <div
          className="prose prose-lg max-w-none prose-headings:text-[#1a3a4a] prose-a:text-[#1a3a4a] prose-img:rounded-lg prose-p:text-gray-600 prose-li:text-gray-600"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
        <div className="mt-12 pt-6 border-t">
          <a href="/" className="text-[#1a3a4a] hover:underline text-sm">← Back to Home</a>
        </div>
      </div>
    </>
  );
}
