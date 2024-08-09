import { useEffect } from "react";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import { blogs } from "../utils/blogList";

const Blogs = () => {
  useEffect(() => {
    (document.title = "BookHub | Blogs"), [];
  });

  return (
    <>
      <div className="">
        <Header />
        <div className="mt-16 text-center">
          <h1 className="text-3xl py-5">Blogs</h1>
          <div className="flex w-full flex-wrap justify-center gap-4">
            {blogs.map((blog, index) => (
              <BlogCard
                key={index}
                title={blog.title}
                img={blog.image}
                description={blog.description}
                author={blog.author}
                date={blog.date}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Blogs;
