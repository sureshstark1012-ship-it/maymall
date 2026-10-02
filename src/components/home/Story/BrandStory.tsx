import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon/ArrowIcon";
import { Container } from "@/components/ui/Container/Container";
import styles from "./BrandStory.module.css";
export function BrandStory() {
  return (
    <Container
      as="section"
      section
      id="story"
      tabIndex={-1}
      aria-labelledby="story-heading"
      className={styles["story"]}
    >
      <p className="eyebrow">
        VANAKKAM, MADURAI <span lang="ta">வணக்கம் மதுரை</span>
      </p>
      <div className={styles["story-grid"]}>
        <h2 id="story-heading">
          A city of timeless stories.
          <br />
          <em>A place for new ones.</em>
        </h2>
        <div>
          <p>
            From the colours of temple festivals to the joy of a family wedding,
            Madurai knows how to celebrate. MayMall takes its inspiration from
            that spirit.
          </p>
          <p>
            Inspired by the silk and family-shopping traditions associated with
            Chennai Silks, our vision brings together heritage, occasion wear
            and everyday style in a welcoming destination.
          </p>
          <p className={styles.clarification}>
            An official affiliation has not been announced.
          </p>
          <Link className="text-link" href="/our-story">
            Our Madurai chapter{" "}
            <span>
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>
    </Container>
  );
}
