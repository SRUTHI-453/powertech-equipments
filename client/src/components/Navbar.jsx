import { useState, useEffect } from "react";
import Logo from "./Logo";
import styles from "./Navbar.module.css";

const WA_LINK =
  "https://wa.me/919381005788?text=Hello%2C%20I%20need%20information%20about%20your%20UPS%2FInverter%20services.";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <button className={styles.logoBtn} onClick={() => scrollTo("home")}>
          <Logo size={46} />
          <div className={styles.logoText}>
            <span className={styles.line1}>POWERTECH</span>
            <span className={styles.line2}>EQUIPMENTS</span>
          </div>
        </button>

        <div className={styles.navRight}>
          <div className={styles.navLinks}>
            {NAV_LINKS.map((l) => (
              <button key={l.id} className={styles.navLink} onClick={() => scrollTo(l.id)}>
                {l.label}
              </button>
            ))}
          </div>
          <button className={styles.hamburger} onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
            ☰
          </button>
          <a href={WA_LINK} className={styles.navCta} target="_blank" rel="noreferrer">
            WhatsApp Us
          </a>
        </div>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              className={styles.mobileLink}
              onClick={() => { scrollTo(l.id); setMenuOpen(false); }}
            >
              {l.label}
            </button>
          ))}
          <a href={WA_LINK} className={`${styles.mobileLink} ${styles.waLink}`} target="_blank" rel="noreferrer">
            📲 WhatsApp Us
          </a>
        </div>
      )}
    </>
  );
}
