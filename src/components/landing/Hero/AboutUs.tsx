import BandaDeco from "./BandaDeco";

const AboutUs = () => {
  return (
    <>
      <section className="md:px-40 py-20">
        <div className="flex md:flex-cols-2 items-center gap-40 mx-auto px-4 container">
          <div className="md:text-left text-center">
            <h4 className="mb-2 text-secondary text-xl">Sobre nosotros</h4>
            <h1 className="font-bold text-maroon text-3xl md:text-4xl leading-tight">
              Distribuidora
            </h1>
            <h1 className="font-bold text-maroon text-4xl md:text-5xl leading-tight">
              Purmamarca
            </h1>
          </div>

          <div className="text-gray-700 md:text-sm text-lg text-center md:leading-relaxed">
            <p>
              Distribuidora Purmamarca es una empresa comprometida con llevar a
              cada hogar productos naturales de alta calidad, inspirados en la
              riqueza cultural y la biodiversidad de nuestra tierra. Trabajamos
              de la mano con productores locales y comunidades originarias para
              ofrecer alimentos, infusiones y productos de cuidado personal
              elaborados de forma responsable y sostenible.
            </p>
            <br />
            <p>
              Creemos en el poder de lo natural para mejorar la vida de las
              personas, por eso seleccionamos cuidadosamente cada ingrediente y
              fomentamos prácticas que respeten el medio ambiente. Nuestro
              objetivo es compartir, dentro y fuera de nuestra región, el valor
              de lo auténtico, lo saludable y lo hecho con dedicación.
            </p>
          </div>
        </div>
        <span className="z-10 border-secondary border-b w-4/5"></span>
      </section>
      <section className="flex justify-center items-center">
        <BandaDeco />
      </section>
    </>
  );
};

export default AboutUs;
