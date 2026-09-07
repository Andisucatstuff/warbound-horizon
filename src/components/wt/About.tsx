import { useEffect, useRef, useState } from "react";
import { Plane, Shield, Anchor, Crosshair } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FEATURES = [
  {
    id: "air",
    label: "Air Combat",
    Icon: Plane,
    title: "From biplanes to supersonic jets",
    body: "Over a century of aviation, modelled with individual flight dynamics, damage to control surfaces, engine overheating and realistic energy fighting. Climb, dive, and bleed your enemy's speed.",
    points: ["Full flight-model instructor", "Damage per component", "Rear-gunner & bomber crews"],
  },
  {
    id: "ground",
    label: "Ground Forces",
    Icon: Shield,
    title: "Armour angles decide everything",
    body: "Command light scouts to heavy MBTs. Every plate has thickness and slope, every shell has a type — angle your hull, pick your ammo, and hunt weak spots through the gunner sight.",
    points: ["Sloped-armour penetration", "Crew & module damage", "Combined-arms battles"],
  },
  {
    id: "naval",
    label: "Naval Warfare",
    Icon: Anchor,
    title: "Torpedo boats to battleships",
    body: "Manoeuvre coastal fleets through torpedo runs or trade broadsides with capital ships. Fire control, ballistic drop and flooding compartments all matter at sea.",
    points: ["Ballistic fire control", "Compartment flooding", "Air-naval cooperation"],
  },
  {
    id: "realism",
    label: "Realism & Ballistics",
    Icon: Crosshair,
    title: "Simulation-grade physics",
    body: "Shell velocity, ricochet, spalling, fuse delay and post-penetration effects are all simulated — not rolled from a dice table. Choose Arcade, Realistic, or full Simulator battles.",
    points: ["Post-penetration modelling", "Three battle modes", "Historical vehicle research"],
  },
];

const STATS = [
  { value: 2000, suffix: "+", label: "Playable Vehicles" },
  { value: 100, suffix: "+", label: "Battle Maps" },
  { value: 70, suffix: "M+", label: "Registered Players" },
  { value: 3, suffix: "", label: "Battle Modes" },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setSeen(true);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const { ref, seen } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!seen) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1400, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, value]);

  return (
    <span ref={ref} className="font-display text-3xl text-foreground sm:text-4xl">
      {n.toLocaleString()}
      <span className="text-primary">{suffix}</span>
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-28 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="hud-label">Briefing · 01</p>
          <h2 className="mt-3 text-3xl font-bold uppercase sm:text-4xl">
            One battlefield, <span className="text-gradient-ember">three domains</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            War Thunder puts aircraft, armour and warships into the same battles, backed by physics
            detailed enough for simulator pilots and readable enough for a first sortie.
          </p>
        </div>

        <Tabs defaultValue="air" className="mt-10">
          <TabsList className="glass h-auto w-full flex-wrap justify-start gap-1 p-1.5">
            {FEATURES.map((f) => (
              <TabsTrigger
                key={f.id}
                value={f.id}
                className="gap-2 rounded-lg px-4 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <f.Icon className="size-4" /> {f.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {FEATURES.map((f) => (
            <TabsContent key={f.id} value={f.id} className="mt-6">
              <div className="glass animate-rise grid gap-6 rounded-2xl p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]">
                <div>
                  <span className="grid size-12 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                    <f.Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold">{f.title}</h3>
                  <p className="mt-3 text-muted-foreground">{f.body}</p>
                </div>
                <ul className="grid content-start gap-3">
                  {f.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-3 rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm"
                    >
                      <span className="size-1.5 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="glass mt-10 grid gap-6 rounded-2xl p-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <Counter value={s.value} suffix={s.suffix} />
              <p className="hud-label mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
