#!/usr/bin/env python3
"""Generate properly-structured TSX pages from clean content."""
import json, re, os

with open("data/clean_content.json") as f:
    data = json.load(f)

pages = data["pages"]
services = data["services"]

# --- Categorize services ---
CONDITIONS = [
    "abnormal-pap-smears-vulval-disorders", "adhesions", "endometriosis", 
    "fibroids", "infertility", "menorrhagia-heavy-periods", "pcos",
    "pelvic-organ-prolapse", "pelvic-pain", "urinary-incontinence"
]
PROCEDURES = [s for s in services if s not in CONDITIONS]

def escape_tsx(s):
    """Escape content for JSX."""
    if not s:
        return ""
    s = s.replace("\\", "\\\\")
    s = s.replace("`", "\\`")
    s = s.replace("${", "\\${")
    # Handle special HTML entities that cause issues in JSX
    s = s.replace("&", "&amp;")
    s = s.replace("<", "&lt;")
    s = s.replace(">", "&gt;")
    s = s.replace('"', "&quot;")
    s = s.replace("'", "&#39;")
    # Clean up excessive whitespace
    s = re.sub(r'\n\s*\n\s*\n+', '\n\n', s)
    s = s.strip()
    return s

def split_paragraphs(text, max_paragraphs=None):
    """Split text into paragraphs."""
    if not text:
        return []
    # Split on double newlines or significant breaks
    paras = re.split(r'\n\s*\n', text)
    paras = [p.strip() for p in paras if p.strip()]
    if max_paragraphs:
        paras = paras[:max_paragraphs]
    return paras

def extract_excerpt(text, max_chars=150):
    """Extract a short excerpt from text."""
    if not text:
        return ""
    clean = text.strip()
    if len(clean) <= max_chars:
        return clean
    return clean[:max_chars].rsplit(' ', 1)[0] + "..."

# --- Build Our Services page ---
def build_our_services():
    page = pages.get("our-services", {})
    content = page.get("content", "")
    paras = split_paragraphs(content)
    intro_text = "\n".join(paras[:2]) if len(paras) >= 2 else content[:500]
    
    condition_cards = []
    procedure_cards = []
    
    for slug, svc in services.items():
        title = svc.get("title", slug)
        excerpt = extract_excerpt(svc.get("content", ""))
        card = (slug, title, excerpt)
        if slug in CONDITIONS:
            condition_cards.append(card)
        else:
            procedure_cards.append(card)
    
    # Sort alphabetically
    condition_cards.sort(key=lambda x: x[1])
    procedure_cards.sort(key=lambda x: x[1])
    
    excerpt_lines = []
    for slug, title, excerpt in condition_cards + procedure_cards:
        excerpt_lines.append(f'  "{slug}": {{ title: "{escape_tsx(title)}", excerpt: "{escape_tsx(excerpt)}" }},')
    
    return f"""import Head from "next/head";
import {{ useState }} from "react";

const serviceExcerpts: Record<string, {{ title: string; excerpt: string }}> = {{
{chr(10).join(excerpt_lines)}
}};

const conditionSlugs = {json.dumps([s for s, _, _ in condition_cards])};
const procedureSlugs = {json.dumps([s for s, _, _ in procedure_cards])};

export default function OurServices() {{
  const [tab, setTab] = useState<"conditions" | "procedures">("conditions");
  const slugs = tab === "conditions" ? conditionSlugs : procedureSlugs;

  return (
    <>
      <Head>
        <title>Our Services — Dr Brett Marshall</title>
        <meta name="description" content="Procedures and treatments available at Dr Brett Marshall's practice. Specialist gynaecological care on the Mornington Peninsula." />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-light text-[#1a3a4a]">Our Services</h1>
          <div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#1a3a4a]">Home</a> / Our Services</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="max-w-3xl text-sm leading-relaxed text-gray-600 space-y-4 mb-12">
          {json.dumps(split_paragraphs(intro_text))}
        </div>

        {{/* Tabs */}}
        <div className="flex border-b mb-10">
          <button
            onClick={{() => setTab("conditions")}}
            className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${{tab === "conditions" ? "text-[#1a3a4a] border-b-2 border-[#1a3a4a]" : "text-gray-400 hover:text-gray-600"}}`}}
          >
            By Condition
          </button>
          <button
            onClick={{() => setTab("procedures")}}
            className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${{tab === "procedures" ? "text-[#1a3a4a] border-b-2 border-[#1a3a4a]" : "text-gray-400 hover:text-gray-600"}}`}}
          >
            By Procedure or Treatment
          </button>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {{slugs.map((slug) => {{
            const svc = serviceExcerpts[slug];
            if (!svc) return null;
            return (
              <a key={{slug}} href={{`/services/${{slug}}`}} className="block bg-white border border-gray-100 rounded-sm p-6 hover:shadow-md hover:border-[#1a3a4a]/30 transition-all group">
                <h3 className="font-semibold text-[#1a3a4a] text-base mb-3 group-hover:underline">{{svc.title}}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{{svc.excerpt}}</p>
                <span className="text-xs font-semibold text-[#1a3a4a] uppercase tracking-wider">Read More →</span>
              </a>
            );
          }})}}
        </div>
      </div>
    </>
  );
}}
"""

