import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import styles from "./ProcessingScreen.module.css";

const STAGES = [
  { id: "scan", label: "Scanning footage", detail: "Identifying scenes, objects & faces" },
  { id: "analyse", label: "Analyzing moments", detail: "Scoring clips for highlight quality" },
  { id: "music", label: "Syncing music", detail: "Matching BPM and beat drops to cuts" },
  { id: "draft", label: "Assembling draft", detail: "Generating the first edit" },
  { id: "refine", label: "Final polish", detail: "Color-grade and audio balance" },
];

const STAGE_DURATIONS = [2800, 3200, 2600, 3000, 2400];

const WAVEFORM_BARS = [
  { height: 32, opacity: 0.2 },
  { height: 64, opacity: 0.4 },
  { height: 96, opacity: 0.6 },
  { height: 128, opacity: 1 },
  { height: 80, opacity: 1, secondary: true },
  { height: 112, opacity: 1 },
  { height: 56, opacity: 0.6 },
  { height: 40, opacity: 0.3 },
  { height: 64, opacity: 0.2 },
  { height: 112, opacity: 0.6, secondary: true },
  { height: 128, opacity: 1 },
  { height: 48, opacity: 0.4 },
  { height: 24, opacity: 0.2 },
];

export default function ProcessingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state ?? {};

  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let stageIdx = 0;
    let progressVal = 0;

    function runStage() {
      if (cancelled || stageIdx >= STAGES.length) return;
      setCurrentStage(stageIdx);
      const duration = STAGE_DURATIONS[stageIdx];
      const startProgress = (stageIdx / STAGES.length) * 100;
      const endProgress = ((stageIdx + 1) / STAGES.length) * 100;
      const startTime = Date.now();

      function tick() {
        if (cancelled) return;
        const elapsed = Date.now() - startTime;
        const ratio = Math.min(elapsed / duration, 1);
        progressVal = startProgress + (endProgress - startProgress) * ratio;
        setProgress(progressVal);
        if (ratio < 1) {
          requestAnimationFrame(tick);
        } else {
          stageIdx++;
          if (stageIdx < STAGES.length) {
            runStage();
          } else {
            setDone(true);
            setTimeout(() => {
              if (!cancelled) navigate("/editor", { state });
            }, 900);
          }
        }
      }
      requestAnimationFrame(tick);
    }

    runStage();
    return () => {
      cancelled = true;
    };
  }, [navigate, state]);

  const fileCount = state.files?.length ?? 12;

  // Derive task card progress from overall progress
  const faceProgress = Math.min(Math.round(progress * 1.3), 100);
  const beatProgress = Math.max(0, Math.min(Math.round((progress - 15) * 1.1), 100));
  const colorProgress = Math.max(0, Math.min(Math.round((progress - 50) * 2), 100));

  const estimatedSeconds = Math.max(0, Math.round((100 - progress) * 0.45));

  return (
    <AppLayout activeNav="timeline">
      <section className={styles.content}>
        {/* AI Background Glow */}
        <div className={styles.neuralPulse} />

        <div className={styles.centerWrapper}>
          {/* Processing Visualizer */}
          <div className={styles.visualizer}>
            <div className={styles.pingContainer}>
              <div className={styles.pingCircle} />
            </div>

            {/* Waveform */}
            <div className={styles.waveform}>
              {WAVEFORM_BARS.map((bar, i) => (
                <div
                  key={i}
                  className={`${styles.waveBar} ${bar.secondary ? styles.waveBarSecondary : ""}`}
                  style={{ height: bar.height, opacity: bar.opacity }}
                />
              ))}
            </div>

            <div className={styles.visualizerText}>
              <h1 className={styles.headline}>
                {done ? "Edit ready!" : `AI is analyzing ${fileCount} clips...`}
              </h1>
              <p className={styles.subheadline}>
                {done
                  ? "Your first cut is waiting for you."
                  : `Estimated completion in ${estimatedSeconds} seconds`}
              </p>
            </div>
          </div>

          {/* Task Bento Grid */}
          <div className={styles.bentoGrid}>
            {/* Face Tracking */}
            <div className={styles.taskCard}>
              <div className={styles.taskHeader}>
                <div className={styles.taskInfo}>
                  <div className={`${styles.taskIconWrap} ${styles.taskIconPrimary}`}>
                    <span className="material-symbols-outlined">face</span>
                  </div>
                  <span className={styles.taskTitle}>Face Tracking</span>
                </div>
                <span className={`${styles.taskPercent} ${styles.taskPercentPrimary}`}>
                  {faceProgress}%
                </span>
              </div>
              <div className={styles.taskProgressTrack}>
                <div
                  className={`${styles.taskProgressFill} ${styles.taskProgressPrimary}`}
                  style={{ width: `${faceProgress}%` }}
                />
              </div>
              <div className={styles.faceAvatars}>
                <div className={styles.avatar}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>person</span>
                </div>
                <div className={styles.avatar}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>person</span>
                </div>
                <div className={styles.avatarCount}>+4</div>
              </div>
            </div>

            {/* Beat Syncing */}
            <div className={styles.taskCard}>
              <div className={styles.taskHeader}>
                <div className={styles.taskInfo}>
                  <div className={`${styles.taskIconWrap} ${styles.taskIconSecondary}`}>
                    <span className="material-symbols-outlined">music_note</span>
                  </div>
                  <span className={styles.taskTitle}>Beat Syncing</span>
                </div>
                <span className={`${styles.taskPercent} ${styles.taskPercentSecondary}`}>
                  {beatProgress}%
                </span>
              </div>
              <div className={styles.taskProgressTrack}>
                <div
                  className={`${styles.taskProgressFill} ${styles.taskProgressSecondary}`}
                  style={{ width: `${beatProgress}%` }}
                />
              </div>
              <p className={styles.taskDetail}>
                Aligning transitions to &apos;Midnight Drive.wav&apos;
              </p>
            </div>

            {/* Color Grading */}
            <div className={styles.taskCard}>
              <div className={styles.taskHeader}>
                <div className={styles.taskInfo}>
                  <div className={`${styles.taskIconWrap} ${styles.taskIconTertiary}`}>
                    <span className="material-symbols-outlined">palette</span>
                  </div>
                  <span className={styles.taskTitle}>Color Grading</span>
                </div>
                {colorProgress === 0 ? (
                  <div className={styles.pendingBadge}>
                    <span className={styles.pingDot}>
                      <span className={styles.pingDotRing} />
                      <span className={styles.pingDotCore} />
                    </span>
                    <span className={styles.pendingText}>Pending</span>
                  </div>
                ) : (
                  <span className={`${styles.taskPercent} ${styles.taskPercentTertiary}`}>
                    {colorProgress}%
                  </span>
                )}
              </div>
              <div className={styles.taskProgressTrack}>
                <div
                  className={`${styles.taskProgressFill} ${
                    colorProgress > 0
                      ? styles.taskProgressTertiaryActive
                      : styles.taskProgressTertiary
                  }`}
                  style={{ width: `${colorProgress}%` }}
                />
              </div>
              <p className={styles.taskDetail}>
                {colorProgress === 0
                  ? "Waiting for clip analysis to complete..."
                  : "Applying color grade..."}
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <div className={styles.actionFooter}>
            <button className={styles.cancelBtn} onClick={() => navigate(-1)}>
              <span className="material-symbols-outlined">close</span>
              Cancel Processing
            </button>
            <div className={styles.priorityInfo}>
              <div className={styles.priorityDivider} />
              <div className={styles.priorityText}>
                <span className={styles.priorityLabel}>Processing Priority</span>
                <span className={styles.priorityValue}>Ultra HD (4K) Enhancement Enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background Texture */}
        <div className={styles.bgTexture}>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 300, fontVariationSettings: "'wght' 100" }}
          >
            neurology
          </span>
        </div>
      </section>

      {/* Mobile Bottom Nav */}
      <nav className={styles.mobileNav}>
        <Link to="/processing" className={`${styles.mobileNavItem} ${styles.mobileNavItemActive}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            view_timeline
          </span>
          <span className={styles.mobileNavLabel}>Timeline</span>
        </Link>
        <Link to="/ingest" className={styles.mobileNavItem}>
          <span className="material-symbols-outlined">video_library</span>
          <span className={styles.mobileNavLabel}>Media</span>
        </Link>
        <Link to="/export" className={styles.mobileNavItem}>
          <span className="material-symbols-outlined">file_upload</span>
          <span className={styles.mobileNavLabel}>Export</span>
        </Link>
      </nav>
    </AppLayout>
  );
}
