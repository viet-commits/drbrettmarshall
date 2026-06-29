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

  return (
    <>
      <Head>
        <title>{service.title} — Dr Brett Marshall</title>
        <meta name="description" content={service.meta} />
      </Head>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <a href="/" className="hover:text-[#1a3a4a]">Home</a> / <a href="/our-services" className="hover:text-[#1a3a4a]">Services</a> / <span className="text-[#1a3a4a]">{service.title}</span>
        </nav>
        <header className="mb-10">
          <h1 className="text-3xl font-light text-[#1a3a4a]">{service.title}</h1>
          <div className="w-16 h-[2px] bg-[#1a3a4a] mt-3" />
        </header>
        <div className="prose prose-lg max-w-none prose-headings:text-[#1a3a4a] prose-a:text-[#1a3a4a] prose-img:rounded-lg" dangerouslySetInnerHTML={{ __html: service.content }} />
        <div className="mt-12 p-8 bg-gray-50 rounded-lg text-center">
          <h2 className="text-xl font-light text-[#1a3a4a] mb-3">Ready to discuss your health?</h2>
          <p className="text-gray-600 mb-6">Book a consultation with Dr Brett Marshall.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/request-an-appointment" className="bg-[#1a3a4a] text-white px-6 py-3 rounded font-medium hover:bg-[#2a4a5a] transition-colors">Request Appointment</a>
            <a href="tel:+613****6411" className="border-2 border-[#1a3a4a] text-[#1a3a4a] px-6 py-3 rounded font-medium hover:bg-[#1a3a4a] hover:text-white transition-colors">Call 03 9776 6411</a>
          </div>
        </div>
      </div>
    </>
  );
}
