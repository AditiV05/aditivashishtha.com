import { SectionHead, Link } from "@/components/Layout";
import { CopyEmail, LocalTime } from "@/components/FooterExtras";

export const EMAIL = "aditi.vashishthaa@gmail.com";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <SectionHead id="contact" index="06" label="Contact" />
        <div className="reveal">
          <p className="footer-title">
            Open to SDE and GenAI roles, <em>available now.</em>
          </p>
          <p className="footer-sub">
            The fastest way to reach me is email. I answer.
          </p>
          <div className="footer-actions">
            <a className="footer-email" href={`mailto:${EMAIL}`}>
              {EMAIL}
              <span aria-hidden="true">↗</span>
            </a>
            <CopyEmail email={EMAIL} />
          </div>
        </div>
        <div className="footer-base">
          <span className="footer-meta">
            <span>© 2026 Aditi Vashishtha</span>
            <LocalTime />
          </span>
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
  );
}
