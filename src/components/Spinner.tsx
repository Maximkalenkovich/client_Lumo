export default function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-app-hint">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-app-secondary border-t-app-button" />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
}
