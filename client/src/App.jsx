import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
import WAIcon from "./components/WAIcon";
import ContactForm from "./components/ContactForm";
import styles from "./App.module.css";

const WA_BASE = "https://wa.me/919381005788?text=";
const WA_DEFAULT = WA_BASE + encodeURIComponent("Hello, I need information about your UPS/Inverter services.");

const SERVICES = [
  { icon: "🔋", title: "UPS Systems", desc: "We manufacture and supply high-quality online and offline UPS systems, along with complete installation and maintenance services for residential, commercial, and industrial needs. Custom-built units and all major brands available." },
  { icon: "⚡", title: "Inverter Manufacturing", desc: "We design and manufacture high-quality inverters tailored to your power requirements — from small domestic units to heavy-duty commercial inverters." },
  { icon: "🔌", title: "Stabilizer Manufacturing", desc: "We manufacture and supply a wide range of voltage stabilizers — from single-phase home units to heavy-duty three-phase industrial stabilizers — ensuring safe, steady power for all your equipment." },
  { icon: "🔧", title: "Repair & Service", desc: "Fast and reliable repair services for all UPS and inverter brands. Our trained technicians diagnose and fix issues to get your power backup running quickly." },
];

const STATS = [
  { num: "25+", label: "Years Experience", sub: "Decades of expertise in power backup" },
  { num: "500+", label: "Happy Clients", sub: "Residential & commercial customers" },
  { num: "24/7", label: "Support", sub: "Always available when you need us" },
  { num: "100%", label: "Quality Parts", sub: "Only genuine components in all builds" },
];

export default function App() {
  return (
    <div className={styles.app}>
      <Navbar />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section id="home" className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroBg}>POWER</div>
        <div className={styles.heroContent}>
          <div className={styles.badge}>⚡ Established 1999 · Chennai's Power Backup Experts</div>
          <h1 className={styles.h1}>
            <em className={styles.em}>Powertech</em> Equipments
          </h1>
          <p className={styles.heroP}>
            Founded in 1999 by{" "}
            <strong className={styles.highlight}>Mr. B. Ravichandran</strong>,
            Powertech Equipments specialises in manufacturing, sales, and expert
            servicing of UPS systems, inverters, and stabilizers for homes and
            businesses. Reliable power — always.
          </p>
          <div className={styles.heroBtns}>
            <a href={WA_DEFAULT} className={styles.btnPrimary} target="_blank" rel="noreferrer">
              <WAIcon size={18} color="#0D0D0D" />
              WhatsApp Enquiry
            </a>
            <a href="tel:+919381005788" className={styles.btnOutline}>
              📞 Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────────── */}
      <section id="services" className={styles.section}>
        <p className={styles.sectionLabel}>What We Do</p>
        <h2 className={styles.sectionTitle}>Our Services</h2>
        <div className={styles.servicesGrid}>
          {SERVICES.map((s) => (
            <div key={s.title} className={styles.serviceCard}>
              <span className={styles.serviceIcon}>{s.icon}</span>
              <h3 className={styles.serviceH3}>{s.title}</h3>
              <p className={styles.serviceP}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY US ─────────────────────────────────────────────────────────── */}
      <section id="about" className={styles.whySection}>
        <p className={styles.sectionLabel}>Why Choose Us</p>
        <h2 className={styles.sectionTitle}>Trusted Across Chennai</h2>
        <p className={styles.whySubtext}>
          Founded in <strong className={styles.highlight}>1999</strong> by{" "}
          <strong className={styles.highlight}>Mr. B. Ravichandran</strong>,
          Powertech Equipments has been Chennai's trusted name in power backup
          for over two decades — delivering quality products with unmatched
          after-sales support.
        </p>
        <div className={styles.statsGrid}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <div className={styles.statNum}>{s.num}</div>
              <h4 className={styles.statLabel}>{s.label}</h4>
              <p className={styles.statSub}>{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────────── */}
      <section id="contact" className={styles.contactSection}>
        <div className={styles.contactGrid}>
          <div>
            <p className={styles.sectionLabel}>Get In Touch</p>
            <h2 className={styles.contactH2}>Let's Talk<br />Power.</h2>
            <p className={styles.contactSubtext}>
              Have a question or need a quote? Reach us by phone, WhatsApp, or
              visit our workshop in Ekkattuthangal, Chennai.
            </p>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>📞</div>
              <div>
                <strong className={styles.contactLabel}>Call Us</strong>
                <a href="tel:+919381005788" className={styles.contactVal}>
                  +91 93810 05788
                </a>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>✉️</div>
              <div>
                <strong className={styles.contactLabel}>Email Us</strong>
                <a href="mailto:powertechequipments@gmail.com" className={styles.contactVal}>
                  powertechequipments@gmail.com
                </a>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>📍</div>
              <div>
                <strong className={styles.contactLabel}>Our Location</strong>
                <span className={styles.contactVal}>
                  No.1, 3rd Pillaiyar Koil Street,<br />
                  Ekkattuthangal, Chennai – 600032
                </span>
              </div>
            </div>

            <a href={WA_DEFAULT} className={styles.waBtn} target="_blank" rel="noreferrer">
              <WAIcon size={22} />
              Chat on WhatsApp
            </a>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <Logo size={36} />
          <div>
            <div className={styles.footerLogoLine1}>POWERTECH</div>
            <div className={styles.footerLogoLine2}>EQUIPMENTS</div>
          </div>
        </div>
        <p className={styles.footerP}>No.1, 3rd Pillaiyar Koil Street, Ekkattuthangal, Chennai – 600032</p>
        <p className={styles.footerP}>© 1999–2025 Powertech Equipments. Founded by Mr. B. Ravichandran.</p>
      </footer>

      {/* ── FLOATING WA ────────────────────────────────────────────────────── */}
      <a href={WA_DEFAULT} className={styles.floatWa} target="_blank" rel="noreferrer" title="Chat on WhatsApp">
        <WAIcon size={28} />
      </a>
    </div>
  );
}
