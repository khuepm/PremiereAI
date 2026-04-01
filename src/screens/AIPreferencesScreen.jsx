import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AIPreferencesScreen.module.css";

const NAV_ITEMS = [
  { icon: "settings", label: "General", key: "general" },
  { icon: "smart_toy", label: "AI Engine", key: "ai-engine" },
  { icon: "palette", label: "Appearance", key: "appearance" },
  { icon: "volume_up", label: "Audio", key: "audio" },
  { icon: "ios_share", label: "Export", key: "export" },
];

export default function AIPreferencesScreen() {
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState("aura-turbo");
  const [creativity, setCreativity] = useState(65);
  const [npuEnabled, setNpuEnabled] = useState(true);

  const handleCreativityChange = useCallback((e) => {
    setCreativity(Number(e.target.value));
  }, []);

  const toggleNpu = useCallback(() => {
    setNpuEnabled((prev) => !prev);
  }, []);

  return (
    <div className={styles.page}>
      {/* ---- Sidebar ---- */}
      <aside className={styles.sidebar}>
        <div>
          <div className={styles.logo}>
            <span className={styles.logoText}>PremiereAI</span>
          </div>

          <nav className={styles.nav}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href="#"
                className={
                  item.key === "ai-engine"
                    ? styles.navItemActive
                    : styles.navItem
                }
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.sidebarFooter}>
          <div className={styles.userProfile}>
            <div className={styles.userAvatar} aria-hidden="true" />
            <div className={styles.userInfo}>
              <span className={styles.userName}>PremiereAI</span>
              <span className={styles.userSub}>The Digital Curator</span>
            </div>
          </div>
          <button className={styles.applyBtn}>Apply Changes</button>
        </div>
      </aside>

      {/* ---- Main ---- */}
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>AI Engine Settings</h1>
          <div className={styles.headerActions}>
            <button className={styles.iconBtn} aria-label="Help">
              <span className="material-symbols-outlined">help</span>
            </button>
            <button
              className={styles.iconBtn}
              aria-label="Close"
              onClick={() => navigate(-1)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className={styles.content}>
          {/* Section 1 — AI Provider */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>AI Provider</h2>
              <span className={styles.sectionLabel}>Core Engine</span>
            </div>

            <div className={styles.providerCard}>
              <div className={styles.providerInner}>
                <div className={styles.providerInfo}>
                  <div className={styles.providerIcon}>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 28 }}
                    >
                      temp_preferences_custom
                    </span>
                  </div>
                  <div>
                    <h3 className={styles.providerName}>BoongAI</h3>
                    <div className={styles.providerStatus}>
                      <span className={styles.statusDot} />
                      <p className={styles.statusText}>
                        Connected (user@domain.com)
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.providerActions}>
                  <button className={styles.disconnectBtn}>Disconnect</button>
                  <button className={styles.manageBtn}>
                    Manage Account
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 14 }}
                    >
                      open_in_new
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 — Default Model Selection */}
          <section className={styles.section}>
            <div>
              <h2 className={styles.sectionTitle}>Default Model Selection</h2>
              <p className={styles.sectionSubtitle}>
                Choose the AI model for your editing tasks
              </p>
            </div>

            <div className={styles.modelGrid}>
              {/* Aura Turbo */}
              <label>
                <input
                  type="radio"
                  name="model"
                  className={styles.radioHidden}
                  checked={selectedModel === "aura-turbo"}
                  onChange={() => setSelectedModel("aura-turbo")}
                />
                <div
                  className={
                    selectedModel === "aura-turbo"
                      ? styles.modelCardSelected
                      : styles.modelCard
                  }
                >
                  <div className={styles.modelCardHead}>
                    <h3 className={styles.modelCardTitle}>Aura Turbo</h3>
                    <div
                      className={
                        selectedModel === "aura-turbo"
                          ? styles.radioIndicatorSelected
                          : styles.radioIndicator
                      }
                    >
                      <div
                        className={`${styles.radioIndicatorDot} ${
                          selectedModel === "aura-turbo"
                            ? styles.radioIndicatorDotVisible
                            : ""
                        }`}
                      />
                    </div>
                  </div>
                  <p className={styles.modelCardDesc}>
                    Lightning-fast processing. Best for quick drafts, auto-cuts,
                    and basic audio syncing. Uses fewer credits.
                  </p>
                  <div className={styles.tagRow}>
                    <span className={styles.tagSecondary}>FAST</span>
                    <span className={styles.tagTertiary}>LOW-COST</span>
                  </div>
                </div>
              </label>

              {/* Aura Pro */}
              <label>
                <input
                  type="radio"
                  name="model"
                  className={styles.radioHidden}
                  checked={selectedModel === "aura-pro"}
                  onChange={() => setSelectedModel("aura-pro")}
                />
                <div
                  className={
                    selectedModel === "aura-pro"
                      ? styles.modelCardSelected
                      : styles.modelCard
                  }
                >
                  <div className={styles.modelCardHead}>
                    <h3 className={styles.modelCardTitle}>Aura Pro</h3>
                    <div
                      className={
                        selectedModel === "aura-pro"
                          ? styles.radioIndicatorSelected
                          : styles.radioIndicator
                      }
                    >
                      <div
                        className={`${styles.radioIndicatorDot} ${
                          selectedModel === "aura-pro"
                            ? styles.radioIndicatorDotVisible
                            : ""
                        }`}
                      />
                    </div>
                  </div>
                  <p className={styles.modelCardDesc}>
                    Deep contextual understanding. Best for complex prompts,
                    precise highlight extraction, and advanced transitions.
                  </p>
                  <div className={styles.tagRow}>
                    <span className={styles.tagPrimary}>HIGH QUALITY</span>
                  </div>
                </div>
              </label>
            </div>
          </section>

          {/* Section 3 — Advanced Settings */}
          <section>
            <details className={styles.accordion} open>
              <summary className={styles.accordionSummary}>
                <div className={styles.accordionSummaryLeft}>
                  <span className="material-symbols-outlined" style={{ color: "var(--on-surface-variant)" }}>
                    tune
                  </span>
                  <span className={styles.accordionSummaryLabel}>
                    Advanced Settings
                  </span>
                </div>
                <span className={`material-symbols-outlined ${styles.chevron}`}>
                  expand_more
                </span>
              </summary>

              <div className={styles.accordionBody}>
                {/* Creativity Slider */}
                <div className={styles.sliderGroup}>
                  <div className={styles.sliderHeader}>
                    <label className={styles.sliderLabel}>AI Creativity</label>
                    <span className={styles.sliderValue}>{creativity}%</span>
                  </div>
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={creativity}
                      onChange={handleCreativityChange}
                      className={styles.slider}
                    />
                    <div className={styles.sliderMarks}>
                      <div className={styles.sliderMark}>
                        <span className={styles.sliderMarkText}>Strict</span>
                        <div className={styles.sliderMarkTick} />
                      </div>
                      <div className={styles.sliderMark}>
                        <span className={styles.sliderMarkText}>Balanced</span>
                        <div className={styles.sliderMarkTick} />
                      </div>
                      <div className={styles.sliderMark}>
                        <span className={styles.sliderMarkText}>Creative</span>
                        <div className={styles.sliderMarkTick} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* NPU Toggle */}
                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleTitle}>
                      Neural Processing Unit
                    </span>
                    <span className={styles.toggleSub}>
                      Prioritize local hardware when available
                    </span>
                  </div>
                  <button
                    className={npuEnabled ? styles.toggleOn : styles.toggleOff}
                    onClick={toggleNpu}
                    role="switch"
                    aria-checked={npuEnabled}
                  >
                    <div
                      className={
                        npuEnabled
                          ? styles.toggleThumbOn
                          : styles.toggleThumbOff
                      }
                    />
                  </button>
                </div>
              </div>
            </details>
          </section>

          {/* Promotional Card */}
          <div className={styles.promoCard}>
            <div className={styles.promoInner}>
              <div>
                <h4 className={styles.promoTitle}>Need more power?</h4>
                <p className={styles.promoSub}>
                  Upgrade to Premiere Pro AI to unlock 8K rendering and
                  unlimited Aura Pro processing credits.
                </p>
              </div>
              <button className={styles.promoBtn}>View Plans</button>
            </div>
            <div className={styles.promoBlur} aria-hidden="true" />
          </div>
        </div>
      </main>
    </div>
  );
}
