import { useState } from 'react';

interface FoodImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export function FoodImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'HYSTERIA',
  fallbackSubtitle = 'Tabarbour Street Grill',
}: FoodImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-surface-container-high via-surface-container to-street-red/30 text-center p-4 ${className}`}
      >
        <span className="material-symbols-outlined text-4xl text-street-yellow mb-1">
          local_fire_department
        </span>
        <span className="font-montserrat font-black text-sm uppercase tracking-wider text-white">
          {fallbackTitle}
        </span>
        <span className="font-inter text-xs text-on-surface-variant mt-0.5">
          {fallbackSubtitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
