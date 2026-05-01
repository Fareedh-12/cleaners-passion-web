export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-12">
        <div>
          <p className="font-serif text-2xl text-slate-950">Cleaners Passion</p>
          <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
            Modern cleaning support for homes in Wallingford and Cholsey, with
            services shaped around the space you need refreshed.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-slate-700 sm:text-base lg:text-right">
          <a href="tel:03301335041" className="hover:text-[var(--color-brand-deep)]">
            0330-133-5041
          </a>
          <a
            href="mailto:info@cleanerspassion.com"
            className="hover:text-[var(--color-brand-deep)]"
          >
            info@cleanerspassion.com
          </a>
          <p>Wallingford, Cholsey</p>
          <p>Price negotiable</p>
        </div>
      </div>
    </footer>
  );
}
