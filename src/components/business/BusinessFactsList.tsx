import type { BusinessFacts } from "@/data/business";
import { businessFactRows } from "@/lib/business-presentation";
export function BusinessFactsList({
  facts,
  className,
}: {
  facts: BusinessFacts;
  className?: string;
}) {
  return (
    <dl className={className}>
      {businessFactRows(facts).map(({ label, value, dateTime }) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{dateTime ? <time dateTime={dateTime}>{value}</time> : value}</dd>
        </div>
      ))}
    </dl>
  );
}
