"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/app/axios/categoriasApi";
import { getAllProducts } from "@/app/axios/ProductosApi";

/* Types */
type Category = { id: string; name: string; categoryImage?: string };
type Product = {
  id: string;
  name: string;
  price: number;
  imgs: string[];
  rating?: number;
  // backend puede devolver categoryId o un objeto category {id,name}
  categoryId?: string;
  category?: { id?: string; name?: string } | string;
};

/* Skeletons */
function CategoryPillSkeleton() {
  return (
    <div className="bg-gray-200 px-8 py-2 rounded-full w-28 h-8 animate-pulse" />
  );
}
function ProductCardSkeleton() {
  return (
    <div className="border border-secondary/40 rounded-md overflow-hidden">
      <div className="relative bg-gray-200 w-full aspect-[4/3] animate-pulse" />
      <div className="space-y-2 p-4 border-secondary/30 border-t">
        <div className="bg-gray-200 rounded w-2/3 h-3 animate-pulse" />
        <div className="bg-gray-200 rounded w-1/2 h-4 animate-pulse" />
        <div className="bg-gray-200 rounded w-1/4 h-3 animate-pulse" />
      </div>
    </div>
  );
}

/* UI subcomponents (respetando estilos que tenías) */
function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-4 py-2 rounded-full text-base md:text-lg",
        "border transition-colors",
        active
          ? "bg-primary text-white border-primary"
          : "text-secondary border-secondary/40 bg-white/40 hover:bg-secondary/10",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function Rating({ value, textColor }: { value: number; textColor: string }) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {Array.from({ length: full }).map((_, i) => (
          <span key={i} className={`text-lg leading-none ${textColor}`}>
            ★
          </span>
        ))}
        {hasHalf && (
          <span className={`text-lg leading-none ${textColor}`}>☆</span>
        )}
      </div>
      <span className={`text-sm ${textColor}`}>{value.toFixed(1)}</span>
    </div>
  );
}

function ProductCard({ p, index }: { p: Product; index: number }) {
  const isSecondRow = index >= 3;
  const textColor = isSecondRow ? "text-primary" : "text-secondary";

  return (
    <div className="border border-secondary/40 rounded-md overflow-hidden">
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={p.imgs?.[0] || "/placeholder.jpg"}
          alt={p.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 border-secondary/30 border-t">
        <p className={`text-xs uppercase tracking-widest mb-1 ${textColor}`}>
          {p.name}
        </p>
        <p className={`text-sm mb-2 ${textColor}`}>${p.price}</p>
        <Rating value={p.rating || 0} textColor={textColor} />
      </div>
    </div>
  );
}

/* Main */
export default function ProductsSection() {
  const [cats, setCats] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [catsFromApi, prodsFromApi] = await Promise.all([
          getAllCategories(),
          getAllProducts(),
        ]);
        // catsFromApi assumed: [{id,name,...}, ...]
        setCats(catsFromApi);
        setProducts(prodsFromApi);
      } catch (err) {
        console.error("Error cargando datos:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Para mostrar "Todos" + las categorías reales
  const categoriesForUI = [{ id: "all", name: "Todos" }, ...cats];

  // Filtrado robusto: compara categoryId, category.id o category.name
  const filteredProducts = products
    .filter((p) => {
      if (activeCategoryId === "all") return true;
      // product may have categoryId field:
      if ((p as any).categoryId && (p as any).categoryId === activeCategoryId)
        return true;
      // product may have category object or string
      const catObj = p.category;
      if (typeof catObj === "string") {
        // compare by name
        const catName = catObj;
        const activeName = categoriesForUI.find(
          (c) => c.id === activeCategoryId
        )?.name;
        return activeName ? catName === activeName : false;
      } else if (catObj && typeof catObj === "object") {
        return (
          (catObj as any).id === activeCategoryId ||
          (catObj as any).name ===
            categoriesForUI.find((c) => c.id === activeCategoryId)?.name
        );
      }
      return false;
    })
    .slice(0, 6);

  return (
    <section className="px-6 md:px-12 py-14">
      <div className="mx-auto max-w-[1400px]">
        <div className="items-start gap-10 lg:gap-14 grid grid-cols-1 lg:grid-cols-2">
          {/* Left column */}
          <div>
            <p className="text-secondary text-lg md:text-xl">
              Todos los productos
            </p>
            <h2 className="mt-3 font-semibold text-primary text-4xl md:text-6xl leading-[1.1]">
              {activeCategoryId === "all"
                ? "Todos"
                : categoriesForUI.find((c) => c.id === activeCategoryId)?.name}
            </h2>

            <div className="flex flex-wrap gap-3 mt-6">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <CategoryPillSkeleton key={i} />
                  ))
                : categoriesForUI.map((c) => (
                    <CategoryPill
                      key={c.id}
                      label={c.name}
                      active={activeCategoryId === c.id}
                      onClick={() => setActiveCategoryId(c.id)}
                    />
                  ))}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-8">
            <div className="gap-6 lg:gap-8 grid grid-cols-2 md:grid-cols-3">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))
                : filteredProducts.map((p, i) => (
                    <ProductCard key={p.id} p={p} index={i} />
                  ))}
            </div>

            {!loading && (
              <div>
                <button className="inline-flex items-center gap-2 hover:bg-secondary px-6 py-3 border border-secondary/60 rounded-md text-secondary hover:text-white transition">
                  Comprar ahora →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
