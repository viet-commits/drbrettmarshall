import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import cleanContent from "../../data/clean_content.json";

interface ServiceData {
  title: string;
  content: string;
  meta: string;
}

function splitParagraphs(text: string): string[] {
  if (!text) return [];
  return text.split(/\n\s*\n/).filter(p => p.trim());
}

function findRelated(slug: string, content: string): Array<[string, string]> {
  const seen = new Set<string>();
  const related: Array<[string, string]> = [];
  for (const [otherSlug, svc] of Object.entries(cleanContent.services)) {
    if (otherSlug === slug) continue;
    const title = (svc as ServiceData).title;
    if (content.toLowerCase().includes(title.toLowerCase()) && !seen.has(title)) {
      seen.add(title);
      related.push([otherSlug, title]);
    }
  }
  return related.slice(0, 6);
}

export default function ServicePage({ slug }: { slug: string }) {
  const svc = (cleanContent.services as Record<string, ServiceData>)[slug];
  if (!svc) return <div className="max-w-4xl mx-auto px-4 py-12"><h1>Service not found</h1></div>;

  const content = svc.content;
  const sections = content.split(/(?=(?:Treatments?|Procedures?|Related|Advantages?|What |How |Why |When |Is |Can |Will |Do |Surgery|Treatment|Description))/);
  
  let description = sections[0] || "";
  let treatment = "";
  let relatedTitle = "";
  
  for (const s of sections.slice(1)) {
    if (/^(?:Treatments?|Procedures?|Surgery|Treatment)/i.test(s) && !treatment) {
      treatment = s;
    } else if (/^(?:Related|Advantages?)/i.test(s)) {
      relatedTitle += s;
    } else if (treatment) {
      treatment += " " + s;
    } else {
      description += " " + s;
    }
  }

  const descParas = splitParagraphs(description);
  const treatmentParas = splitParagraphs(treatment);
  const relatedServices = findRelated(slug, content);

  const allServices = Object.entries(cleanContent.services)
    .map(([s, d]) => [s, (d as ServiceData).title] as [string, string])
    .sort((a, b) => a[1].localeCompare(b[1]))
    .filter(([s]) => s !== slug)
    .slice(0, 12);

  return (
    <>
      <Head>
        <title>{svc.title} — Dr Brett Marshall</title>
        <meta name="description" content={`${svc.title} — specialist gynaecological care by Dr Brett Marshall on the Mornington Peninsula.`} />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <nav className="text-xs text-gray-400 mb-2">
            <a href="/" className="hover:text-[#1a3a4a]">Home</a> / <a href="/our-services" className="hover:text-[#1a3a4a]">Services</a> / <span className="text-[#1a3a4a]">{svc.title}</span>
          </nav>
          <h1 className="text-2xl font-light text-[#1a3a4a]">{svc.title}</h1>
          <div className="w-10 h-px bg-[#1a3a4a] mt-4" />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="text-sm font-semibold text-[#1a3a4a] uppercase tracking-wide mb-4">Description</h2>
              <div className="w-8 h-px bg-[#1a3a4a]/30 mb-6" />
              <div className="text-sm leading-relaxed text-gray-600 space-y-4">
                {descParas.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </section>

            {treatmentParas.length > 0 && (
              <section className="mb-12">
                <h2 className="text-sm font-semibold text-[#1a3a4a] uppercase tracking-wide mb-4">Treatments and Procedures</h2>
                <div className="w-8 h-px bg-[#1a3a4a]/30 mb-6" />
                <div className="text-sm leading-relaxed text-gray-600 space-y-4">
                  {treatmentParas.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </section>
            )}

            {relatedServices.length > 0 && (
              <section className="mb-12">
                <h2 className="text-sm font-semibold text-[#1a3a4a] uppercase tracking-wide mb-4">Related Literature</h2>
                <div className="w-8 h-px bg-[#1a3a4a]/30 mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedServices.map(([s, title]) => (
                    <a key={s} href={`/services/${s}`} className="block bg-gray-50 border border-gray-100 rounded-sm p-4 hover:shadow-sm hover:border-[#1a3a4a]/30 transition-all group">
                      <h3 className="font-medium text-[#1a3a4a] text-sm group-hover:underline">{title}</h3>
                      <span className="text-xs text-gray-400 mt-1 inline-block">Read More →</span>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#1a3a4a] text-white p-6 rounded-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Request a Consultation</h3>
                <p className="text-sm text-white/80 mb-4">Book an appointment with Dr Brett Marshall to discuss your health concerns.</p>
                <a href="/request-an-appointment" className="block text-center bg-white text-[#1a3a4a] px-4 py-2.5 rounded-sm text-sm font-semibold hover:bg-gray-100 transition-colors">
                  Request Appointment
                </a>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-xs text-white/60">Phone</p>
                  <a href="tel:+613****6411" className="text-sm text-white hover:underline">03 9776 6411</a>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-sm p-6">
                <h3 className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wider mb-4">All Services</h3>
                <ul className="space-y-2">
                  {allServices.map(([s, title]) => (
                    <li key={s}>
                      <a href={`/services/${s}`} className="text-sm text-gray-600 hover:text-[#1a3a4a] hover:underline">{title}</a>
                    </li>
                  ))}
                </ul>
                <a href="/our-services" className="inline-block mt-4 text-xs text-[#1a3a4a] hover:underline font-semibold">
                  View All Services →
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(cleanContent.services).map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return { props: { slug: params?.slug as string } };
};
