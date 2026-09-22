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
    return <p className="text-sm text-accent-soft">Cảm ơn bạn đã đăng ký!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email của bạn"
        className="w-full min-w-0 border border-ink-foreground/25 bg-transparent px-4 py-2.5 text-sm text-ink-foreground outline-none placeholder:text-ink-foreground/40 focus:border-accent-soft"
      />
      <button type="submit" className="btn-luxury bg-accent-soft text-ink hover:opacity-85 shrink-0">
        Đăng ký
      </button>
    </form>
  );
}
