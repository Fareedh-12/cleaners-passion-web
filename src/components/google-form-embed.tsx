const embedUrl =
  process.env.GOOGLE_FORM_EMBED_URL ??
  "https://docs.google.com/forms/d/e/1FAIpQLSfjJd-xFC9a30zv9D-pPdexZfkVehdYfBS51RGRcXuyN8Cr8Q/viewform?embedded=true";
const publicUrl =
  process.env.GOOGLE_FORM_PUBLIC_URL ??
  "https://docs.google.com/forms/d/e/1FAIpQLSfjJd-xFC9a30zv9D-pPdexZfkVehdYfBS51RGRcXuyN8Cr8Q/viewform?usp=publish-editor";

export function GoogleFormEmbed() {
  return (
    <div className="rounded-[1.75rem] border border-white/12 bg-white/10 p-3 shadow-[0_20px_60px_rgba(9,17,23,0.18)] backdrop-blur sm:p-4">
      <div className="rounded-[1.35rem] bg-white p-2">
        <iframe
          src={embedUrl}
          title="Cleaners Passion enquiry form"
          className="min-h-[780px] w-full rounded-[1rem] border-0 bg-white"
          loading="lazy"
        />
      </div>
      <div className="mt-4 flex flex-col gap-2 px-2 text-sm text-white/75 sm:flex-row sm:items-center sm:justify-between">
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
