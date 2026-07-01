"use client";

import { useState } from "react";

export default function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="p-8 border" style={{ borderColor: "rgba(255,255,255,0.25)", backgroundColor: "rgba(255,255,255,0.06)" }}>
        <h3 className="font-display text-xl mb-2">Inquiry received.</h3>
        <p style={{ color: "#D8E3DA" }}>
          Thank you — your inquiry has been logged. We will reach out shortly with availability and pricing.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
      <Field label="Company Name" name="companyName" required />
      <Field label="Contact Person" name="contactPerson" required />
      <Field label="Phone" name="phone" type="tel" required />
      <Field label="Drug License No." name="licenseNo" placeholder="Optional" />
      <Field label="Products of Interest" name="productsInterested" full placeholder="e.g. Pharmaceuticals, Surgical, Diagnostics" />
      <div className="sm:col-span-2">
        <label className="text-[0.78rem] uppercase tracking-wide block mb-2" style={{ color: "#D8E3DA" }}>
          Expected Order Volume / Message
        </label>
        <textarea
          name="message"
          placeholder="Tell us roughly what you're looking for"
          className="w-full px-3.5 py-3 text-[0.92rem] rounded-sm min-h-[90px]"
          style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.25)", color: "var(--color-ivory)" }}
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="px-7 py-3.5 font-bold text-[0.92rem] rounded-sm disabled:opacity-60"
          style={{ backgroundColor: "var(--color-brass)", color: "var(--color-ink)" }}
        >
          {status === "submitting" ? "Submitting…" : "Submit Inquiry"}
        </button>
        {status === "error" && (
          <p className="mt-2 text-sm" style={{ color: "#ffb3b3" }}>Something went wrong — please try again.</p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  full,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="text-[0.78rem] uppercase tracking-wide block mb-2" style={{ color: "#D8E3DA" }}>{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-3.5 py-3 text-[0.92rem] rounded-sm"
        style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.25)", color: "var(--color-ivory)" }}
      />
    </div>
  );
}
