import Image from "next/image";
import Link from "next/link";

const BandaDeco = () => {
  return (
    <Link href="/" className="w-full">
      <div className="flex justify-between md:justify-start md:items-center bg-maroon shadow-md px-2 md:px-18 w-full overflow-hidden text-white cursor-pointer">
        <h2 className="p-0.5 md:p-4 font-light md:text-base text-left">
          Vea todos los productos que ofrecemos
        </h2>
        <Image
          src="/Union.svg"
          alt="Union decoration"
          width={40}
          height={40}
          className="ml-4"
        />
      </div>
    </Link>
  );
};

export default BandaDeco;
