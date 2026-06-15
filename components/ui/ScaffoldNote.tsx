/**
 * Scaffold placeholder block. Marks a section whose full UI is a Session 8
 * build target. Renders a neutral dashed panel so the page is navigable and
 * the structure is visible without committing final layout/markup yet.
 */
export function ScaffoldNote({
  label,
  inverse = false,
}: {
  label: string;
  inverse?: boolean;
}) {
  return (
    <div
      className={`mt-6 flex min-h-[140px] items-center justify-center rounded-xl border border-dashed p-6 text-body-sm ${
        inverse
          ? "border-slate text-steel-light"
          : "border-steel-light text-text-muted"
      }`}
    >
      <span>
        <strong>Scaffold:</strong> {label} — full UI is a Session 8 build target.
      </span>
    </div>
  );
}
