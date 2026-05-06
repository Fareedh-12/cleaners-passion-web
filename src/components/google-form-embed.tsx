const embedUrl =
  process.env.GOOGLE_FORM_EMBED_URL ??
  "https://docs.google.com/forms/d/e/1FAIpQLSfjJd-xFC9a30zv9D-pPdexZfkVehdYfBS51RGRcXuyN8Cr8Q/viewform?embedded=true";
const publicUrl =
  process.env.GOOGLE_FORM_PUBLIC_URL ??
  "https://docs.google.com/forms/d/e/1FAIpQLSfjJd-xFC9a30zv9D-pPdexZfkVehdYfBS51RGRcXuyN8Cr8Q/viewform?usp=publish-editor";

export function GoogleFormEmbed() {
  return (
    <div className="rounded-[1.75rem] border border-white/12 bg-white/10 p-4 shadow-[0_20px_60px_rgba(9,17,23,0.18)] backdrop-blur sm:p-4">
      <div className="rounded-[1.4rem] bg-white/6 p-4 md:hidden">
        <p className="text-sm uppercase tracking-[0.24em] text-white/55">
          Mobile Enquiry
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-white">
          Open the quote form in one tap
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/75">
          On phones, the full Google embed feels cramped. Opening the form in
          its own page keeps it cleaner and easier to complete.
        </p>
        <div className="mt-5 flex flex-col gap-3">
          <a
            href={publicUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-base font-semibold text-[var(--color-brand-deep)] transition hover:-translate-y-0.5"
          >
            Open Enquiry Form
          </a>
          <p className="text-xs leading-5 text-white/55">
            The form opens in a new tab so it is easier to fill out on mobile.
          </p>
        </div>
      </div>

      <div className="hidden rounded-[1.35rem] bg-white p-2 md:block">
        <iframe
          src={embedUrl}
          title="Cleaners Passion enquiry form"
          className="min-h-[840px] w-full rounded-[1rem] border-0 bg-white"
          loading="lazy"
        />
      </div>

      <div className="mt-4 hidden flex-col gap-2 px-2 text-sm text-white/75 md:flex md:flex-row md:items-center md:justify-between">
        <p>If the embedded form feels tight on your screen, open it on its own page.</p>
        {publicUrl ? (
          <a
            href={publicUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 font-semibold text-white transition hover:bg-white/10"
          >
            Open form in new tab
          </a>
        ) : null}
      </div>
    </div>
  );
}
