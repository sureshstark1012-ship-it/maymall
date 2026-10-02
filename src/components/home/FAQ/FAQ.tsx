import { faqItems } from "@/data/faq";
import styles from "./FAQ.module.css";
export function FAQ() {
  return (
    <div className={styles.faq}>
      {faqItems.map((item) => (
        <details
          key={item.question}
          open={"initiallyOpen" in item && item.initiallyOpen}
        >
          <summary>
            {item.question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
