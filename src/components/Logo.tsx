const GEAR =
  "M594.92,272.15 A159.6,159.6 0 0 0 549.94,252.01 L541.20,214.84 Q539.82,209.00 533.82,209.00 L482.18,209.00 Q476.18,209.00 474.80,214.84 L466.06,252.01 A159.6,159.6 0 0 0 428.77,267.45 L396.30,247.36 Q391.20,244.20 386.96,248.44 L350.44,284.96 Q346.20,289.20 349.36,294.30 L369.45,326.77 A159.6,159.6 0 0 0 354.01,364.06 L316.84,372.80 Q311.00,374.18 311.00,380.18 L311.00,431.82 Q311.00,437.82 316.84,439.20 L354.01,447.94 A159.6,159.6 0 0 0 369.45,485.23 L349.36,517.70 Q346.20,522.80 350.44,527.04 L386.96,563.56 Q391.20,567.80 396.30,564.64 L428.77,544.55 A159.6,159.6 0 0 0 466.06,559.99 L474.80,597.16 Q476.18,603.00 482.18,603.00 L533.82,603.00 Q539.82,603.00 541.20,597.16 L549.94,559.99 A159.6,159.6 0 0 0 594.92,539.85 L569.27,500.35 A112.5,112.5 0 1 1 569.27,311.65 Z";

const NODES: [number, number][] = [
  [487, 358.3],
  [639.3, 283],
  [684.2, 354.2],
  [487, 453.9],
  [639.3, 527.5],
];

const TRACES = [
  "M507,358.3 L564.00,358.3 L625.16,297.14",
  "M522,406 L632.40,406 L670.06,368.34",
  "M507,453.9 L565.70,453.9 L625.16,513.36",
];

const COLORS = {
  light: { left: "#1D3E85", right: "#152E68", line: "#152E68" },
  dark: { left: "#FFFFFF", right: "#C9D3E3", line: "#FFFFFF" },
};

type Variant = keyof typeof COLORS;

export function LogoMark({
  variant = "light",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const c = COLORS[variant];
  const clipId = `mecavon-der-${variant}`;
  return (
    <svg viewBox="300 200 410 412" className={className} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <rect x="509" y="150" width="600" height="500" />
        </clipPath>
      </defs>
      <path d={GEAR} fill={c.left} />
      <path d={GEAR} fill={c.right} clipPath={`url(#${clipId})`} />
      {NODES.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="20" fill="none" stroke={c.line} strokeWidth="17" />
      ))}
      {TRACES.map((d) => (
        <path key={d} d={d} fill="none" stroke={c.line} strokeWidth="20.5" />
      ))}
    </svg>
  );
}

export function Logo({ variant = "light" }: { variant?: Variant }) {
  const dark = variant === "dark";
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark variant={variant} className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`text-lg font-bold tracking-[0.06em] ${dark ? "text-white" : "text-navy"}`}>
          MECAVON
        </span>{" "}
        <span
          className={`mt-1 text-[0.58rem] font-semibold tracking-[0.42em] ${dark ? "text-mist" : "text-graphite"}`}
        >
          SYSTEMS
        </span>
      </span>
    </span>
  );
}
