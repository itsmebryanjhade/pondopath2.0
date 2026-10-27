import { FormEvent, useState } from 'react'
import Dashboard from './Dashboard'

const features = [
  {
    title: 'See shortages sooner',
    copy: 'Get an early view of weeks where planned expenses may be higher than available cash.',
    icon: 'chart',
  },
  {
    title: 'Separate expected from received',
    copy: 'Keep promised customer payments distinct from money that has actually reached your account.',
    icon: 'wallet',
  },
  {
    title: 'Plan the next follow-up',
    copy: 'See which customer payments matter most, so your team knows who to contact and when.',
    icon: 'message',
  },
]

function Icon({ name, className = 'size-5' }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
    check: <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    chart: <path d="M4 18V9m6 9V5m6 13v-7m4 7H2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
    wallet: <path d="M4 7.5h13a2 2 0 0 1 2 2v9H5a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2h11M15 12h6v4h-6a2 2 0 0 1 0-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
    message: <path d="M20 11a7 7 0 0 1-7 7H7l-4 3 1.3-4A8 8 0 1 1 20 11Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
    eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" /></>,
    spark: <path d="m12 2 1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2Zm6 13 .7 2.3L21 18l-2.3.7L18 21l-.7-2.3L15 18l2.3-.7L18 15Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  }
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">{paths[name]}</svg>
}

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="/" className="flex items-center gap-2.5" aria-label="SoloForge home">
      <span className="grid size-9 place-items-center rounded-xl bg-emerald-700 text-white">
        <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
          <path d="M6 17.5 12 4l6 13.5-6 2.5-6-2.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="m8.5 15 3.5 1.5 3.5-1.5M12 16.5V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <span className={`text-xl font-bold tracking-tight ${inverse ? 'text-white' : 'text-stone-950'}`}>SoloForge</span>
    </a>
  )
}

