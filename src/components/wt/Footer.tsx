import { Crosshair, Github, Twitter, Youtube, Twitch } from "lucide-react";

const STEAM_URL = "https://store.steampowered.com/app/236390/War_Thunder/";

export function Footer() {
  return (
    <footer className="px-4 pb-10 pt-6 sm:px-6">
      <div className="glass mx-auto max-w-6xl rounded-3xl p-8">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/40">
                <Crosshair className="size-5" />
              </span>
              <span className="font-display text-lg tracking-wide">
                WAR<span className="text-primary">THUNDER</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted-foreground">
              This is a fan-made landing page experience built for demonstration purposes only. War
              Thunder, all related names, logos, vehicles and trademarks belong to Gaijin
              Entertainment. This page is not affiliated with, endorsed by, or sponsored by Gaijin
              Entertainment.
            </p>
          </div>

          <div>
            <p className="hud-label">Quick links</p>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              {[
                ["Home", "#home"],
                ["About", "#about"],
                ["3D Customizer", "#customizer"],
                ["Reviews", "#reviews"],
                ["Tactical AI", "#assistant"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="transition-colors hover:text-primary">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="hud-label">Community</p>
            <div className="mt-4 flex gap-2">
              {[Twitter, Youtube, Twitch, Github].map((Icon, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="grid size-10 place-items-center rounded-xl border border-border bg-secondary/40 text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <Icon className="size-4" />
                </span>
              ))}
            </div>
            <a
              href={STEAM_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-flex text-sm text-primary hover:underline"
            >
              Play free on Steam →
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
          <p className="hud-label">Fan project · Non-commercial</p>
          <p className="text-xs text-muted-foreground">
            Social icons are placeholders. Trademarks © Gaijin Entertainment.
          </p>
        </div>
      </div>
    </footer>
  );
}
