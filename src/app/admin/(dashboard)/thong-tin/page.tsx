import { getSiteInfo } from "@/lib/content-store";
import { SiteInfoEditor } from "@/components/admin/SiteInfoEditor";

export const dynamic = "force-dynamic";

export default function AdminSiteInfoPage() {
  const info = getSiteInfo();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Thông tin shop</h1>
      <div className="mt-6">
        <SiteInfoEditor initialInfo={info} />
      </div>
    </div>
  );
}
