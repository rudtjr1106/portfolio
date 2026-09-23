"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

/** Ghost pill that copies the address and confirms inline (announced politely). */
export function CopyEmail({ email, size = "md" }: { email: string; size?: "md" | "sm" }) {
  const [state, setState] = useState<"idle" | "done" | "error">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2200);
    return () => clearTimeout(t);
  }, [state]);

  const icon = size === "sm" ? 15 : 18;
  return (
    <button
      type="button"
      className={`pill pill-ghost ${size === "sm" ? "pill-sm" : ""}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setState("done");
        } catch {
          setState("error");
        }
      }}
    >
      {state === "done" ? <Check size={icon} weight="bold" className="text-accent-ink" aria-hidden /> : <Copy size={icon} weight="bold" aria-hidden />}
      <span aria-live="polite">{state === "done" ? "복사했습니다" : state === "error" ? "복사하지 못했습니다" : "주소 복사"}</span>
    </button>
  );
}
