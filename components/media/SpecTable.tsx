import type { TableMedia } from "@/content/types";

// Spec table (10 §5): mono values, hairlines, scrolls inside its own box on small screens.
export function SpecTable({
  table,
  label,
}: {
  table: TableMedia;
  label: string;
}) {
  return (
    <div
      className="overflow-x-auto"
      tabIndex={0}
      role="region"
      aria-label={label}
    >
      <table className="w-full min-w-xl border-collapse text-left">
        <thead>
          <tr className="border-b border-rule-strong">
            {table.columns.map((c) => (
              <th
                key={c}
                scope="col"
                className="py-2 pr-6 label font-normal text-ink-3"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={r} className="border-b border-rule">
              {row.map((cell, c) =>
                c === 0 ? (
                  <th
                    key={c}
                    scope="row"
                    className="py-3 pr-6 align-top text-small font-medium text-ink"
                  >
                    {cell}
                  </th>
                ) : (
                  <td
                    key={c}
                    className="py-3 pr-6 align-top font-mono text-mono-body text-ink-2 tabular"
                  >
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
