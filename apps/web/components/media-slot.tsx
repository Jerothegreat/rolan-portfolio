import { Image as ImageIcon } from "pixelarticons/react/Image";
import { Video as VideoIcon } from "pixelarticons/react/Video";

// A project, spotlight, or news media area. Shows the real video or image when the content
// file has one; until then, a labelled pixel placeholder of the same size.
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
  const frame = `aspect-video w-full border-2 border-ink ${className}`;
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
