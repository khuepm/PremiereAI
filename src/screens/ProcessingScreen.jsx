import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles, CheckCircle2, Circle } from "lucide-react";
import styles from "./ProcessingScreen.module.css";

const STAGES = [
  { id: "scan", label: "Scanning footage", detail: "Identifying scenes, objects & faces" },
  { id: "analyse", label: "Analyzing moments", detail: "Scoring clips for highlight quality" },
  { id: "music", label: "Syncing music", detail: "Matching BPM and beat drops to cuts" },
  { id: "draft", label: "Assembling draft", detail: "Generating the first edit" },
  { id: "refine", label: "Final polish", detail: "Color-grade and audio balance" },
];

const STAGE_DURATIONS = [2800, 3200, 2600, 3000, 2400];

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

  const fileCount = state.files?.length ?? 0;

  return (
    <div className={styles.root}>
      {/* Logo */}
      <div className={styles.logoBar}>
        <Sparkles size={18} className={styles.logoIcon} />
        <span className={styles.logoText}>PremiereAI</span>
      </div>

      {/* Central card */}
      <div className={styles.card}>
        <div className={styles.pulseRing}>
          <div className={styles.pulseCore}>
            <Sparkles size={28} />
          </div>
        </div>

        <h1 className={styles.title}>
          {done ? "Edit ready!" : "AI is working…"}
        </h1>
        <p className={styles.subtitle}>
          {done
            ? "Your first cut is waiting for you."
            : `Processing ${fileCount} file${fileCount !== 1 ? "s" : ""}${state.prompt ? " · " + state.prompt.slice(0, 50) : ""}`}
        </p>

        {/* Progress bar */}
        <div className={styles.progressWrap}>
          <div
            className={`${styles.progressBar} ${done ? styles.progressDone : ""}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className={styles.progressPct}>{Math.round(progress)}%</span>

        {/* Stage list */}
        <div className={styles.stageList}>
          {STAGES.map((s, i) => {
            const isActive = i === currentStage && !done;
            const isDone = i < currentStage || done;
            return (
              <div
                key={s.id}
                className={`${styles.stageItem} ${isActive ? styles.stageActive : ""} ${isDone ? styles.stageDone : ""}`}
              >
                <span className={styles.stageIconWrap}>
                  {isDone ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <Circle size={16} />
                  )}
                </span>
                <div className={styles.stageText}>
                  <span className={styles.stageLabel}>{s.label}</span>
                  {isActive && (
                    <span className={styles.stageDetail}>{s.detail}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
