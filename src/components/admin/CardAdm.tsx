import { HiPlus, HiCurrencyDollar, HiCube } from "react-icons/hi";
import Card from "@/components/UI/Card";

export default function CardAdm() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      <Card
        title="Agregar Producto destacado"
        icon={<HiPlus />}
        onClick={() => alert("Agregar")}
        iconSize={32}
        width="w-60"
        height="h-40"
      />
      <Card
        title="Editar Producto"
        icon={<HiCube />}
        iconSize={32}
        width="w-60"
        height="h-40"
      />
      <Card
        title="Stock Total"
        value={120}
        icon={<HiCurrencyDollar />}
        width="w-60"
        height="h-40"
      />
      <Card title="Otra Acción" value="Info extra" width="w-60" height="h-40" />
    </div>
  );
}
