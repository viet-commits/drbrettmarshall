import Link from "next/link";

export function PageHeader({ title, crumb }: { title: string; crumb?: string }) {
  return (
    <div className="bg-surface-muted border-b border-line">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <h1 className="font-serif text-4xl font-semibold text-brand">{title}</h1>
        <nav className="text-xs text-muted mt-3 flex items-center gap-1.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <span aria-hidden>/</span>
          <span className="text-ink/70">{crumb ?? title}</span>
        </nav>
      </div>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, center }: { eyebrow?: string; title: string; center?: boolean }) {
  return (
    <div className={center ? "text-center mb-12" : "mb-12"}>
      {eyebrow && <p className="text-accent text-sm font-semibold uppercase tracking-[0.2em] mb-2">{eyebrow}</p>}
      <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand">{title}</h2>
      <div className={`w-12 h-px bg-accent mt-4 ${center ? "mx-auto" : ""}`} />
    </div>
  );
}

export function ButtonLink({ href, children, variant = "primary", external }: {
  href: string; children: React.ReactNode; variant?: "primary" | "outline" | "outline-dark"; external?: boolean;
}) {
  const base = "inline-flex items-center gap-2 px-6 py-3 rounded-sm font-semibold text-sm uppercase tracking-wide transition-colors";
  const styles = {
    primary: "bg-brand text-white hover:bg-brand-light",
    outline: "border border-brand text-brand hover:bg-brand/5",
    "outline-dark": "border border-white/40 text-white hover:bg-white/10",
  }[variant];
  const extra = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link href={href} {...extra} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

// Contact detail row used on contact/request-appointment pages
export function ContactRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-11 h-11 rounded-sm bg-brand/5 flex items-center justify-center flex-shrink-0 text-brand">{icon}</div>
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">{label}</h3>
        <div className="text-[15px] text-ink/90">{children}</div>
      </div>
    </div>
  );
}
