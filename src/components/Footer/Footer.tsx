// components/Footer.tsx
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-app border-t border-secondary text-maroon">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* Columna 1 - Logo y horarios */}
        <div className="flex items-start gap-4 md:col-span-1">
          <Image
            src="/logopurma.png"
            alt="Purmamamarca Logo"
            width={120}
            height={120}
            className="flex-shrink-0 mt-2.5"
          />
          <div className="flex flex-col  justify-center text-left">
          <h2 className="text-lg font-semibold text-maroon">Purmamarca</h2>
          <p className="text-secondary text-sm">Distribuidora</p>
          <p className="text-secondary mt-2 text-sm">Horarios</p>
          <p className="text-secondary text-sm">Lunes a viernes:</p>
          <p className="text-secondary text-sm">De 9 a 12 hs</p>
          <p className="text-secondary text-sm">De 14 a 18 hs</p>
          </div>
        </div>

        {/* Columna 2 - Productos */}
        <div className="self-center text-center md:text-left">
          <h2 className="text-lg font-semibold text-secondary">Productos</h2>
          <ul className="mt-2 space-y-1">
            <li className="text-maroon">Velas</li>
            <li className="text-maroon">Sahumerios</li>
            <li className="text-maroon">Lamparas</li>
            <li className="text-maroon">Estatuas</li>
          </ul>
        </div>

        {/* Columna 3 - Ayuda */}
        <div className="self-center text-center md:text-left">
          <h2 className="text-lg font-semibold text-secondary">Ayuda</h2>
          <ul className="mt-2 space-y-1">
            <li className="text-maroon">FAQ</li>
            <li className="text-maroon">Envíos y Retorno</li>
            <li className="text-maroon">Contacto</li>
            <li className="text-maroon">...</li>
          </ul>
        </div>

        {/* Columna 4 - Llegamos A */}
        <div className="self-center text-center md:text-left">
          <h2 className="text-lg font-semibold text-secondary">Llegamos a</h2>
          <ul className="mt-2 space-y-1">
            <li className="text-maroon">TODO</li>
            <li className="text-maroon">EL</li>
            <li className="text-maroon">PAÍS</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}