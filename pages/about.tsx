import Head from "next/head";
import { pages } from "../data/content";

export default function AboutPage() {
  const page = (pages as Record<string, any>)["about"];
  if (!page) return null;

  return (
    <>
      <Head>
        <title>About — Dr Brett Marshall</title>
        <meta name="description" content="Learn about Dr Brett Marshall — specialist obstetrician and gynaecologist with over 30 years experience on the Mornington Peninsula." />
      </Head>

      {/* Page header */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-[29px] font-semibold text-[#253d47]">About</h1>
          <div className="text-xs text-gray-400 mt-1">
            <a href="/" className="hover:text-[#253d47]">Home</a> / About
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        {/* Bio section with photo */}
        <div className="flex flex-col md:flex-row gap-10 mb-16">
          <div className="md:w-1/3 flex-shrink-0">
            <img
              src="/images/dr-marshall.jpg"
              alt="Dr Brett Marshall"
              className="w-full rounded-sm shadow-md"
            />
            <div className="mt-6">
              <a
                href="/contact"
                className="block w-full text-center bg-[#253d47] text-white px-6 py-3 rounded-sm font-semibold text-sm uppercase tracking-wider hover:bg-[#2a4a5a] transition-colors"
              >
                CONTACT
              </a>
            </div>
          </div>

          <div className="md:w-2/3">
            <h2 className="text-[29px] font-semibold text-[#253d47] mb-6">Dr Brett Marshall</h2>
            <div className="w-10 h-px bg-[#253d47] mb-6" />

            <div className="text-lg leading-relaxed text-gray-800 space-y-4">
              <p>
                Dr Brett Marshall has been practising in the Mornington Peninsula area for over 20 years and has appointments at Peninsula Private Hospital, Beleura Private Hospital and Royal Women&apos;s Hospital.
              </p>
              <p>
                He graduated from Monash University in 1980 and completed his specialist training in Obstetrics and Gynaecology at Queen Victoria Medical Centre/ Monash Medical Centre/ Peter MacCallum Cancer Institute, achieving the Board of Examiner&apos;s prize for the Membership in 1987. He then continued postgraduate training in the UK.
              </p>
              <p>
                In 1989 Brett completed subspecialty training, working with the world-renowned gynaecological endoscopic surgeon – Professor Christopher Sutton in Guildford, UK. Brett achieved proficiency in all aspects of laparoscopic and hysteroscopic surgery, including carbon dioxide laser surgery, resection of endometriosis, adhesiolysis, and{" "}
                <a href="/services/endometrial-ablation" className="text-[#253d47] hover:underline">endometrial ablation</a>
                . He attended various workshops around England and presented at endoscopic conferences.
              </p>
              <p>
                Fellowship of the RANZCOG was conferred in 1989 and on his return to Australia in 1990, Brett commenced private practice in Obstetrics and Gynaecology on the Peninsula. Since then Brett has continued his special interests in laparoscopic surgery and hysteroscopic surgery. For treatment of endometriosis, pelvic pain and infertility, he uses{" "}
                <a href="/services/laser-laparoscopy" className="text-[#253d47] hover:underline">CO₂ laser excisional surgery</a>{" "}
                as well as other modalities, and deals with complex cases, having significant experience with severe disease including bowel involvement. He has performed thousands of operative laparoscopies, including{" "}
                <a href="/services/laparoscopic-surgery" className="text-[#253d47] hover:underline">advanced laparoscopic surgery</a>{" "}
                for endometriosis and fibroids, and 95% of hysterectomies are now laparoscopic.
              </p>
              <p>
                Brett is also a recognised subspecialist in advanced{" "}
                <a href="/services/advanced-hysteroscopic-surgery" className="text-[#253d47] hover:underline">hysteroscopy surgery</a>
                , treating heavy menstrual bleeding, fibroids and polyps, and was one of the first gynaecologists to perform{" "}
                <a href="/services/endometrial-ablation" className="text-[#253d47] hover:underline">endometrial ablation / resection</a>{" "}
                in Australia.
              </p>
              <p>
                Brett also has wide experience in general gynaecology and performs pelvic floor and incontinence surgery, utilising slings where appropriate.{" "}
                <a href="/services/pelvic-organ-prolapse" className="text-[#253d47] hover:underline">Pelvic floor dysfunction</a>
                , including prolapse and{" "}
                <a href="/services/urinary-incontinence" className="text-[#253d47] hover:underline">urinary incontinence</a>
                , is managed holistically in conjunction with our Physiotherapist, as well as the{" "}
                <a href="/services/neotonus-pelvic-floor-chair" className="text-[#253d47] hover:underline">Neotonus Pelvic Floor Chair</a>
                . Brett is also an experienced colposcopist, utilising CO₂ laser treatment for{" "}
                <a href="/services/abnormal-pap-smears-vulval-disorders" className="text-[#253d47] hover:underline">abnormal pap smears</a>.
              </p>
              <p>
                Brett has also thoroughly enjoyed his obstetrics career, delivering more than 7,000 babies. He is now concentrating solely on gynaecology. His experience in obstetrics and gynaecology gives Brett a thorough understanding of all women&apos;s health issues from adolescence to later life.
              </p>
              <p>
                Brett is involved in the mentoring and training of medical students and upcoming gynaecological specialists. He has been an honorary lecturer at Monash Medical Centre and he is a Consultant Obstetrician/Gynaecologist at the Royal Women&apos;s Hospital. He also remains a member of various hospital advisory committees and is actively involved in many community groups. He is an inaugural member of the Australian Gynaecological Endoscopy Society and is a member of various other medical associations. Dr Marshall also teaches and trains other gynaecologists in advanced hysteroscopic surgery and sling surgery for incontinence.
              </p>
              <p>
                Brett has a keen interest in professional development and continually keeps up-to-date with the latest technology by attending workshops in endoscopic, incontinence and pelvic reconstructive surgery.
              </p>
            </div>
          </div>
        </div>

        {/* Professional Associations */}
        <section>
          <h2 className="text-[29px] font-semibold text-[#253d47] mb-2">Professional Associations and Memberships</h2>
          <div className="w-10 h-px bg-[#253d47] mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AssocCard logo="/images/eshrelogo-uai-258x103.png" name="European Society of Human Reproduction & Embryology" />
            <AssocCard logo="/images/ama_logo250-uai-258x103.png" name="Australian Medical Association" />
            <AssocCard logo="/images/ranzcog-uai-258x103.png" name="Royal Australian & New Zealand College of Obstetricians & Gynaecologists" />
            <AssocCard logo="/images/ASCCP-textlogo-.jpg-uai-258x103.png" name="Australian Society for Colposcopy and Cervical Pathology" />
            <AssocCard logo="/images/ISGE_logo_blauw_440x164-300x112-300x112-uai-258x103.png" name="International Society for Gynaecological Endoscopy" />
            <AssocCard logo="/images/ages-logo-content-uai-258x103.png" name="Australian Gynaecological Endoscopy Society" />
          </div>
        </section>
      </div>
    </>
  );
}

function AssocCard({ logo, name }: { logo: string; name: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-sm border border-gray-100">
      <img src={logo} alt={name} className="h-10 w-auto object-contain flex-shrink-0" />
      <span className="text-xs text-gray-600 leading-tight">{name}</span>
    </div>
  );
}
