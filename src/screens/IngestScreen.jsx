import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import AIPromptBar from "../components/AIPromptBar";
import styles from "./IngestScreen.module.css";

const ACCEPT_TYPES = {
  video: ["mp4", "mov", "avi", "mkv", "webm", "prores"],
  audio: ["mp3", "wav", "aac", "flac", "ogg"],
  image: ["jpg", "jpeg", "png", "gif", "webp", "raw"],
};

function fileType(name) {
  const ext = name.split(".").pop().toLowerCase();
  if (ACCEPT_TYPES.video.includes(ext)) return "video";
  if (ACCEPT_TYPES.audio.includes(ext)) return "audio";
  if (ACCEPT_TYPES.image.includes(ext)) return "image";
  return "other";
}

const RECENT_MEDIA = [
  { id: "r1", label: "Cinematic landscape shot", duration: "00:42", color: "#3a2d6b" },
  { id: "r2", label: "City lights at night", duration: "01:15", color: "#1a3a4b" },
  { id: "r3", label: "Portrait lighting study", duration: "00:08", color: "#4b1a2d" },
  { id: "r4", label: "Macro lens tech detail", duration: "00:24", color: "#2d3a1a" },
];

export default function IngestScreen() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const addFiles = useCallback((incoming) => {
    const mapped = Array.from(incoming).map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      size: f.size,
      type: fileType(f.name),
      url: URL.createObjectURL(f),
    }));
    setFiles((prev) => [...prev, ...mapped]);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles],
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleBrowse = (e) => {
    e.stopPropagation();
    inputRef.current?.click();
  };

  const handlePrompt = (text) => {
    navigate("/processing", { state: { files, prompt: text } });
  };

  return (
    <AppLayout activeNav="media">
      <div className={styles.page}>
        {/* Hero header */}
        <section className={styles.hero}>
          <h1 className={styles.heading}>
            1. Ingest &amp; <span className={styles.headingAccent}>Setup</span>
          </h1>
          <p className={styles.subtitle}>
            Ready your workspace. Drop your raw footage here and let AI analyze
            the depth, lighting, and key subjects for an effortless edit.
          </p>
        </section>

        {/* Drop zone */}
        <section
          className={`${styles.dropzone} ${dragging ? styles.dropzoneActive : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="video/*,audio/*,image/*"
            className={styles.hiddenInput}
            onChange={(e) => addFiles(e.target.files)}
          />

          <div className={styles.dropzoneInner}>
            <div className={`${styles.uploadIconCircle} ai-gradient`}>
              <span className="material-symbols-outlined" style={{ fontSize: 36, color: "var(--on-primary)" }}>
                upload_file
              </span>
            </div>

            <h3 className={styles.dropzoneTitle}>Drag &amp; Drop Media</h3>
            <p className={styles.dropzoneHint}>
              Support for 4K ProRes, H.264, and RAW files. Your AI analysis will
              begin immediately upon upload.
            </p>

            <div className={styles.dropzoneBtns}>
              <button className={styles.browseBtn} onClick={handleBrowse} tabIndex={-1}>
                Browse Files
              </button>
              <button className={styles.browseBtn} onClick={(e) => e.stopPropagation()} tabIndex={-1}>
                Link Cloud Drive
              </button>
            </div>
          </div>
        </section>

        {/* Uploaded file chips */}
        {files.length > 0 && (
          <div className={styles.fileChips}>
            {files.map((f) => (
              <span key={f.id} className={styles.fileChip}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                  {f.type === "video" ? "movie" : f.type === "audio" ? "music_note" : "image"}
                </span>
                {f.name}
              </span>
            ))}
          </div>
        )}

        {/* Recent Media */}
        <section className={styles.recentSection}>
          <div className={styles.recentHeader}>
            <h4 className={styles.recentTitle}>Recent Media</h4>
            <button className={styles.viewLibrary}>
              View Library
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                arrow_forward
              </span>
            </button>
          </div>

          <div className={styles.recentGrid}>
            {RECENT_MEDIA.map((item) => (
              <div key={item.id} className={styles.thumbnail}>
                <div
                  className={styles.thumbnailImage}
                  style={{ background: item.color }}
                />
                <div className={styles.thumbnailOverlay} />
                <div className={styles.thumbnailMeta}>
                  <span className={styles.thumbnailDuration}>{item.duration}</span>
                  <span
                    className={`material-symbols-outlined ${styles.thumbnailCheck}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
              </div>
            ))}

            {/* Empty placeholder */}
            <div className={styles.thumbnailAdd}>
              <span className="material-symbols-outlined">add</span>
            </div>
          </div>
        </section>

        {/* AI Prompt Bar */}
        <AIPromptBar
          onSubmit={handlePrompt}
          placeholder="Ask AI to organize or tag these clips..."
        />
      </div>
    </AppLayout>
  );
}
