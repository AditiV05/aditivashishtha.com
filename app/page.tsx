import { Nav, SectionHead, Button, Link } from "@/components/Layout";
import { projects, about, writing, writingNote } from "@/content/site";
import { ProjectCard } from "@/components/ProjectCard";
import { HeroReveal } from "@/components/HeroReveal";
import { HelloCycle } from "@/components/HelloCycle";
import { ToolkitPills } from "@/components/ToolkitPills";
import { Reveal } from "@/components/Reveal";
import Image from "next/image";

const EMAIL = "aditi.vashishthaa@gmail.com";

export default function Home() {
  return (
    <>
      <Nav />
      <Reveal />

      <section id="top" className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="wrap hero-inner">
          <HeroReveal>
            <p className="availability" data-reveal="eyebrow">
              <span className="pulse" aria-hidden="true" />
              Open to SDE &amp; GenAI internships · September 2026
            </p>

            <h1 className="hero-title">
              <span className="sr-only">Aditi Vashishtha. </span>
              <span className="line">
                <span data-reveal="line">I build full-stack</span>
              </span>
              <span className="line">
                <span data-reveal="line">and applied AI systems,</span>
              </span>
              <span className="line">
                <span data-reveal="line">
                  from idea to <em>production.</em>
                </span>
              </span>
            </h1>

            <div className="hero-foot" data-reveal="sub">
              <p className="hero-sub">
                Final-year BCA at Manipal University Jaipur, on the Kalvium
                software product engineering track. Currently interning in the
                IT department of a Delhi government power utility.
              </p>
              <div className="hero-ctas">
                <Button href="#work" variant="solid">
                  See the work
                </Button>
                <Button href={`mailto:${EMAIL}`}>Email me</Button>
              </div>
            </div>

          <dl className="stats" data-reveal="sub">
            {about.counts.map((c) => (
              <div key={c.label} className="stat">
                <dt className="stat-label">{c.label}</dt>
                <dd className="stat-n">{c.n}</dd>
              </div>
            ))}
            <div className="stat stat-links">
              <dt className="stat-label">elsewhere</dt>
              <dd className="stat-social">
                <Link href="https://github.com/AditiV05">GitHub</Link>
                <Link href="https://linkedin.com/in/aditivashishthaa">
                  LinkedIn
                </Link>
              </dd>
            </div>
          </dl>
          </HeroReveal>
        </div>
      </section>

      <main className="wrap">
        <section className="section">
          <SectionHead
            id="about"
            index="01"
            label="About"
            title={
              <>
                Every project says what it <em>doesn&apos;t</em> do.
              </>
            }
          />

          <div className="bento">
            <div className="tile tile-hello reveal">
              <div className="hello-portrait">
                <Image
                  src={about.hello.portrait.src}
                  alt={about.hello.portrait.alt}
                  width={640}
                  height={640}
                />
              </div>
              <div>
                <p className="kicker kicker-accent">
                  <HelloCycle />
                </p>
                <p className="hello-name">{about.hello.name}</p>
                <p className="hello-body">{about.hello.line}</p>
              </div>
            </div>

            <div className="tile tile-principle reveal">
              <p className="kicker">how I show work</p>
              <p className="tile-lede">{about.body}</p>
              <div className="examples">
                {about.examples.map((ex) => (
                  <figure className="example" key={ex.source}>
                    <figcaption className="example-src">
                      <span className="caveat-dot" aria-hidden="true" />
                      {ex.source}
                    </figcaption>
                    <blockquote>{ex.text}</blockquote>
                  </figure>
                ))}
              </div>
            </div>

            <div className="tile tile-ship reveal">
              <p className="kicker">how I ship</p>
              <ol className="ship-list">
                {about.ship.map((item, i) => (
                  <li key={item.slice(0, 20)}>
                    <span className="ship-n">0{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="section">
          <SectionHead
            id="work"
            index="02"
            label="Selected work"
            title="Five projects. Built solo, architecture through deploy."
          />
          <div className="projects">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHead
            id="writing"
            index="03"
            label="Writing"
            title="Notes from when a measurement disagreed with me."
          />
          {writing.map((w) => (
            <a key={w.slug} href={w.href} className="post reveal">
              <div>
                <p className="kicker">{w.date}</p>
                <p className="post-title">{w.title}</p>
                <p className="post-blurb">{w.blurb}</p>
                <span className="post-cta">
                  Read the post <span aria-hidden="true">→</span>
                </span>
              </div>
              {w.results && (
                <div className="bars" aria-label="Top-1 recall by retrieval mode">
                  <p className="kicker">top-1 recall · 27 questions</p>
                  {w.results.map((r) => (
                    <div
                      key={r.label}
                      className={r.lead ? "bar bar-lead" : "bar"}
                    >
                      <span className="bar-label">{r.label}</span>
                      <span className="bar-track">
                        <span
                          className="bar-fill"
                          style={{ width: `${r.value}%` }}
                        />
                      </span>
                      <span className="bar-value">{r.value}%</span>
                    </div>
                  ))}
                </div>
              )}
            </a>
          ))}
          <p className="aside-note reveal">
            <span>{writingNote.label}</span> {writingNote.body}
          </p>
        </section>

        <section className="section">
          <SectionHead
            id="toolkit"
            index="04"
            label="Toolkit"
            title="What I reach for."
          />
          <div className="reveal">
            <ToolkitPills />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-glow" aria-hidden="true" />
        <div className="wrap">
          <SectionHead id="contact" index="05" label="Contact" />
          <div className="reveal">
            <p className="footer-title">
              Open to SDE and GenAI internships from{" "}
              <em>September 2026.</em>
            </p>
            <p className="footer-sub">
              The fastest way to reach me is email. I answer.
            </p>
            <a className="footer-email" href={`mailto:${EMAIL}`}>
              {EMAIL}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="footer-base">
            <span>© 2026 Aditi Vashishtha</span>
            <span className="footer-links">
              <Link href="https://github.com/AditiV05">GitHub</Link>
              <Link href="https://linkedin.com/in/aditivashishthaa">
                LinkedIn
              </Link>
              <Link href="/aditivashishtha_resume.pdf">Résumé</Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
