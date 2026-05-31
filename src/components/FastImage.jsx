import React, { useEffect, useState } from 'react';

const FastImage = ({ src, alt = '', className = '', style = {}, placeholder = '', ...props }) => {
  const [loadedSrc, setLoadedSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!src) return;

    const img = new Image();
    img.decoding = 'async';
    img.src = src;
    img.onload = () => {
      if (!cancelled) {
        setLoadedSrc(src);
        setIsLoaded(true);
      }
    };

    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <div className={`fast-image ${className}`} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {!isLoaded && (
        <div
          className="fast-image__placeholder"
          aria-hidden
          style={{ position: 'absolute', inset: 0, background: '#f2f2f2', display: 'block' }}
        />
      )}

      <img
        src={loadedSrc || src}
        alt={alt}
        decoding="async"
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        {...props}
      />
    </div>
  );
};

export default FastImage;
