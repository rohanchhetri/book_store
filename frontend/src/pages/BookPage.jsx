import { useEffect, useState } from "react";
import BookList from "../components/BookList";
import Header from "../components/Header";
import Search from "../components/Search";
import Footer from "../components/Footer";

const BookPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    document.title = "AthleticHub | Shop";
  }, []);

  const categories = [
    { name: "Default", description: "all" },
    { name: "Romance", description: "romance" },
    { name: "Fiction", description: "fiction" },
    { name: "Horror", description: "horror" },
    { name: "Fantasy", description: "fantasy" },
  ];

  const handleClick = (category) => {
    setSelectedCategory(category);
    console.log("Selected Category:", category);
  };

  return (
    <>
      <Header />
      <Search />
      <div className="flex w-full flex-col lmd:flex-row items-center lmd:items-start gap-4 py-5 px-4 justify-start">
        <div className="h-full py-4 w-full max-w-[320px] lmd:max-w-[280px] lmd:min-w-[15%] flex flex-col justify-around items-center lmd:items-center text-black rounded-lg">
          <h1 className="text-xl pb-4">Categories</h1>
          <div className="flex flex-col w-full flex-wrap gap-y-2 items-center lmd:items-center justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleClick(category.description)}
                className={`border-solid border-[1px] border-gray-600 w-[70%]  py-2 rounded-full text-black ${
                  selectedCategory === category.description
                    ? "bg-main text-white"
                    : "bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <BookList category={selectedCategory} />
      </div>
      <Footer />
    </>
  );
};

export default BookPage;