# --- Build individual service page ---
def build_service_page(slug):
    svc = services.get(slug, {})
    title = svc.get("title", slug)
    content = svc.get("content", "")
    
    # Try to split into sections
    sections = re.split(r'(?=(?:Treatments?|Procedures?|Related|Advantages?|What |How |Why |When |Is |Can |Will |Do |Surgery|Treatment|Description))', content)
    
    description = ""
    treatment = ""
    related = ""
    
    if sections:
        # First section is description
        description = sections[0].strip()
        for s in sections[1:]:
            if re.match(r'^(?:Treatments?|Procedures?|Surgery|Treatment)', s, re.I):
                if not treatment:
                    treatment = s.strip()
            elif re.match(r'^(?:Related|What |How |Why |Advantages?)', s, re.I):
                if not related:
                    related = s.strip()
    
    # Find related service links from the content
    related_links = []
    for other_slug, other_svc in services.items():
        if other_slug != slug and other_svc["title"].lower() in content.lower():
            related_links.append((other_slug, other_svc["title"]))
    
    # Deduplicate
    seen = set()
    unique_related = []
    for s, t in related_links:
        if t not in seen:
            seen.add(t)
            unique_related.append((s, t))
    
    # Create paragraphs
    desc_paras = split_paragraphs(description) if description else split_paragraphs(content)
    
    service_title_lines = []
    for s, svc in sorted(services.items()):
        service_title_lines.append(f'  "{s}": {{ title: "{escape_tsx(svc["title"])}" }},')
    
    return f"""import Head from "next/head";

const serviceTitle = "{escape_tsx(title)}";
const description = {json.dumps(desc_paras)};
const treatmentText = {json.dumps(split_paragraphs(treatment) if treatment else [])};
const relatedServices = {json.dumps(unique_related[:6])};

export default function ServicePage() {{
  return (
    <>
      <Head>
        <title>{{serviceTitle}} — Dr Brett Marshall</title>
        <meta name="description" content={{`${{serviceTitle}} — specialist gynaecological care by Dr Brett Marshall on the Mornington Peninsula.`}} />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <nav className="text-xs text-gray-400 mb-2">
            <a href="/" className="hover:text-[#1a3a4a]">Home</a> / <a href="/our-services" className="hover:text-[#1a3a4a]">Services</a> / <span className="text-[#1a3a4a]">{{serviceTitle}}</span>
          </nav>
          <h1 className="text-2xl font-light text-[#1a3a4a]">{{serviceTitle}}</h1>
          <div className="w-10 h-px bg-[#1a3a4a] mt-4" />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Description section */}
            <section className="mb-12">
              <h2 className="text-lg font-semibold text-[#1a3a4a] mb-4 uppercase tracking-wide text-sm">Description</h2>
              <div className="w-8 h-px bg-[#1a3a4a]/30 mb-6" />
              <div className="text-sm leading-relaxed text-gray-600 space-y-4">
                {{description.map((p, i) => (
                  <p key={{i}}>{{p}}</p>
                ))}}
              </div>
            </section>

            {{treatmentText.length > 0 && (
              <section className="mb-12">
                <h2 className="text-lg font-semibold text-[#1a3a4a] mb-4 uppercase tracking-wide text-sm">Treatments and Procedures</h2>
                <div className="w-8 h-px bg-[#1a3a4a]/30 mb-6" />
                <div className="text-sm leading-relaxed text-gray-600 space-y-4">
                  {{treatmentText.map((p, i) => (
                    <p key={{i}}>{{p}}</p>
                  ))}}
                </div>
              </section>
            )}}

            {{relatedServices.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-[#1a3a4a] mb-4 uppercase tracking-wide text-sm">Related Literature</h2>
                <div className="w-8 h-px bg-[#1a3a4a]/30 mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {{relatedServices.map(([slug, title]) => (
                    <a key={{slug}} href={{`/services/${{slug}}`}} className="block bg-gray-50 border border-gray-100 rounded-sm p-4 hover:shadow-sm hover:border-[#1a3a4a]/30 transition-all group">
                      <h3 className="font-semibold text-[#1a3a4a] text-sm group-hover:underline">{{title}}</h3>
                      <span className="text-xs text-gray-400 mt-1 inline-block">Read More →</span>
                    </a>
                  ))}}
                </div>
              </section>
            )}}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#1a3a4a] text-white p-6 rounded-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Request a Consultation</h3>
                <p className="text-sm text-white/80 mb-4">Book an appointment with Dr Brett Marshall to discuss your health concerns.</p>
                <a href="/request-an-appointment" className="block text-center bg-white text-[#1a3a4a] px-4 py-2.5 rounded-sm text-sm font-semibold hover:bg-gray-100 transition-colors">Request Appointment</a>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-xs text-white/60">Phone</p>
                  <a href="tel:+613****6411" className="text-sm text-white hover:underline">03 9776 6411</a>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-sm p-6">
                <h3 className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wider mb-4">All Services</h3>
                <ul className="space-y-2">
                  {{Object.entries(serviceExcerpts).slice(0, 10).map(([slug, {{ title }}]) => (
                    <li key={{slug}}>
                      <a href={{`/services/${{slug}}`}} className="text-sm text-gray-600 hover:text-[#1a3a4a] hover:underline">{{title}}</a>
                    </li>
                  ))}}
                </ul>
                <a href="/our-services" className="inline-block mt-4 text-xs text-[#1a3a4a] hover:underline font-semibold">View All Services →</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}}

const serviceExcerpts: Record<string, {{ title: string }}> = {{
{chr(10).join(service_title_lines)}
}};
"""

