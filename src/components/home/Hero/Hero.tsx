import { OrnamentIcon } from "@/components/ui/Ornament/OrnamentIcon";
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
          chapter in family shopping is coming to Madurai.
        </p>
        <CtaLink href="#collections">Explore the collections</CtaLink>
        <div className={styles["hero-note"]}>
          <span className={styles["mini-flower"]}>
            <OrnamentIcon />
          </span>
          <p>
            For the moments you’ll remember.
            <br />
            <strong>For the people you love.</strong>
          </p>
        </div>
      </div>
      <div className={styles["hero-art"]}>
        <img
          src="/images/silk.svg"
          alt="Illustration of rich plum silk with an ornate golden border"
        />
        <div className={styles["art-label"]}>
          THE BEAUTY OF TRADITION <span>01 / THE SILK EDIT</span>
        </div>
        <div className={styles["seal"]}>
          A new
          <br />
          <em>chapter</em>
          <br />
          in Madurai
        </div>
      </div>
    </Container>
  );
}
