import Head from "next/head";
import { services } from "../../data/content";

export async function getStaticPaths() {
  const paths = Object.keys(services).map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const service = (services as Record<string, any>)[params.slug] || null;
  return { props: { slug: params.slug, service } };
}

export default function ServicePage({ slug, service }: { slug: string; service: any }) {
  if (!service) return <div className="max-w-4xl mx-auto px-4 py-12"><h1>Service not found</h1></div>;

  const allServices = Object.keys(services).filter((s) => s !== slug).slice(0, 6);

  return (
    <>
      <Head>
        <title>{service.title} — Dr Brett Marshall</title>
        <meta name="description" content={service.meta} />
      </Head>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-400 mb-8">
          <a href="/" className="hover:text-[#1a3a4a]">Home</a>
          <span className="mx-2">/</span>
          <a href="/our-services" className="hover:text-[#1a3a4a]">Services</a>
          <span className="mx-2">/</span>
          <span className="text-[#1a3a4a]">{service.title}</span>
        </nav>
        
        <header className="mb-10">
          <h1 className="text-3xl font-light text-[#1a3a4a]">{service.title}</h1>
          <div className="w-12 h-[2px] bg-[#1a3a4a] mt-3" />
        </header>
        
        <div 
          className="prose prose-lg max-w-none prose-headings:text-[#1a3a4a] prose-a:text-[#1a3a4a] prose-img:rounded-lg prose-p:text-gray-600 prose-li:text-gray-600"
          dangerouslySetInnerHTML={{ __html: service.content }}
        />

        <div className="mt-16 p-8 bg-gray-50 rounded-lg text-center">
          <h2 className="text-xl font-light text-[#1a3a4a] mb-3">Ready to discuss your health?</h2>
          <p className="text-gray-600 mb-6">Book a consultation with Dr Brett Marshall.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/request-an-appointment" className="bg-[#1a3a4a] text-white px-6 py-3 rounded font-medium hover:bg-[#2a4a5a] transition-colors">Request Appointment</a>
            <a href="tel:+613****6411" className="border-2 border-[#1a3a4a] text-[#1a3a4a] px-6 py-3 rounded font-medium hover:bg-[#1a3a4a] hover:text-white transition-colors">Call 03 9776 6411</a>
          </div>
        </div>

        {allServices.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-medium text-[#1a3a4a] mb-4">Other Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {allServices.map((s) => {
                const svc = (services as Record<string, any>)[s];
                return (
                  <a key={s} href={`/services/${s}`} className="text-sm text-gray-600 hover:text-[#1a3a4a] hover:underline py-1">
                    {svc?.title}
                  </a>
                );
              })}
            </div>
            <a href="/our-services" className="inline-block mt-4 text-sm text-[#1a3a4a] hover:underline">View all services →</a>
          </div>
        )}
      </div>
    </>
  );
}
