import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-2 md:py-28">
      <div>
        <p className="text-xs tracking-[0.25em] text-muted uppercase">Chiếu sáng chính hãng</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Ánh sáng cho mọi không gian sống
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          LUMORA phân phối đèn chiếu sáng chính hãng Opple, Philips, Osram — từ đèn trong nhà,
          ngoài trời đến giải pháp năng lượng mặt trời, cho công trình và tổ ấm của bạn.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/san-pham"
            className="rounded-full bg-foreground px-6 py-3 text-sm tracking-wide text-background transition-opacity hover:opacity-85"
          >
            Xem sản phẩm
          </Link>
          <Link
            href="/lien-he"
            className="rounded-full border border-border px-6 py-3 text-sm tracking-wide transition-colors hover:border-accent hover:text-accent"
          >
            Liên hệ tư vấn
          </Link>
        </div>
      </div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
        <Image
          src="/products/den-ong-bo-gan-noi_20w-den.jpg"
          alt="Đèn chiếu sáng LUMORA"
          width={900}
          height={1125}
          priority
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-5 left-5 rounded-sm bg-background/95 px-5 py-4 shadow-lg backdrop-blur">
          <p className="text-2xl font-semibold text-accent">2 năm</p>
          <p className="text-xs tracking-wide text-muted">Bảo hành chính hãng</p>
        </div>
      </div>
    </section>
  );
}
