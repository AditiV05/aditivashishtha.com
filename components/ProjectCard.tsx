import type { Project } from "@/content/site";
import { Button } from "@/components/Layout";
import Image from "next/image";

function hostOf(project: Project) {
  const live = project.links.find((l) => l.href.startsWith("http"));
  if (!live) return project.slug;
  return new URL(live.href).host.replace(/^www\./, "");
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [primary, ...rest] = project.links;

  return (
    <article className="project reveal">
      {project.shot && (
        <div className="browser">
          <div className="browser-bar" aria-hidden="true">
            <span className="browser-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="browser-url">{hostOf(project)}</span>
          </div>
          <div className="browser-view">
            <Image
              className="shot"
              src={project.shot.src}
              alt={project.shot.alt}
              width={1600}
              height={533}
              sizes="(min-width: 72rem) 70rem, 100vw"
            />
          </div>
        </div>
      )}

      <div className="project-body">
        <div>
          <div className="project-meta">
            <span className="project-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            {project.status ? (
              <span className="status">
                <span className="status-dot" aria-hidden="true" />
                {project.status}
              </span>
            ) : (
              <span className="status status-oss">open source</span>
            )}
          </div>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-blurb">{project.blurb}</p>
          {project.body.map((para) => (
            <p key={para.slice(0, 24)} className="project-para">
              {para}
            </p>
          ))}
          <div className="project-links">
            {primary && (
              <Button href={primary.href} variant="solid">
                {primary.label}
              </Button>
            )}
            {rest.map((l) => (
              <Button key={l.label} href={l.href}>
                {l.label.replace(/\s*→$/, "")}
              </Button>
            ))}
          </div>
        </div>

        <aside className="project-side">
          <p className="kicker">stack</p>
          <ul className="tags">
            {project.stack.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>
          <div className="caveat">
            <p className="caveat-label">
              <span className="caveat-dot" aria-hidden="true" />
              {project.note.label}
            </p>
            <p>{project.note.body}</p>
          </div>
        </aside>
      </div>
    </article>
  );
}
