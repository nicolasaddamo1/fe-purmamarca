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
              Nosotros somos una empresa familiar dedicada a la fabricación y
              distribución de artículos de decoración holística y bienestar.
              Nuestra empresa comenzó en el año 2020 y desde entonces crecemos
              todo el tiempo junto a nuestros clientes.
            </p>
            <p className="hidden md:inline">
              Tenemos los mejores precios que te van a permitir ganar como
              mínimo el doble de lo invertido.
            </p>
            <p className="hidden md:inline">
              El secreto de nuestro negocio es la dedicación y la pasión que le
              ponemos todos los días. Sean bienvenidos a nuestra familia de
              clientes.
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
