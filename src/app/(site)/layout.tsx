import Navbar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/UI/WhatsAppButton";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <WhatsAppButton whatsappNumber = "5491133324141"/>
      <Footer />
    </>
  );
}
