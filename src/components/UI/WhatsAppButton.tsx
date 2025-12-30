import React from "react";
import { BsWhatsapp } from "react-icons/bs";

interface WhatsAppButtonProps {
  whatsappNumber: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  whatsappNumber,
  message = "Hola, quiero comunicarme con ustedes, para recibir información sobre sus productos. \n\n#web-Purmamarca",
}) => {
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="right-4 sm:right-6 md:right-8 bottom-4 sm:bottom-6 md:bottom-8 z-50 fixed flex justify-center items-center bg-[#25D366]! shadow-lg rounded-full w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 hover:scale-110 transition-transform duration-200"
    >
      <BsWhatsapp size={34} color="white" />
    </a>
  );
};

export default WhatsAppButton; 