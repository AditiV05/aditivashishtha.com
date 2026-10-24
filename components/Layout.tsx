import type { ReactNode } from "react";

const RESUME = "/aditivashishtha_resume.pdf";

function isExternal(href: string) {
  return href.startsWith("http") || href.endsWith(".pdf");
}

function externalProps(href: string) {
  return isExternal(href)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

export function Nav() {
  return (
    <header className="nav-shell">
      <nav className="nav" aria-label="Primary">
        <a href="#top" className="nav-mark" aria-label="Aditi Vashishtha, home">
          <span className="nav-mark-dot" aria-hidden="true" />
          Aditi Vashishtha
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#writing">Writing</a>
          <a href="#contact">Contact</a>
        </div>
        <a href={RESUME} className="nav-cta" {...externalProps(RESUME)}>
          Résumé
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </nav>
    </header>
  );
}

export function SectionHead({
  id,
  index,
  label,
  title,
}: {
  id: string;
  index: string;
  label: string;
  title?: ReactNode;
}) {
  return (
    <div className="section-head reveal">
      <h2 id={id} className="section-label">
        <span className="section-index">{index}</span>
        <span className="section-line" aria-hidden="true" />
        {label}
      </h2>
      {title && <p className="section-title">{title}</p>}
    </div>
  );
}

export function Link({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const external = isExternal(href);

  return (
    <a className="link" href={href} {...externalProps(href)}>
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

export function Button({
  href,
  children,
  variant = "ghost",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
}) {
  const external = isExternal(href);

  return (
    <a className={`btn btn-${variant}`} href={href} {...externalProps(href)}>
      {children}
      <span className="btn-arrow" aria-hidden="true">
        {external ? "↗" : "→"}
      </span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
