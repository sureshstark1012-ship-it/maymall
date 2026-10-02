import { PageMasthead } from "@/components/editorial/PageMasthead/PageMasthead";
import { EditorialArtwork } from "@/components/editorial/EditorialArtwork/EditorialArtwork";
import { PageClosing } from "@/components/editorial/PageClosing/PageClosing";
import { BrandValues } from "@/components/home/BrandValues/BrandValues";
import { Container } from "@/components/ui/Container/Container";
import { collectionBySlug } from "@/data/collections";
import { pageMetadata } from "@/lib/site-metadata";
import styles from "./page.module.css";
export const metadata = pageMetadata(
  "Our Story",
  "The MayMall vision draws inspiration from Madurai, Tamil textile traditions and family celebrations. An official Chennai Silks affiliation has not been announced.",
  "/our-story",
);
export default function StoryPage() {
  return (
    <>
      <PageMasthead
        eyebrow="OUR STORY / AN UNFOLDING VISION"
        title={
          <>
            The stories
            <br />
            <em>we carry with us.</em>
          </>
        }
        introduction="MayMall’s vision begins with the colours of a city, the textile traditions families return to, and the room each generation needs for its own expression."
      >
        <p className={styles.greeting} lang="ta">
          வணக்கம் மதுரை
        </p>
      </PageMasthead>
      <Container
        as="section"
        section
        className={styles.story}
        aria-labelledby="story-title"
      >
        <div className={styles.art}>
          <EditorialArtwork artwork={collectionBySlug.silk.artwork} />
          <p className={styles.artNote}>
            A textile study for a story still unfolding.
          </p>
        </div>
        <div className={styles.copy}>
          <p className="eyebrow">ROOTED IN MADURAI</p>
          <h2 id="story-title">
            Tradition, with room
            <br />
            <em>for your own story.</em>
          </h2>
          <p>
            From the colours of temple festivals to the joy of a family wedding,
            Madurai knows how to celebrate. MayMall takes its inspiration from
            that spirit.
          </p>
          <h3>Across generations.</h3>
          <p>
            A family shares memories, but not always the same taste. Our vision
            makes room for different expressions: the colour someone returns to,
            the occasion someone is anticipating, the everyday look someone
            makes their own.
          </p>
          <h3>A familiar inspiration.</h3>
          <p>
            Inspired by the silk and family-shopping traditions associated with
            Chennai Silks, our vision brings together heritage, occasion wear
            and everyday style in a welcoming destination.
          </p>
          <aside
            className={styles.clarification}
            aria-label="Affiliation clarification"
          >
            <p>
              An official affiliation has not been announced. This is the
              MayMall website; the reference describes inspiration.
            </p>
          </aside>
          <h3>The next chapter.</h3>
          <p>
            MayMall is coming to Madurai. For now, the collection edits share
            the direction of our vision. Opening information and confirmed store
            details will follow when they are ready to be announced.
          </p>
        </div>
      </Container>
      <BrandValues />
      <PageClosing />
    </>
  );
}