# --- Build FAQs page ---
def build_faqs():
    page = pages.get("frequently-asked-questions-faq", {})
    content = page.get("content", "")
    
    # Parse Q&A pairs
    # Pattern: "A Question text? Answer text..."
    qa_pattern = re.findall(r'(?:A\s+)?([A-Z][^?]+\?)\s*(.*?)(?=(?:A\s+)?[A-Z][^?]+\?|$)', content, re.DOTALL)
    
    qas = []
    if qa_pattern:
        for q, a in qa_pattern:
            qas.append((q.strip(), a.strip()))
    else:
        # Fallback: split by common question patterns
        chunks = re.split(r'(?=What |Should |How |Will |Can |Do |Is |Are )', content)
        for chunk in chunks:
            chunk = chunk.strip()
            if not chunk:
                continue
            # Try to split question from answer
            q_match = re.match(r'([^?]+\?)\s*(.*)', chunk, re.DOTALL)
            if q_match:
                qas.append((q_match.group(1).strip(), q_match.group(2).strip()))
            else:
                qas.append((chunk[:80] + "...", chunk))
    
    return f"""import Head from "next/head";
import {{ useState }} from "react";

const faqs = {json.dumps(qas, ensure_ascii=False)};

export default function FAQs() {{
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>Frequently Asked Questions — Dr Brett Marshall</title>
        <meta name="description" content="Answers to common questions about appointments, surgery, and gynaecological care at Dr Brett Marshall's practice." />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-light text-[#1a3a4a]">Frequently Asked Questions</h1>
          <div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#1a3a4a]">Home</a> / FAQs</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-light text-[#1a3a4a] mb-8">Answers to some of our most common questions</h2>
            
            <div className="space-y-3">
              {{faqs.map(([question, answer], i) => (
                <div key={{i}} className="border border-gray-200 rounded-sm overflow-hidden">
                  <button
                    onClick={{() => setOpenIndex(openIndex === i ? null : i)}}
                    className="w-full text-left px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a3a4a] text-white flex items-center justify-center text-sm font-bold">A</span>
                    <span className="font-medium text-[#1a3a4a] text-sm pt-1 flex-1">{{question}}</span>
                    <span className="flex-shrink-0 text-gray-400 text-lg pt-0.5">{{openIndex === i ? "−" : "+"}}</span>
                  </button>
                  {{openIndex === i && (
                    <div className="px-6 pb-5 pl-18">
                      <div className="text-sm leading-relaxed text-gray-600 ml-12 space-y-3">
                        {{answer.split("\\n").filter(Boolean).map((line, j) => (
                          <p key={{j}}>{{line.trim()}}</p>
                        ))}}
                      </div>
                    </div>
                  )}}
                </div>
              ))}}
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#1a3a4a] text-white p-6 rounded-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Still Have Questions?</h3>
                <p className="text-sm text-white/80 mb-4">Contact our practice directly — our staff are happy to help.</p>
                <a href="tel:+613****6411" className="block text-center bg-white text-[#1a3a4a] px-4 py-2.5 rounded-sm text-sm font-semibold hover:bg-gray-100 transition-colors">Call 03 9776 6411</a>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-sm p-6">
                <h3 className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wider mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about-your-visit" className="text-gray-600 hover:text-[#1a3a4a]">About Your Visit</a></li>
                  <li><a href="/request-an-appointment" className="text-gray-600 hover:text-[#1a3a4a]">Request Appointment</a></li>
                  <li><a href="/patient-forms" className="text-gray-600 hover:text-[#1a3a4a]">Patient Forms</a></li>
                  <li><a href="/contact" className="text-gray-600 hover:text-[#1a3a4a]">Contact</a></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}}
"""

