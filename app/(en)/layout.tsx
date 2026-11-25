import type { ReactNode } from "react";
import "@fontsource-variable/montserrat/wght.css";
import "@fontsource-variable/roboto/wght.css";
import "@fontsource-variable/roboto-serif/wght.css";
import "@fontsource-variable/roboto-serif/wght-italic.css";
import "../styles.css";

export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
