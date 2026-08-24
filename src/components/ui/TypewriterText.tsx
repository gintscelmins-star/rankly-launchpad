import { useState, useEffect } from "react";

const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_TYPED = 1800;
const PAUSE_DELETED = 400;

interface Props {
  words: string[];
  template: string;
}

export function TypewriterText({ words, template }: Props) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < word.length) {
      t = setTimeout(() => setText(word.slice(0, text.length + 1)), TYPING_SPEED);
    } else if (!deleting && text.length === word.length) {
      t = setTimeout(() => setDeleting(true), PAUSE_TYPED);
    } else if (deleting && text.length > 0) {
      t = setTimeout(() => setText(word.slice(0, text.length - 1)), DELETING_SPEED);
    } else {
      t = setTimeout(() => {
        setDeleting(false);
        setIdx((i) => (i + 1) % words.length);
      }, PAUSE_DELETED);
    }

    return () => clearTimeout(t);
  }, [text, deleting, idx, words]);

  const [before, after] = template.split("_______");

  return (
    <span>
      {before}
      <span className="text-primary font-semibold">{text}</span>
      <span className="text-primary opacity-80 animate-pulse">|</span>
      {after}
    </span>
  );
}
