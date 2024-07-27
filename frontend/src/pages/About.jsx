import { useEffect } from "react";
import Header from "../components/Header";

const About = () => {
  useEffect(() => {
    (document.title = "AthleticHub | About"), [];
  });
  return (
    <>
      <div>
        <Header />
      </div>
    </>
  );
};

export default About;
