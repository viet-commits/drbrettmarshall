import cleanContent from "../data/clean_content.json";

export interface ServiceData { title: string; content: string; meta: string; }

export const services = cleanContent.services as Record<string, ServiceData>;

export const CONDITION_SLUGS = [
  "abnormal-pap-smears-vulval-disorders", "adhesions", "endometriosis",
  "fibroids", "infertility", "menorrhagia-heavy-periods", "pcos",
  "pelvic-organ-prolapse", "pelvic-pain", "urinary-incontinence",
];

export const PROCEDURE_SLUGS = Object.keys(services).filter((s) => !CONDITION_SLUGS.includes(s));

export function stripTitle(text: string, title: string): string {
  const t = (text || "").trim();
  if (title && t.startsWith(title)) return t.slice(title.length).trim();
  return t;
}

export function splitParagraphs(text: string): string[] {
  if (!text) return [];
  return text.split(/\n\s+/).map((p) => p.trim()).filter(Boolean);
}

export function excerpt(text: string, title: string, max = 140): string {
  const t = stripTitle(text, title).replace(/\s+/g, " ").trim();
  return t.length <= max ? t : t.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

// The old WordPress theme appended a block of cross-navigation to the end of
// every service body: "Related Literature", "Services > By Conditions" /
// "Services > By Treatment/Procedure", and "View Services by …". These were
// rendered as clickable grids on the WP site; in the raw scraped content they
// survive as dead text, so we truncate them here (the navigation is rebuilt
// in the template instead).
const NAV_START_RE = /(?:Related Literature|Services\s*>\s*By|View Services by)/i;

// Split a service body into { description, treatment }.
export function parseSections(content: string, title: string) {
  let body = stripTitle(content, title);

  // Drop the trailing navigation boilerplate.
  const navIdx = body.search(NAV_START_RE);
  if (navIdx !== -1) body = body.slice(0, navIdx).trim();

  // Split on the "Treatments and procedures" heading, then drop the heading
  // itself so it doesn't render as a duplicate body paragraph.
  const parts = body.split(/(?=Treatments? and procedures?\b)/i);
  const description = (parts[0] || "").trim();
  const treatment = parts
    .slice(1)
    .join(" ")
    .replace(/^\s*Treatments? and procedures?\s*/i, "")
    .trim();

  return {
    description: splitParagraphs(description),
    treatment: splitParagraphs(treatment),
  };
}

// Related services: any other service whose title appears in this body text.
export function findRelated(slug: string, content: string, max = 6): Array<[string, string]> {
  const seen = new Set<string>();
  const out: Array<[string, string]> = [];
  for (const [other, svc] of Object.entries(services)) {
    if (other === slug) continue;
    const title = svc.title;
    if (title && content.toLowerCase().includes(title.toLowerCase()) && !seen.has(title)) {
      seen.add(title);
      out.push([other, title]);
      if (out.length >= max) break;
    }
  }
  return out;
}
