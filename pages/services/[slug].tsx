import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Link from "next/link";
import { PhoneIcon, ArrowRightIcon } from "../../components/icons";
import {
  services,
  CONDITION_SLUGS,
  PROCEDURE_SLUGS,
  parseSections,
  findRelated,
  type ServiceData,
} from "../../lib/services";

function sortedTitles(slugs: string[], exclude: string): Array<[string, string]> {
  return slugs
    .filter((s) => services[s] && s !== exclude)
    .map((s) => [s, (services[s] as ServiceData).title] as [string, string])
    .sort((a, b) => a[1].localeCompare(b[1]));
}

export default function ServicePage({ slug }: { slug: string }) {
  const svc = services[slug];
  if (!svc) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-serif text-3xl font-semibold text-brand">Service not found</h1>
      </div>
    );
  }

  const { description, treatment } = parseSections(svc.content, svc.title);
  const related = findRelated(slug, svc.content);
  const conditions = sortedTitles(CONDITION_SLUGS, slug);
  const procedures = sortedTitles(PROCEDURE_SLUGS, slug);

  return (
    <>
      <Head>
        <title>{svc.title} — Dr Brett Marshall</title>
        <meta name="description" content={`${svc.title} — specialist gynaecological care by Dr Brett Marshall on the Mornington Peninsula.`} />
      </Head>

      <div className="bg-surface-muted border-b border-line">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <nav className="text-xs text-muted mb-3 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand">Home</Link><span aria-hidden>/</span>
            <Link href="/our-services" className="hover:text-brand">Services</Link><span aria-hidden>/</span>
            <span className="text-ink/70">{svc.title}</span>
          </nav>
          <h1 className="font-serif text-4xl font-semibold text-brand">{svc.title}</h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">Description</h2>
              <div className="w-10 h-px bg-accent mb-6" />
              <div className="text-lg leading-relaxed text-ink/90 space-y-5">
                {description.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </section>

            {treatment.length > 0 && (
              <section className="mb-12">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">Treatments and Procedures</h2>
                <div className="w-10 h-px bg-accent mb-6" />
                <div className="text-lg leading-relaxed text-ink/90 space-y-5">
                  {treatment.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </section>
            )}

            {related.length > 0 && (
              <section className="mb-12">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">Related Literature</h2>
                <div className="w-10 h-px bg-accent mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {related.map(([s, title]) => (
                    <Link key={s} href={`/services/${s}`} className="group flex items-center justify-between bg-surface-muted border border-line rounded-sm p-4 hover:border-brand/25 transition-colors">
                      <span className="text-[15px] font-medium text-brand group-hover:text-brand-light">{title}</span>
                      <ArrowRightIcon className="w-4 h-4 text-brand/50 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Cross-navigation: conditions vs procedures (restores the WP
                "Services > By Conditions" / "View Services by Treatment or
                Procedure" grids that were carried over as dead text). */}
            <section className="border-t border-line pt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Services &gt; By Condition</h2>
                  <ul className="space-y-2">
                    {conditions.map(([s, title]) => (
                      <li key={s}>
                        <Link href={`/services/${s}`} className="inline-flex items-center gap-1.5 text-[15px] text-ink/80 hover:text-brand group">
                          <ArrowRightIcon className="w-3.5 h-3.5 text-accent" />
                          <span className="group-hover:underline">{title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">View Services by Treatment or Procedure</h2>
                  <ul className="space-y-2">
                    {procedures.map(([s, title]) => (
                      <li key={s}>
                        <Link href={`/services/${s}`} className="inline-flex items-center gap-1.5 text-[15px] text-ink/80 hover:text-brand group">
                          <ArrowRightIcon className="w-3.5 h-3.5 text-accent" />
                          <span className="group-hover:underline">{title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-brand text-white p-6 rounded-sm">
                <h3 className="font-serif text-lg font-semibold mb-2">Request a Consultation</h3>
                <p className="text-sm text-white/75 mb-5">Book an appointment with Dr Brett Marshall to discuss your health concerns.</p>
                <Link href="/request-an-appointment" className="block text-center bg-white text-brand px-4 py-3 rounded-sm text-sm font-semibold hover:bg-accent/20 hover:text-white transition-colors">
                  Request Appointment
                </Link>
                <div className="mt-5 pt-4 border-t border-white/20 flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-accent" />
                  <a href="tel:+61397766411" className="text-sm text-white hover:underline">03 9776 6411</a>
                </div>
              </div>

              <div className="bg-surface-muted border border-line rounded-sm p-6">
                <h3 className="font-serif text-lg font-semibold text-brand mb-4">Services</h3>
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">By Condition</h4>
                    <ul className="space-y-1">
                      {conditions.map(([s, title]) => (
                        <li key={s}>
                          <Link href={`/services/${s}`} className="block text-sm text-ink/75 hover:text-brand py-1 hover:underline">{title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">By Procedure or Treatment</h4>
                    <ul className="space-y-1">
                      {procedures.map(([s, title]) => (
                        <li key={s}>
                          <Link href={`/services/${s}`} className="block text-sm text-ink/75 hover:text-brand py-1 hover:underline">{title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Link href="/our-services" className="inline-flex items-center gap-1.5 mt-5 text-xs font-semibold text-brand hover:underline">
                  View all services <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(services).map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return { props: { slug: params?.slug as string } };
};
