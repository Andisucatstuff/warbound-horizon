import { Download, Monitor, HardDrive, Cpu, MemoryStick } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const STEAM_URL = "https://store.steampowered.com/app/236390/War_Thunder/";

const SPECS = [
  {
    id: "min",
    title: "Minimum requirements",
    rows: [
      ["OS", "Windows 10 (64-bit)", Monitor],
      ["Processor", "Dual-core 2.2 GHz", Cpu],
      ["Memory", "4 GB RAM", MemoryStick],
      ["Graphics", "GeForce GTX 660 / Radeon HD 7870", Monitor],
      ["Storage", "25 GB available space", HardDrive],
    ] as const,
  },
  {
    id: "rec",
    title: "Recommended requirements",
    rows: [
      ["OS", "Windows 10 / 11 (64-bit)", Monitor],
      ["Processor", "Quad-core 3.0 GHz or better", Cpu],
      ["Memory", "16 GB RAM", MemoryStick],
      ["Graphics", "GeForce RTX 2060 / Radeon RX 5600 XT", Monitor],
      ["Storage", "95 GB on SSD", HardDrive],
    ] as const,
  },
];

export function DownloadCTA() {
  return (
    <section id="download" className="scroll-mt-28 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="glass-strong relative overflow-hidden rounded-3xl p-8 text-center sm:p-14">
          <div className="tactical-grid absolute inset-0 opacity-30" />
          <div className="absolute -left-20 top-0 size-72 rounded-full bg-primary/20 blur-[110px]" />
          <div className="absolute -right-20 bottom-0 size-72 rounded-full bg-accent/20 blur-[110px]" />
          <div className="relative">
            <p className="hud-label">Deployment</p>
            <h2 className="mt-3 text-3xl font-bold uppercase sm:text-5xl">
              Ready for <span className="text-gradient-ember">battle?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Free to play. Thousands of vehicles across air, ground and sea. Pick a nation and take
              your first sortie today.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-13 px-8 text-base font-semibold shadow-[var(--shadow-ember)]"
            >
              <a href={STEAM_URL} target="_blank" rel="noreferrer noopener">
                <Download className="size-5" /> Download on Steam
              </a>
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
              Opens the official War Thunder page on Steam.
            </p>
          </div>
        </div>

        <div className="glass mt-8 rounded-2xl p-6 sm:p-8">
          <p className="hud-label">System requirements</p>
          <Accordion type="single" collapsible defaultValue="min" className="mt-4">
            {SPECS.map((s) => (
              <AccordionItem key={s.id} value={s.id} className="border-border">
                <AccordionTrigger className="text-base font-semibold hover:text-primary">
                  {s.title}
                </AccordionTrigger>
                <AccordionContent>
                  <dl className="grid gap-2 pt-1">
                    {s.rows.map(([k, v, Icon]) => (
                      <div
                        key={k}
                        className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-secondary/30 px-4 py-3"
                      >
                        <Icon className="size-4 text-accent" />
                        <dt className="hud-label w-24">{k}</dt>
                        <dd className="text-sm text-foreground">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
