"use client";

import { useState } from "react";
import type { Project } from "@/types/content";
import { ImageUploadField } from "./ImageUploadField";

function fieldClass() {
  return "mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent";
}

const EMPTY_PROJECT: Project = {
  slug: "",
  title: "",
  category: "",
  location: "",
  description: "",
  image: "",
};

export function ProjectsEditor({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (index: number, patch: Partial<Project>) =>
    setProjects((prev) => prev.map((p, i) => (i === index ? { ...p, ...patch } : p)));

  const addProject = () => setProjects((prev) => [...prev, { ...EMPTY_PROJECT }]);
  const removeProject = (index: number) =>
    setProjects((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projects),
    });
    setSaving(false);
    setSaved(true);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{projects.length} dự án</p>
        <button type="button" onClick={addProject} className="text-xs text-accent hover:opacity-80">
          + Thêm dự án
        </button>
      </div>

      {projects.map((project, i) => (
        <div key={i} className="rounded-md border border-border p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Dự án {i + 1}</p>
            <button
              type="button"
              onClick={() => removeProject(i)}
              className="text-xs text-red-600 hover:opacity-80"
            >
              Xoá
            </button>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-[11px] text-muted">Slug (URL)</span>
              <input
                value={project.slug}
                onChange={(e) => update(i, { slug: e.target.value })}
                className={fieldClass()}
              />
            </label>
            <label className="block">
              <span className="text-[11px] text-muted">Tên dự án</span>
              <input
                value={project.title}
                onChange={(e) => update(i, { title: e.target.value })}
                className={fieldClass()}
              />
            </label>
            <label className="block">
              <span className="text-[11px] text-muted">Nhóm dự án</span>
              <input
                value={project.category}
                onChange={(e) => update(i, { category: e.target.value })}
                placeholder="Khách sạn, Resort & Cảnh quan, ..."
                className={fieldClass()}
              />
            </label>
            <label className="block">
              <span className="text-[11px] text-muted">Địa điểm</span>
              <input
                value={project.location}
                onChange={(e) => update(i, { location: e.target.value })}
                className={fieldClass()}
              />
            </label>
          </div>

          <label className="mt-3 block">
            <span className="text-[11px] text-muted">Mô tả ngắn</span>
            <textarea
              rows={2}
              value={project.description}
              onChange={(e) => update(i, { description: e.target.value })}
              className={fieldClass() + " resize-none"}
            />
          </label>

          <div className="mt-3">
            <ImageUploadField
              label="Ảnh dự án"
              value={project.image}
              onChange={(path) => update(i, { image: path })}
            />
          </div>
        </div>
      ))}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-foreground px-8 py-3 text-sm tracking-wide text-background transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
        {saved && <span className="text-sm text-accent">Đã lưu ✓</span>}
      </div>
    </form>
  );
}
