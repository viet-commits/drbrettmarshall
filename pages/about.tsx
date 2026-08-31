import Head from "next/head";
import Link from "next/link";
import { PageHeader, SectionHeading } from "../components/ui";

const associations = [
  { logo: "/images/eshrelogo-uai-258x103.png", name: "European Society of Human Reproduction & Embryology" },
  { logo: "/images/ama_logo250-uai-258x103.png", name: "Australian Medical Association" },
  { logo: "/images/ranzcog-uai-258x103.png", name: "Royal Australian & New Zealand College of Obstetricians & Gynaecologists" },
  { logo: "/images/ASCCP-textlogo-.jpg-uai-258x103.png", name: "Australian Society for Colposcopy and Cervical Pathology" },
  { logo: "/images/ISGE_logo_blauw_440x164-300x112-300x112-uai-258x103.png", name: "International Society for Gynaecological Endoscopy" },
  { logo: "/images/ages-logo-content-uai-258x103.png", name: "Australian Gynaecological Endoscopy Society" },
];

const milestones = [
  { year: "1980", text: "Graduated Monash University (MBBS)" },
  { year: "1987", text: "Membership FRANZCOG — Board of Examiners' prize" },
  { year: "1989", text: "Subspecialty training with Prof. Christopher Sutton, UK" },
  { year: "1990", text: "Commenced private practice on the Peninsula" },
];

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About — Dr Brett Marshall</title>
        <meta name="description" content="Learn about Dr Brett Marshall — specialist obstetrician and gynaecologist with over 30 years experience on the Mornington Peninsula." />
      </Head>

      <PageHeader title="About" />

      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Portrait + credentials */}
          <div className="md:col-span-1">
            <div className="md:sticky md:top-24">
              <img src="/images/dr-marshall.jpg" alt="Dr Brett Marshall" className="w-full rounded-sm shadow-md" />
              <dl className="mt-6 divide-y divide-line border border-line rounded-sm overflow-hidden">
                {milestones.map((m) => (
                  <div key={m.year} className="flex gap-4 px-5 py-3.5 bg-white">
                    <dt className="font-serif text-brand font-semibold w-14 flex-shrink-0">{m.year}</dt>
                    <dd className="text-sm text-ink/80 leading-relaxed">{m.text}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/contact" className="mt-6 flex items-center justify-center gap-2 w-full bg-brand text-white px-6 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-wider hover:bg-brand-light transition-colors">
                Contact Dr Marshall
              </Link>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <p className="text-accent text-sm font-semibold uppercase tracking-[0.2em] mb-2">Dr Brett Marshall</p>
            <h2 className="font-serif text-3xl font-semibold text-brand mb-6">MBBS FRANZCOG — Gynaecologist</h2>

            <div className="text-lg leading-relaxed text-ink/90 space-y-5">
              <p>Dr Brett Marshall has been practising in the Mornington Peninsula area for over 30 years and has appointments at Peninsula Private Hospital, Beleura Private Hospital and Royal Women&apos;s Hospital.</p>
              <p>He graduated from Monash University in 1980 and completed his specialist training in Obstetrics and Gynaecology at Queen Victoria Medical Centre / Monash Medical Centre / Peter MacCallum Cancer Institute, achieving the Board of Examiner&apos;s prize for the Membership in 1987. He then continued postgraduate training in the UK.</p>
              <p>In 1989 Brett completed subspecialty training, working with the world-renowned gynaecological endoscopic surgeon — Professor Christopher Sutton in Guildford, UK. Brett achieved proficiency in all aspects of laparoscopic and hysteroscopic surgery, including carbon dioxide laser surgery, resection of endometriosis, adhesiolysis, and <Link href="/services/endometrial-ablation" className="text-brand font-medium hover:underline">endometrial ablation</Link>. He attended various workshops around England and presented at endoscopic conferences.</p>
              <p>Fellowship of the RANZCOG was conferred in 1989 and on his return to Australia in 1990, Brett commenced private practice in Obstetrics and Gynaecology on the Peninsula. Since then Brett has continued his special interests in laparoscopic surgery and hysteroscopic surgery. For treatment of endometriosis, pelvic pain and infertility, he uses <Link href="/services/laser-laparoscopy" className="text-brand font-medium hover:underline">CO₂ laser excisional surgery</Link> as well as other modalities, and deals with complex cases, having significant experience with severe disease including bowel involvement. He has performed thousands of operative laparoscopies, including <Link href="/services/laparoscopic-surgery" className="text-brand font-medium hover:underline">advanced laparoscopic surgery</Link> for endometriosis and fibroids, and 95% of hysterectomies are now laparoscopic.</p>
              <p>Brett is also a recognised subspecialist in advanced <Link href="/services/advanced-hysteroscopic-surgery" className="text-brand font-medium hover:underline">hysteroscopy surgery</Link>, treating heavy menstrual bleeding, fibroids and polyps, and was one of the first gynaecologists to perform <Link href="/services/endometrial-ablation" className="text-brand font-medium hover:underline">endometrial ablation / resection</Link> in Australia.</p>
              <p>Brett also has wide experience in general gynaecology and performs pelvic floor and incontinence surgery, utilising slings where appropriate. <Link href="/services/pelvic-organ-prolapse" className="text-brand font-medium hover:underline">Pelvic floor dysfunction</Link>, including prolapse and <Link href="/services/urinary-incontinence" className="text-brand font-medium hover:underline">urinary incontinence</Link>, is managed holistically in conjunction with our Physiotherapist, as well as the <Link href="/services/neotonus-pelvic-floor-chair" className="text-brand font-medium hover:underline">Neotonus Pelvic Floor Chair</Link>. Brett is also an experienced colposcopist, utilising CO₂ laser treatment for <Link href="/services/abnormal-pap-smears-vulval-disorders" className="text-brand font-medium hover:underline">abnormal pap smears</Link>.</p>
              <p>Brett has also thoroughly enjoyed his obstetrics career, delivering more than 7,000 babies. He is now concentrating solely on gynaecology. His experience in obstetrics and gynaecology gives Brett a thorough understanding of all women&apos;s health issues from adolescence to later life.</p>
              <p>Brett is involved in the mentoring and training of medical students and upcoming gynaecological specialists. He has been an honorary lecturer at Monash Medical Centre and he is a Consultant Obstetrician/Gynaecologist at the Royal Women&apos;s Hospital. He also remains a member of various hospital advisory committees and is actively involved in many community groups. He is an inaugural member of the Australian Gynaecological Endoscopy Society and is a member of various other medical associations. Dr Marshall also teaches and trains other gynaecologists in advanced hysteroscopic surgery and sling surgery for incontinence.</p>
              <p>Brett has a keen interest in professional development and continually keeps up-to-date with the latest technology by attending workshops in endoscopic, incontinence and pelvic reconstructive surgery.</p>
              <p>Brett has been married for over 40 years and enjoys a busy family life with his wife and three adult children. When he is not working, he also enjoys tennis, sailing and bike-riding.</p>
            </div>
          </div>
        </div>

        {/* Associations */}
        <section className="mt-20">
          <SectionHeading eyebrow="Memberships" title="Professional Associations" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {associations.map((a) => (
              <div key={a.name} className="flex items-center gap-4 p-5 bg-surface-muted rounded-sm border border-line">
                <img src={a.logo} alt={a.name} className="h-10 w-auto object-contain flex-shrink-0 grayscale opacity-80" />
                <span className="text-xs text-muted leading-tight">{a.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
