"use client";
import CardAdm from "@/components/admin/CardAdm";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-semibold text-primary/90 text-4xl">Hola, Natalia</h1>
      <p className="flex justify-center font-semibold text-chocolate/60 text-2xl text-center">
        Que deseas hacer hoy? .
      </p>
      <CardAdm />
    </div>
  );
}
