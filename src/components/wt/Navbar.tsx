import { useEffect, useState } from "react";
import { Menu, X, Crosshair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEAM_URL = "https://store.steampowered.com/app/236390/War_Thunder/";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "3D Customizer", href: "#customizer" },
  { label: "Reviews", href: "#reviews" },
  { label: "AI Tactical Assistant", href: "#assistant" },
  { label: "Download", href: "#download" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-5">
      <nav
        className={cn(
          "w-full max-w-6xl rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6",
          scrolled ? "glass-strong" : "glass",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/40">
              <Crosshair className="size-5" />
            </span>
            <span className="font-display text-lg leading-none tracking-wide">
              WAR<span className="text-primary">THUNDER</span>
              <span className="hud-label mt-1 block">Tactical Briefing</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden font-semibold shadow-[var(--shadow-ember)] sm:inline-flex">
              <a href={STEAM_URL} target="_blank" rel="noreferrer noopener">
                Download Now
              </a>
            </Button>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-lg bg-secondary/60 text-foreground lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-3 grid gap-1 border-t border-border pt-3 lg:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <Button asChild size="sm" className="mt-2 font-semibold">
              <a href={STEAM_URL} target="_blank" rel="noreferrer noopener">
                Download Now
              </a>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
