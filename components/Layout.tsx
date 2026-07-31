import type { ReactNode } from "react";

export function Row({
  children,
  note,
  shot,
}: {
  children: ReactNode;
  note?: { label: string; body: string };
  shot?: { src: string; alt: string; caption: string };
}) {
  return (
    <div className="row">
      <div className="measure">{children}</div>
      {(note || shot) && (
        <aside className="note">
          {note && (
            <>
              <span className="note-label">{note.label}</span>
              {note.body}
            </>
          )}
          {shot && (
            <figure className="mt-6">
              <div className="aspect-4/3 bg-rule" />
              <figcaption className="mt-2 text-ink-faint">
                {shot.caption}
              </figcaption>
            </figure>
          )}
        </aside>
      )}
    </div>
  );
}

export function SectionHead({ id, label }: { id: string; label: string }) {
  return (
    <>
      <hr className="rule" />
      <h2 id={id} className="eyebrow pt-5 pb-10">
        {label}
      </h2>
    </>
  );
}

export function Link({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http") || href.endsWith(".pdf");
  const props = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a className="link" href={href} {...props}>
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
