import type { EditorialImage } from "@/types/content";
import { cx } from "@/lib/utils";
import styles from "./EditorialArtwork.module.css";
export function EditorialArtwork({
  artwork,
  className,
  priority = false,
}: {
  artwork: EditorialImage;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={cx(styles.artwork, className)}>
      <img
        src={artwork.src}
        alt={artwork.alt}
        width={artwork.width}
        height={artwork.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
      <figcaption>Illustrative textile study</figcaption>
    </figure>
  );
}
