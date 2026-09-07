import { Suspense, lazy, useEffect, useState } from "react";
import { Plane, Shield, RotateCcw, ZoomIn, MousePointer2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Livery, VehicleKind } from "./VehicleScene";

const VehicleScene = lazy(() => import("./VehicleScene"));

const STEAM_URL = "https://store.steampowered.com/app/236390/War_Thunder/";

const LIVERIES: Livery[] = [
  { name: "Desert Sand", base: "#c2a273", camo: "#8a6f45", accent: "#e2801f" },
  { name: "Forest Green", base: "#4b5c3a", camo: "#2f3b25", accent: "#e2801f" },
  { name: "Winter Splinter", base: "#d6dce2", camo: "#7d8a97", accent: "#3f7fd1" },
  { name: "Naval Grey", base: "#6d7883", camo: "#414a54", accent: "#5aa9e6" },
  { name: "Night Raider", base: "#23282f", camo: "#12161b", accent: "#ff6a1f" },
];

export function Hero() {
  const [kind, setKind] = useState<VehicleKind>("jet");
  const [livery, setLivery] = useState<Livery>(LIVERIES[0]!);
  const [autoRotate, setAutoRotate] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section id="home" className="relative px-4 pb-16 pt-32 sm:px-6 sm:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className="animate-rise text-center">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5">
            <span className="size-2 animate-pulse rounded-full bg-primary" />
            <span className="hud-label">Free to play · Air · Ground · Naval</span>
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold uppercase leading-[1.05] sm:text-6xl lg:text-7xl">
            Experience <span className="text-gradient-ember">True Combat</span> Realism
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Dominate land, air, and sea in the ultimate free-to-play military vehicle simulator.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="animate-pulse-ring font-semibold shadow-[var(--shadow-ember)]"
            >
              <a href={STEAM_URL} target="_blank" rel="noreferrer noopener">
                <Play className="size-4" /> Play Free on Steam
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-accent/40 bg-accent/10">
              <a href="#customizer">Open 3D Customizer</a>
            </Button>
          </div>
        </div>

        {/* 3D viewer */}
        <div id="customizer" className="glass-strong mt-12 scroll-mt-28 overflow-hidden rounded-3xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="hud-label">Hangar · Live 3D</span>
              <span className="size-1.5 rounded-full bg-accent" />
              <span className="font-mono text-xs text-accent">{livery.name.toUpperCase()}</span>
            </div>
            <div className="flex gap-1 rounded-lg bg-secondary/60 p-1">
              {(
                [
                  { k: "jet" as VehicleKind, label: "Fighter", Icon: Plane },
                  { k: "tank" as VehicleKind, label: "Battle Tank", Icon: Shield },
                ]
              ).map(({ k, label, Icon }) => (
                <button
                  key={k}
                  onClick={() => setKind(k)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    kind === k
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="size-3.5" /> {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_18rem]">
            <div className="relative h-[22rem] sm:h-[30rem]">
              {mounted ? (
                <Suspense fallback={<ViewerFallback />}>
                  <VehicleScene kind={kind} livery={livery} autoRotate={autoRotate} />
                </Suspense>
              ) : (
                <ViewerFallback />
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-4 p-4 text-[0.7rem] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MousePointer2 className="size-3.5" /> Drag to rotate
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ZoomIn className="size-3.5" /> Scroll to zoom
                </span>
              </div>
            </div>

            <aside className="border-t border-border p-5 lg:border-l lg:border-t-0">
              <p className="hud-label">Camouflage</p>
              <div className="mt-3 grid gap-2">
                {LIVERIES.map((l) => (
                  <button
                    key={l.name}
                    onClick={() => setLivery(l)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm transition-all",
                      livery.name === l.name
                        ? "border-primary/60 bg-primary/10"
                        : "border-border bg-secondary/30 hover:border-accent/40",
                    )}
                  >
                    <span className="flex overflow-hidden rounded-md ring-1 ring-border">
                      <span className="size-5" style={{ background: l.base }} />
                      <span className="size-5" style={{ background: l.camo }} />
                      <span className="size-5" style={{ background: l.accent }} />
                    </span>
                    <span className="flex-1">{l.name}</span>
                  </button>
                ))}
              </div>

              <p className="hud-label mt-6">Viewer</p>
              <button
                onClick={() => setAutoRotate((v) => !v)}
                className={cn(
                  "mt-3 flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors",
                  autoRotate
                    ? "border-accent/50 bg-accent/15 text-foreground"
                    : "border-border bg-secondary/30 text-muted-foreground",
                )}
              >
                <RotateCcw className="size-4" /> Auto-rotate {autoRotate ? "On" : "Off"}
              </button>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Stylised hangar preview. Swap between an interceptor and a main battle tank, then
                apply a camo scheme with matching squadron decals.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function ViewerFallback() {
  return (
    <div className="grid h-full place-items-center">
      <div className="text-center">
        <div className="mx-auto size-10 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
        <p className="hud-label mt-4">Spinning up hangar…</p>
      </div>
    </div>
  );
}
