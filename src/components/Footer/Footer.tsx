"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-app border-secondary border-t text-maroon">
      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mx-auto px-6 py-10 max-w-7xl md:text-left text-center">
        {/* Columna 1 */}
        <div className="flex items-start gap-4 md:col-span-1">
          <Link href="/login">
            <Image
              src="/logopurma.png"
              alt="Purmamamarca Logo"
              width={120}
              height={120}
              className="flex-shrink-0 mt-2.5"
            />
          </Link>

          <div className="flex flex-col justify-center text-left">
            <h2 className="font-semibold text-maroon text-lg">Purmamarca</h2>
            <p className="text-secondary text-sm">Distribuidora</p>
            <p className="mt-2 text-secondary text-sm">Horarios</p>
            <p className="text-secondary text-sm">Lunes a viernes:</p>
            <p className="text-secondary text-sm">De 9 a 12 hs</p>
            <p className="text-secondary text-sm">De 14 a 18 hs</p>
          </div>
        </div>

        {/* Columna 2 */}
        <div className="self-center md:text-left text-center">
          <h2 className="font-semibold text-secondary text-lg">Productos</h2>
          <ul className="space-y-1 mt-2">
            <li className="text-maroon">Velas</li>
            <li className="text-maroon">Sahumerios</li>
            <li className="text-maroon">Lamparas</li>
            <li className="text-maroon">Estatuas</li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div className="self-center md:text-left text-center">
          <h2 className="font-semibold text-secondary text-lg">Ayuda</h2>
          <ul className="space-y-1 mt-2">
            <li className="text-maroon">FAQ</li>
            <li className="text-maroon">Envíos y Retorno</li>
            <li className="text-maroon">Contacto</li>
            <li className="text-maroon">...</li>
          </ul>
        </div>

        {/* Columna 4 */}
        <div className="self-center md:text-left text-center">
          <h2 className="font-semibold text-secondary text-lg">Llegamos a</h2>
          <ul className="space-y-1 mt-2">
            <li className="text-maroon">TODO</li>
            <li className="text-maroon">EL</li>
            <li className="text-maroon">PAÍS</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
