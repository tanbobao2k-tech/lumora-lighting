"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return <p className="text-sm text-accent">Cảm ơn bạn đã đăng ký!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email của bạn"
        className="w-full min-w-0 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-foreground px-4 py-2.5 text-xs tracking-wide text-background hover:opacity-85"
      >
        Đăng ký
      </button>
    </form>
  );
}
