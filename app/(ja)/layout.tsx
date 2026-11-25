import type { ReactNode } from "react";
import "@fontsource-variable/noto-sans-jp/wght.css";
import "../styles.css";

export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="ja"><body>{children}</body></html>;
}
