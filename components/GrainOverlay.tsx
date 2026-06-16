// One job: render the fixed grain texture overlay that gives linen sections
// a printed, physical quality. Pointer-events none so it never blocks clicks.
export default function GrainOverlay() {
  return <div className="grain" aria-hidden="true" />;
}
