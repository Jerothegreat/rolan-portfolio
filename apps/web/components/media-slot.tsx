"use client";

import { useState } from "react";
import { Image as ImageIcon } from "pixelarticons/react/Image";
import { Play } from "pixelarticons/react/Play";
import { Video as VideoIcon } from "pixelarticons/react/Video";

// A project, spotlight, or news media area. Shows the real video or image when the content
// file has one; until then, a labelled pixel placeholder of the same size. A YouTube video
// shows its thumbnail and plays in place on click; the player only loads then.
export function MediaSlot({
  video,
  image,
  alt,
  kind = video ? "video" : "image",
  label,
  className = "",
}: {
  video?: string;
  image?: string;
  alt: string;
  kind?: "video" | "image";
  label?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const frame = `aspect-video w-full border-2 border-ink ${className}`;
  const youtubeId = video?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)?.[1];
  if (youtubeId && playing)
    return (
      <iframe
        className={`${frame} bg-ink`}
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={`${alt} demo video`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  if (youtubeId)
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`${alt}: play the demo video`}
        className={`${frame} group relative block cursor-pointer overflow-hidden bg-ink`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube thumbnail */}
        <img className="size-full object-cover" src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`} alt="" loading="lazy" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-14 place-items-center border-2 border-ink bg-coral text-on-accent shadow-[3px_3px_0_var(--ink)] group-hover:bg-gold">
            <Play className="size-8" aria-hidden="true" />
          </span>
        </span>
      </button>
    );
  if (video) return <video className={`${frame} bg-ink object-cover`} src={video} controls muted playsInline />;
  // eslint-disable-next-line @next/next/no-img-element -- co-located content images are already sized by Velite
  if (image) return <img className={`${frame} object-cover`} src={image} alt={alt} loading="lazy" />;
  const Icon = kind === "video" ? VideoIcon : ImageIcon;
  return (
    <div
      role="img"
      aria-label={`${alt}: ${kind === "video" ? "demo video" : "image"} coming soon`}
      className={`${frame} desk grid place-items-center gap-1 border-dashed text-ink-muted`}
    >
      <span className="grid justify-items-center gap-1">
        <Icon className="size-8" aria-hidden="true" />
        <span className="border-2 border-ink bg-surface px-1.5 font-pixel text-[11px] text-ink">
          {label ?? (kind === "video" ? "demo video soon" : "screenshot soon")}
        </span>
      </span>
    </div>
  );
}