# --- Build generic content page ---
def build_generic_page(slug):
    page = pages.get(slug, {})
    title = page.get("title", slug)
    content = page.get("content", "")
    meta = page.get("meta", "")
    
    paras = split_paragraphs(content)
    
    return f"""import Head from "next/head";

const title = "{escape_tsx(title)}";
const content = {json.dumps(paras, ensure_ascii=False)};

export default function GenericPage() {{
  return (
    <>
      <Head>
        <title>{{title}} — Dr Brett Marshall</title>
        <meta name="description" content="{escape_tsx(meta[:160])}" />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-light text-[#1a3a4a]">{{title}}</h1>
          <div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#1a3a4a]">Home</a> / {{title}}</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="text-sm leading-relaxed text-gray-600 space-y-4">
              {{content.map((p, i) => (
                <p key={{i}}>{{p}}</p>
              ))}}
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-[#1a3a4a] text-white p-6 rounded-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Contact Us</h3>
                <p className="text-sm text-white/80 mb-4">Suite 3, 7 Foot Street, Frankston VIC 3199</p>
                <a href="tel:+613****6411" className="block text-center bg-white text-[#1a3a4a] px-4 py-2.5 rounded-sm text-sm font-semibold hover:bg-gray-100 transition-colors">03 9776 6411</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}}
"""

# --- Build Patient Information page ---
def build_patient_information():
    return """import Head from "next/head";

const ctaCards = [
  { title: "Request an Appointment", href: "/request-an-appointment", subtitle: "Phone 03 9776 6411 to book your consultation with Dr Marshall." },
  { title: "Patient Forms", href: "/patient-forms", subtitle: "Download and complete patient forms before your visit." },
  { title: "About Your Visit", href: "/about-your-visit", subtitle: "What to expect at your first appointment and how to prepare." },
];

const associations = [
  { logo: "/images/ranzcog-uai-258x103.png", name: "Royal Australian & New Zealand College of Obstetricians & Gynaecologists" },
  { logo: "/images/ASCCP-textlogo-.jpg-uai-258x103.png", name: "Australian Society for Colposcopy and Cervical Pathology" },
  { logo: "/images/ISGE_logo_blauw_440x164-300x112-300x112-uai-258x103.png", name: "International Society for Gynaecological Endoscopy" },
  { logo: "/images/ages-logo-content-uai-258x103.png", name: "Australian Gynaecological Endoscopy Society" },
  { logo: "/images/eshrelogo-uai-258x103.png", name: "European Society of Human Reproduction & Embryology" },
  { logo: "/images/ama_logo250-uai-258x103.png", name: "Australian Medical Association" },
];

export default function PatientInformation() {
  return (
    <>
      <Head>
        <title>Patient Information — Dr Brett Marshall</title>
        <meta name="description" content="Patient information, forms, and resources for Dr Brett Marshall's gynaecological practice on the Mornington Peninsula." />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-light text-[#1a3a4a]">Patient Information</h1>
          <div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#1a3a4a]">Home</a> / Patient Information</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {ctaCards.map((card) => (
            <a key={card.href} href={card.href} className="block bg-white border border-gray-200 rounded-sm p-8 text-center hover:shadow-lg hover:border-[#1a3a4a]/30 transition-all group">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#1a3a4a]/5 flex items-center justify-center group-hover:bg-[#1a3a4a]/10 transition-colors">
                <span className="text-[#1a3a4a] text-2xl font-light">+</span>
              </div>
              <h2 className="font-semibold text-[#1a3a4a] text-lg mb-3">{card.title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{card.subtitle}</p>
            </a>
          ))}
        </div>

        {/* Professional Associations */}
        <section>
          <h2 className="text-2xl font-light text-[#1a3a4a] mb-2">Professional Associations and Memberships</h2>
          <div className="w-10 h-px bg-[#1a3a4a] mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {associations.map((assoc) => (
              <div key={assoc.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-sm border border-gray-100">
                <img src={assoc.logo} alt={assoc.name} className="h-10 w-auto object-contain flex-shrink-0" />
                <span className="text-xs text-gray-600 leading-tight">{assoc.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
"""

