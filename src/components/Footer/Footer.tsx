"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function FooterMinimal() {
  return (
    <footer className="relative bg-primary/10 pt-6 text-white">
      <div className="bg-primary/40 py-3 overflow-hidden"></div>

      <div className="gap-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto px-6 py-12 max-w-6xl md:text-left text-center">
        <div>
          <h3 className="font-semibold text-primary text-xl">Horarios</h3>
          <div className="space-y-1 mt-3 text-maroon text-sm">
            <p>Lunes a viernes</p>
            <p>9 a 12 hs</p>
            <p>14 a 18 hs</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-primary text-xl">Envíos por</h3>
          <ul className="space-y-2 mt-3 text-maroon text-sm">
            <li className="hover:text-primary transition cursor-pointer">
              Traansporte
            </li>
            <li className="hover:text-primary transition cursor-pointer">
              Traansporte
            </li>
            <li className="hover:text-primary transition cursor-pointer">
              Traansporte
            </li>
            <li>…</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-primary text-xl">Redes Sociales</h3>
          <div className="flex justify-center md:justify-start gap-5 mt-4 text-3xl">
            <Link
              href="https://www.instagram.com/purmamarca_dustribuidora?igsh=dDR4Zjh0ZmllNXJi"
              target="_blank"
            >
              <FaInstagram className="text-chocolate hover:text-primary transition" />
            </Link>
            <Link
              href="https://www.facebook.com/share/1CApiSuDLx/"
              target="_blank"
            >
              <FaFacebook className="text-chocolate hover:text-primary transition" />
            </Link>
            <Link
              href="https://www.tiktok.com/@purmamarca_distri?_t=ZM-90ndM9THf9H&_r=1"
              target="_blank"
            >
              <FaTiktok className="text-chocolate hover:text-primary transition" />
            </Link>
            <Link href="https://wa.me/c/5491133324141" target="_blank">
              <FaWhatsapp className="text-chocolate hover:text-primary transition" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <h3 className="font-semibold text-primary text-xl">
            Llegamos a todo el país
          </h3>

          <Link href="/login" className="mt-4">
            <Image
              src="/purm.png"
              alt="Purmamarca Logo"
              width={95}
              height={95}
              className="drop-shadow-md"
            />
          </Link>
          <Link
            href="https://www.google.com/maps?q=Bonifacini+1651,+San+Mart%C3%ADn,+Buenos+Aires,+Argentina"
            target="_blank"
            className="flex items-center gap-2 mt-2 font-medium text-maroon hover:text-primary text-sm transition"
          >
            <FaMapMarkerAlt className="text-chocolate text-lg translate-y-[-11px]" />
            <span className="text-primary hover:text-chocolate text-xs">
              Bonifacini 1651, San Martín, Buenos Aires
            </span>
          </Link>
        </div>
      </div>

      <div className="bg-primary/30 py-4 text-primary text-sm text-center">
        © {new Date().getFullYear()} Purmamarca — Desarrollado por{" "}
        <Link href={process.env.NEXT_PUBLIC_RAVMERN_URL ?? "#"} target="_blank">
          <span className="font-semibold text-primary hover:text-chocolate">
            Ravmern
          </span>
        </Link>
      </div>
    </footer>
  );
}
