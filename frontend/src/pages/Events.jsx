import { useEffect } from "react";
import Header from "../components/Header";

const Events = () => {
  useEffect(() => {
    (document.title = "AthleticHub | Events"), [];
  });
  return (
    <>
      <div>
        <Header />
      </div>
    </>
  );
};

export default Events;
