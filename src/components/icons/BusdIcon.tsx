export function BusdIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#F0B90B"/>
      <path fill="#fff" d="M16 6l2.5 2.5-6 6L10 12l6-6zm6 6l2.5 2.5-8.5 8.5-2.5-2.5 8.5-8.5zM8 14l2.5 2.5L8 19l-2.5-2.5L8 14zm8 8l2.5 2.5L16 27l-2.5-2.5L16 22z"/>
    </svg>
  );
}
