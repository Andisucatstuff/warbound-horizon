import { Star, Quote, BadgeCheck } from "lucide-react";

const REVIEWS = [
  {
    name: "Falkenjager",
    tag: "Steam · 1,240 hrs",
    stars: 5,
    initials: "FJ",
    text: "The flight models are on another level for a free game. Learning energy fighting in a Bf 109 completely changed how I play air battles.",
  },
  {
    name: "SteelHullSam",
    tag: "Steam · 860 hrs",
    stars: 5,
    initials: "SS",
    text: "Armour angling actually matters. Bouncing a shell off a sloped plate and returning fire never stops being satisfying.",
  },
  {
    name: "TorpedoTasha",
    tag: "Steam · 430 hrs",
    stars: 4,
    initials: "TT",
    text: "Naval takes patience but the fire control and flooding mechanics are unmatched. Coastal boats are pure adrenaline.",
  },
  {
    name: "GunnerVIK",
    tag: "Steam · 2,105 hrs",
    stars: 5,
    initials: "GV",
    text: "Combined arms in Realistic Battles is the highlight — calling in a strike aircraft while your squad pushes armour is unreal.",
  },
  {
    name: "Nightowl_77",
    tag: "Steam · 310 hrs",
    stars: 4,
    initials: "N7",
    text: "Massive vehicle tree, gorgeous maps and the ballistics rabbit hole is deep. Take it slow at low ranks and it clicks.",
  },
  {
    name: "AceOfClubs",
    tag: "Steam · 1,675 hrs",
    stars: 5,
    initials: "AC",
    text: "Simulator battles with a HOTAS are the closest thing to a study sim I can jump into for twenty minutes after work.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-28 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="hud-label">Briefing · 03</p>
            <h2 className="mt-3 text-3xl font-bold uppercase sm:text-4xl">
              From the <span className="text-gradient-ember">front line</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              What players say after hundreds of hours in the cockpit, the turret and the bridge.
            </p>
          </div>
          <div className="glass rounded-2xl px-5 py-4 text-center">
            <p className="font-display text-3xl">4.6</p>
            <div className="mt-1 flex justify-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-primary text-primary" />
              ))}
            </div>
            <p className="hud-label mt-2">Player rating</p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              className="glass group relative overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <Quote className="absolute right-5 top-5 size-8 text-accent/25" />
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-accent/15 font-display text-sm text-accent ring-1 ring-accent/40">
                  {r.initials}
                </span>
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-semibold">
                    {r.name}
                    <BadgeCheck className="size-3.5 text-accent" />
                  </p>
                  <p className="hud-label">{r.tag}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < r.stars ? "size-4 fill-primary text-primary" : "size-4 text-muted"
                    }
                  />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              <span className="mt-4 inline-flex rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 text-[0.65rem] uppercase tracking-widest text-primary">
                Recommended
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
