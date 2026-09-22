import { getHomeContent } from "@/lib/content-store";
import { HomeContentEditor } from "@/components/admin/HomeContentEditor";

export const dynamic = "force-dynamic";

export default function AdminHomeContentPage() {
  const content = getHomeContent();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Nội dung trang chủ</h1>
      <div className="mt-6">
        <HomeContentEditor initialContent={content} />
      </div>
    </div>
  );
}
