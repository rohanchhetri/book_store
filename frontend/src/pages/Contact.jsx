import { useEffect } from "react";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
// import required modules
import { Scrollbar } from "swiper/modules";

const Contact = () => {
  useEffect(() => {
    document.title = "BookHub | Contact";
  }, []);

  const bgImage = "/src/assets/ebook_app_site.jpeg";

  return (
    <>
      <div>
        <Header />
        <div className="mt-20">
          <Swiper
            scrollbar={{ hide: true }}
            modules={[Scrollbar]}
            className="mySwiper h-[80vh] w-full"
          >
            <SwiperSlide className="w-full h-[80vh]">
              <div
                style={{
                  backgroundImage: `url(${bgImage})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <div className="flex justify-center items-center h-full bg-black bg-opacity-50">
                  <h1 className="text-4xl text-white font-bold">Contact Us</h1>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
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

export default Contact;
