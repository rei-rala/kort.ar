import { BRAND } from "@/constants";
import styles from "./landingFooter.module.css";

export const LandingFooter = () => {
  const footerBlocks = [
    {
      title: BRAND,
      links: [
        { title: "Inicio", href: "#" },
        { title: "Nosotros", href: "#" },
        { title: "Contacto", href: "#" },
      ],
    },
    {
      title: "Redes sociales",
      links: [
        { title: "Facebook", href: "#" },
        { title: "Instagram", href: "#" },
        { title: "Twitter", href: "#" },
      ],
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {footerBlocks.map((block) => (
          <div
            key={`footer-block:${block.title}`}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h3>{block.title}</h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {block.links.map((link) => (
                <li key={`footer-social-media:${link.title}`}>
                  <a href={link.href}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.footerBackground} />
    </footer>
  );
};