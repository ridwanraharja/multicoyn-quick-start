export function MulticoynIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="currentColor" fillOpacity="0.2"/>
      <path d="M16 6L8 10v12l8 4 8-4V10l-8-4z" fill="currentColor"/>
      <path d="M16 10l-4 2v6l4 2 4-2v-6l-4-2z" fill="white" fillOpacity="0.9"/>
      <path d="M16 14v4M14 15l2 1 2-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
