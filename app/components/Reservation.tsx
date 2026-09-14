"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, AlertCircle, CalendarCheck } from "lucide-react";
import Button from "./ui/Button";
import SectionHeading from "./ui/SectionHeading";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { guestOptions, timeSlots, whatsappUrl } from "../lib/content";

interface FormState {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: timeSlots[0],
  guests: guestOptions[1],
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s-]{7,}$/;

// Today's date as YYYY-MM-DD in the visitor's local timezone.
function todayISO(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function validate(values: FormState, minDate: string): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!emailPattern.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (!phonePattern.test(values.phone.trim()))
    errors.phone = "Enter a valid phone number.";
  if (!values.date) {
    errors.date = "Choose a date.";
  } else if (values.date < minDate) {
    errors.date = "Pick today or a future date.";
  }
  if (!values.time) errors.time = "Choose a time.";
  if (!values.guests) errors.guests = "Select party size.";
  return errors;
}

const fieldBase =
  "w-full rounded-xl border border-border bg-elevated px-4 py-3 text-foreground placeholder:text-subtle transition-colors focus:border-accent focus:outline-none";

type Status = "idle" | "sending" | "error";

export default function Reservation() {
  const minDate = todayISO();
  const [values, setValues] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  // Honeypot: hidden from real users; bots that fill it are silently dropped.
  const [company, setCompany] = useState("");

  const sending = status === "sending";

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return; // guard against duplicate submissions

    const nextErrors = validate(values, minDate);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = document.getElementById(
        `field-${Object.keys(nextErrors)[0]}`
      );
      first?.focus();
      return;
    }

    setServerError(null);
    setStatus("sending");

    try {
      // Discrete fields — the API route validates each and formats the email.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          date: values.date,
          time: values.time,
          guests: values.guests,
          message: values.message,
          company,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setStatus("error");
        setServerError(
          data?.error ??
            "Something went wrong. Please try again or contact us on WhatsApp."
        );
        return;
      }

      // Success: only now do we clear the form and show confirmation.
      setValues({ ...emptyForm });
      setStatus("idle");
      setSubmitted(true);
    } catch {
      setStatus("error");
      setServerError(
        "Something went wrong. Please try again or contact us on WhatsApp."
      );
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="reservation-heading"
      className="bg-surface py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="reservation-heading"
          eyebrow="Reservations & enquiries"
          title="Save your spot."
          description="Tell us when you're coming and how many, and we'll confirm by email or phone within a few hours. For same-day tables, a quick WhatsApp is fastest."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Form */}
          <div className="rounded-3xl border border-border bg-surface-2 p-6 sm:p-8">
            {submitted ? (
              <div
                role="status"
                className="flex flex-col items-start gap-4 rounded-2xl border border-accent/30 bg-accent-soft p-8"
              >
                <CheckCircle2 className="h-10 w-10 text-accent" aria-hidden />
                <h3 className="font-display text-2xl font-semibold text-foreground">
                  Reservation request sent
                </h3>
                <p className="text-muted">
                  Thanks! Your reservation request has been sent. We&apos;ll get
                  back to you shortly. Need it sooner? Message us on WhatsApp.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    href={whatsappUrl}
                    variant="whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="h-5 w-5" aria-hidden />
                    Chat on WhatsApp
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setSubmitted(false)}
                  >
                    Make another request
                  </Button>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="space-y-5">
                {/* Honeypot — visually hidden, off the tab order, ignored by humans */}
                <div aria-hidden className="hidden">
                  <label htmlFor="field-company">Company</label>
                  <input
                    id="field-company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="field-name" label="Name" error={errors.name} required>
                    <input
                      id="field-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={fieldBase}
                      placeholder="Your full name"
                      value={values.name}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "error-name" : undefined}
                      onChange={(e) => update("name", e.target.value)}
                    />
                  </Field>
                  <Field
                    id="field-email"
                    label="Email"
                    error={errors.email}
                    required
                  >
                    <input
                      id="field-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={fieldBase}
                      placeholder="you@example.com"
                      value={values.email}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "error-email" : undefined}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="field-phone"
                    label="Phone"
                    error={errors.phone}
                    required
                  >
                    <input
                      id="field-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={fieldBase}
                      placeholder="+91 90000 00000"
                      value={values.phone}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "error-phone" : undefined}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </Field>
                  <Field
                    id="field-guests"
                    label="Guests"
                    error={errors.guests}
                    required
                  >
                    <select
                      id="field-guests"
                      name="guests"
                      className={`${fieldBase} appearance-none`}
                      value={values.guests}
                      aria-invalid={!!errors.guests}
                      onChange={(e) => update("guests", e.target.value)}
                    >
                      {guestOptions.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="field-date"
                    label="Date"
                    error={errors.date}
                    required
                  >
                    <input
                      id="field-date"
                      name="date"
                      type="date"
                      min={minDate}
                      className={fieldBase}
                      value={values.date}
                      aria-invalid={!!errors.date}
                      aria-describedby={errors.date ? "error-date" : undefined}
                      onChange={(e) => update("date", e.target.value)}
                    />
                  </Field>
                  <Field
                    id="field-time"
                    label="Preferred time"
                    error={errors.time}
                    required
                  >
                    <select
                      id="field-time"
                      name="time"
                      className={`${fieldBase} appearance-none`}
                      value={values.time}
                      aria-invalid={!!errors.time}
                      onChange={(e) => update("time", e.target.value)}
                    >
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field
                  id="field-message"
                  label="Message / special request"
                >
                  <textarea
                    id="field-message"
                    name="message"
                    rows={4}
                    className={`${fieldBase} resize-y`}
                    placeholder="High chair, window seat, birthday, dietary needs…"
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                  />
                </Field>

                {serverError && (
                  <p
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-accent/40 bg-accent-soft px-4 py-3 text-sm text-foreground"
                  >
                    <AlertCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden
                    />
                    {serverError}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={sending}
                  aria-busy={sending}
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                      Sending…
                    </>
                  ) : (
                    "Send Reservation Request"
                  )}
                </Button>

                <p className="text-center text-xs text-subtle">
                  We&apos;ll only use your details to confirm this reservation.
                </p>
              </form>
            )}
          </div>

          {/* Side panel */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-surface-2 p-7">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent">
                <CalendarCheck className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                How it works
              </h3>
              <ol className="mt-4 space-y-3 text-sm text-muted">
                <li className="flex gap-3">
                  <span className="font-display font-semibold text-accent">1.</span>
                  Send your preferred date, time and party size.
                </li>
                <li className="flex gap-3">
                  <span className="font-display font-semibold text-accent">2.</span>
                  We check the book and confirm by email or phone.
                </li>
                <li className="flex gap-3">
                  <span className="font-display font-semibold text-accent">3.</span>
                  Turn up, settle in and we&apos;ll take it from there.
                </li>
              </ol>
            </div>

            <div className="rounded-3xl border border-[#25D366]/30 bg-[#25D366]/[0.07] p-7">
              <p className="font-display text-lg font-semibold text-foreground">
                Prefer to chat?
              </p>
              <p className="mt-1 text-sm text-muted">
                Message us on WhatsApp for same-day tables, large groups or private
                gatherings.
              </p>
              <Button
                href={whatsappUrl}
                variant="whatsapp"
                size="lg"
                className="mt-5 w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="h-5 w-5" aria-hidden />
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ id, label, error, required, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
      {error && (
        <p
          id={`error-${id.replace("field-", "")}`}
          className="mt-1.5 text-sm text-accent"
        >
          {error}
        </p>
      )}
    </div>
  );
}
