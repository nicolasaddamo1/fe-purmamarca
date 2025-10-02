import BandaDeco from "./BandaDeco";

const AboutUs = () => {
  return (
    <>
      <section className="relative md:px-30 py-20">
        <div className="flex md:flex-row flex-col items-start gap-10 md:gap-50 mx-auto px-4 container">
          <div className="text-left">
            <h4 className="mb-2 text-secondary text-2xl">Sobre nosotros</h4>
            <h1 className="font-bold text-maroon text-3xl md:text-5xl leading-tight">
              Distribuidora
            </h1>
            <h1 className="font-bold text-maroon text-4xl md:text-5xl leading-tight">
              Purmamarca
            </h1>
          </div>

          <div className="space-y-4 text-gray-700 md:text-sm text-lg text-left leading-relaxed">
            <p>
              Distribuidora Purmamarca es una empresa comprometida con llevar a
              cada hogar productos naturales de alta calidad, inspirados en la
              riqueza cultural y la biodiversidad de nuestra tierra. Trabajamos
              de la mano con productores locales y comunidades originarias para
              ofrecer alimentos, infusiones y productos de cuidado personal
              elaborados de forma responsable y sostenible.
            </p>

            <p>
              Creemos en el poder de lo natural para mejorar la vida de las
              personas, por eso seleccionamos cuidadosamente cada ingrediente y
              fomentamos prácticas que respeten el medio ambiente. Nuestro
              objetivo es compartir, dentro y fuera de nuestra región, el valor
              de lo auténtico, lo saludable y lo hecho con dedicación.
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
