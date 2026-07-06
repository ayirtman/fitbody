export default function Disclaimer({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-ember/30 bg-ember/10 ${compact ? "px-4 py-3" : "p-5"}`}
      role="note"
    >
      <p className={`font-semibold text-ember ${compact ? "text-xs" : "text-sm"}`}>
        Not medical advice
      </p>
      <p className={`mt-1 text-muted ${compact ? "text-xs" : "text-sm"}`}>
        These exercises are general education for common aches, not a
        diagnosis. Start gently, stop anything that causes sharp pain, and see
        a doctor or physiotherapist if pain is severe, worsening, or hangs
        around for more than a couple of weeks.
      </p>
    </div>
  );
}
