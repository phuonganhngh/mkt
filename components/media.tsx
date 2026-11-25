"use client";

import { useRef, useState } from "react";
import type { ImageAsset, Media } from "../content/media";
import { ui, type Locale } from "../content/site";

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
    <img src={image.src}
      srcSet={image.variants?.map(item => `${item.src} ${item.width}w`).join(", ") || undefined}
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
  const [active, setActive] = useState(false);
  const t = ui[locale];
  const caption = item.caption[locale];
  const poster = item.kind === "image" ? item : item.poster;
  const preview = poster ? <AssetImage image={poster} locale={locale} sizes="(max-width: 600px) 94vw, 440px" /> : null;
  const embed = item.kind === "video" ? embedUrl(item.src) : undefined;
  const external = item.kind === "video" && item.src.startsWith("https://") && !embed;
  const action = item.kind === "pdf" ? t.openPdf : item.kind === "video" ? t.play : t.expand;

  function open() {
    dialog.current?.showModal();
    setActive(true);
  }

  return <figure className="media-item">
    {item.kind === "pdf" || external
      ? <a className="media-trigger" href={item.src} aria-label={`${action} — ${caption}`}>
          {preview ?? <Placeholder locale={locale} label={action} />}
        </a>
      : <button type="button" ref={trigger} className="media-trigger" onClick={open}
          aria-label={`${action} — ${caption}`}>
          {preview ?? <Placeholder locale={locale} label={action} />}
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
              : <video className="video-frame" src={item.src} controls playsInline preload="metadata" poster={poster?.src}>
                  {item.subtitles?.map(track => <track key={track.src} src={track.src} kind="captions" srcLang={track.lang} label={track.label} />)}
                </video>)}
          <p>{caption}</p>
        </div>
      </dialog>}
  </figure>;
}

export function Gallery({ items, locale }: { items: Media[]; locale: Locale }) {
  if (!items.length) return <div className="empty-gallery"><Placeholder locale={locale} /></div>;
  return <div className="media-gallery">{items.map((item, index) =>
    <MediaItem key={`${item.src}-${index}`} item={item} locale={locale} />
  )}</div>;
}
