"use client";

import { useRouter } from "next/navigation";

export function LogoutButton({ compact }: { compact?: boolean }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (compact) {
    return (
      <button type="button" onClick={handleLogout} className="text-xs text-muted hover:text-accent">
        Đăng xuất
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="mt-1 block w-full rounded-md px-3 py-2 text-left text-sm text-muted hover:text-accent"
    >
      Đăng xuất
    </button>
  );
}
