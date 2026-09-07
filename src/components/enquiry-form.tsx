"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

const services = [
  "Commercial Cleaning",
  "Airbnb Cleaning",
  "House Cleaning",
  "Move In/Out Cleaning",
  "Specialized Cleaning",
];

export function EnquiryForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "We could not send your enquiry.");
      }

      form.reset();
      setState("success");
      setMessage(
        "Thanks — your enquiry has been received. We will be in touch shortly.",
      );
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "We could not send your enquiry. Please call or WhatsApp us instead.",
      );
    }
  }

  const inputClass =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[var(--color-brand)] focus:ring-4 focus:ring-white/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.75rem] border border-white/12 bg-white/10 p-5 shadow-[0_20px_60px_rgba(9,17,23,0.18)] backdrop-blur sm:p-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-white">
          Name *
          <input
            className={inputClass}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
          />
        </label>

        <label className="text-sm font-medium text-white">
          Phone *
          <input
            className={inputClass}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={40}
          />
        </label>

        <label className="text-sm font-medium text-white">
          Email *
          <input
            className={inputClass}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={160}
          />
        </label>

        <label className="text-sm font-medium text-white">
          Postcode / area *
          <input
            className={inputClass}
            name="postcode"
            type="text"
            autoComplete="postal-code"
            required
            maxLength={80}
          />
        </label>

        <label className="text-sm font-medium text-white">
          Service required *
          <select className={inputClass} name="service" required defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-white">
          Preferred date
          <input className={inputClass} name="preferredDate" type="date" />
        </label>

        <label className="text-sm font-medium text-white">
          Property type
          <select className={inputClass} name="propertyType" defaultValue="">
            <option value="">Select if applicable</option>
            <option>House</option>
            <option>Flat / Apartment</option>
            <option>Airbnb / Short Stay</option>
            <option>Office / Commercial</option>
            <option>Other</option>
          </select>
        </label>

        <label className="text-sm font-medium text-white">
          Frequency
          <select className={inputClass} name="frequency" defaultValue="One-off">
            <option>One-off</option>
            <option>Weekly</option>
            <option>Fortnightly</option>
            <option>Monthly</option>
            <option>Not sure yet</option>
          </select>
        </label>
      </div>

      <label className="mt-5 block text-sm font-medium text-white">
        Tell us what you need
        <textarea
          className={`${inputClass} min-h-32 resize-y`}
          name="details"
          maxLength={2000}
          placeholder="Number of rooms, type of clean, access details, preferred times, or anything else that helps us quote accurately."
        />
      </label>

      <label className="absolute -left-[9999px]" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-base font-semibold text-[var(--color-brand-deep)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "submitting" ? "Sending enquiry..." : "Send Enquiry"}
      </button>

      <p className="mt-3 text-xs leading-5 text-white/60">
        We only use your details to respond to your cleaning enquiry.
      </p>

      {message ? (
        <div
          role="status"
          className={`mt-4 rounded-2xl border px-4 py-3 text-sm leading-6 ${
            state === "success"
              ? "border-emerald-200/30 bg-emerald-100/10 text-emerald-50"
              : "border-rose-200/30 bg-rose-100/10 text-rose-50"
          }`}
        >
          {message}
        </div>
      ) : null}
    </form>
  );
}
