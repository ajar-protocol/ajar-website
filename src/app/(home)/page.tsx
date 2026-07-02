import Link from 'next/link';

const primitives = [
  ['Meaning', 'Semantic Views served from the same URLs as HTML'],
  ['Actions', 'Typed Actions with R0-R3 risk classes'],
  ['Safety', 'SIMULATE dry runs and two-phase Offer/Commit'],
  ['Authority', 'Principal-signed Mandates with scope, caps, expiry, and revocation'],
  ['Accountability', 'Dual-signed Receipts and audit trails'],
  ['Economics', '402-native metering with pluggable settlement'],
];

const steps = [
  'Owner installs a Gateway, plugin, or native integration.',
  'Owner reviews and signs Views, Actions, policy, pricing, and gates.',
  'Manifest is published at /.well-known/ajar.json.',
  'Agents verify, read, simulate, commit, and retain receipts.',
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
              Open websites to AI agents under owner-controlled policy.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-fd-muted-foreground sm:text-lg">
              Ajar is a protocol layer over HTTPS for agent-readable content, typed actions,
              delegated authority, verifiable receipts, and metered access. It lets a site say
              what is public, what needs user authority, and what must be simulated before it runs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/docs"
                className="inline-flex h-11 items-center justify-center rounded-md bg-fd-primary px-5 text-sm font-medium text-fd-primary-foreground transition hover:bg-fd-primary/90"
              >
                Read the docs
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
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">The hard part is authority</h2>
            <p className="mt-4 text-sm leading-6 text-fd-muted-foreground">
              An agent can load a page and submit a form, but that does not tell the website
              whose authority is being used or what the agent is allowed to do. Giving the model a
              browser cookie opens too much. Scraping HTML proves too little.
            </p>
            <p className="mt-4 text-sm leading-6 text-fd-muted-foreground">
              Ajar keeps the browser session out of the model. The user logs in normally, links the
              account to a principal key, and signs a narrow mandate for a specific agent key. The
              Kernel and Gateway check that mandate before the real account is touched.
            </p>
          </div>
          <div className="grid gap-4">
            {accessRules.map(([label, text]) => (
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
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-normal">Needs to primitives</h2>
            <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">
              Ajar standardizes the owner-side contract agents need before they can safely consume
              content, request actions, and account for outcomes.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {primitives.map(([need, primitive]) => (
              <div key={need} className="rounded-lg border bg-fd-card p-5">
                <h3 className="text-sm font-semibold">{need}</h3>
                <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">{primitive}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold tracking-normal">How it works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step} className="border-l pl-5">
                <div className="text-sm font-semibold text-fd-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <p className="mt-3 text-sm leading-6">{step}</p>
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
