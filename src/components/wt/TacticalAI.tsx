import { useEffect, useRef, useState } from "react";
import { Send, Radio, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "ai"; text: string };

const QUICK = ["Best starter tank?", "Air Combat Tips", "System Requirements"];

const KB: { match: RegExp; reply: string }[] = [
  {
    match: /starter tank|best tank|begin|first tank/i,
    reply:
      "Recommended starting armour:\n\n• USA — M2A4: fast, great gun handling, strong for rank I.\n• Germany — Pz.III B: good gun, decent mobility.\n• USSR — T-26: tough for its rank, plenty of HE.\n\nTip: stay at low ranks until you can reliably angle your hull and aim for turret rings and lower plates. Play Realistic Battles for cleaner engagement ranges and better rewards per match.",
  },
  {
    match: /air|plane|dogfight|flight|jet/i,
    reply:
      "Air combat fundamentals:\n\n1. Energy is life — never turn-fight a lighter aircraft. Climb above the fight and dive.\n2. Lead your target: aim where it will be, set convergence to ~400m.\n3. Fire in short bursts to keep guns cool and ammo in reserve.\n4. Use rudder to fine-tune aim; flaps only in low-speed turn fights.\n5. Extend and re-climb after every pass — the winner is usually the pilot with altitude left.",
  },
  {
    match: /system requirement|spec|pc|hardware|run/i,
    reply:
      "System requirements (approximate):\n\nMINIMUM — Windows 10 64-bit, dual-core 2.2GHz, 4GB RAM, GeForce GTX 660 / Radeon HD 7870, 25GB free.\nRECOMMENDED — Windows 10/11 64-bit, quad-core 3.0GHz+, 16GB RAM, GeForce RTX 2060 / RX 5600 XT, SSD with 95GB free.\n\nFull specs are also listed in the Download section below.",
  },
  {
    match: /naval|ship|boat|torpedo/i,
    reply:
      "Naval tips: start with coastal boats to learn lead and torpedo timing. Use the ballistic indicator, fire at 3-5km for cruisers, and turn broadside only when trading with weaker armour. Watch flooding — repair critical compartments first.",
  },
  {
    match: /grind|research|rp|silver|lion/i,
    reply:
      "Progression advice: focus one nation and one class first. Keep three vehicles of similar rank in your lineup to stay in a match, and complete daily/battle tasks for boosters. Talismans on a vehicle you enjoy beat spreading premium time thinly.",
  },
];

const FALLBACK =
  "Copy that. I can brief you on air combat tactics, armour and ballistics, naval gunnery, vehicle progression, battle modes, or PC requirements — pick a topic and I'll go deeper.";

export function TacticalAI() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "WT TACTICAL AI online. Ask me about vehicles, tactics, ballistics or system specs — or tap a quick briefing below.",
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [typed, setTyped] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typed]);

  const ask = (question: string) => {
    if (!question.trim() || streaming) return;
    const reply = KB.find((k) => k.match.test(question))?.reply ?? FALLBACK;
    setMessages((m) => [...m, { role: "user", text: question.trim() }]);
    setInput("");
    setStreaming(true);
    setTyped("");

    const words = reply.split(" ");
    words.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => setTyped(words.slice(0, i + 1).join(" ")), 260 + i * 22),
      );
    });
    timers.current.push(
      setTimeout(() => {
        setMessages((m) => [...m, { role: "ai", text: reply }]);
        setTyped("");
        setStreaming(false);
      }, 320 + words.length * 22),
    );
  };

  return (
    <section id="assistant" className="scroll-mt-28 px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <p className="hud-label">Briefing · 02</p>
          <h2 className="mt-3 text-3xl font-bold uppercase sm:text-4xl">
            WT <span className="text-gradient-ember">Tactical AI</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Your in-hangar advisor. Ask for a starter lineup, gunnery drills, or the specs your rig
            needs before you queue up. Responses stream in like a live comms channel.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["Vehicle advice", "Lineups by nation and rank"],
              ["Gunnery drills", "Lead, convergence, weak spots"],
              ["Mode breakdown", "Arcade / Realistic / Sim"],
              ["Rig check", "Minimum and recommended specs"],
            ].map(([t, d]) => (
              <div key={t} className="glass rounded-xl p-4">
                <p className="text-sm font-semibold">{t}</p>
                <p className="mt-1 text-xs text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-strong flex h-[32rem] flex-col overflow-hidden rounded-3xl">
          <div className="flex items-center gap-3 border-b border-border px-5 py-3.5">
            <span className="grid size-9 place-items-center rounded-lg bg-accent/15 text-accent ring-1 ring-accent/40">
              <Radio className="size-4" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold">WT Tactical AI</p>
              <p className="hud-label">Secure channel · Online</p>
            </div>
            <span className="size-2 animate-pulse rounded-full bg-accent" />
          </div>

          <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} text={m.text} />
            ))}
            {streaming && (
              <Bubble role="ai" text={typed || "…"} pending />
            )}
          </div>

          <div className="border-t border-border px-4 py-3">
            <div className="flex flex-wrap gap-2 pb-3">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => ask(q)}
                  disabled={streaming}
                  className="inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-accent/20 disabled:opacity-50"
                >
                  <Sparkle className="size-3" /> {q}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Request a tactical briefing…"
                className="h-11 flex-1 rounded-xl border border-input bg-secondary/40 px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-accent/60"
              />
              <Button type="submit" size="icon" className="size-11 rounded-xl" disabled={streaming}>
                <Send className="size-4" />
              </Button>
            </form>
            <p className="mt-2 text-[0.65rem] text-muted-foreground">
              Simulated assistant for this fan-made demo. Not affiliated with Gaijin Entertainment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bubble({ role, text, pending }: { role: "user" | "ai"; text: string; pending?: boolean }) {
  const isUser = role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap text-sm leading-relaxed",
          isUser
            ? "rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-primary-foreground"
            : "text-foreground",
        )}
      >
        {!isUser && <span className="hud-label mb-1 block">Tactical AI</span>}
        {text}
        {pending && <span className="ml-1 inline-block h-4 w-1.5 animate-pulse bg-accent align-middle" />}
      </div>
    </div>
  );
}
