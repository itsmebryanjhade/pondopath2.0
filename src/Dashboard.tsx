const money = (value: string) => <><span className="text-sm font-semibold text-stone-400">PHP</span> {value}</>

function Mark() {
  return (
    <a href="/dashboard" className="flex items-center gap-2.5" aria-label="SoloForge dashboard">
      <span className="grid size-9 place-items-center rounded-xl bg-emerald-700 text-white">
        <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
          <path d="M6 17.5 12 4l6 13.5-6 2.5-6-2.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="m8.5 15 3.5 1.5 3.5-1.5M12 16.5V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <span className="text-xl font-bold tracking-tight text-stone-950">SoloForge</span>
    </a>
  )
}

function StatusDot({ tone = 'emerald' }: { tone?: 'emerald' | 'amber' | 'sky' | 'stone' }) {
  const tones = { emerald: 'bg-emerald-500', amber: 'bg-amber-400', sky: 'bg-sky-400', stone: 'bg-stone-400' }
  return <span className={`size-2 rounded-full ${tones[tone]}`} />
}

function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <h2 className="text-xl font-bold tracking-tight text-stone-950">{title}</h2>
      {action && <button className="text-sm font-bold text-emerald-700 hover:underline">{action}</button>}
    </div>
  )
}

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-5 px-5 py-4 lg:px-8">
          <Mark />
          <div className="hidden flex-1 items-center justify-between border-l border-stone-200 pl-6 md:flex">
            <div>
              <p className="text-sm font-bold text-stone-900">Reyes Home Supplies</p>
              <p className="mt-0.5 text-xs text-stone-500">Monday, 17 June 2025 · Asia/Manila</p>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-right">
                <p className="text-xs text-stone-400">Last updated</p>
                <p className="mt-0.5 text-sm font-semibold text-stone-600">17 Jun, 9:42 AM PHT</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">Owner</span>
              <a className="text-sm font-bold text-stone-500 hover:text-emerald-700" href="/">Sign out</a>
            </div>
          </div>
        </div>
      </header>

      <nav className="border-b border-stone-200 bg-white" aria-label="Dashboard navigation">
        <div className="mx-auto flex max-w-screen-2xl gap-2 overflow-x-auto px-5 lg:px-8">
          {['Overview', 'Collections', 'Expenses', 'Cash forecast', 'Follow-ups'].map((item, index) => (
            <a className={`whitespace-nowrap border-b-2 px-3 py-4 text-sm font-bold ${index === 0 ? 'border-emerald-700 text-emerald-800' : 'border-transparent text-stone-500 hover:text-stone-900'}`} href={index === 0 ? '/dashboard' : `#${item.toLowerCase().replace(' ', '-')}`} key={item}>{item}</a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-screen-2xl px-5 py-8 lg:px-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-bold text-emerald-700">Overview</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">Cash flow overview</h1>
            <p className="mt-2 text-stone-500">Your current position and the next 30 days, as of 17 June 2025 PHT.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-bold text-stone-700 hover:border-stone-400">Add invoice</button>
            <button className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-bold text-stone-700 hover:border-stone-400">Record verified receipt</button>
            <button className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800">Add expense</button>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5" aria-labelledby="attention-heading">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-amber-100 font-bold text-amber-800">!</span>
              <div>
                <h2 id="attention-heading" className="font-bold text-stone-950">Needs attention: projected shortfall on 24 June</h2>
                <p className="mt-1 text-sm leading-6 text-stone-600">Projected cash may reach <strong>PHP −44,500</strong>. Two customer commitments are not yet verified as receipts.</p>
                <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-amber-800"><StatusDot tone="amber" />Expense information was last reviewed 5 days ago and may affect this forecast.</p>
              </div>
            </div>
            <button className="whitespace-nowrap rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-amber-900 shadow-sm">Review shortfall</button>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Cash summary">
          {[
            ['Available cash', '286,400', 'Actual bank balance · 17 Jun', 'emerald'],
            ['Expected receipts', '124,500', 'Expected · 17 Jun–16 Jul', 'sky'],
            ['Upcoming expenses', '368,200', 'Recorded · 17 Jun–16 Jul', 'amber'],
            ['Projected cash', '42,700', 'Expected balance · 16 Jul', 'emerald'],
          ].map(([label, value, note, tone]) => (
            <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm" key={label}>
              <p className="flex items-center gap-2 text-sm font-semibold text-stone-500"><StatusDot tone={tone as 'emerald'} />{label}</p>
              <p className="mt-4 text-2xl font-bold tracking-tight text-stone-950">{money(value)}</p>
              <p className="mt-2 text-xs text-stone-500">{note}</p>
            </article>
          ))}
        </section>

        <section id="cash-forecast" className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-stone-950">30-day cash forecast</h2>
              <p className="mt-1 text-sm text-stone-500">17 June–16 July 2025 · Daily closing balance · Asia/Manila</p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-stone-500">
              <span className="flex items-center gap-2"><StatusDot tone="emerald" />Cash balance</span>
              <span className="flex items-center gap-2"><StatusDot tone="sky" />Expected inflow</span>
              <span className="flex items-center gap-2"><StatusDot tone="amber" />Expense</span>
            </div>
          </div>
          <div className="mt-7 overflow-x-auto">
            <svg className="min-w-3xl" viewBox="0 0 960 280" role="img" aria-label="Daily projected cash balance with a shortfall around June 24">
              {[40, 100, 160, 220].map((y) => <line key={y} x1="50" y1={y} x2="930" y2={y} stroke="currentColor" className="text-stone-200" />)}
              <path d="M50 70 C120 80 145 58 210 85 S310 125 350 208 S430 230 485 172 S580 88 635 110 S740 145 795 125 S870 105 930 120" fill="none" stroke="currentColor" className="text-emerald-600" strokeWidth="4" strokeLinecap="round" />
              <path d="M50 70 C120 80 145 58 210 85 S310 125 350 208 S430 230 485 172 S580 88 635 110 S740 145 795 125 S870 105 930 120 L930 240 L50 240Z" className="fill-emerald-50" />
              <line x1="50" y1="240" x2="930" y2="240" stroke="currentColor" className="text-stone-300" strokeWidth="2" />
              <line x1="370" y1="28" x2="370" y2="240" strokeDasharray="5 5" stroke="currentColor" className="text-amber-400" />
              <circle cx="370" cy="218" r="7" className="fill-amber-400" />
              <rect x="300" y="16" width="140" height="42" rx="10" className="fill-stone-900" />
              <text x="370" y="33" textAnchor="middle" className="fill-stone-300 text-xs">24 Jun · Shortfall</text>
              <text x="370" y="50" textAnchor="middle" className="fill-white text-sm font-bold">PHP −44,500</text>
              <text x="50" y="266" className="fill-stone-400 text-xs">17 Jun</text><text x="330" y="266" className="fill-stone-400 text-xs">24 Jun</text><text x="620" y="266" className="fill-stone-400 text-xs">7 Jul</text><text x="890" y="266" className="fill-stone-400 text-xs">16 Jul</text>
            </svg>
          </div>
          <div className="mt-4 grid gap-3 border-t border-stone-100 pt-5 sm:grid-cols-3">
            <a href="#collections" className="rounded-xl bg-sky-50 p-3 text-sm font-semibold text-sky-900 hover:underline">20 Jun · PHP 84,500 expected from Martinez Trading</a>
            <a href="#expenses" className="rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-900 hover:underline">24 Jun · PHP 126,000 supplier payment</a>
            <a href="#expenses" className="rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-900 hover:underline">30 Jun · PHP 92,000 payroll</a>
          </div>
          <p className="mt-4 text-xs leading-5 text-stone-500">Projection depends on entered balances, expected payment dates, and recorded expenses. Linked records may be incomplete or change.</p>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <section id="collections" className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
            <SectionHeader title="Collections" action="View all invoices" />
            <div className="grid grid-cols-3 gap-3 rounded-xl bg-stone-50 p-4 text-center">
              <div><p className="text-xs text-stone-500">Overdue</p><p className="mt-1 font-bold text-rose-700">PHP 58,000</p></div>
              <div><p className="text-xs text-stone-500">Unpaid</p><p className="mt-1 font-bold">PHP 212,500</p></div>
              <div><p className="text-xs text-stone-500">Committed</p><p className="mt-1 font-bold text-sky-700">PHP 124,500</p></div>
            </div>
            {[
              ['Martinez Trading', 'PHP 84,500', 'Promised 20 Jun', 'Promise—not received'],
              ['Mila’s Café', 'PHP 40,000', 'Expected 21 Jun', 'Invoice unpaid'],
              ['Northstar Supply', 'PHP 58,000', 'Due 12 Jun', '6 days overdue'],
            ].map((row) => (
              <a href="#" className="flex items-center justify-between gap-4 border-b border-stone-100 py-4 last:border-0" key={row[0]}>
                <div><p className="font-bold text-stone-900">{row[0]}</p><p className="mt-1 text-xs text-stone-500">{row[2]} · {row[3]}</p></div>
                <p className="font-bold text-stone-900">{row[1]}</p>
              </a>
            ))}
          </section>

          <section id="expenses" className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
            <SectionHeader title="Upcoming obligations" action="View all expenses" />
            <div className="rounded-xl bg-stone-50 p-4"><p className="text-xs text-stone-500">Due in the next 14 days</p><p className="mt-1 text-xl font-bold">{money('252,400')}</p></div>
            {[
              ['Supplier payment', 'PHP 126,000', '24 Jun', 'Confirmed'],
              ['Payroll', 'PHP 92,000', '30 Jun', 'Estimate reviewed'],
              ['Warehouse rent', 'PHP 34,400', '1 Jul', 'Recurring'],
            ].map((row) => (
              <a href="#" className="flex items-center justify-between gap-4 border-b border-stone-100 py-4 last:border-0" key={row[0]}>
                <div><p className="font-bold text-stone-900">{row[0]}</p><p className="mt-1 text-xs text-stone-500">{row[2]} PHT · {row[3]}</p></div>
                <p className="font-bold text-stone-900">{row[1]}</p>
              </a>
            ))}
          </section>

          <section id="follow-ups" className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
            <SectionHeader title="Next follow-ups" action="Open follow-ups" />
            {[
              ['Confirm payment date with Martinez Trading', 'Today, 2:00 PM PHT', 'Ana Reyes'],
              ['Review Northstar overdue invoice', '18 Jun, 10:00 AM PHT', 'Carlo Santos'],
              ['Verify Mila’s Café receipt', '21 Jun, 4:00 PM PHT', 'Ana Reyes'],
            ].map(([action, due, owner]) => (
              <div className="flex gap-3 border-b border-stone-100 py-4 first:pt-0 last:border-0" key={action}>
                <input className="mt-1 size-4 accent-emerald-700" type="checkbox" aria-label={`Mark ${action} complete`} />
                <div><p className="font-semibold text-stone-900">{action}</p><p className="mt-1 text-xs text-stone-500">Due {due} · Owner: {owner}</p></div>
              </div>
            ))}
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
            <SectionHeader title="Recent activity" action="View audit trail" />
            {[
              ['Receipt PHP 40,000 verified', 'Ana Reyes · 17 Jun, 9:42 AM PHT'],
              ['Invoice INV-1042 due date corrected', 'Carlo Santos · 17 Jun, 8:16 AM PHT'],
              ['Supplier expense updated to PHP 126,000', 'Ana Reyes · 16 Jun, 4:52 PM PHT'],
            ].map(([action, meta], index) => (
              <div className="flex gap-3 border-b border-stone-100 py-4 first:pt-0 last:border-0" key={action}>
                <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-700">{index + 1}</span>
                <div><p className="font-semibold text-stone-900">{action}</p><p className="mt-1 text-xs text-stone-500">{meta}</p></div>
              </div>
            ))}
          </section>
        </div>

        <section className="mt-6 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-950 text-white shadow-sm">
          <div className="grid lg:grid-cols-2">
            <div className="p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-300">AI explanation</p>
              <h2 className="mt-3 text-2xl font-bold">Why a shortfall is projected</h2>
              <p className="mt-4 leading-7 text-emerald-100/80">The 24 June supplier payment is due before PHP 124,500 in customer commitments are expected. The largest dependency is Martinez Trading’s promised payment on 20 June, which has not been recorded as an actual receipt.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <a href="#collections" className="rounded-lg bg-emerald-900 px-3 py-2 text-xs font-bold text-emerald-100 hover:underline">Invoice INV-1042</a>
                <a href="#expenses" className="rounded-lg bg-emerald-900 px-3 py-2 text-xs font-bold text-emerald-100 hover:underline">Expense EXP-208</a>
              </div>
              <p className="mt-5 text-xs leading-5 text-emerald-300">AI can explain and draft suggestions. It cannot change records or send messages.</p>
            </div>
            <div className="border-t border-emerald-800 bg-white p-6 text-stone-900 lg:border-l lg:border-t-0 sm:p-8">
              <p className="text-sm font-bold text-emerald-700">Draft for owner review</p>
              <div className="mt-4 rounded-xl bg-stone-50 p-4 text-sm leading-6 text-stone-600">Hi Martinez Trading, this is a friendly reminder about invoice INV-1042 for PHP 84,500. Could you confirm whether payment is still expected by 20 June? Thank you.</div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white">Review and edit</button>
                <button className="rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-bold text-stone-700">Discard draft</button>
              </div>
              <p className="mt-3 text-xs text-stone-500">Nothing will be sent without owner approval.</p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3" aria-label="System states">
          <div className="rounded-xl border border-stone-200 bg-white p-4"><p className="flex items-center gap-2 text-sm font-bold"><span className="size-3 animate-pulse rounded-full bg-stone-300" />Loading state</p><p className="mt-1 text-xs text-stone-500">Refreshing bank balance…</p></div>
          <div className="rounded-xl border border-stone-200 bg-white p-4"><p className="flex items-center gap-2 text-sm font-bold"><StatusDot tone="stone" />Empty state</p><p className="mt-1 text-xs text-stone-500">No reminders scheduled after 21 June.</p></div>
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4"><p className="text-sm font-bold text-rose-800">Connection error</p><p className="mt-1 text-xs text-rose-700">Bank balance could not refresh. Showing data from 9:42 AM.</p></div>
        </section>
      </div>
    </main>
  )
}
