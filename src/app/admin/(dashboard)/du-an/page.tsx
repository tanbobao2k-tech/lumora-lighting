import { getProjects } from "@/lib/content-store";
import { ProjectsEditor } from "@/components/admin/ProjectsEditor";

export const dynamic = "force-dynamic";

export default function AdminProjectsPage() {
  const projects = getProjects();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dự án</h1>
      <p className="mt-1 text-sm text-muted">
        Quản lý các công trình hiển thị ở trang chủ và trang Dự án.
      </p>
      <div className="mt-6">
        <ProjectsEditor initialProjects={projects} />
      </div>
    </div>
  );
}
