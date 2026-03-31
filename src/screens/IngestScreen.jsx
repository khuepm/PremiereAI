import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Film, Music, Image, X, ChevronRight, Sparkles } from "lucide-react";
import styles from "./IngestScreen.module.css";

const ACCEPT_TYPES = {
  video: ["mp4", "mov", "avi", "mkv", "webm"],
  audio: ["mp3", "wav", "aac", "flac", "ogg"],
  image: ["jpg", "jpeg", "png", "gif", "webp"],
};

function fileType(name) {
  const ext = name.split(".").pop().toLowerCase();
  if (ACCEPT_TYPES.video.includes(ext)) return "video";
  if (ACCEPT_TYPES.audio.includes(ext)) return "audio";
  if (ACCEPT_TYPES.image.includes(ext)) return "image";
  return "other";
}

function FileIcon({ type }) {
  const props = { size: 16 };
  if (type === "video") return <Film {...props} />;
  if (type === "audio") return <Music {...props} />;
  if (type === "image") return <Image {...props} />;
  return <Film {...props} />;
}

export default function IngestScreen() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [prompt, setPrompt] = useState("");
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
    [addFiles]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const removeFile = (id) =>
    setFiles((prev) => prev.filter((f) => f.id !== id));

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const canContinue = files.length > 0;

  const handleContinue = () => {
    if (!canContinue) return;
    navigate("/processing", { state: { files, prompt } });
  };

  return (
    <div className={styles.root}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Sparkles size={20} className={styles.logoIcon} />
          <span className={styles.logoText}>PremiereAI</span>
        </div>
        <nav className={styles.steps}>
          <StepDot label="Ingest" active />
          <div className={styles.stepLine} />
          <StepDot label="Processing" />
          <div className={styles.stepLine} />
          <StepDot label="Editor" />
          <div className={styles.stepLine} />
          <StepDot label="Export" />
        </nav>
      </header>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1 className={styles.title}>Drop your footage</h1>
          <p className={styles.subtitle}>
            Add videos, audio, and images. We handle the rest.
          </p>
        </div>

        {/* Drop zone */}
        <div
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
            <div className={styles.uploadIcon}>
              <Upload size={32} />
            </div>
            <p className={styles.dropzoneTitle}>
              Drag & drop files here
            </p>
            <p className={styles.dropzoneHint}>
              MP4, MOV, AVI · MP3, WAV · JPG, PNG
            </p>
            <button className={styles.browseBtn} tabIndex={-1}>
              Browse files
            </button>
          </div>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className={styles.fileList}>
            {files.map((f) => (
              <div key={f.id} className={styles.fileItem}>
                <span className={styles.fileIcon}>
                  <FileIcon type={f.type} />
                </span>
                <span className={styles.fileName}>{f.name}</span>
                <span className={styles.fileSize}>{formatSize(f.size)}</span>
                <button
                  className={styles.removeBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(f.id);
                  }}
                  aria-label="Remove file"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* AI Prompt for this project */}
        <div className={styles.promptSection}>
          <label className={styles.promptLabel} htmlFor="project-prompt">
            What's the vibe? <span className={styles.optional}>(optional)</span>
          </label>
          <textarea
            id="project-prompt"
            className={styles.promptInput}
            placeholder='e.g. "Highlight reel of our summer trip, cinematic feel, upbeat music…"'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
          />
        </div>
      </main>

      {/* Footer CTA */}
      <footer className={styles.footer}>
        <span className={styles.fileCount}>
          {files.length > 0
            ? `${files.length} file${files.length > 1 ? "s" : ""} ready`
            : "No files added yet"}
        </span>
        <button
          className={`${styles.continueBtn} ${!canContinue ? styles.continueBtnDisabled : ""}`}
          onClick={handleContinue}
          disabled={!canContinue}
        >
          Let AI edit
          <ChevronRight size={18} />
        </button>
      </footer>
    </div>
  );
}

function StepDot({ label, active }) {
  return (
    <div className={`${styles.stepDot} ${active ? styles.stepDotActive : ""}`}>
      <div className={styles.stepDotCircle} />
      <span className={styles.stepDotLabel}>{label}</span>
    </div>
  );
}
