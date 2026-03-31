import { useState } from "react";
import AppLayout from "../components/AppLayout";
import styles from "./ExportScreen.module.css";

const FORMATS = [
  { id: "tiktok", icon: "smartphone", name: "TikTok / Reels", aspect: "9:16 Portrait" },
  { id: "youtube", icon: "laptop", name: "YouTube", aspect: "16:9 Cinema" },
  { id: "instagram", icon: "square", name: "Instagram Post", aspect: "1:1 Square" },
  { id: "custom", icon: "aspect_ratio", name: "Custom", aspect: "Free Aspect" },
];

const RESOLUTIONS = [
  { id: "1080p", label: "1080p" },
  { id: "4k", label: "4K Ultra HD" },
  { id: "8k", label: "8K" },
];

export default function ExportScreen() {
  const [activeFormat, setActiveFormat] = useState("tiktok");
  const [activeResolution, setActiveResolution] = useState("4k");
  const [smartSharpening, setSmartSharpening] = useState(true);
  const [normalizeAudio, setNormalizeAudio] = useState(false);

  return (
    <AppLayout activeNav="exports">
      <div className={styles.content}>
        {/* Left: Video Preview */}
        <section className={styles.previewSection}>
          <div className={styles.previewHeader}>
            <div>
              <span className={styles.previewLabel}>Preview</span>
              <h1 className={styles.previewTitle}>Final Master</h1>
            </div>
            <div className={styles.previewActions}>
              <button className={styles.previewIconBtn}>
                <span className="material-symbols-outlined">fullscreen</span>
              </button>
            </div>
          </div>

          <div className={styles.videoContainer}>
            <img
              alt="Cinematic landscape video frame"
              className={styles.videoImage}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8UI0cToPbP5oH01xIyzXBjZv7SNvMLXAiXgqugjXei006VEWGVwSIByEezNovBFZfhmTNJY-pPIxoySxn5HsvNtQ9QT_P_U8l5DELIx9U9IdZMUcTWREHaWj6zv-X7wwwsUvqRcMaH8OZD9nG4WL4-_ge7LLmnoWO_nV06qTD5hkDnTlm6A227_2yCbYp-hte8Wq92CGLFdS1jG33EKCxYFpUsio2nVUrkReaMkiv7Gj7yIipc8XOYpqc22VClRBTuyME_FX_Hndn"
            />
            {/* Safe zone border */}
            <div className={styles.safeZone} />
            {/* Auto-reframe indicator */}
            <div className={styles.reframeOverlay}>
              <div className={styles.reframeZone}>
                <span className={styles.reframeLabel}>AUTO-REFRAME ACTIVE</span>
              </div>
            </div>
            {/* AI caption overlay */}
            <div className={styles.captionOverlay}>
              <p className={styles.captionText}>
                &ldquo;The silence of the mountains is deafening...&rdquo;
              </p>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Duration</p>
              <p className={styles.statValue}>00:45:12</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Total Size</p>
              <p className={styles.statValue}>142.4 MB</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Codec</p>
              <p className={styles.statValue}>ProRes 422</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Status</p>
              <div className={styles.statusReady}>
                <span className={styles.statusDot} />
                <p className={styles.statValue}>Ready</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Export Settings Panel */}
        <section className={styles.settingsPanel}>
          {/* Auto-Reframe */}
          <div>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Auto-Reframe</h3>
              <span className={styles.aiBadge}>AI POWERED</span>
            </div>
            <div className={styles.formatGrid}>
              {FORMATS.map((f) => (
                <button
                  key={f.id}
                  className={`${styles.formatBtn} ${activeFormat === f.id ? styles.formatBtnActive : ""}`}
                  onClick={() => setActiveFormat(f.id)}
                >
                  <span
                    className={`material-symbols-outlined ${styles.formatIcon} ${activeFormat === f.id ? styles.formatIconActive : ""}`}
                  >
                    {f.icon}
                  </span>
                  <div className={styles.formatInfo}>
                    <p className={styles.formatName}>{f.name}</p>
                    <p className={styles.formatAspect}>{f.aspect}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Export Settings */}
          <div>
            <h3 className={styles.sectionTitle}>Export Settings</h3>
            <div className={styles.settingsBody}>
              <div className={styles.settingGroup}>
                <label className={styles.settingLabel}>Resolution</label>
                <div className={styles.resolutionRow}>
                  {RESOLUTIONS.map((r) => (
                    <button
                      key={r.id}
                      className={`${styles.resBtn} ${activeResolution === r.id ? styles.resBtnActive : ""}`}
                      onClick={() => setActiveResolution(r.id)}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.twoColGrid}>
                <div className={styles.settingGroup}>
                  <label className={styles.settingLabel}>Frame Rate</label>
                  <div className={styles.dropdown}>
                    <span className={styles.dropdownValue}>60 FPS</span>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>unfold_more</span>
                  </div>
                </div>
                <div className={styles.settingGroup}>
                  <label className={styles.settingLabel}>Bitrate (VBR)</label>
                  <div className={styles.dropdown}>
                    <span className={styles.dropdownValue}>32 Mbps</span>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>unfold_more</span>
                  </div>
                </div>
              </div>

              <div className={styles.divider}>
                <div className={styles.dividerLine} />
                <span className={styles.dividerLabel}>Advanced</span>
                <div className={styles.dividerLine} />
              </div>

              <div className={styles.toggleGroup}>
                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <span className={`material-symbols-outlined ${styles.iconTertiary}`}>high_quality</span>
                    <span className={styles.toggleText}>Smart Sharpening</span>
                  </div>
                  <button
                    className={`${styles.toggle} ${smartSharpening ? styles.toggleOn : styles.toggleOff}`}
                    onClick={() => setSmartSharpening(!smartSharpening)}
                    aria-label="Toggle Smart Sharpening"
                  >
                    <div className={`${styles.toggleKnob} ${smartSharpening ? styles.toggleKnobOn : styles.toggleKnobOff}`} />
                  </button>
                </div>
                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <span className={`material-symbols-outlined ${styles.iconSecondary}`}>graphic_eq</span>
                    <span className={styles.toggleText}>Normalize Audio</span>
                  </div>
                  <button
                    className={`${styles.toggle} ${normalizeAudio ? styles.toggleOn : styles.toggleOff}`}
                    onClick={() => setNormalizeAudio(!normalizeAudio)}
                    aria-label="Toggle Normalize Audio"
                  >
                    <div className={`${styles.toggleKnob} ${normalizeAudio ? styles.toggleKnobOn : styles.toggleKnobOff}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className={styles.footerCta}>
            <div className={styles.storageCard}>
              <div className={styles.storageHeader}>
                <span className={styles.storageLabel}>Storage Required</span>
                <span className={styles.storageValue}>1.2 GB Available</span>
              </div>
              <div className={styles.storageBarTrack}>
                <div className={styles.storageBarFill} />
              </div>
            </div>
            <div className={styles.ctaButtons}>
              <button className={styles.previewBtn}>
                <span className="material-symbols-outlined">save</span>
                Preview
              </button>
              <button className={styles.exportBtn}>
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  file_upload
                </span>
                Export &amp; Share
              </button>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
