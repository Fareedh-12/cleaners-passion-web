const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[color:rgba(246,251,253,0.82)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--color-brand-deep)] font-serif text-lg text-white">
              CP
            </span>
            <div>
              <p className="font-serif text-xl leading-none text-slate-950">
                Cleaners Passion
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Wallingford & Cholsey
              </p>
            </div>
          </a>

          <a
            href="tel:03301335041"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:border-[var(--color-brand)] hover:bg-white"
          >
            Call Now
          </a>
        </div>

        <nav className="mt-4 flex flex-wrap items-center gap-3 md:mt-0 md:justify-center md:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-[var(--color-brand-deep)] md:bg-transparent md:px-0 md:py-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
