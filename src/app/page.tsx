import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SectionHeading } from "@/components/section-heading";

const services = [
  {
    title: "Specialized Cleaning",
    description:
      "Tailored support for spaces that need extra care, detail, and a dependable finishing touch.",
  },
  {
    title: "House Cleaning",
    description:
      "Regular home cleaning designed to keep every room feeling calm, tidy, and guest-ready.",
  },
  {
    title: "Move In/Out Cleaning",
    description:
      "Fresh starts made easier with thorough cleaning for tenants, landlords, and homeowners.",
  },
  {
    title: "Deep Cleaning",
    description:
      "An intensive refresh for kitchens, bathrooms, and overlooked corners that need more attention.",
  },
];

const highlights = [
  "Reliable, detail-focused service for homes and everyday spaces",
  "Flexible support with price negotiable based on the job",
  "Friendly communication from first enquiry to final clean",
];

const trustPoints = [
  {
    title: "Locally Grounded",
    description:
      "Serving Wallingford and Cholsey with a practical understanding of local homes and needs.",
  },
  {
    title: "Thoughtful Standards",
    description:
      "Every visit is handled with care, consistency, and an eye for the details that matter.",
  },
  {
    title: "Straightforward Booking",
    description:
      "Reach out by phone or email for a simple conversation about your cleaning needs.",
  },
];

export default function Home() {
  return (
    <div className="bg-[var(--color-cream)] text-slate-900">
      <Navbar />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(110,177,196,0.28),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(180,207,197,0.45),_transparent_28%),linear-gradient(135deg,_#f6fbfd_0%,_#f4efe7_100%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/60" />
          <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl gap-16 px-6 py-14 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-12 lg:py-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_12px_30px_rgba(16,24,40,0.08)] backdrop-blur">
                Wallingford & Cholsey cleaning support
              </div>
              <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-none tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Clean Homes,
                <span className="block text-[var(--color-brand-deep)]">
                  Happy Lives
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700 sm:text-xl">
                Dedicated to Keeping Your Spaces Immaculate and Fresh.
                Cleaners Passion delivers dependable home cleaning with a calm,
                modern, and caring approach.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:03301335041"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-deep)] px-6 py-3 text-base font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Call 0330-133-5041
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition-colors duration-200 hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
                >
                  Explore Services
                </a>
              </div>

              <ul className="mt-10 grid gap-3 text-sm text-slate-700 sm:grid-cols-3 sm:text-base">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4 shadow-[0_12px_30px_rgba(16,24,40,0.06)] backdrop-blur"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-6 rounded-[2rem] bg-[linear-gradient(180deg,_rgba(110,177,196,0.22),_rgba(255,255,255,0))]" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_30px_80px_rgba(38,65,83,0.14)] backdrop-blur sm:p-8">
                <div className="rounded-[1.5rem] bg-[var(--color-brand-deep)] p-6 text-white">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                    Cleaners Passion
                  </p>
                  <p className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                    A fresher home starts with consistent care.
                  </p>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {services.map((service, index) => (
                    <div
                      key={service.title}
                      className="rounded-[1.4rem] border border-slate-200 bg-[var(--color-cream-strong)] p-5"
                    >
                      <div className="text-sm font-semibold text-[var(--color-brand-deep)]">
                        0{index + 1}
                      </div>
                      <h2 className="mt-3 text-lg font-semibold text-slate-950">
                        {service.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-[1.4rem] border border-dashed border-[var(--color-brand)] bg-[var(--color-mint)] px-5 py-4 text-sm font-medium text-slate-800">
                  Price negotiable. Get in touch for a quote tailored to your
                  property and cleaning needs.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12"
        >
          <SectionHeading
            eyebrow="Services"
            title="Cleaning support designed around real homes"
            description="A focused set of services with enough flexibility to match your routine, move, or one-off reset."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-2xl bg-[linear-gradient(135deg,_#dceff4,_#f2f7f3)]" />
                <h3 className="mt-6 text-xl font-semibold text-slate-950">
                  {service.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="why-us" className="border-y border-slate-200/80 bg-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-12">
            <div>
              <SectionHeading
                eyebrow="Why Choose Us"
                title="A modern, trustworthy service without the fuss"
                description="Built around clarity, consistency, and the kind of careful finish that helps a home feel lighter."
              />
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {trustPoints.map((point) => (
                <article
                  key={point.title}
                  className="rounded-[1.75rem] bg-[var(--color-cream)] p-6"
                >
                  <h3 className="text-lg font-semibold text-slate-950">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">
                    {point.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12"
        >
          <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,_#17313d_0%,_#244b59_55%,_#3d6e73_100%)] px-6 py-10 text-white shadow-[0_30px_80px_rgba(23,49,61,0.25)] sm:px-8 sm:py-12 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.35em] text-white/70">
                  Contact
                </p>
                <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                  Ready for a cleaner, fresher space?
                </h2>
                <p className="mt-4 text-lg leading-8 text-white/80">
                  Tell us about your home, move, or one-off deep clean and we
                  will help you find the right next step.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="tel:03301335041"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-[var(--color-brand-deep)]"
                >
                  0330-133-5041
                </a>
                <a
                  href="mailto:info@cleanerspassion.com"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white"
                >
                  info@cleanerspassion.com
                </a>
              </div>
            </div>
            <div className="mt-8 grid gap-4 border-t border-white/15 pt-8 text-sm text-white/75 sm:grid-cols-3 sm:text-base">
              <p>Based in Wallingford and Cholsey</p>
              <p>House Cleaning, Deep Cleaning, Move In/Out, Specialized</p>
              <p>Price negotiable on enquiry</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
