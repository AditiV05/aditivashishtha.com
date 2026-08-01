import type { Project } from "@/content/site";
import { Link } from "@/components/Layout";
import Image from "next/image";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card">
      {project.shot && (
        <div className="shot-frame">
          <Image
            className="shot"
            src={project.shot.src}
            alt={project.shot.alt}
            width={1600}
            height={533}
          />
        </div>
      )}
      <div className="card-body">
        <div className="row">
          <div className="measure">
            <div className="flex items-baseline gap-3">
              <h3 className="display text-[1.6rem]">{project.title}</h3>
              {project.status && <span className="chip">{project.status}</span>}
            </div>
            <p className="dim mt-2 italic">{project.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
            {project.body.map((para) => (
              <p key={para.slice(0, 24)} className="mt-5">
                {para}
              </p>
            ))}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {project.links.map((l) => (
                <Link key={l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <aside className="caveat">
            <span className="caveat-label">
              <span className="caveat-dot" aria-hidden="true" />
              {project.note.label}
            </span>
            {project.note.body}
          </aside>
        </div>
      </div>
    </article>
  );
}
