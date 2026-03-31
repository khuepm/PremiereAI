import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Download, CheckCircle2, Sparkles, ArrowLeft,
  Monitor, Smartphone, Square, Film,
} from "lucide-react";
import styles from "./ExportScreen.module.css";

const PLATFORMS = [
  {
    id: "youtube",
    label: "YouTube",
    icon: Monitor,
    aspect: "16:9",
    resolution: "1920 × 1080",
    fps: "24fps",
    description: "Landscape · HD",
  },
  {
    id: "tiktok",
    label: "TikTok",
    icon: Smartphone,
    aspect: "9:16",
    resolution: "1080 × 1920",
    fps: "30fps",
    description: "Vertical · HD",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: Square,
    aspect: "1:1",
    resolution: "1080 × 1080",
    fps: "30fps",
    description: "Square · HD",
  },
  {
    id: "master",
    label: "Master file",
    icon: Film,
    aspect: "16:9",
    resolution: "3840 × 2160",
    fps: "60fps",
    description: "4K · ProRes",
  },
];

const QUALITIES = ["High (recommended)", "Medium", "Web optimised"];

export default function ExportScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(["youtube"]);
  const [quality, setQuality] = useState("High (recommended)");
  const [exporting, setExporting] = useState(false);
  const [done, setDone] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const togglePlatform = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const startExport = () => {
    if (exporting || done || selected.length === 0) return;
    setExporting(true);
    setExportProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 6 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setExportProgress(100);
        setTimeout(() => {
          setExporting(false);
          setDone(true);
        }, 400);
      } else {
        setExportProgress(p);
      }
    }, 150);
  };

  return (
    <div className={styles.root}>
      {/* Header */}
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate("/editor")}>
          <ArrowLeft size={16} />
          Back to editor
        </button>
        <div className={styles.logo}>
          <Sparkles size={18} className={styles.logoIcon} />
          <span className={styles.logoText}>PremiereAI</span>
        </div>
        <div className={styles.placeholder} />
      </header>

      <main className={styles.main}>
        <div className={styles.intro}>
          <h1 className={styles.title}>Export & Reframe</h1>
          <p className={styles.subtitle}>
            Auto-reframe your video for every platform in one click.
          </p>
        </div>

        {/* Platform grid */}
        <section>
          <p className={styles.sectionLabel}>Platforms</p>
          <div className={styles.platformGrid}>
            {PLATFORMS.map((p) => {
              const Icon = p.icon;
              const active = selected.includes(p.id);
              return (
                <button
                  key={p.id}
                  className={`${styles.platformCard} ${active ? styles.platformCardActive : ""}`}
                  onClick={() => togglePlatform(p.id)}
                >
                  <div className={styles.platformCardHeader}>
                    <span className={styles.platformIcon}>
                      <Icon size={20} />
                    </span>
                    {active && (
                      <CheckCircle2 size={16} className={styles.checkIcon} />
                    )}
                  </div>
                  <span className={styles.platformName}>{p.label}</span>
                  <span className={styles.platformAspect}>{p.aspect}</span>
                  <span className={styles.platformRes}>{p.resolution}</span>
                  <span className={styles.platformDesc}>{p.description} · {p.fps}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Quality */}
        <section>
          <p className={styles.sectionLabel}>Quality</p>
          <div className={styles.qualityRow}>
            {QUALITIES.map((q) => (
              <button
                key={q}
                className={`${styles.qualityBtn} ${quality === q ? styles.qualityBtnActive : ""}`}
                onClick={() => setQuality(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </section>

        {/* Export progress */}
        {(exporting || done) && (
          <div className={styles.progressSection}>
            <div className={styles.progressWrap}>
              <div
                className={`${styles.progressBar} ${done ? styles.progressDone : ""}`}
                style={{ width: `${exportProgress}%` }}
              />
            </div>
            <span className={styles.progressText}>
              {done ? "✓ Export complete!" : `Exporting… ${Math.round(exportProgress)}%`}
            </span>
            {done && (
              <div className={styles.doneFiles}>
                {selected.map((id) => {
                  const plat = PLATFORMS.find((p) => p.id === id);
                  return plat ? (
                    <span key={id} className={styles.doneFile}>
                      <CheckCircle2 size={12} />
                      {plat.label} ({plat.resolution})
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <span className={styles.exportNote}>
          {selected.length === 0
            ? "Select at least one platform"
            : `${selected.length} platform${selected.length > 1 ? "s" : ""} selected · ${quality}`}
        </span>
        <button
          className={`${styles.exportBtn} ${(selected.length === 0 || done) ? styles.exportBtnDisabled : ""}`}
          onClick={startExport}
          disabled={selected.length === 0 || done || exporting}
        >
          {done ? (
            <>
              <CheckCircle2 size={16} /> Exported
            </>
          ) : exporting ? (
            "Exporting…"
          ) : (
            <>
              <Download size={16} /> Export {selected.length} version{selected.length > 1 ? "s" : ""}
            </>
          )}
        </button>
      </footer>
    </div>
  );
}
