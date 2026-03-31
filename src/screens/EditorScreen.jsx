import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Play, Pause, Volume2, VolumeX, SkipBack, SkipForward,
  Scissors, Trash2, Wand2, ChevronRight, Sparkles, Download,
  PanelBottomOpen, PanelBottomClose, Send,
} from "lucide-react";
import styles from "./EditorScreen.module.css";

const MOCK_CLIPS = [
  { id: "c1", label: "Clip 1", duration: 4.2, color: "#7c5cf6" },
  { id: "c2", label: "Clip 2", duration: 3.1, color: "#a78bfa" },
  { id: "c3", label: "Clip 3", duration: 5.8, color: "#7c5cf6" },
  { id: "c4", label: "Clip 4", duration: 2.9, color: "#a78bfa" },
  { id: "c5", label: "Clip 5", duration: 6.0, color: "#7c5cf6" },
];

const MOCK_CHAT = [
  { role: "ai", text: "I've assembled your first cut. The total runtime is 22 seconds. Want me to adjust anything?" },
];

export default function EditorScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(true);
  const [clips, setClips] = useState(MOCK_CLIPS);
  const [selectedClip, setSelectedClip] = useState(null);
  const [chatMessages, setChatMessages] = useState(MOCK_CHAT);
  const [aiInput, setAiInput] = useState("");
  const [playhead, setPlayhead] = useState(0);
  const chatEndRef = useRef(null);
  const totalDuration = clips.reduce((s, c) => s + c.duration, 0);

  const sendAiMessage = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const msg = aiInput.trim();
    setAiInput("");
    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: msg },
      { role: "ai", text: getMockReply(msg) },
    ]);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const removeClip = (id) => {
    setClips((prev) => prev.filter((c) => c.id !== id));
    if (selectedClip === id) setSelectedClip(null);
  };

  const splitClip = (id) => {
    setClips((prev) =>
      prev.flatMap((c) => {
        if (c.id !== id) return [c];
        const half = c.duration / 2;
        return [
          { ...c, id: c.id + "_a", label: c.label + "a", duration: half },
          { ...c, id: c.id + "_b", label: c.label + "b", duration: half },
        ];
      })
    );
  };

  return (
    <div className={styles.root}>
      {/* Top bar */}
      <header className={styles.topBar}>
        <div className={styles.logoSmall}>
          <Sparkles size={16} className={styles.logoIcon} />
          <span>PremiereAI</span>
        </div>
        <div className={styles.topBarTitle}>Untitled project</div>
        <div className={styles.topBarActions}>
          <button
            className={styles.exportBtn}
            onClick={() => navigate("/export", { state: location.state })}
          >
            <Download size={15} />
            Export
          </button>
        </div>
      </header>

      {/* Body */}
      <div className={styles.body}>
        {/* Left: Preview */}
        <div className={styles.previewPanel}>
          {/* Center Stage */}
          <div className={styles.centerStage}>
            <div className={styles.videoPlaceholder}>
              <div className={styles.videoOverlay}>
                <div className={styles.playButton} onClick={() => setPlaying((p) => !p)}>
                  {playing ? <Pause size={32} /> : <Play size={32} />}
                </div>
              </div>
              <div className={styles.videoLabel}>Preview</div>
            </div>

            {/* Playback controls */}
            <div className={styles.controls}>
              <button className={styles.controlBtn} onClick={() => setPlayhead(0)}>
                <SkipBack size={16} />
              </button>
              <button
                className={`${styles.controlBtn} ${styles.playBtn}`}
                onClick={() => setPlaying((p) => !p)}
              >
                {playing ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button className={styles.controlBtn}>
                <SkipForward size={16} />
              </button>
              <div className={styles.timecode}>
                {formatTime(playhead)} / {formatTime(totalDuration)}
              </div>
              <button
                className={styles.controlBtn}
                onClick={() => setMuted((m) => !m)}
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>

            {/* Scrubber */}
            <div className={styles.scrubberWrap}>
              <input
                type="range"
                min={0}
                max={totalDuration}
                step={0.01}
                value={playhead}
                onChange={(e) => setPlayhead(Number(e.target.value))}
                className={styles.scrubber}
              />
            </div>
          </div>

          {/* AI Prompt Bar */}
          <div className={styles.promptBar}>
            <div className={styles.promptHeader}>
              <Wand2 size={14} className={styles.promptIcon} />
              <span className={styles.promptHeaderText}>AI assistant</span>
            </div>
            <div className={styles.chatMessages}>
              {chatMessages.map((m, i) => (
                <div
                  key={i}
                  className={`${styles.chatBubble} ${m.role === "user" ? styles.chatUser : styles.chatAi}`}
                >
                  {m.role === "ai" && (
                    <Sparkles size={12} className={styles.chatAiIcon} />
                  )}
                  <span>{m.text}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form className={styles.chatForm} onSubmit={sendAiMessage}>
              <input
                className={styles.chatInput}
                placeholder="Tell AI what to change…"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
              />
              <button className={styles.chatSendBtn} type="submit">
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Right: Timeline panel */}
        <div className={`${styles.timelinePanel} ${!timelineOpen ? styles.timelinePanelCollapsed : ""}`}>
          <div className={styles.timelineHeader}>
            <span className={styles.timelineTitle}>Smart Timeline</span>
            <div className={styles.timelineHeaderActions}>
              <span className={styles.clipCount}>{clips.length} clips · {formatTime(totalDuration)}</span>
              <button
                className={styles.toggleTimeline}
                onClick={() => setTimelineOpen((o) => !o)}
                title={timelineOpen ? "Collapse timeline" : "Expand timeline"}
              >
                {timelineOpen ? <PanelBottomClose size={15} /> : <PanelBottomOpen size={15} />}
              </button>
            </div>
          </div>

          {timelineOpen && (
            <>
              {/* Ruler */}
              <TimelineRuler duration={totalDuration} />

              {/* Clips track */}
              <div className={styles.timelineTrack}>
                {clips.map((clip) => (
                  <ClipBlock
                    key={clip.id}
                    clip={clip}
                    totalDuration={totalDuration}
                    selected={selectedClip === clip.id}
                    onSelect={() => setSelectedClip(clip.id === selectedClip ? null : clip.id)}
                    onSplit={() => splitClip(clip.id)}
                    onRemove={() => removeClip(clip.id)}
                  />
                ))}
              </div>

              {/* Playhead overlay line */}
              <div
                className={styles.playheadLine}
                style={{ left: `${(playhead / totalDuration) * 100}%` }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* --- Sub-components --- */

function TimelineRuler({ duration }) {
  const ticks = Math.ceil(duration);
  return (
    <div className={styles.ruler}>
      {Array.from({ length: ticks + 1 }, (_, i) => (
        <div key={i} className={styles.tick} style={{ left: `${(i / duration) * 100}%` }}>
          <span className={styles.tickLabel}>{i}s</span>
        </div>
      ))}
    </div>
  );
}

function ClipBlock({ clip, totalDuration, selected, onSelect, onSplit, onRemove }) {
  const widthPct = (clip.duration / totalDuration) * 100;
  return (
    <div
      className={`${styles.clip} ${selected ? styles.clipSelected : ""}`}
      style={{ width: `${widthPct}%`, background: clip.color }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
    >
      <span className={styles.clipLabel}>{clip.label}</span>
      <span className={styles.clipDuration}>{clip.duration.toFixed(1)}s</span>
      {selected && (
        <div className={styles.clipActions}>
          <button
            className={styles.clipActionBtn}
            onClick={(e) => { e.stopPropagation(); onSplit(); }}
            title="Split clip"
          >
            <Scissors size={12} />
          </button>
          <button
            className={styles.clipActionBtn}
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            title="Remove clip"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}
    </div>
  );
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function getMockReply(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes("shorten") || lower.includes("trim")) return "Trimmed the longest clips by 20%. Timeline updated!";
  if (lower.includes("music") || lower.includes("audio")) return "Syncing the beat drops to your cut points now…";
  if (lower.includes("colour") || lower.includes("color")) return "Applying a cinematic color grade across all clips.";
  if (lower.includes("slow")) return "Added a 50% slow-motion effect to your selected clip.";
  return "Got it! Making that change to your edit now…";
}
