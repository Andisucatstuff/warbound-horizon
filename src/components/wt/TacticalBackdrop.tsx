export function TacticalBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="tactical-grid absolute inset-0 opacity-40" />
      <div className="scanlines absolute inset-0 opacity-30" />
      {/* drifting atmospheric glows */}
      <div className="animate-drift absolute -left-40 top-[-10%] size-[46rem] rounded-full bg-accent/12 blur-[140px]" />
      <div
        className="animate-drift absolute -right-52 top-[35%] size-[40rem] rounded-full bg-primary/12 blur-[150px]"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="animate-drift absolute bottom-[-15%] left-1/3 size-[38rem] rounded-full bg-accent/10 blur-[160px]"
        style={{ animationDelay: "-16s" }}
      />
      {/* radar sweep */}
      <div className="absolute -bottom-64 -right-64 size-[34rem] rounded-full border border-accent/20">
        <div className="radar-sweep absolute inset-0 rounded-full opacity-40" />
      </div>
      {/* tracer streaks */}
      {[0, 2.4, 4.8].map((d, i) => (
        <div
          key={d}
          className="animate-tracer absolute h-px w-40 bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{ animationDelay: `${d}s`, top: `${18 + i * 26}%` }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_100%)]" />
    </div>
  );
}
