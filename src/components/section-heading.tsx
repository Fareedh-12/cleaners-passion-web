type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--color-brand-deep)]">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-serif text-4xl leading-tight text-slate-950 sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-8 text-slate-700">{description}</p>
    </div>
  );
}