# --- Build About Your Visit page ---
def build_about_your_visit():
    page = pages.get("about-your-visit", {})
    content = page.get("content", "")
    paras = split_paragraphs(content)
    
    # Extract sections
    sections = []
    current_section = {"heading": "", "content": []}
    
    for p in paras:
        # Detect heading-like paragraphs (short, all caps or ends with colon)
        if len(p) < 80 and (p.isupper() or p.strip().endswith(":") or re.match(r'^(?:What|Before|After|During|At|On|Your|When|How|Please|If|The|We|Pre|Post|Hospital|Parking|Fees|Insurance|Medicare|Referral)', p)):
            if current_section["content"]:
                sections.append(current_section)
            current_section = {"heading": p.strip().rstrip(":"), "content": []}
        else:
            current_section["content"].append(p)
    
    if current_section["content"]:
        sections.append(current_section)
    
    if not sections:
        sections = [{"heading": "", "content": paras}]
    
    return f"""import Head from "next/head";

const sections = {json.dumps(sections, ensure_ascii=False)};

export default function AboutYourVisit() {{
  return (
    <>
      <Head>
        <title>About Your Visit — Dr Brett Marshall</title>
        <meta name="description" content="What to expect at your appointment with Dr Brett Marshall — referrals, parking, fees, and preparation." />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-light text-[#1a3a4a]">About Your Visit</h1>
          <div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#1a3a4a]">Home</a> / About Your Visit</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-10">
              {{sections.map((section, i) => (
                <div key={{i}}>
                  {{section.heading && (
                    <>
                      <h2 className="text-lg font-semibold text-[#1a3a4a] mb-1">{{section.heading}}</h2>
                      <div className="w-8 h-px bg-[#1a3a4a]/30 mb-4" />
                    </>
                  )}}
                  <div className="text-sm leading-relaxed text-gray-600 space-y-3">
                    {{section.content.map((p, j) => (
                      <p key={{j}}>{{p}}</p>
                    ))}}
                  </div>
                </div>
              ))}}
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#1a3a4a] text-white p-6 rounded-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Ready to Book?</h3>
                <p className="text-sm text-white/80 mb-4">Contact our practice to schedule your appointment.</p>
                <a href="tel:+613****6411" className="block text-center bg-white text-[#1a3a4a] px-4 py-2.5 rounded-sm text-sm font-semibold hover:bg-gray-100 transition-colors">Call 03 9776 6411</a>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-sm p-6">
                <h3 className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wider mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/patient-forms" className="text-gray-600 hover:text-[#1a3a4a]">Patient Forms</a></li>
                  <li><a href="/frequently-asked-questions-faq" className="text-gray-600 hover:text-[#1a3a4a]">FAQs</a></li>
                  <li><a href="/contact" className="text-gray-600 hover:text-[#1a3a4a]">Contact & Location</a></li>
                  <li><a href="/our-services" className="text-gray-600 hover:text-[#1a3a4a]">Our Services</a></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}}
"""

