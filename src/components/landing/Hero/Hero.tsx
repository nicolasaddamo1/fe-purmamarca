import Image from "next/image";
const Hero = () => {
  return (
    <div className="relative w-full">
      {/* Imagen de fondo */}
      <Image
        src="/cerro.png"
        alt="purmamarca"
        className="w-full h-64 md:h-[580px] object-cover"
        width={1920}
        height={1080}
      />

      {/* Overlay con vidrio y máscara */}
      <div className="absolute inset-0 flex justify-center items-center">
        <svg className="w-full h-full">
          <defs>
            <mask id="text-mask" x="0" y="0" width="100%" height="100%">
              {/* Fondo negro = tapado, letras blancas = agujeros */}
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <text
                x="50%"
                y="35%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="60"
                fontFamily="ABeeZee"
                fontWeight="bold"
                fill="black"
              >
                Distribuidora
              </text>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="130"
                fontFamily="ABeeZee"
                fontWeight="bold"
                fill="black"
              >
                Purmamarca
              </text>
            </mask>
          </defs>

          {/* Rectángulo con blur y máscara */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.623)"
            style={{ backdropFilter: "blur(10px)" }}
            mask="url(#text-mask)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
