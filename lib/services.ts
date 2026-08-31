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

// Split a service body into { description, treatment }.
// Sections are delimited by the theme's own heading phrases.
export function parseSections(content: string, title: string) {
  const body = stripTitle(content, title);
  const parts = body.split(/(?=(?:Treatments? and procedures?|Advantages of))/i);
  let description = parts[0] || "";
  let treatment = "";
  for (const p of parts.slice(1)) {
    if (/^(?:Treatments? and procedures?|Advantages of)/i.test(p)) treatment += p;
    else if (treatment) treatment += " " + p;
    else description += " " + p;
  }
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
