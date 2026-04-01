import { useState } from "react";
import AppLayout from "../components/AppLayout";
import AIPromptBar from "../components/AIPromptBar";
import styles from "./EditorScreen.module.css";

const MEDIA_ITEMS = [
  { id: "m1", label: "Cityscape clip", duration: "0:12", aspect: "square", gradient: "linear-gradient(135deg, #1a1040 0%, #2d1b69 50%, #0d0828 100%)" },
  { id: "m2", label: "Interview clip", duration: "1:04", aspect: "square", gradient: "linear-gradient(135deg, #2d1f0e 0%, #4a3520 50%, #1a0f05 100%)" },
  { id: "m3", label: "Nature clip", duration: "2:45", aspect: "wide", gradient: "linear-gradient(135deg, #0a2520 0%, #1a3a4a 50%, #051812 100%)" },
  { id: "m4", label: "Abstract clip", duration: "0:08", aspect: "square", gradient: "linear-gradient(135deg, #1f0a2a 0%, #3a1550 50%, #100518 100%)" },
];

const TIMELINE_CLIPS = [
  { id: "tc1", label: "Face Detection Clip", icon: "face", width: 192, color: "secondary" },
  { id: "tc2", label: "Main Aerial 01", icon: "landscape", width: 320, color: "primary" },
  { id: "tc3", label: "AI Transition", icon: "auto_fix", width: 128, color: "tertiary" },
  { id: "tc4", label: "Close-up Shot", icon: "movie", width: 256, color: "secondary" },
];

const WAVEFORM_HEIGHTS = [
  50, 75, 25, 100, 50, 75, 100, 66, 40, 85, 30, 90, 55, 70, 35, 80,
  45, 95, 60, 25, 70, 50, 85, 40, 65, 30, 90, 55, 75, 45, 80, 35,
  60, 100, 50, 70, 40, 85, 55, 30,
];

const CLIP_COLOR_MAP = {
  secondary: styles.trackClipSecondary,
  primary: styles.trackClipPrimary,
  tertiary: styles.trackClipTertiary,
};

const CLIP_ICON_COLOR_MAP = {
  secondary: styles.clipIconSecondary,
  primary: styles.clipIconPrimary,
  tertiary: styles.clipIconTertiary,
};

export default function EditorScreen() {
  const [playing, setPlaying] = useState(false);

  return (
    <AppLayout activeNav="media">
      <div className={styles.editorRoot}>
        {/* Top: Video Preview + Media Bin */}
        <div className={styles.topSection}>
          {/* Video Preview Player */}
          <div className={styles.videoSection}>
            <div className={styles.videoContainer}>
              <div className={styles.videoPlaceholder} />
              {/* Controls overlay — visible on hover */}
              <div className={styles.videoControls}>
                <div className={styles.controlsRow}>
                  <div className={styles.controlsLeft}>
                    <span
                      className={`material-symbols-outlined ${styles.controlIcon}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                      role="button"
                      tabIndex={0}
                      onClick={() => setPlaying((p) => !p)}
                      onKeyDown={(e) => e.key === "Enter" && setPlaying((p) => !p)}
                    >
                      {playing ? "pause" : "play_arrow"}
                    </span>
                    <span className={`material-symbols-outlined ${styles.controlIcon}`}>
                      skip_next
                    </span>
                    <span className={styles.timecode}>00:42 / 02:15</span>
                  </div>
                  <div className={styles.controlsRight}>
                    <span className={`material-symbols-outlined ${styles.controlIcon}`}>
                      fullscreen
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Media Bin */}
          <div className={styles.mediaBin}>
            <div className={styles.mediaBinHeader}>
              <h3 className={styles.mediaBinTitle}>MEDIA BIN</h3>
              <span className={`material-symbols-outlined ${styles.filterIcon}`}>
                filter_list
              </span>
            </div>
            <div className={styles.mediaBinScroll}>
              <div className={styles.mediaBinGrid}>
                {MEDIA_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className={`${styles.mediaCard} ${
                      item.aspect === "wide" ? styles.mediaCardWide : ""
                    }`}
                  >
                    <div
                      className={styles.mediaCardBg}
                      style={{ background: item.gradient }}
                    />
                    <span className={styles.mediaDuration}>{item.duration}</span>
                  </div>
                ))}
                <div className={styles.importCard}>
                  <span className={`material-symbols-outlined ${styles.importIcon}`}>
                    add_to_photos
                  </span>
                  <span className={styles.importLabel}>Import</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Smart Timeline */}
        <section className={styles.timeline}>
          <div className={styles.timelineHeader}>
            <div className={styles.timelineHeaderLeft}>
              <div className={styles.timelineLabel}>
                <span className={`material-symbols-outlined ${styles.timelineLabelIcon}`}>
                  tune
                </span>
                <span className={styles.timelineLabelText}>Smart Timeline</span>
              </div>
              <div className={styles.timelineTools}>
                <span className={`material-symbols-outlined ${styles.toolIcon}`}>undo</span>
                <span className={`material-symbols-outlined ${styles.toolIcon}`}>redo</span>
                <span className={`material-symbols-outlined ${styles.toolIcon}`}>content_cut</span>
              </div>
            </div>
            <div className={styles.timelineZoom}>
              <span className={`material-symbols-outlined ${styles.zoomIcon}`}>zoom_out</span>
              <div className={styles.zoomTrack}>
                <div className={styles.zoomFill} />
              </div>
              <span className={`material-symbols-outlined ${styles.zoomIcon}`}>zoom_in</span>
            </div>
          </div>

          {/* Timeline Tracks */}
          <div className={styles.timelineTracks}>
            {/* Playhead */}
            <div className={styles.playhead}>
              <div className={styles.playheadDot} />
            </div>

            {/* Track 1: Video */}
            <div className={styles.videoTrack}>
              {TIMELINE_CLIPS.map((clip) => (
                <div
                  key={clip.id}
                  className={`${styles.trackClip} ${CLIP_COLOR_MAP[clip.color] ?? ""}`}
                  style={{ width: clip.width }}
                >
                  <span
                    className={`material-symbols-outlined ${styles.clipIcon} ${
                      CLIP_ICON_COLOR_MAP[clip.color] ?? ""
                    }`}
                  >
                    {clip.icon}
                  </span>
                  <span className={styles.clipLabel}>{clip.label}</span>
                </div>
              ))}
            </div>

            {/* Track 2: Audio */}
            <div className={styles.audioTrack}>
              <div className={styles.audioClip}>
                <div className={styles.waveform}>
                  {WAVEFORM_HEIGHTS.map((h, i) => (
                    <div
                      key={i}
                      className={styles.waveBar}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <AIPromptBar placeholder="Ask AI to 'remove the background' or 'add cinematic lighting'..." />
    </AppLayout>
  );
}
