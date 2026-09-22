export function ProductPlaceholderImage({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-[#efe9df] to-[#e2d9c8] ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 64 64"
        aria-hidden
        className="h-14 w-14 text-accent/70"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M32 6c-9 0-15 6.5-15 14 0 6 3.5 9.5 6.5 13.5.9 1.2 1.5 3 1.5 5.5h14c0-2.5.6-4.3 1.5-5.5C43.5 29.5 47 26 47 20c0-7.5-6-14-15-14Z" />
        <path d="M25 43h14M26.5 48h11M29 53h6" />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}
