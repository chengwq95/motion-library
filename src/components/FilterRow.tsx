"use client";

export interface FilterOption { value: string; label: string; count: number }

const ALL = "all";

/** A row of toggle chips; clicking the active chip goes back to "all". */
export default function FilterRow({ label, value, options, onChange }: {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="w-20 shrink-0 text-xs font-medium text-muted">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              disabled={!active && o.count === 0}
              onClick={() => onChange(active && o.value !== ALL ? ALL : o.value)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-35 ${
                active ? "border-fg bg-fg text-page" : "border-line hover:border-fg/30 hover:bg-fg/5"
              }`}
            >
              {o.label}
              <span className="text-xs tabular-nums opacity-60">{o.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
