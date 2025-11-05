"use client";

interface Props {
  color: string;
}

export default function ProductColorTag({ color }: Props) {
  // Mapa base de colores
  const colorMap: Record<string, string> = {
    rojo: "#ef4444",
    verde: "#22c55e",
    azul: "#3b82f6",
    celeste: "#38bdf8",
    gris: "#9ca3af",
    negro: "#000000",
    blanco: "#f9fafb",
    marron: "#92400e",
    beige: "#f5f5dc",
    violeta: "#8b5cf6",
    rosa: "#ec4899",
    naranja: "#f97316",
    amarillo: "#facc15",
  };

  // 🔹 Normaliza y separa los colores si hay varios
  const parseColors = (input: string) => {
    return input
      .toLowerCase()
      .split(/,|y|\/|-/)
      .map((c) => c.trim())
      .filter(Boolean);
  };

  const getColorValue = (name: string): string => {
    if (/^#([0-9A-F]{3}){1,2}$/i.test(name) || /^rgb|hsl|var|--/.test(name)) {
      return name;
    }
    return colorMap[name.replace(/\s+/g, "")] || "#d4d4d4";
  };

  const colors = parseColors(color).map(getColorValue);

  return (
    <div className="flex items-center gap-3 bg-white hover:bg-neutral-50 shadow-sm px-4 py-2 rounded-md transition-colors">
      <span className="font-semibold text-neutral-800 text-sm">Color:</span>

      {/* Indicadores visuales */}
      <div className="flex items-center gap-1">
        {colors.length === 1 ? (
          <span
            className="inline-block shadow-sm border border-neutral-300 rounded-full w-5 h-5"
            style={{ backgroundColor: colors[0] }}
          />
        ) : colors.length === 2 ? (
          <span
            className="inline-block shadow-sm border border-neutral-300 rounded-full w-5 h-5"
            style={{
              background: `linear-gradient(90deg, ${colors[0]} 50%, ${colors[1]} 50%)`,
            }}
          />
        ) : (
          colors.map((clr, idx) => (
            <span
              key={idx}
              className="inline-block shadow-sm border border-neutral-300 rounded-full w-4 h-4"
              style={{ backgroundColor: clr }}
            />
          ))
        )}
      </div>

      <span className="text-neutral-600 text-sm capitalize">{color}</span>
    </div>
  );
}
