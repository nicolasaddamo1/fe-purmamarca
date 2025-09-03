import Image from "next/image";

const BandaDeco = () => {
  return (
    <div className="flex justify-center md:justify-start items-center bg-maroon shadow-md px-18 w-full overflow-hidden text-white">
      <h2 className="p-4 font-light md:text-left text-center">
        Veamos todos los productos que ofrecemos
      </h2>
      <Image
        src="/Union.svg"
        alt="Union decoration"
        width={40}
        height={40}
        className="ml-4"
      />
    </div>
  );
};

export default BandaDeco;
