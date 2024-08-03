import { useEffect } from "react";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";

const Membership = () => {
  useEffect(() => {
    (document.title = "AthleticHub | Membership"), [];
  });
  return (
    <>
      <div className="">
        <Header />
        <div className="mt-16 text-center">
          <h1 className="text-3xl py-5">Blogs</h1>
          <div className="flex w-full flex-wrap justify-center gap-4">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Membership;
