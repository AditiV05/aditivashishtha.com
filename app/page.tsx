import { Row, SectionHead, Link } from "@/components/Layout";
import { projects, experience, toolkit } from "@/content/site";
import { ProjectCard } from "@/components/ProjectCard";
import { HeroReveal } from "@/components/HeroReveal";

export default function Home() {
  return (
    <>
      <main className="wrap pt-24 pb-28 sm:pt-32">
        <Row
          note={{
            label: "status",
            body: "Five things live in production, one open-source tool, all of them solo from architecture through deploy.",
          }}
        >
          <HeroReveal>
            <h1 className="eyebrow" data-reveal="eyebrow">
              Aditi Vashishtha
            </h1>

            <p className="display thesis mt-6">
              <span className="block overflow-hidden">
                <span className="block" data-reveal="line">
                  I build full-stack and
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block" data-reveal="line">
                  applied AI systems.
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block" data-reveal="line">
                  Usually alone, usually all
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block" data-reveal="line">
                  the way to production.
                </span>
              </span>
            </p>

            <p className="dim mt-8" data-reveal="sub">
              Final-year BCA at Manipal University Jaipur, on the Kalvium
              software product engineering track. Right now I&apos;m interning
              in the IT department of a Delhi government power utility. Looking
              for an SDE or GenAI internship from September 2026.
            </p>
          </HeroReveal>

          <nav className="mt-9 flex flex-wrap gap-x-6 gap-y-2">
            <Link href="https://github.com/AditiV05">GitHub</Link>
            <Link href="https://linkedin.com/in/aditivashishthaa">
              LinkedIn
            </Link>
            <Link href="mailto:aditi.vashishthaa@gmail.com">Email</Link>
            <Link href="/Aditi-Vashishtha-Resume.pdf">Résumé</Link>
          </nav>
        </Row>

        <section className="mt-24 sm:mt-28">
          <SectionHead id="work" label="selected work" />
          <div className="flex flex-col gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>

        <section className="mt-24 sm:mt-28">
          <SectionHead id="now" label="right now" />
          <Row note={experience.note}>
            <h3 className="display text-[1.6rem]">{experience.role}</h3>
            <p className="mt-2">{experience.org}</p>
            <p className="chip mt-3">{experience.meta}</p>
            {experience.body.map((para) => (
              <p key={para.slice(0, 24)} className="mt-5">
                {para}
              </p>
            ))}
          </Row>
        </section>

        <section className="mt-24 sm:mt-28">
          <SectionHead id="toolkit" label="toolkit" />
          <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {toolkit.map((g) => (
              <div key={g.group}>
                <dt className="eyebrow">{g.group}</dt>
                <dd className="chip mt-2">{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer className="band">
        <div className="wrap py-24 sm:py-28">
          <SectionHead id="contact" label="contact" />
          <Row>
            <p className="display text-[1.7rem]">
              Open to SDE and GenAI internships from September 2026.
            </p>
            <p className="dim mt-4">
              The fastest way to reach me is email. I answer.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              <Link href="mailto:aditi.vashishthaa@gmail.com">
                aditi.vashishthaa@gmail.com
              </Link>
              <Link href="/Aditi-Vashishtha-Resume.pdf">Résumé</Link>
              <Link href="https://github.com/AditiV05">GitHub</Link>
              <Link href="https://linkedin.com/in/aditivashishthaa">
                LinkedIn
              </Link>
            </div>
          </Row>
        </div>
      </footer>
    </>
  );
}
