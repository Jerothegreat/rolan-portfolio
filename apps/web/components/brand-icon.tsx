/** A skill's brand logo: 24x24 simple-icons path data, drawn in the text color. */
export function BrandIcon({ path }: { path?: string }) {
  if (!path) return null;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-3.5 shrink-0">
      <path d={path} />
    </svg>
  );
}
