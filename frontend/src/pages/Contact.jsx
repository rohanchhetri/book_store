import { useEffect } from "react";
import Header from "../components/Header";
import SocialIcons from "../components/SocialIcon";
import ContactForm from "../components/ContactForm";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const About = () => {
  useEffect(() => {
    (document.title = "AthleticHub | Contact"), [];
  });
  return (
    <>
      <div>
        <Header />
        <div
          className="relative bg-cover bg-center h-[80vh] flex flex-col justify-center items-center"
          style={{
            backgroundImage:
              'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS38DqHeqCdtWyDkY1iQeq85xg9_SPuyfsbrERHS6i-0jvuHaTSlQDVuowfvqbVIkvxaM8&usqp=CAU")',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative text-center text-white z-10"></div>
        </div>
        <main className="py-10 px-4 mx-auto max-w-4xl">
          <ContactForm />
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
