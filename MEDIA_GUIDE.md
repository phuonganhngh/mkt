# Media guide

All media can be updated through `public/media/` and `content/media.ts`.

## Add files

1. Create a folder in `public/media/` for the project. Use the project IDs below and lowercase filenames separated by hyphens.
2. Copy in your approved originals or optimized exports. WebP works well for images. Export brochures or presentations as optimized PDFs, and add a WebP image of the cover for the gallery. Video can use a local MP4 or an HTTPS link. A YouTube Unlisted link opens in an embedded player after the viewer clicks.
3. Add the public path beginning with `/media/` to the appropriate entry in `content/media.ts`. Include English and Japanese captions and alt text where below. Add an optional `variants` list if you have resized copies. Use the real widths in pixels.
4. Run `npm run build` and check both language versions. When using Netlify, deploy the updated source or upload the rebuilt production export.

| Project ID | Media groups |
| --- | --- |
| `website` | `design-screens`, `improvement-screens` |
| `social` | `examples` |
| `visual` | `examples` |
| `partnerships` | `activities` |
| `destination` | `winter-slides`, `things-to-do` |
| `advertising` | `examples` |

Optional `cover` entries appear in the project grids. The `website` cover also appears beside the featured project on Home. Gallery assets use `contain` to show the complete image. Grids crop covers to a consistent shape, so use a wide cover or place critical details near the center.

## Example

These filenames and captions show the structure. Replace them with your own files and text.

```ts
website: {
  cover: {
    src: "/media/website/home-1200.webp",
    alt: {
      en: "Screenshot of the hotel’s English homepage",
      ja: "ホテルの英語版公式サイトのスクリーンショット",
    },
    variants: [
      { src: "/media/website/home-480.webp", width: 480 },
      { src: "/media/website/home-1200.webp", width: 1200 },
    ],
  },
  groups: {
    "design-screens": [{
      kind: "image",
      src: "/media/website/layout.webp",
      alt: { en: "English homepage layout", ja: "英語版トップページのレイアウト" },
      caption: { en: "Homepage layout", ja: "トップページのレイアウト" },
    }],
    "improvement-screens": [],
  },
},
```

For PDFs, use `{ kind: "pdf", src, poster, caption }`. Create a local cover image and assign it to `poster` using `{ src, alt, variants? }`. The thumbnail links to the actual PDF, so the slides stay available at their original resolution.

For local video or YouTube use `{ kind: "video", src, poster, caption }`. For a local video, optionally add `subtitles: [{ src: "/media/social/captions.en.vtt", lang: "en", label: "English" }]`. Enable captions on the video platform for hosted clips. Other HTTPS video URLs open the host’s player page.

## Replace or remove files

To replace a file, upload the new version and update `src`, captions and the responsive variants as needed. For a live site, a new filename helps browsers fetch the updated copy immediately. To remove an item, delete its record from the group. An empty group displays a neutral placeholder. If you remove a file while retaining its reference, the build filters out missing local assets.

Keep the full-resolution source files separately, and put only the compressed web versions in this repository. Use `content/site.ts` when you are ready to add a public email address or a professional profile link.
