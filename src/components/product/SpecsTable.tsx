import type { ProductVariant } from "@/types/product";

const ROWS: { key: keyof ProductVariant; label: string }[] = [
  { key: "sapCode", label: "Mã sản phẩm" },
  { key: "power", label: "Công suất" },
  { key: "voltage", label: "Điện áp" },
  { key: "colorTemp", label: "Nhiệt độ màu" },
  { key: "ipRating", label: "Cấp bảo vệ" },
  { key: "dimensions", label: "Kích thước" },
  { key: "finish", label: "Hoàn thiện" },
  { key: "note", label: "Ghi chú" },
];

export function SpecsTable({ variant }: { variant: ProductVariant }) {
  return (
    <table className="w-full text-sm">
      <tbody>
        {ROWS.filter((row) => variant[row.key]).map((row) => (
          <tr key={row.key} className="border-b border-border/70 last:border-none">
            <td className="py-2.5 pr-4 text-muted">{row.label}</td>
            <td className="py-2.5 text-foreground">{variant[row.key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
