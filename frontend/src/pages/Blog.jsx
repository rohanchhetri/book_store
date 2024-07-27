import { useEffect } from "react";
import Header from "../components/Header";

const Membership = () => {
  useEffect(() => {
    (document.title = "AthleticHub | Membership"), [];
  });
  return (
    <>
      <div>
        <Header />
      </div>
    </>
  );
};

export default Membership;
