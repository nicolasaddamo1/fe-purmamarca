import BandaDeco from "./BandaDeco";

const AboutUs = () => {
  return (
    <>
      <section className="relative md:px-30 py-20">
        <div className="flex md:flex-row flex-col items-start gap-10 md:gap-50 mx-auto px-4 container">
          <div className="text-left">
            <h4 className="mb-2 text-chocolate/90 text-2xl">Sobre nosotros</h4>
            <h1 className="font-bold text-primary/90 text-3xl md:text-5xl leading-tight">
              Distribuidora
            </h1>
            <h1 className="font-bold text-primary/90 text-4xl md:text-5xl leading-tight">
              Purmamarca
            </h1>
          </div>

          <div className="space-y-4 text-gray-700 md:text-sm text-lg text-left leading-relaxed">
            <p>
              Purmamarca Holística & Decoración es tu distribuidora mayorista de
              confianza para negocios. Ofrecemos una amplia gama de velas,
              budas, sahumerios, esencias y accesorios decorativos con precios
              especiales por volumen y stock constante.
            </p>
            <p className="hidden md:inline">
              Trabajamos directamente con fabricantes locales y talleres
              artesanales para asegurar calidad, continuidad en el suministro y
              precios competitivos que te permitan ampliar tu oferta y maximizar
              tus márgenes.
            </p>
            <p className="hidden md:inline">
              Nuestro compromiso es ser un proveedor estable y confiable:
              reposiciones ágiles, líneas exclusivas para distribuidores y
              flexibilidad para que tu negocio crezca junto con nosotros.
            </p>
          </div>
        </div>

        <div className="bottom-0 left-0 absolute border-gray-300 border-b w-full"></div>
      </section>

      <section className="flex justify-center items-center">
        <BandaDeco />
      </section>
    </>
  );
};

export default AboutUs;
