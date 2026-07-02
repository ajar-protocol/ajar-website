import Link from 'next/link';

const problemResolutions = [
  [
    'Agents scrape pages built for people',
    'Ajar serves signed semantic Views from the same URLs, so agents can read the meaning without guessing from HTML.',
  ],
  [
    'Login gives too much power',
    'Ajar keeps cookies out of the model. Users link an account to a principal key and delegate only the scopes an agent needs.',
  ],
  [
    'Owners cannot say what is allowed',
    'Ajar gives owners a signed manifest and policy surface for exposure, audience, pricing, rate limits, and gates.',
  ],
  [
    'Actions are hard to trust',
    'Ajar makes risky actions simulate first, freeze into a signed offer, commit only under mandate, and end with a receipt.',
  ],
];

const flow = [
  ['1. Publish', 'The owner installs a Gateway or plugin, reviews generated Views and Actions, then signs the manifest.'],
  ['2. Discover', 'The agent fetches /.well-known/ajar.json, verifies the owner signature, and learns what is exposed.'],
  ['3. Separate access', 'Public data can be read by policy. Account data requires a linked user account and delegated authority.'],
  ['4. Rehearse', 'Before risky work, the Kernel asks the site to SIMULATE and checks the result against the mandate.'],
  ['5. Commit', 'The site issues a signed offer. The agent commits only if the mandate, caps, risk, and cost still match.'],
  ['6. Keep proof', 'The site and agent store a dual-signed receipt for audit, dispute handling, and accountability.'],
];

const accessRules = [
  ['Public data', 'Catalog pages, docs, public prices, and blog posts can be exposed without a user session.'],
  ['Account data', 'Orders, carts, invoices, profiles, and tickets need a linked account and user authority.'],
  ['Risky actions', 'Purchases, messages, exports, deletes, and legal changes need mandates, simulation, offers, and receipts.'],
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-fd-background text-fd-foreground">
      <section className="relative overflow-hidden border-b bg-[linear-gradient(90deg,var(--color-fd-border)_1px,transparent_1px),linear-gradient(180deg,var(--color-fd-border)_1px,transparent_1px)] bg-[size:56px_56px]">
        <div className="absolute inset-0 bg-fd-background/88" />
        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col justify-center px-6 py-20 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
              Owner-controlled agent access
            </p>
            <h1 className="text-5xl font-semibold tracking-normal sm:text-6xl lg:text-7xl">Ajar Protocol</h1>
            <p className="mt-6 text-2xl font-medium text-fd-foreground sm:text-3xl">
              A safer contract for AI agents using websites.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-fd-muted-foreground sm:text-lg">
              Today agents scrape pages, borrow sessions, and submit forms without a clear contract.
              Ajar lets a website publish what agents may read, what needs user authority, what must
              be simulated first, and what proof both sides keep afterward.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/docs"
                className="inline-flex h-11 items-center justify-center rounded-md bg-fd-primary px-5 text-sm font-medium text-fd-primary-foreground transition hover:bg-fd-primary/90"
              >
                Read the docs
              </Link>
              <Link
                href="/docs/concepts"
                className="inline-flex h-11 items-center justify-center rounded-md border bg-fd-background px-5 text-sm font-medium transition hover:bg-fd-accent"
              >
                Concept guide
              </Link>
              <Link
                href="https://github.com/ajar-protocol"
                className="inline-flex h-11 items-center justify-center rounded-md border bg-fd-background px-5 text-sm font-medium transition hover:bg-fd-accent"
              >
                GitHub
              </Link>
            </div>
          </div>

          <Link
            href="/docs/project/roadmap"
            className="mt-14 block w-fit rounded-md border bg-fd-background/80 px-4 py-3 text-sm text-fd-muted-foreground transition hover:bg-fd-accent hover:text-fd-foreground"
          >
            v0.1 draft · Phase 1 (Gateway MVP) in progress · Apache-2.0 / CC-BY-4.0
          </Link>
        </div>
      </section>

      <section className="border-b px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-normal">Problem statement and Ajar resolution</h2>
            <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">
              The problem is not that agents cannot click websites. They can. The problem is that
              clicking gives no reliable boundary between public data, private data, and real-world
              action. Ajar turns those boundaries into signed protocol objects.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {problemResolutions.map(([problem, resolution]) => (
              <div key={problem} className="rounded-lg border bg-fd-card p-5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-fd-muted-foreground">
                  Problem
                </p>
                <h3 className="mt-2 text-base font-semibold">{problem}</h3>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-fd-muted-foreground">
                  Ajar resolution
                </p>
                <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{resolution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">How Ajar solves it</h2>
            <p className="mt-4 text-sm leading-6 text-fd-muted-foreground">
              Ajar does not ask sites to replace HTML, checkout, or payments. It adds a signed layer
              beside the existing site, so owners keep control and agents get a stable contract.
            </p>
            <p className="mt-4 text-sm leading-6 text-fd-muted-foreground">
              The core rule is simple: public reads can be open by policy, account reads need user
              authority, and consequential actions need simulation, mandate checks, and receipts.
            </p>
          </div>
          <div className="grid gap-4">
            {flow.map(([label, text]) => (
              <div key={label} className="border-l pl-5">
                <h3 className="text-sm font-semibold">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-normal">What happens with authentication</h2>
            <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">
              Ajar avoids the dangerous shortcut: giving the model a full logged-in session. The
              site still uses its normal login. Ajar adds account binding and limited delegation.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {accessRules.map(([label, text]) => (
              <div key={label} className="rounded-lg border bg-fd-card p-5">
                <h3 className="text-sm font-semibold">{label}</h3>
                <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-fd-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Ajar Protocol</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link className="hover:text-fd-foreground" href="https://github.com/ajar-protocol">
              GitHub
            </Link>
            <Link className="hover:text-fd-foreground" href="/docs/contributing/guidelines">
              Contributing
            </Link>
            <Link className="hover:text-fd-foreground" href="https://github.com/ajar-protocol/ajar/blob/main/LICENSE.md">
              License
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
