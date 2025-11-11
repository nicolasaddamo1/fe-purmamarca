"use client";

interface Props {
  color: string;
}

export default function ProductColorTag({ color }: Props) {
  // 🎨 Mapa extendido de colores
  const colorMap: Record<string, string> = {
    rojo: "#ef4444",
    "rojo vino": "#7f1d1d",
    "rojo oscuro": "#991b1b",
    verde: "#22c55e",
    "verde oscuro": "#14532d",
    "verde oliva": "#556b2f",
    azul: "#3b82f6",
    "azul marino": "#1e3a8a",
    "azul claro": "#93c5fd",
    celeste: "#38bdf8",
    gris: "#9ca3af",
    "gris claro": "#d1d5db",
    "gris oscuro": "#4b5563",
    negro: "#000000",
    blanco: "#f9fafb",
    marron: "#92400e",
    "marron claro": "#a16207",
    beige: "#f5f5dc",
    violeta: "#8b5cf6",
    lila: "#c084fc",
    rosa: "#ec4899",
    "rosa claro": "#f9a8d4",
    naranja: "#f97316",
    "naranja oscuro": "#ea580c",
    amarillo: "#facc15",
    "amarillo mostaza": "#ca8a04",
    dorado: "#d4af37",
    plateado: "#c0c0c0",
    cobre: "#b87333",
    turquesa: "#40e0d0",
    "verde agua": "#00ffff",
    "azul petróleo": "#006a71",
    lavanda: "#b57edc",
  };

  // 🔹 Normaliza y separa los colores si hay varios
  const parseColors = (input: string) => {
    return input
      .toLowerCase()
      .split(/,|y|\/|-/)
      .map((c) => c.trim())
      .filter(Boolean);
  };

  // 🔸 Devuelve el valor HEX o similar
  const getColorValue = (name: string): string => {
    if (/^#([0-9A-F]{3}){1,2}$/i.test(name) || /^rgb|hsl|var|--/.test(name)) {
      return name;
    }
    return colorMap[name.replace(/\s+/g, "")] || colorMap[name] || "#d4d4d4";
  };

  const colors = parseColors(color).map(getColorValue);

  return (
    <div className="flex items-center gap-3 bg-white hover:bg-neutral-50 shadow-sm px-4 py-2 rounded-md transition-colors">
      <span className="font-semibold text-neutral-800 text-sm">Color:</span>

      {/* 🔸 Indicadores visuales */}
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
