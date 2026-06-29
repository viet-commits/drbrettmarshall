import { useState } from "react";
import Head from "next/head";

const tabs = [
  { id: "photo", label: "Photo Gallery" },
  { id: "video", label: "Video Gallery" },
] as const;

const photoItems = [
  { caption: "Endometriosis", desc: "Laparoscopic view of endometriosis" },
  { caption: "Laser Excision Endometriosis", desc: "CO₂ laser excision of endometriosis" },
  { caption: "Adhesions", desc: "Laparoscopic view of pelvic adhesions" },
  { caption: "Ovarian Cyst", desc: "Laparoscopic view of ovarian cyst" },
  { caption: "Fibroids", desc: "Laparoscopic view of uterine fibroids" },
  { caption: "Hysteroscopy", desc: "Hysteroscopic view of uterine cavity" },
];

export default function ForDoctors() {
  const [tab, setTab] = useState<string>("photo");

  return (
    <>
      <Head>
        <title>For Doctors — Dr Brett Marshall</title>
        <meta name="description" content="Photo and video gallery for referring doctors. Dr Brett Marshall — specialist gynaecologist and laparoscopic surgeon." />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-light text-[#1a3a4a]">For Doctors</h1>
          <div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#1a3a4a]">Home</a> / For Doctors</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="flex border-b mb-10">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${tab === t.id ? "text-[#1a3a4a] border-b-2 border-[#1a3a4a]" : "text-gray-400 hover:text-gray-600"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "photo" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoItems.map((item, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-sm overflow-hidden group hover:shadow-md transition-all">
                <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-400">
                  <span className="text-4xl">🔬</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#1a3a4a] text-sm mb-1">{item.caption}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-6xl mb-4">🎬</p>
            <h3 className="text-lg font-light text-[#1a3a4a] mb-2">Video Gallery</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">Surgical procedure videos are available for referring doctors. Please contact the practice for access.</p>
            <a href="/refer-a-patient" className="inline-block mt-6 bg-[#1a3a4a] text-white px-6 py-2.5 rounded-sm text-sm font-semibold hover:bg-[#2a4a5a] transition-colors">Refer a Patient</a>
          </div>
        )}

        <div className="mt-16 text-center">
          <a href="/refer-a-patient" className="inline-block bg-[#1a3a4a] text-white px-8 py-3 rounded-sm font-semibold text-sm uppercase tracking-wider hover:bg-[#2a4a5a] transition-colors">
            Refer a Patient Online
          </a>
        </div>
      </div>
    </>
  );
}
