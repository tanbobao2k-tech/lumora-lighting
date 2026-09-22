"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteProductButton({ slug, name }: { slug: string; name: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="text-xs text-red-600 hover:opacity-80"
      >
        Xoá
      </button>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 text-xs">
      <span className="text-muted">Xoá &quot;{name}&quot;?</span>
      <button
        type="button"
        disabled={deleting}
        onClick={async () => {
          setDeleting(true);
          await fetch(`/api/admin/products/${slug}`, { method: "DELETE" });
          router.refresh();
        }}
        className="text-red-600 underline hover:opacity-80"
      >
        {deleting ? "Đang xoá..." : "Xác nhận"}
      </button>
      <button type="button" onClick={() => setConfirming(false)} className="text-muted">
        Huỷ
      </button>
    </span>
  );
}
