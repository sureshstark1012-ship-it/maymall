"use client";
import { Fragment, useState, type ReactNode } from "react";
import type { CollectionCategory, CollectionFilter } from "@/types/content";
import styles from "./CollectionFilters.module.css";
const filters: readonly { id: CollectionFilter; label: string }[] = [
  { id: "all", label: "All collections" },
  { id: "heritage", label: "Silks & occasion wear" },
  { id: "family", label: "Family fashion" },
];
export function CollectionFilters({
  items,
}: {
  items: readonly {
    id: string;
    category: CollectionCategory;
    content: ReactNode;
  }[];
}) {
  const [filter, setFilter] = useState<CollectionFilter>("all");
  const visible = items.filter(
    (item) => filter === "all" || item.category === filter,
  );
  return (
    <>
      <div
        className={styles.filters}
        role="group"
        aria-label="Filter collection inspirations"
      >
        {filters.map((item) => (
          <button
            type="button"
            key={item.id}
            className={filter === item.id ? styles.active : undefined}
            aria-pressed={filter === item.id}
            aria-controls="collection-results"
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {visible.length} {visible.length === 1 ? "collection" : "collections"}{" "}
        shown
      </p>
      <div id="collection-results" className={styles.cards}>
        {visible.map((item) => (
          <Fragment key={item.id}>{item.content}</Fragment>
        ))}
      </div>
    </>
  );
}
