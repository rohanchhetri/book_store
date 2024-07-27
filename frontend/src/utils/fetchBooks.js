import { PORT } from "./port";

export default async function fetchBooks() {
  try {
    const response = await fetch(`http://localhost:${PORT}/api/books`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const books = await response.json();
    // console.log("Fetched books:", books); // Add this line to check the fetched data
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}
