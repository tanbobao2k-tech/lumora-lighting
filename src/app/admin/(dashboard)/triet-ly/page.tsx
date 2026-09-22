import { getPhilosophy } from "@/lib/content-store";
import { PhilosophyEditor } from "@/components/admin/PhilosophyEditor";

export const dynamic = "force-dynamic";

export default function AdminPhilosophyPage() {
  const content = getPhilosophy();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Triết lý kinh doanh</h1>
      <p className="mt-1 text-sm text-muted">Nội dung trang giới thiệu triết lý + chữ ký giám đốc.</p>
      <div className="mt-6">
        <PhilosophyEditor initialContent={content} />
      </div>
    </div>
  );
}
