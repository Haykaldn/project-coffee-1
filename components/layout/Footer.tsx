import { site, whatsappLink } from "@/data/site";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { href: site.instagram, label: "Instagram", icon: "instagram" as const },
    { href: whatsappLink(), label: "WhatsApp", icon: "whatsapp" as const },
    { href: site.bmuWebsite, label: "Website BMU", icon: "globe" as const },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Logo tone="light" />
          <p>
            UB Coffee adalah unit usaha di bawah {site.parent} (BMU), Universitas Brawijaya.
          </p>
        </div>
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <Icon name={link.icon} size={20} />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={`container ${styles.bottom}`}>
        <p>© {year} UB Coffee. Hak cipta dilindungi.</p>
        <p>Diseduh di kampus, dari lereng Arjuna.</p>
      </div>
    </footer>
  );
}