# --- Build Request Appointment page ---
def build_request_appointment():
    return """import Head from "next/head";

export default function RequestAppointment() {
  return (
    <>
      <Head>
        <title>Request an Appointment — Dr Brett Marshall</title>
        <meta name="description" content="Request an appointment with Dr Brett Marshall — specialist gynaecologist on the Mornington Peninsula. Phone 03 9776 6411." />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-light text-[#1a3a4a]">Request an Appointment</h1>
          <div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#1a3a4a]">Home</a> / Request an Appointment</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-sm p-8 md:p-12">
              <h2 className="text-xl font-light text-[#1a3a4a] mb-6">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#1a3a4a]/5 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wide mb-2">Address</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Suite 3, 7 Foot Street<br />Frankston VIC 3199</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#1a3a4a]/5 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wide mb-2">Phone</h3>
                    <a href="tel:+613****6411" className="text-lg text-[#1a3a4a] hover:underline font-medium">03 9776 6411</a>
                    <p className="text-sm text-gray-500 mt-1">For all appointments and enquiries</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#1a3a4a]/5 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📠</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wide mb-2">Fax</h3>
                    <p className="text-sm text-gray-600">03 9776 6498</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#1a3a4a]/5 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">ℹ️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wide mb-2">Referral Required</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">A referral from your GP or specialist is required prior to making an appointment. Patients may phone to book with Marion, who has worked with Dr Marshall for over 20 years.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-[#1a3a4a]/5 rounded-sm border border-[#1a3a4a]/10">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Before your first appointment, we will send you an information pack which includes a new patient form. You can also <a href="/patient-forms/new-patient-form" className="text-[#1a3a4a] font-semibold hover:underline">complete the new patient form online here</a>.
                </p>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#1a3a4a] text-white p-6 rounded-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Operating At</h3>
                <ul className="text-sm text-white/80 space-y-2">
                  <li>• Peninsula Private Hospital, Langwarrin</li>
                  <li>• Beleura Private Hospital, Mornington</li>
                  <li>• Royal Women's Hospital, Melbourne</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-sm p-6">
                <h3 className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wider mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about-your-visit" className="text-gray-600 hover:text-[#1a3a4a]">About Your Visit</a></li>
                  <li><a href="/patient-forms" className="text-gray-600 hover:text-[#1a3a4a]">Patient Forms</a></li>
                  <li><a href="/frequently-asked-questions-faq" className="text-gray-600 hover:text-[#1a3a4a]">FAQs</a></li>
                  <li><a href="/contact" className="text-gray-600 hover:text-[#1a3a4a]">Contact & Map</a></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
"""

# --- Build For Doctors page ---
def build_for_doctors():
    return """import Head from "next/head";
import { useState } from "react";

const galleryTypes = [
  { id: "photo", label: "Photo Gallery" },
  { id: "video", label: "Video Gallery" },
];

const photoItems = [
  { caption: "Endometriosis", description: "Laparoscopic view of endometriosis" },
  { caption: "Laser Excision Endometriosis", description: "CO₂ laser excision of endometriosis" },
  { caption: "Adhesions", description: "Laparoscopic view of pelvic adhesions" },
  { caption: "Ovarian Cyst", description: "Laparoscopic view of ovarian cyst" },
  { caption: "Fibroids", description: "Laparoscopic view of uterine fibroids" },
  { caption: "Hysteroscopy", description: "Hysteroscopic view of uterine cavity" },
];

export default function ForDoctors() {
  const [activeTab, setActiveTab] = useState("photo");

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
        {{/* Tabs */}}
        <div className="flex border-b mb-10">
          {galleryTypes.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
                activeTab === tab.id
                  ? "text-[#1a3a4a] border-b-2 border-[#1a3a4a]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery */}
        {activeTab === "photo" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoItems.map((item, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-sm overflow-hidden group hover:shadow-md transition-all">
                <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                  <span className="text-4xl">🔬</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#1a3a4a] text-sm mb-1">{item.caption}</h3>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-6xl mb-4">🎬</p>
            <h3 className="text-lg font-light text-[#1a3a4a] mb-2">Video Gallery</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Surgical procedure videos are available for referring doctors. Please contact the practice for access.
            </p>
            <a href="/refer-a-patient" className="inline-block mt-6 bg-[#1a3a4a] text-white px-6 py-2.5 rounded-sm text-sm font-semibold hover:bg-[#2a4a5a] transition-colors">
              Refer a Patient
            </a>
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
"""

