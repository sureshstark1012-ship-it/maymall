import { MediaImage } from "@/components/ui/MediaImage/MediaImage";
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
      <MediaImage
        media={artwork}
        sizes="(max-width: 600px) 100vw, (max-width: 1440px) 50vw, 640px"
        priority={priority}
      />
      {artwork.caption && <figcaption>{artwork.caption}</figcaption>}
    </figure>
  );
}
