const StarProduct = () => {
  return (
    <section className="py-16">
      <div className="mx-auto px-4 text-center container">
        <h3 className="mb-4 text-tertiary text-xl">
          Nuestros productos Estrellas
        </h3>
        <p className="mx-auto mb-8 max-w-xl text-primary text-2xl md:text-3xl">
          Productos seleccionados con la mejor calidad y cercanía para vos.
        </p>

        {/*TODO Acá después van las cards o el carrusel */}
        <div className="flex justify-center items-center text-gray-500">
          <p className="italic"> Destacados Acá...</p>
        </div>
      </div>
    </section>
  );
};

export default StarProduct;
