"use client";

import { useRef, useState } from "react";
import type { ImageAsset, Media } from "../content/media";
import { ui, type Locale } from "../content/site";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH || "";
const assetPath = (src: string) => src.startsWith("/") ? assetBase + src : src;

export function Placeholder({ locale, label }: { locale: Locale; label?: string }) {
  return <div className="media-placeholder"><span>{label ?? ui[locale].placeholder}</span></div>;
}

export function AssetImage({ image, locale, sizes, eager = false }: {
  image: ImageAsset; locale: Locale; sizes: string; eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Placeholder locale={locale} />;
  return (
    // The static export serves optimized image variants supplied with the project.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={assetPath(image.src)}
      srcSet={image.variants?.map(item => `${assetPath(item.src)} ${item.width}w`).join(", ") || undefined}
      sizes={sizes} loading={eager ? "eager" : "lazy"} decoding="async"
      alt={image.alt[locale]} onError={() => setFailed(true)} />
  );
}

function embedUrl(source: string) {
  if (!source.startsWith("https://")) return undefined;
  const url = new URL(source);
  const youtube = ["youtube.com", "www.youtube.com", "www.youtube-nocookie.com"];
  const id = url.hostname === "youtu.be" ? url.pathname.split("/")[1]
    : youtube.includes(url.hostname) ? url.searchParams.get("v") || url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)\/?$/)?.[1]
    : undefined;
  if (id && /^[\w-]{11}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
  return undefined;
}

function MediaItem({ item, locale }: { item: Media; locale: Locale }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const hoverVideo = useRef<HTMLVideoElement>(null);
  const previewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState(false);
  const t = ui[locale];
  const caption = item.caption[locale];
  const poster = item.kind === "image" ? item : item.poster;
  const preview = poster
    ? <AssetImage image={poster} locale={locale} sizes="(max-width: 600px) 94vw, 440px" />
    : item.kind === "video" && item.src.startsWith("/media/")
      ? <video ref={hoverVideo} className="media-video-preview" src={assetPath(item.src) + "#t=0.1"} muted playsInline preload="metadata" aria-hidden="true" />
      : null;
  const embed = item.kind === "video" ? embedUrl(item.src) : undefined;
  const external = item.kind === "video" && item.src.startsWith("https://") && !embed;
  const action = item.kind === "pdf" ? t.openPdf : item.kind === "video" ? t.play : t.expand;

  function stopPreview() {
    if (previewTimer.current) clearTimeout(previewTimer.current);
    previewTimer.current = null;
    const video = hoverVideo.current;
    if (video) {
      video.pause();
      try { video.currentTime = 0.1; } catch { /* metadata may not be loaded yet */ }
    }
  }

  function startPreview() {
    const video = hoverVideo.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (previewTimer.current) clearTimeout(previewTimer.current);
    video.muted = true;
    try { video.currentTime = 0.1; } catch { /* metadata may not be loaded yet */ }
    void video.play().catch(() => {});
    previewTimer.current = setTimeout(stopPreview, 2000);
  }

  function open() {
    stopPreview();
    dialog.current?.showModal();
    setActive(true);
  }

  if (item.kind === "pdf" && !poster) {
    return <figure className="media-item media-item--document">
      <a className="media-document-link" href={assetPath(item.src)} target="_blank" rel="noopener noreferrer" aria-label={`${action} — ${caption}`}>
        <strong>{caption}</strong><span>{action} ↗</span>
      </a>
    </figure>;
  }

  return <figure className="media-item">
    {item.kind === "pdf" || external
      ? <a className="media-trigger" href={assetPath(item.src)} aria-label={`${action} — ${caption}`}>
          {preview ?? <Placeholder locale={locale} label={action} />}
        </a>
      : <button type="button" ref={trigger} className={`media-trigger${item.kind === "video" ? " media-trigger--video" : ""}`} onClick={open}
          onMouseEnter={item.kind === "video" ? startPreview : undefined}
          onMouseLeave={item.kind === "video" ? stopPreview : undefined}
          onBlur={item.kind === "video" ? stopPreview : undefined}
          aria-label={`${action} — ${caption}`}>
          {preview ?? <Placeholder locale={locale} label={action} />}
          {item.kind === "video" && <span className="media-play-indicator" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5.5v13l10-6.5z" /></svg></span>}
        </button>}
    <figcaption>{caption}</figcaption>
    {item.kind !== "pdf" && !external &&
      <dialog ref={dialog} aria-label={caption} onClose={() => { setActive(false); trigger.current?.focus(); }}>
        <div className="dialog-content">
          <button type="button" className="dialog-close" onClick={() => dialog.current?.close()}>{t.close}</button>
          {active && (item.kind === "image"
            ? <AssetImage image={item} locale={locale} sizes="min(90vw, 1000px)" eager />
            : embed
              ? <iframe className="video-frame" src={embed} title={caption} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
              : <video className="video-frame" src={assetPath(item.src)} controls muted playsInline preload="metadata" poster={poster?.src ? assetPath(poster.src) : undefined}>
                  {item.subtitles?.map(track => <track key={track.src} src={assetPath(track.src)} kind="captions" srcLang={track.lang} label={track.label} />)}
                </video>)}
          <p>{caption}</p>
        </div>
      </dialog>}
  </figure>;
}

export function Gallery({ items, locale }: { items: Media[]; locale: Locale }) {
  if (!items.length) return <div className="empty-gallery"><Placeholder locale={locale} /></div>;
  return <div className={`media-gallery${items.some(item => item.src.includes("/visual/design-email-banner-")) ? " media-gallery--email" : ""}`}>{items.map((item, index) =>
    <MediaItem key={`${item.src}-${index}`} item={item} locale={locale} />
  )}</div>;
}


/** Static transparent-background book mockup with a faithful original-image fallback.
 * The static mockup is a decorative rendering; the original opens on activation. */
export function MenuBookMockup({ image, locale }: { image: ImageAsset; locale: Locale }) {
  const [mockupAvailable, setMockupAvailable] = useState(true);
  const src = assetPath("/media/visual/dinner-menu-book-mockup.png");
  const original = assetPath(image.src);
  return <a className="visual-menu-mockup" href={original} target="_blank" rel="noopener noreferrer"
    aria-label={locale === "ja" ? "元の夕食メニューを開く" : "View original dinner menu"}>
    {mockupAvailable
      ? <img src={src} alt={image.alt[locale]} loading="lazy" decoding="async"
          onError={() => setMockupAvailable(false)} />
      : <AssetImage image={image} locale={locale} sizes="(max-width: 720px) 70vw, 500px" />}
  </a>;
}
