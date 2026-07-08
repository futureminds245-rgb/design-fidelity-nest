// Dot-matrix numeral renderer — 5 wide x 7 tall grid of dots per glyph
// Matches the reference dashboard's stencil/dot numeric readouts.

const GLYPHS: Record<string, string[]> = {
  "0": [
    " XXX ",
    "X   X",
    "X   X",
    "X   X",
    "X   X",
    "X   X",
    " XXX ",
  ],
  "1": [
    "  X  ",
    " XX  ",
    "  X  ",
    "  X  ",
    "  X  ",
    "  X  ",
    " XXX ",
  ],
  "2": [
    " XXX ",
    "X   X",
    "    X",
    "   X ",
    "  X  ",
    " X   ",
    "XXXXX",
  ],
  "3": [
    " XXX ",
    "X   X",
    "    X",
    "  XX ",
    "    X",
    "X   X",
    " XXX ",
  ],
  "4": [
    "   X ",
    "  XX ",
    " X X ",
    "X  X ",
    "XXXXX",
    "   X ",
    "   X ",
  ],
  "5": [
    "XXXXX",
    "X    ",
    "XXXX ",
    "    X",
    "    X",
    "X   X",
    " XXX ",
  ],
  "6": [
    " XXX ",
    "X   X",
    "X    ",
    "XXXX ",
    "X   X",
    "X   X",
    " XXX ",
  ],
  "7": [
    "XXXXX",
    "    X",
    "   X ",
    "  X  ",
    "  X  ",
    " X   ",
    " X   ",
  ],
  "8": [
    " XXX ",
    "X   X",
    "X   X",
    " XXX ",
    "X   X",
    "X   X",
    " XXX ",
  ],
  "9": [
    " XXX ",
    "X   X",
    "X   X",
    " XXXX",
    "    X",
    "X   X",
    " XXX ",
  ],
  "-": [
    "     ",
    "     ",
    "     ",
    " XXX ",
    "     ",
    "     ",
    "     ",
  ],
  ".": [
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "  X  ",
    "  X  ",
  ],
};

interface Props {
  value: string | number;
  size?: number; // dot diameter in px
  gap?: number; // gap between dots in px (also between chars)
  color?: string;
  className?: string;
}

export function DotDigits({
  value,
  size = 4,
  gap = 2,
  color = "currentColor",
  className,
}: Props) {
  const str = String(value);
  const cell = size + gap;
  const glyphWidth = 5 * cell;
  const glyphHeight = 7 * cell;
  const charGap = cell;
  const totalWidth =
    str.length * glyphWidth + Math.max(0, str.length - 1) * charGap;

  const circles: React.ReactElement[] = [];
  str.split("").forEach((ch, idx) => {
    const glyph = GLYPHS[ch];
    if (!glyph) return;
    const offsetX = idx * (glyphWidth + charGap);
    glyph.forEach((row, ry) => {
      row.split("").forEach((c, rx) => {
        if (c === "X") {
          circles.push(
            <circle
              key={`${idx}-${ry}-${rx}`}
              cx={offsetX + rx * cell + size / 2}
              cy={ry * cell + size / 2}
              r={size / 2}
              fill={color}
            />,
          );
        }
      });
    });
  });

  return (
    <svg
      className={className}
      width={totalWidth}
      height={glyphHeight}
      viewBox={`0 0 ${totalWidth} ${glyphHeight}`}
      aria-label={str}
      role="img"
    >
      {circles}
    </svg>
  );
}
