import { Link, NavLink } from "react-router-dom";
import styles from "./AppLayout.module.css";

const NAV_ITEMS = [
  { key: "media", label: "Media", icon: "perm_media", to: "/ingest" },
  { key: "timeline", label: "Timeline", icon: "movie_edit", to: "/processing" },
  { key: "assets", label: "Assets", icon: "video_library", to: "/editor" },
  { key: "exports", label: "Exports", icon: "upload_file", to: "/export" },
];

function Icon({ name, className }) {
  return (
    <span className={`material-symbols-outlined ${className ?? ""}`}>
      {name}
    </span>
  );
}

export default function AppLayout({ children, activeNav }) {
  return (
    <>
      {/* ---- Top Header ---- */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/" className={styles.logo}>
            PremiereAI
          </Link>
        </div>

        <nav className={styles.headerCenter}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              className={`${styles.headerNavLink} ${
                activeNav === item.key ? styles.headerNavLinkActive : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.headerRight}>
          <button className={styles.iconBtn} aria-label="Cloud status">
            <Icon name="cloud_done" />
          </button>
          <Link to="/export" className={styles.exportBtn}>
            Export
          </Link>
          <button className={styles.iconBtn} aria-label="Account">
            <Icon name="account_circle" />
          </button>
        </div>
      </header>

      {/* ---- Left Sidebar ---- */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarProject}>
          <div className={styles.projectName}>Project Alpha</div>
          <div className={styles.projectMeta}>Draft saved 2m ago</div>
          <button className={`${styles.newDraftBtn} ai-gradient`}>
            <Icon name="auto_awesome" />
            New AI Draft
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              className={({ isActive }) =>
                `${styles.navItem} ${
                  isActive || activeNav === item.key
                    ? styles.navItemActive
                    : ""
                }`
              }
            >
              <Icon name={item.icon} className={styles.navIcon} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarBottom}>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ""}`
            }
          >
            <Icon name="settings" className={styles.navIcon} />
            Settings
          </NavLink>
          <a
            href="https://docs.premiere.ai"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navItem}
          >
            <Icon name="help" className={styles.navIcon} />
            Help
          </a>
        </div>
      </aside>

      {/* ---- Main Content ---- */}
      <main className={styles.main}>{children}</main>
    </>
  );
}