function ForecastCard() {
  const bars = ['h-14', 'h-20', 'h-16', 'h-28', 'h-24', 'h-10', 'h-16']
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-8 rounded-full bg-emerald-200/60 blur-3xl" />
      <div className="relative rounded-3xl border border-stone-200 bg-white p-5 shadow-2xl shadow-emerald-950/10 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-stone-500">30-day cash outlook</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-stone-950">₱286,400 available</p>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">1 risk found</span>
        </div>
        <div className="mt-8 flex h-32 items-end gap-3 border-b border-stone-200 px-1">
          {bars.map((bar, index) => (
            <div key={bar + index} className="flex h-full flex-1 items-end">
              <div className={`w-full rounded-t-md ${bar} ${index === 5 ? 'bg-amber-400' : 'bg-emerald-200'}`} />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs font-medium text-stone-400">
          <span>Today</span><span>Jun 18</span><span>Jul 2</span>
        </div>
        <div className="mt-6 rounded-2xl bg-amber-50 p-4 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-amber-100 font-bold text-amber-800">!</span>
            <div>
              <p className="font-bold text-stone-900">Possible ₱44,500 shortage</p>
              <p className="mt-1 text-sm text-stone-600">Two expected payments could cover the gap.</p>
            </div>
          </div>
          <button className="mt-3 text-sm font-bold text-emerald-700 sm:mt-0">Review plan</button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-stone-200 p-4">
            <p className="flex items-center gap-2 text-xs font-semibold text-stone-500"><span className="size-2 rounded-full bg-sky-400" />Expected</p>
            <p className="mt-2 text-xl font-bold text-stone-900">₱124,500</p>
          </div>
          <div className="rounded-2xl border border-stone-200 p-4">
            <p className="flex items-center gap-2 text-xs font-semibold text-stone-500"><span className="size-2 rounded-full bg-emerald-500" />Received</p>
            <p className="mt-2 text-xl font-bold text-stone-900">₱80,000</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    window.location.href = '/dashboard'
  }

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 lg:grid lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-emerald-950 p-12 text-white lg:flex lg:flex-col xl:p-16">
        <div className="absolute -left-32 top-24 size-96 rounded-full bg-emerald-700/30 blur-3xl" />
        <div className="absolute -bottom-40 right-0 size-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="relative z-10">
          <Brand inverse />
        </div>
        <div className="relative z-10 my-auto py-10">
          <span className="inline-flex rounded-full border border-emerald-700 bg-emerald-900/80 px-3 py-1.5 text-sm font-bold text-emerald-100">Cash-flow clarity for small businesses</span>
          <h1 className="mt-6 max-w-xl text-4xl font-bold leading-tight tracking-tight xl:text-5xl">Know what’s coming before cash gets tight.</h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-emerald-100/75">Separate expected payments from actual receipts, spot possible shortages early, and plan the right follow-up.</p>
          <div className="mt-10"><ForecastCard /></div>
        </div>
        <p className="relative z-10 text-sm text-emerald-200/60">Built for the realities of Philippine small business.</p>
      </section>

      <section className="flex min-h-screen flex-col px-6 py-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between lg:hidden">
          <Brand />
          <a className="text-sm font-bold text-stone-500 hover:text-emerald-700" href="/">Back to home</a>
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Welcome back</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">Sign in to SoloForge</h2>
            <p className="mt-3 leading-7 text-stone-500">Access your cash-flow plan and payment follow-ups.</p>
          </div>

          <form className="mt-9 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-stone-700">Work email</span>
              <input
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                type="email" name="email" placeholder="you@business.com" autoComplete="email" autoFocus
                required
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-stone-700">Password</span>
              <div className="relative">
                <input
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 pr-20 text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                  type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter your password" autoComplete="current-password" required
                />
                <button className="absolute inset-y-0 right-0 px-4 text-sm font-bold text-stone-500 hover:text-emerald-700" type="button" onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>
            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-2.5 text-sm text-stone-600">
                <input className="size-4 accent-emerald-700" type="checkbox" name="remember" />Keep me signed in
              </label>
              <button className="text-sm font-bold text-emerald-700 hover:underline" type="button">Forgot password?</button>
            </div>
            <button className="w-full rounded-xl bg-emerald-700 px-5 py-3.5 font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-200" type="submit">Sign in</button>
          </form>
          <div className="mt-8 rounded-xl bg-stone-100 p-4 text-sm leading-6 text-stone-600">For account access, contact your business owner or finance administrator.</div>
        </div>
        <p className="text-center text-xs leading-5 text-stone-400">By signing in, you agree to SoloForge’s Terms of Use and Privacy Policy.</p>
      </section>
    </main>
  )
}

function App() {
  if (window.location.pathname === '/dashboard') {
    return <Dashboard />
  }

  if (window.location.pathname === '/sign-in') {
    return <SignInPage />
  }

  return (
    <main className="overflow-hidden bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200/80 bg-stone-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Brand />
          <nav className="hidden items-center gap-8 text-sm font-semibold text-stone-600 md:flex" aria-label="Main navigation">
            <a className="transition hover:text-emerald-700" href="#how-it-works">How it works</a>
            <a className="transition hover:text-emerald-700" href="#benefits">Benefits</a>
            <a className="transition hover:text-emerald-700" href="#clarity">Our approach</a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              className="px-3 py-2 text-sm font-bold text-stone-700 transition hover:text-emerald-700"
              href="/sign-in"
            >
              Sign in
            </a>
            <button className="hidden rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 sm:block">Request access</button>
          </div>
        </div>
      </header>

      <section className="relative">
        <div className="absolute right-0 top-0 size-96 rounded-full bg-emerald-100 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-sm font-bold text-emerald-800">
              <Icon name="spark" className="size-4" /> AI-assisted cash-flow planning
            </span>
            <h1 className="mt-6 max-w-2xl text-5xl font-bold leading-tight tracking-tight text-stone-950 sm:text-6xl">
              See cash gaps before they become emergencies.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
              SoloForge helps Philippine small businesses forecast cash, separate expected payments from actual receipts, and plan timely customer follow-ups.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-800">
                Request access <Icon name="arrow" />
              </button>
              <a className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-6 py-3.5 font-bold text-stone-700 transition hover:border-stone-400" href="#forecast">
                See a forecast example
              </a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-stone-500">
              <span className="grid size-5 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Icon name="check" className="size-3" /></span>
              Built for owners and finance teams—not accountants only.
            </p>
          </div>
          <ForecastCard />
        </div>
      </section>

      <section id="forecast" className="border-y border-stone-200 bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div className="order-2 lg:order-1">
            <div className="rounded-3xl bg-emerald-950 p-6 text-white shadow-xl sm:p-8">
              <div className="flex items-center justify-between border-b border-emerald-800 pb-5">
                <div><p className="text-sm text-emerald-200">Payment follow-up plan</p><p className="mt-1 text-xl font-bold">This week</p></div>
                <span className="rounded-full bg-emerald-800 px-3 py-1.5 text-xs font-bold text-emerald-100">3 actions</span>
              </div>
              {[
                ['Martinez Trading', '₱44,500', 'Follow up today'],
                ['Mila’s Café', '₱28,000', 'Expected Friday'],
                ['Northstar Supply', '₱52,000', 'Received yesterday'],
              ].map(([name, amount, status], index) => (
                <div className="flex items-center justify-between gap-4 border-b border-emerald-900 py-5 last:border-0" key={name}>
                  <div className="flex items-center gap-3">
                    <span className={`grid size-10 place-items-center rounded-full font-bold ${index === 2 ? 'bg-emerald-600' : 'bg-emerald-900'}`}>{index === 2 ? <Icon name="check" /> : name[0]}</span>
                    <div><p className="font-bold">{name}</p><p className="mt-1 text-sm text-emerald-300">{status}</p></div>
                  </div>
                  <p className="font-bold">{amount}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Forecast example</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-stone-950">Turn a cash warning into a clear next move.</h2>
            <p className="mt-5 text-lg leading-8 text-stone-600">SoloForge connects your forecast to the customer payments behind it, helping you understand what may happen and what you can do next.</p>
            <ul className="mt-8 space-y-4">
              {['Know the amount and timing of a possible gap', 'See which expected payments could close it', 'Assign practical follow-ups to your team'].map((item) => (
                <li className="flex items-center gap-3 font-semibold text-stone-700" key={item}><span className="grid size-7 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Icon name="check" className="size-4" /></span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">How it works</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-stone-950">From scattered numbers to a practical plan.</h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              ['01', 'Add what you know', 'Bring together your cash balance, expected customer payments, and upcoming expenses.'],
              ['02', 'Review the forecast', 'SoloForge highlights likely cash positions and flags periods that may need attention.'],
              ['03', 'Decide what to do', 'Confirm assumptions, update actual receipts, and plan the most useful follow-ups.'],
            ].map(([number, title, copy]) => (
              <article className="rounded-3xl border border-stone-200 bg-white p-7 shadow-sm" key={number}>
                <span className="text-sm font-bold text-emerald-700">{number}</span>
                <h3 className="mt-8 text-xl font-bold text-stone-950">{title}</h3>
                <p className="mt-3 leading-7 text-stone-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-emerald-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-300">What it helps with</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight">More control, without another complicated finance tool.</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article className="rounded-3xl border border-emerald-800 bg-emerald-900/60 p-7" key={feature.title}>
                <span className="grid size-11 place-items-center rounded-2xl bg-emerald-700 text-emerald-50"><Icon name={feature.icon} /></span>
                <h3 className="mt-6 text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-emerald-100/70">{feature.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="clarity" className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Human review and clarity</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-stone-950">AI assists. You stay in control.</h2>
            <p className="mt-5 text-lg leading-8 text-stone-600">Forecasts are decision support—not guarantees. SoloForge shows the assumptions behind each result so you can check the details, apply business context, and make the final call.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Visible assumptions', 'Editable estimates', 'Clear confidence cues', 'Human-approved actions'].map((item) => (
                <p className="flex items-center gap-3 font-semibold text-stone-700" key={item}><span className="text-emerald-700"><Icon name="check" /></span>{item}</p>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-stone-100 p-8 sm:p-10">
            <span className="grid size-12 place-items-center rounded-2xl bg-white text-emerald-700 shadow-sm"><Icon name="eye" className="size-6" /></span>
            <p className="mt-8 text-2xl font-bold leading-relaxed text-stone-900">“This forecast assumes that Martinez Trading pays by June 17. If it arrives three days late, your lowest cash balance may fall to ₱12,300.”</p>
            <div className="mt-8 flex gap-3">
              <button className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-stone-700 shadow-sm">Check assumptions</button>
              <button className="rounded-xl px-4 py-2.5 text-sm font-bold text-emerald-700">Update forecast</button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-emerald-700 px-6 py-16 text-center text-white shadow-xl shadow-emerald-950/10 sm:px-12">
          <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Make your next cash decision with more confidence.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-emerald-100">See what may be ahead, understand why, and give your team a practical plan.</p>
          <button className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-emerald-800 shadow-lg transition hover:bg-emerald-50">Request access <Icon name="arrow" /></button>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div><Brand /><p className="mt-3 text-sm text-stone-500">Cash-flow clarity for Philippine small businesses.</p></div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-stone-500">
            <a className="hover:text-emerald-700" href="#">Privacy</a>
            <a className="hover:text-emerald-700" href="#">Terms</a>
            <a className="hover:text-emerald-700" href="#">Contact</a>
          </div>
          <p className="text-sm text-stone-400">© 2025 SoloForge</p>
        </div>
      </footer>
    </main>
  )
}

export default App
