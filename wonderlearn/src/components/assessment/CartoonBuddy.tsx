
import React from "react";
import "./CartoonBuddy.css";

export type BuddySide = "left" | "right";

interface CartoonBuddyProps {
  side: BuddySide;
  name: string;
  emoji: string;
  message: string;
  onSpeak: () => void;
  onHelp: () => void;
}

export default function CartoonBuddy({
  side,
  name,
  emoji,
  message,
  onSpeak,
  onHelp,
}: CartoonBuddyProps) {
  return (
    <aside
      className={`cartoon-buddy cartoon-buddy--${side}`}
      aria-label={`${name}, your learning friend`}
    >
      <div className="buddy-speech-bubble" aria-live="polite">
        <span className="buddy-speech-label">{name} says</span>
        <p>{message}</p>
      </div>

      <button
        type="button"
        className="buddy-character-button"
        onClick={onSpeak}
        aria-label={`Ask ${name} to speak`}
      >
        <span className="buddy-sparkle sparkle-one">✨</span>
        <span className="buddy-character" aria-hidden="true">
          {emoji}
        </span>
        <span className="buddy-sparkle sparkle-two">⭐</span>
      </button>

      <div className="buddy-name">{name}</div>

      <button
        type="button"
        className="buddy-help-button"
        onClick={onHelp}
      >
        💡 Need help?
      </button>
    </aside>
  );
}
