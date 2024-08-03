import { useEffect } from "react";
import Header from "../components/Header";
import Members from "../components/Members";
import Footer from "../components/Footer";
import logo from "../assets/book-logo.png";
const About = () => {
  useEffect(() => {
    (document.title = "BookHub | About"), [];
  });
  let p = document.querySelectorAll("p");
  p.forEach((p) => {
    p.classList.add("text-lg");
  });
  return (
    <>
      <div>
        <Header />
        <div className="mt-20 px-12">
          <div className="flex justify-center py-4">
            <div className="max-w-[700px]">
              <h2 className="text-3xl pb-2">Our Story</h2>
              <p>
                Our journey began in 2024, during a group project at our
                college. As avid readers, we often found it challenging to
                access a wide range of ebooks conveniently. This sparked the
                idea of creating our own ebook library, a platform that not only
                offers a vast collection of ebooks but also makes the process of
                finding, borrowing, and reading them seamless and enjoyable.
              </p>
            </div>
            <div className="w-[70vw] justify-center items-center max-w-[720px] text-center flex flex-col gap-2">
              <img src={logo} alt="" className="max-w-[200px] rounded-xl" />
              <p className="text-xl">Developed for Students By Students.</p>
            </div>
          </div>
          <br />
          <div className="flex justify-end py-4">
            <div className="max-w-[700px]">
              <h2 className="text-3xl pb-2">Our Mission</h2>
              <p>
                At BookHub, our mission is to make reading more accessible and
                enjoyable for everyone. We aim to provide a platform where book
                lovers can discover new titles, share their favorite reads, and
                connect with other readers. Our goal is to create a community
                where everyone can find the perfect book to read, regardless of
                their preferences or interests.
              </p>
            </div>
          </div>
          <h2 className="text-3xl text-center">Our Team</h2>
          <Members />
          <div className="flex justify-center">
            <div className="max-w-[600px] text-center">
              <h2 className="text-3xl">Join us on Our Journey</h2>
              <br />
              <p>
                Whether you are looking for your next great read or want to
                suggest new titles, we are here to make your experience as
                delightful as possible.
              </p>
              <br />
              <p className="text-xl">Thank you for being a part of BookHub!</p>
              <p className="text-lg">Happy Reading</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default About;
