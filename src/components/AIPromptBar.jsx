import { useState } from "react";
import styles from "./AIPromptBar.module.css";

export default function AIPromptBar({ onSubmit, placeholder }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit?.(trimmed);
    setValue("");
  }

  return (
    <div className={styles.wrapper}>
      <form
        className={`${styles.bar} glass-panel`}
        onSubmit={handleSubmit}
      >
        <span className={`material-symbols-outlined ${styles.aiIcon}`}>
          auto_awesome
        </span>

        <input
          type="text"
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder ?? "Ask AI to edit your project…"}
        />

        <button
          type="submit"
          className={`${styles.sendBtn} ai-gradient`}
          aria-label="Send prompt"
        >
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>
    </div>
  );
}
