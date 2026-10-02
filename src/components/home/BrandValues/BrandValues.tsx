import { Container } from "@/components/ui/Container/Container";
import styles from "./BrandValues.module.css";
export function BrandValues() {
  return (
    <Container as="section" section aria-labelledby="values-heading">
      <h2 id="values-heading" className="eyebrow">
        THE MAYMALL VISION
      </h2>
      <div className={styles["value-grid"]}>
        <div>
          <span>01 / HERITAGE</span>
          <h3>Tradition, reimagined.</h3>
          <p>
            A love for Tamil textile traditions, with room for your own
            expression.
          </p>
        </div>
        <div>
          <span>02 / FAMILY</span>
          <h3>Everyone belongs.</h3>
          <p>
            A shopping experience imagined around every generation of your
            family.
          </p>
        </div>
        <div>
          <span>03 / CELEBRATION</span>
          <h3>Make a moment of it.</h3>
          <p>
            Inspiration for festive days, fresh beginnings and the everyday in
            between.
          </p>
        </div>
      </div>
    </Container>
  );
}
