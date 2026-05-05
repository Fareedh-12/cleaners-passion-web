"use client";

import { FormEvent, useState } from "react";

type ContactStatus =
  | { type: "idle"; message: "" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

type FieldErrors = Partial<Record<"name" | "email" | "phone" | "service" | "message", string>>;

const initialStatus: ContactStatus = { type: "idle", message: "" };

const serviceOptions = [
  "Commercial Cleaning",
  "Airbnb Cleaning",
  "House Cleaning",
  "Move In/Out Cleaning",
  "Specialized Cleaning",
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<ContactStatus>(initialStatus);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(initialStatus);
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        ok: boolean;
        message: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok || !data.ok) {
        setFieldErrors(data.fieldErrors ?? {});
        setStatus({
          type: "error",
          message:
            data.message ||
            "Something went wrong while sending your enquiry. Please try again or contact us directly.",
        });
        return;
      }

      event.currentTarget.reset();
      setStatus({
        type: "success",
        message:
          data.message ||
          "Thanks for reaching out. Your enquiry has been sent and we will get back to you soon.",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "We could not send your enquiry right now. Please try again in a moment, call us, or message us on WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="rounded-[1.75rem] border border-white/12 bg-white/10 p-5 shadow-[0_20px_60px_rgba(9,17,23,0.18)] backdrop-blur sm:p-6"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="name"
          label="Your name"
          name="name"
          placeholder="How should we address you?"
          error={fieldErrors.name}
          autoComplete="name"
          required
        />
        <FormField
          id="email"
          label="Email address"
          name="email"
          type="email"
          placeholder="name@example.com"
          error={fieldErrors.email}
          autoComplete="email"
          required
        />
        <FormField
          id="phone"
          label="Phone number"
          name="phone"
          type="tel"
          placeholder="Optional, but helpful"
          error={fieldErrors.phone}
          autoComplete="tel"
        />
        <div>
          <label
            className="mb-2 block text-sm font-medium text-white/90"
            htmlFor="service"
          >
            Service needed
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            aria-invalid={fieldErrors.service ? "true" : "false"}
            aria-describedby={fieldErrors.service ? "service-error" : undefined}
            className="w-full rounded-2xl border border-white/16 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[rgba(145,182,193,0.25)]"
            required
          >
            <option value="">Choose a service</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {fieldErrors.service ? (
            <p id="service-error" className="mt-2 text-sm text-[#ffd9d3]">
              {fieldErrors.service}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-4">
        <label
          className="mb-2 block text-sm font-medium text-white/90"
          htmlFor="message"
        >
          Tell us about the space
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Share the property type, preferred timing, and anything important for the enquiry."
          aria-invalid={fieldErrors.message ? "true" : "false"}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className="w-full resize-y rounded-[1.5rem] border border-white/16 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[rgba(145,182,193,0.25)]"
          required
        />
        {fieldErrors.message ? (
          <p id="message-error" className="mt-2 text-sm text-[#ffd9d3]">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div aria-live="polite" className="min-h-6 text-sm">
          {status.type === "success" ? (
            <p className="text-[#d6f5df]">{status.message}</p>
          ) : null}
          {status.type === "error" ? (
            <p className="text-[#ffd9d3]">{status.message}</p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-w-[12rem] items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-[var(--color-brand-deep)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending enquiry..." : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}

type FormFieldProps = {
  autoComplete?: string;
  error?: string;
  id: string;
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: "email" | "tel" | "text";
};

function FormField({
  autoComplete,
  error,
  id,
  label,
  name,
  placeholder,
  required = false,
  type = "text",
}: FormFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white/90" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full rounded-2xl border border-white/16 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[rgba(145,182,193,0.25)]"
        required={required}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#ffd9d3]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