# --- Build Refer a Patient page ---
def build_refer_a_patient():
    return """import Head from "next/head";

export default function ReferAPatient() {
  return (
    <>
      <Head>
        <title>Refer a Patient — Dr Brett Marshall</title>
        <meta name="description" content="Refer a patient to Dr Brett Marshall — specialist gynaecologist and laparoscopic surgeon on the Mornington Peninsula." />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-light text-[#1a3a4a]">Refer a Patient</h1>
          <div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#1a3a4a]">Home</a> / Refer a Patient</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-sm p-8 md:p-12">
              <h2 className="text-xl font-light text-[#1a3a4a] mb-8">Refer a Patient Online</h2>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <fieldset>
                  <legend className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wide mb-4 pb-2 border-b w-full">Referring Doctor Details</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Title *</label>
                      <select className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]">
                        <option>DR</option><option>MR</option><option>MRS</option><option>MS</option><option>PROF</option>
                      </select>
                    </div>
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">First Name *</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">Last Name *</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">Provider Number</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wide mb-4 pb-2 border-b w-full">Your Practice</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-500 mb-1">Practice Name *</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-500 mb-1">Address</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">Phone</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">Fax</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-500 mb-1">Email *</label><input type="email" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wide mb-4 pb-2 border-b w-full">Patient Details</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">First Name *</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">Last Name *</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">Date of Birth</label><input type="date" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div><label className="block text-xs font-medium text-gray-500 mb-1">Medicare Number</label><input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" /></div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Clinical Notes / Reason for Referral *</label>
                      <textarea rows={4} className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" />
                    </div>
                  </div>
                </fieldset>

                <button type="submit" className="bg-[#1a3a4a] text-white px-8 py-3 rounded-sm font-semibold text-sm uppercase tracking-wider hover:bg-[#2a4a5a] transition-colors">
                  Submit Referral
                </button>
              </form>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#1a3a4a] text-white p-6 rounded-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Fax Referral</h3>
                <p className="text-sm text-white/80 mb-1">Alternatively, fax your referral to:</p>
                <p className="text-lg font-medium">03 9776 6498</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-sm p-6">
                <h3 className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wider mb-4">Special Interests</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Advanced laparoscopic surgery</li>
                  <li>• Endometriosis excision</li>
                  <li>• Hysteroscopic surgery</li>
                  <li>• Pelvic floor reconstruction</li>
                  <li>• Urinary incontinence surgery</li>
                  <li>• Colposcopy & CO₂ laser</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
"""

# --- Build Patient Forms page ---
def build_patient_forms():
    page = pages.get("patient-forms", {})
    content = page.get("content", "")
    
    # Extract form names from content
    form_names = re.findall(r'([A-Z][A-Za-z\s\-/]+(?:Information|Care|Advice|Form|Checklist))', content)
    if not form_names:
        form_names = [
            "Endometrial Ablation Post Operative Care",
            "Hysterectomy Post Operative Information",
            "Laser Laparoscopy Post Operative Information",
            "Sling Post Operative Information",
            "Pre-operative Advice and Checklist",
            "Prolapse Repair Surgery Post Operative Information",
            "Request for Medical Information",
        ]
    
    return f"""import Head from "next/head";

const forms = {json.dumps(list(dict.fromkeys(form_names))[:10], ensure_ascii=False)};

export default function PatientForms() {{
  return (
    <>
      <Head>
        <title>Patient Forms — Dr Brett Marshall</title>
        <meta name="description" content="Download patient forms and information sheets from Dr Brett Marshall's gynaecological practice." />
      </Head>

      <div className="bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-light text-[#1a3a4a]">Patient Forms</h1>
          <div className="text-xs text-gray-400 mt-1"><a href="/" className="hover:text-[#1a3a4a]">Home</a> / Patient Forms</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-light text-[#1a3a4a] mb-2">Patient Information and Forms</h2>
            <p className="text-sm text-gray-500 mb-10">Resources for gynaecological patients — downloadable forms and post-operative care information.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {{forms.map((form) => (
                <a key={{form}} href="#" className="block bg-white border border-gray-200 rounded-sm p-5 hover:shadow-md hover:border-[#1a3a4a]/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-[#1a3a4a]/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#1a3a4a] text-lg">📄</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#1a3a4a] text-sm group-hover:underline">{{form}}</h3>
                      <span className="text-xs text-gray-400 mt-1 inline-block">Download PDF →</span>
                    </div>
                  </div>
                </a>
              ))}}
              
              <a href="/patient-forms/new-patient-form" className="block bg-[#1a3a4a]/5 border border-[#1a3a4a]/20 rounded-sm p-5 hover:shadow-md hover:border-[#1a3a4a]/40 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#1a3a4a]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#1a3a4a] text-lg">✏️</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1a3a4a] text-sm group-hover:underline">New Patient Form</h3>
                    <span className="text-xs text-gray-500 mt-1 inline-block">Complete online →</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#1a3a4a] text-white p-6 rounded-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Need Help?</h3>
                <p className="text-sm text-white/80 mb-4">Contact Marion, Dr Marshall's secretary, for assistance with forms.</p>
                <a href="tel:+613****6411" className="block text-center bg-white text-[#1a3a4a] px-4 py-2.5 rounded-sm text-sm font-semibold hover:bg-gray-100 transition-colors">03 9776 6411</a>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-sm p-6">
                <h3 className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wider mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about-your-visit" className="text-gray-600 hover:text-[#1a3a4a]">About Your Visit</a></li>
                  <li><a href="/request-an-appointment" className="text-gray-600 hover:text-[#1a3a4a]">Request Appointment</a></li>
                  <li><a href="/frequently-asked-questions-faq" className="text-gray-600 hover:text-[#1a3a4a]">FAQs</a></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}}
"""

