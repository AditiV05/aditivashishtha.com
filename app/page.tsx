import { Row, SectionHead, Link } from "@/components/Layout";
import { projects, experience, about } from "@/content/site";
import { ProjectCard } from "@/components/ProjectCard";
import { HeroReveal } from "@/components/HeroReveal";
import { HelloCycle } from "@/components/HelloCycle";
import { ToolkitPills } from "@/components/ToolkitPills";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="wrap pt-24 pb-28 sm:pt-32">
        <Row
          note={{
            label: "status",
            body: "Five projects, four live in production and one open source, all of them solo from architecture through deploy.",
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
                  applied AI systems
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block" data-reveal="line">
                  From idea
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block" data-reveal="line">
                  to production.
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
            <Link href="/aditivashishtha_resume.pdf">Résumé</Link>
          </nav>
        </Row>
        <section className="mt-24 sm:mt-28">
          <SectionHead id="about" label="about" />
          <div className="about-stack">
            <div className="tile tile-hello">
              <div className="hello-portrait">
                <Image
                  src={about.hello.portrait.src}
                  alt={about.hello.portrait.alt}
                  width={640}
                  height={640}
                />
              </div>
              <div>
                <p className="eyebrow">
                  <HelloCycle />
                </p>
                <p className="display text-[1.35rem] mt-3 hello-name">
                  {about.hello.name}
                </p>
                <p className="mt-3 hello-body">{about.hello.line}</p>
              </div>
            </div>

            <div className="bento">
              <div className="tile tile-ink">
                <div className="blobs">
                  <span className="blob blob-a" />
                  <span className="blob blob-b" />
                </div>
                <p className="eyebrow">how I show work</p>
                <p className="display text-[1.35rem] mt-3">{about.heading}</p>
                <p className="dim mt-3 text-[0.9rem]">{about.body}</p>

                {about.examples.map((ex) => (
                  <div className="glass" key={ex.source}>
                    <p className="glass-head">
                      <span />
                      <span className="glass-label">FOR EXAMPLE</span>
                      <span className="glass-src">{ex.source}</span>
                    </p>
                    <p className="glass-body">{ex.text}</p>
                  </div>
                ))}
              </div>

              <div className="bento-col">
                <div className="tile tile-pink">
                  <p className="eyebrow">shipped</p>
                  <div className="mt-4">
                    {about.counts.map((c) => (
                      <div key={c.label} className="count-row">
                        <span className="count-n">{c.n}</span>
                        <span className="count-label">{c.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="tile tile-soft">
                  <p className="eyebrow">how I ship</p>
                  <ul className="ship-list mt-4">
                    {about.ship.map((item) => (
                      <li key={item.slice(0, 20)}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24 sm:mt-28">
          <SectionHead id="work" label="selected work" />
          <div className="flex flex-col gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>

        <section className="mt-24 sm:mt-28 now">
          <SectionHead id="now" label="right now" />
          <Row note={experience.note}>
            <div className="rail">
              <p className="rail-meta">{experience.period}</p>
              <h3 className="display text-[1.6rem] mt-3">{experience.role}</h3>
              <p className="dim mt-2">{experience.org}</p>
              <p className="chip mt-1">{experience.meta}</p>
              {experience.body.map((para) => (
                <p key={para.slice(0, 24)} className="mt-5">
                  {para}
                </p>
              ))}
            </div>
          </Row>
        </section>

        <section className="mt-24 sm:mt-28">
          <SectionHead id="toolkit" label="toolkit" />
          <ToolkitPills />
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
              <Link href="https://github.com/AditiV05">GitHub</Link>
              <Link href="https://linkedin.com/in/aditivashishthaa">
                LinkedIn
              </Link>
              <Link href="/aditivashishtha_resume.pdf">Résumé</Link>
            </div>
          </Row>
        </div>
      </footer>
    </>
  );
}
