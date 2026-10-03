import { businessFacts } from "@/data/business";
import { editorialMedia } from "@/data/media";
import { MediaImage } from "@/components/ui/MediaImage/MediaImage";
import { CtaLink } from "@/components/ui/CtaLink/CtaLink";
import { Container } from "@/components/ui/Container/Container";
import styles from "./Hero.module.css";
export function Hero() {
  return (
    <Container as="section" className={styles["hero"]}>
      <div className={styles["hero-copy"]}>
        <p className="eyebrow">
          <span></span> ROOTED IN TRADITION. MADE FOR TOMORROW.
        </p>
        <h1>
          Every thread.
          <br />A story.
          <br />
          <em>A new beginning.</em>
        </h1>
        <p className={styles["lead"]}>
          Silks that celebrate our roots. Styles that bring us together. A new
          chapter in family shopping{" "}
          {businessFacts.launchStatus === "open"
            ? "has opened in"
            : "is coming to"}{" "}
          {businessFacts.city}.
        </p>
        <CtaLink href="/collections">Explore the collections</CtaLink>
        <div className={styles["hero-note"]}>
          <p>
            For the moments you’ll remember.
            <br />
            <strong>For the people you love.</strong>
          </p>
        </div>
      </div>
      <figure className={styles["hero-art"]}>
        <MediaImage
          media={editorialMedia.silk}
          priority
          sizes="(max-width: 900px) 100vw, 50vw"
          alt={
            editorialMedia.silk.kind === "illustration"
              ? "Illustration of rich plum silk with an ornate golden border"
              : editorialMedia.silk.alt
          }
        />
        <figcaption className={styles["art-label"]}>
          <span>01 / THE SILK EDIT</span>
          {editorialMedia.silk.caption && (
            <span>{editorialMedia.silk.caption}</span>
          )}
        </figcaption>
      </figure>
    </Container>
  );
}