# --- Build New Patient Form page ---
def build_new_patient_form():
    return """import Head from "next/head";

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
          <p className="text-sm text-gray-600 mb-8 leading-relaxed">
            Please complete this form before your first appointment. This information helps Dr Marshall provide the best possible care. All information is kept strictly confidential.
          </p>

          <form className="space-y-8 bg-white border border-gray-200 rounded-sm p-8 md:p-12" onSubmit={(e) => e.preventDefault()}>
            <fieldset className="space-y-4">
              <legend className="font-semibold text-[#1a3a4a] text-sm uppercase tracking-wide mb-4 pb-2 border-b w-full">Personal Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["First Name", "Last Name", "Date of Birth", "Medicare Number", "Phone", "Email", "Address", "Referring Doctor"].map((label) => (
                  <div key={label} className={label === "Address" ? "md:col-span-2" : ""}>
                    <label className="block text-xs font-medium text-gray-500 mb-1">{label} *</label>
                    <input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a4a]" />
                  </div>
                ))}
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
"""

# ============================================
# MAIN: Write all files
# ============================================

# Our Services page
print("Writing our-services.tsx...")
with open("pages/our-services.tsx", "w") as f:
    f.write(build_our_services())

# Service pages (all 23)
for slug in services:
    fname = f"pages/services/{slug}.tsx"
    print(f"  Writing {fname}...")
    with open(fname, "w") as f:
        f.write(build_service_page(slug))

# FAQs
print("Writing faqs page...")
with open("pages/frequently-asked-questions-faq.tsx", "w") as f:
    f.write(build_faqs())

# Patient Information
print("Writing patient-information.tsx...")
with open("pages/patient-information.tsx", "w") as f:
    f.write(build_patient_information())

# About Your Visit
print("Writing about-your-visit.tsx...")
with open("pages/about-your-visit.tsx", "w") as f:
    f.write(build_about_your_visit())

# Request Appointment
print("Writing request-an-appointment.tsx...")
with open("pages/request-an-appointment.tsx", "w") as f:
    f.write(build_request_appointment())

# For Doctors
print("Writing for-doctors.tsx...")
with open("pages/for-doctors.tsx", "w") as f:
    f.write(build_for_doctors())

# Refer a Patient
print("Writing refer-a-patient.tsx...")
with open("pages/refer-a-patient.tsx", "w") as f:
    f.write(build_refer_a_patient())

# Patient Forms
print("Writing patient-forms.tsx...")
with open("pages/patient-forms.tsx", "w") as f:
    f.write(build_patient_forms())

# New Patient Form
print("Writing patient-forms/new-patient-form.tsx...")
with open("pages/patient-forms/new-patient-form.tsx", "w") as f:
    f.write(build_new_patient_form())

# Generic pages: terms, disclaimer, privacy
for slug in ["terms-conditions", "disclaimer", "privacy-policy"]:
    fname = f"pages/{slug}.tsx"
    print(f"  Writing {fname}...")
    with open(fname, "w") as f:
        f.write(build_generic_page(slug))

print("\nDone! All pages generated.")
