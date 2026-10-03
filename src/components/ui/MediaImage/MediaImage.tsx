import { getImageProps } from "next/image";
import type { EditorialImage } from "@/types/content";
/** Original SVG markup stays unchanged; approved raster photography uses Next optimization. */
export function MediaImage({
  media,
  sizes,
  priority = false,
  alt = media.alt,
}: {
  media: EditorialImage;
  sizes: string;
  priority?: boolean;
  alt?: string;
}) {
  const props = {
    src: media.src,
    alt,
    width: media.width,
    height: media.height,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    fetchPriority: priority ? ("high" as const) : ("auto" as const),
  };
  return media.kind === "photography" ? (
    <img {...getImageProps({ ...props, sizes }).props} />
  ) : (
    <img {...props} />
  );
}
