import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "I built hybrid retrieval, then measured it. It tied.",
  description:
    "I fused Postgres full text search with pgvector using Reciprocal Rank Fusion, then ran a 27-question eval to check whether it helped. Keyword-only reached 48% top-1 recall. Vector and hybrid both hit 100%.",
  openGraph: {
    images: ["/og-share.png"],
    title: "I built hybrid retrieval, then measured it. It tied.",
    description:
      "A 27-question retrieval eval where hybrid search tied with plain vector search, and why the test set was the problem.",
    url: "https://aditivashishtha.com/writing/hybrid-retrieval-eval",
    siteName: "Aditi Vashishtha",
    type: "article",
    publishedTime: "2026-09-04",
  },
  twitter: {
    images: ["/og-share.png"],
    card: "summary_large_image",
    title: "I built hybrid retrieval, then measured it. It tied.",
    description:
      "A 27-question retrieval eval where hybrid search tied with plain vector search.",
  },
};

// ---------- small presentational helpers ----------

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-6">{children}</p>;
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 mt-16 font-display text-[1.9rem] leading-tight tracking-tight text-fg">
      {children}
    </h2>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link"
    >
      {children}
    </a>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.82em] text-accent">
      {children}
    </code>
  );
}

// ---------- page ----------

export default function HybridRetrievalEval() {
  return (
    <main className="article">
      <div>
        <Link href="/#writing" className="article-back">
          ← Back to aditivashishtha.com
        </Link>

        <article>
          <header className="mb-14 border-b border-line pb-10">
            <h1 className="article-title">
              I built hybrid retrieval, then measured it. It tied.
            </h1>
            <p className="kicker mt-6">
              <time dateTime="2026-09-04">September 2026</time>
            </p>
          </header>

          <P>
            I built a RAG application called DocuMind. You upload a PDF, ask
            questions about it, and get answers drawn only from that document,
            with citations back to the exact source chunk. It is live at{" "}
            <A href="https://documind-web-mu.vercel.app">
              documind-web-mu.vercel.app
            </A>
            .
          </P>

          <P>
            Retrieval is hybrid. Two searches run over the same Postgres table
            and their results are fused into one ranking. I built it that way
            because every article I read said hybrid beats plain vector search.
          </P>

          <P>Then I tested whether that was true for my system. It was not.</P>

          <H2>How the retrieval works</H2>

          <P>
            Every chunk of an uploaded document is stored in one Postgres table
            with two things attached: an embedding, and a <Code>tsvector</Code>{" "}
            of its text.
          </P>

          <P>
            <strong className="font-medium text-fg">
              Semantic search
            </strong>{" "}
            runs over the embeddings using pgvector, with cosine distance and an
            HNSW index. This finds chunks that mean the same thing as the
            question, even when they share no words with it. Ask &ldquo;what
            happens if a family member dies&rdquo; and it returns the
            bereavement leave policy without either of you using the word
            bereavement.
          </P>

          <P>
            <strong className="font-medium text-fg">
              Keyword search
            </strong>{" "}
            runs over the <Code>tsvector</Code> using Postgres full text search
            and <Code>ts_rank</Code>. This finds chunks that contain the actual
            words. It is exact where the embedding is fuzzy.
          </P>

          <P>
            Each search returns its own ranked list.{" "}
            <strong className="font-medium text-fg">
              Reciprocal Rank Fusion
            </strong>{" "}
            merges them. Every chunk scores <Code>1 / (60 + rank)</Code> for
            each list it appears in, and those scores are summed. A chunk that
            ranks fourth in both lists beats a chunk that ranks second in one
            list and is absent from the other. The constant 60 is the standard
            damping value from the original RRF paper. It stops the top position
            from dominating everything below it.
          </P>

          <P>
            That is the whole mechanism. Two opinions about relevance, combined
            so that agreement counts for more than any single strong opinion.
          </P>

          <H2>The eval</H2>

          <P>
            I wanted to know whether the keyword half was earning its place, so
            I built a test set.
          </P>

          <P>
            Twenty-seven questions across four academic papers, about 302 chunks
            total. For each question I recorded in advance which chunk actually
            contained the answer. That gold label is the entire point. Without
            it you are reading outputs and deciding they look reasonable, which
            is not measurement.
          </P>

          <P>
            Then I ran the same 27 questions three ways and measured top-1
            recall, meaning how often the correct chunk came back in first
            position.
          </P>

          <div className="my-10 overflow-x-auto rounded-2xl border border-line bg-surface p-2">
            <table className="w-full border-collapse text-left font-mono text-[0.85rem]">
              <thead>
                <tr className="border-b border-line-strong">
                  <th className="px-4 py-3 font-normal uppercase tracking-widest text-[0.7rem] text-accent">
                    Retrieval mode
                  </th>
                  <th className="px-4 py-3 font-normal uppercase tracking-widest text-[0.7rem] text-accent">
                    Top-1 recall
                  </th>
                </tr>
              </thead>
              <tbody className="text-fg-soft">
                <tr className="border-b border-line">
                  <td className="px-4 py-3">Keyword only</td>
                  <td className="px-4 py-3 text-fg">48% (13/27)</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-4 py-3">Vector only</td>
                  <td className="px-4 py-3 text-fg">100% (27/27)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Hybrid with RRF</td>
                  <td className="px-4 py-3 text-fg">100% (27/27)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <P>
            Vector search got every single question right on its own. Hybrid
            also got every question right. Adding keyword search to a system
            that was already perfect could not improve it.
          </P>

          <P>
            <strong className="font-medium text-fg">
              Hybrid tied. It did not win.
            </strong>
          </P>

          <H2>The test set was the problem, not the result</H2>

          <P>
            The honest reading is not &ldquo;hybrid retrieval doesn&rsquo;t
            work.&rdquo; It is &ldquo;my test set could not tell these two
            apart.&rdquo;
          </P>

          <P>
            Four academic papers are semantically uniform prose. Every chunk is
            full sentences on a related topic, written in a consistent register.
            That is the best case for embeddings, and the worst case for showing
            where they fail. My questions were also natural language questions,
            which is exactly what dense retrieval is built for.
          </P>

          <P>
            A test set where one method scores 100% has no room left to measure
            anything. The ceiling hid the comparison.
          </P>

          <P>
            Keyword search scoring only 48% is the more interesting number, and
            it points at the same problem from the other side. On this corpus,
            exact word matching was actively bad, because the questions rarely
            reused the document&rsquo;s phrasing. That is a property of my
            corpus, not a property of keyword search.
          </P>

          <H2>Why I kept hybrid anyway</H2>

          <P>
            I kept it, and I wrote down that I was keeping it as a bet rather
            than a proven improvement.
          </P>

          <P>
            The reasoning is about the queries my eval never contained.
            Embeddings blur exact tokens. A policy code like RW-114, an error
            string, a function name, a part number, an acronym that appears
            twice in a 300 page document: these are cases where the semantically
            nearest chunk is not the right chunk, and where a lexical match is
            not merely helpful but necessary. My four academic papers had almost
            none of these, so my eval could not see the gap.
          </P>

          <P>
            That is a defensible reason to keep a component. It is not a reason
            to claim it improved anything, and the difference between those two
            statements is the only thing this whole exercise was about.
          </P>

          <H2>What a harder test set looks like</H2>

          <P>The next version needs questions the current one cannot ask:</P>

          <ul className="mb-6 space-y-3 pl-5 marker:text-accent [&>li]:list-disc">
            <li>
              <strong className="font-medium text-fg">
                Exact identifiers.
              </strong>{" "}
              Policy codes, ticket numbers, part numbers, version strings. Cases
              where being semantically close is being wrong.
            </li>
            <li>
              <strong className="font-medium text-fg">
                A mixed corpus.
              </strong>{" "}
              Not four papers in one field. Documents in different registers, so
              that nearest in embedding space stops being a reliable proxy for
              correct.
            </li>
            <li>
              <strong className="font-medium text-fg">
                Distractor chunks.
              </strong>{" "}
              Passages that discuss the same topic but do not contain the
              answer, so that a near miss is punished rather than rewarded.
            </li>
            <li>
              <strong className="font-medium text-fg">
                Rare terms.
              </strong>{" "}
              Words appearing once or twice, where the embedding has thin signal
              and lexical matching has strong signal.
            </li>
            <li>
              <strong className="font-medium text-fg">
                Recall at 3 and 5, not just top-1.
              </strong>{" "}
              A ceiling at 100% on one metric hides everything. More metrics,
              more room to see a difference.
            </li>
          </ul>

          <P>
            I would also build the eval before building the feature next time. I
            built hybrid retrieval, then measured it, and the measurement told
            me I had not needed to. Building the harness first would have shaped
            what I built rather than grading it afterwards.
          </P>

          <H2>The part worth keeping</H2>

          <P>
            The result I got is less useful than the habit. I had a thing I
            believed, I checked it, and it was not true, and the correct
            response was to write that down rather than round it up.
          </P>

          <P>
            An unmeasured system does not have a performance. It has a story
            about its performance. Those are different, and only one of them
            survives contact with a real corpus.
          </P>

          <P>
            Code is public at{" "}
            <A href="https://github.com/AditiV05">github.com/AditiV05</A>.
          </P>

          <div className="mt-14 rounded-2xl border border-accent/25 bg-accent-soft px-6 pt-6 pb-1 text-[#2c3150]">
            <P>
              If you have built retrieval evals: what would you put in a test
              set designed to separate lexical from dense retrieval? I want
              questions where hybrid should clearly win, so the next run can
              actually fail.
            </P>
          </div>
        </article>
      </div>
    </main>
  );
}
